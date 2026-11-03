// Rotatable 3D view for "Industriell kommunikasjon" and "Systemintegrasjon & OT":
// PLC 1 wired to field devices, PROFIBUS DP to PLC 2, Modbus TCP to PLC 3/4,
// and PLC 2 reaching a monitoring server and a remote workstation through a 4G/VPN router.
// Three.js is only loaded when the card gets close to the viewport;
// if WebGL or the CDN is unavailable the flat 2D diagram stays in place.
const host = document.getElementById('comm3d');
if (host && 'IntersectionObserver' in window) {
  const loader = new IntersectionObserver(entries => {
    if (!entries.some(e => e.isIntersecting)) return;
    loader.disconnect();
    initComm3d(host).catch(() => {});
  }, { rootMargin: '400px 0px' });
  loader.observe(host);
}

async function initComm3d(host) {
  const THREE = await import('three');
  const { OrbitControls } = await import('three/addons/controls/OrbitControls.js');
  const { CSS2DRenderer, CSS2DObject } = await import('three/addons/renderers/CSS2DRenderer.js');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const V = (x, y, z) => new THREE.Vector3(x, y, z);
  const t9n = key => (typeof COPY !== 'undefined' && typeof currentLang !== 'undefined' && COPY[currentLang][key]) || key;

  // Renderer, labels, scene, camera
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  host.appendChild(renderer.domElement);

  const labels = new CSS2DRenderer();
  labels.domElement.className = 'comm3d-labels';
  host.appendChild(labels.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 120);

  scene.add(new THREE.HemisphereLight(0xe6efe9, 0x0b100d, 1.6));
  const sun = new THREE.DirectionalLight(0xffffff, 2.6);
  sun.position.set(6, 12, 7);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  Object.assign(sun.shadow.camera, { left: -15, right: 15, top: 15, bottom: -15, near: 1, far: 45 });
  sun.shadow.bias = -0.0005;
  sun.shadow.normalBias = 0.02;
  scene.add(sun);

  // Field-level objects live in their own group so the cloud view can fade them out
  const field = new THREE.Group();
  scene.add(field);

  // Materials
  const std = (color, metalness, roughness, extra = {}) =>
    new THREE.MeshStandardMaterial({ color, metalness, roughness, ...extra });
  const M = {
    cabinet: std(0xcfd5da, 0.25, 0.55),
    plinth: std(0x3a4148, 0.3, 0.6),
    plate: std(0xa9b2ba, 0.5, 0.45),
    rail: std(0x8d969e, 0.8, 0.3),
    duct: std(0x9aa3ab, 0.1, 0.7),
    module: std(0x2c3238, 0.2, 0.6),
    moduleFace: std(0x3d454d, 0.1, 0.7),
    device: std(0x2a3036, 0.3, 0.5),
    steel: std(0xb4bcc3, 0.7, 0.3),
    tank: std(0xc8d0d6, 0.3, 0.15, { transparent: true, opacity: 0.32, depthWrite: false }),
    liquid: std(0x3aa0c8, 0.1, 0.2, { transparent: true, opacity: 0.55, emissive: 0x0d3a4a, emissiveIntensity: 0.4 }),
    head: std(0xdde2e6, 0.3, 0.4),
    flow: std(0x4f6f8a, 0.4, 0.45),
    motor: std(0x5d6873, 0.5, 0.45),
    motorCable: std(0xe07b39, 0.1, 0.5),
    drive: std(0x2d343a, 0.3, 0.5),
    tray: std(0x6f7a83, 0.6, 0.4),
    wire: std(0x8e99a3, 0.1, 0.6),
    profibus: std(0x4ca968, 0.1, 0.4, { emissive: 0x2f8a4f, emissiveIntensity: 0.5 }),
    ethernet: std(0x3fa9e0, 0.1, 0.4, { emissive: 0x1b6e99, emissiveIntensity: 0.45 }),
  };

  const mesh = (geo, mat) => { const m = new THREE.Mesh(geo, mat); m.castShadow = true; m.receiveShadow = true; return m; };
  const box = (w, h, d, mat) => mesh(new THREE.BoxGeometry(w, h, d), mat);
  const cyl = (r, h, mat, axis = 'y', seg = 28) => {
    const m = mesh(new THREE.CylinderGeometry(r, r, h, seg), mat);
    if (axis === 'x') m.rotation.z = Math.PI / 2;
    if (axis === 'z') m.rotation.x = Math.PI / 2;
    return m;
  };
  const at = (obj, x, y, z) => { obj.position.set(x, y, z); return obj; };

  // Floor: faded grid plus a shadow catcher
  const gridCanvas = document.createElement('canvas');
  gridCanvas.width = gridCanvas.height = 1024;
  const g = gridCanvas.getContext('2d');
  g.strokeStyle = 'rgba(160,190,172,0.4)';
  g.lineWidth = 1.5;
  for (let i = 0; i <= 1024; i += 32) {
    g.beginPath(); g.moveTo(i, 0); g.lineTo(i, 1024); g.stroke();
    g.beginPath(); g.moveTo(0, i); g.lineTo(1024, i); g.stroke();
  }
  g.globalCompositeOperation = 'destination-in';
  const fade = g.createRadialGradient(512, 512, 100, 512, 512, 512);
  fade.addColorStop(0, 'rgba(0,0,0,1)');
  fade.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = fade;
  g.fillRect(0, 0, 1024, 1024);
  const gridTex = new THREE.CanvasTexture(gridCanvas);
  gridTex.colorSpace = THREE.SRGBColorSpace;
  const grid = new THREE.Mesh(new THREE.PlaneGeometry(36, 36), new THREE.MeshBasicMaterial({ map: gridTex, transparent: true, depthWrite: false }));
  grid.rotation.x = -Math.PI / 2;
  grid.position.set(-2, 0.002, -2.5);
  scene.add(grid);
  const shadowFloor = new THREE.Mesh(new THREE.PlaneGeometry(36, 36), new THREE.ShadowMaterial({ opacity: 0.35 }));
  shadowFloor.rotation.x = -Math.PI / 2;
  shadowFloor.position.set(-2, 0, -2.5);
  shadowFloor.receiveShadow = true;
  scene.add(shadowFloor);

  // Status LEDs (blinking unless fixed)
  const leds = [];
  const led = (color, x, y, z, parent, fixed = false, mat) => {
    const m = at(new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.035, 0.02), mat || new THREE.MeshBasicMaterial({ color: 0x1d2a22, toneMapped: false })), x, y, z);
    parent.add(m);
    const l = { mat: m.material, on: new THREE.Color(color), off: new THREE.Color(0x1d2a22), next: 0, fixed };
    if (fixed) l.mat.color.copy(l.on);
    leds.push(l);
    return l;
  };

  // Control cabinet with a PLC rack: CPU + I/O modules on a DIN rail
  function makePlc(ioCount) {
    const grp = new THREE.Group();
    const W = 0.62 + ioCount * 0.36 + 0.7, H = 2.3, D = 0.75, t = 0.05, base = 0.2;
    grp.add(at(box(W, base, D, M.plinth), 0, base / 2, 0));
    grp.add(at(box(W, H, t, M.cabinet), 0, base + H / 2, -D / 2 + t / 2));
    grp.add(at(box(t, H, D, M.cabinet), -W / 2, base + H / 2, 0));
    grp.add(at(box(t, H, D, M.cabinet), W / 2, base + H / 2, 0));
    grp.add(at(box(W + t, t, D, M.cabinet), 0, base + H, 0));
    grp.add(at(box(W + t, t, D, M.cabinet), 0, base + t / 2, 0));
    grp.add(at(box(W - 0.2, H - 0.3, 0.03, M.plate), 0, base + H / 2, -D / 2 + 0.07));
    const railY = 1.45, railZ = -D / 2 + 0.11;
    grp.add(at(box(W - 0.35, 0.07, 0.04, M.rail), 0, railY, railZ));
    grp.add(at(box(W - 0.4, 0.12, 0.1, M.duct), 0, 0.72, railZ + 0.04));
    const depth = 0.55, frontZ = railZ + 0.02 + depth;
    const widths = [0.6, ...Array(ioCount).fill(0.34)];
    const total = widths.reduce((a, w) => a + w, 0) + (widths.length - 1) * 0.02;
    let x = -total / 2;
    const centers = widths.map(w => { const c = x + w / 2; x += w + 0.02; return c; });
    widths.forEach((w, i) => {
      grp.add(at(box(w, 1.0, depth, M.module), centers[i], railY, railZ + 0.02 + depth / 2));
      grp.add(at(box(w - 0.06, 0.28, 0.01, M.moduleFace), centers[i], railY - 0.3, frontZ + 0.005));
    });
    const cpu = centers[0];
    led(0x62e08e, cpu - 0.2, railY + 0.36, frontZ + 0.01, grp, true);
    led(0xff5a4f, cpu - 0.2, railY + 0.29, frontZ + 0.01, grp, true).mat.color.set(0x3a1a18);
    led(0x9be0b0, cpu - 0.2, railY + 0.22, frontZ + 0.01, grp);
    centers.slice(1).forEach(c => {
      for (let r = 0; r < 4; r++) for (let col = 0; col < 2; col++) {
        led(0x62e08e, c - 0.05 + col * 0.1, railY + 0.36 - r * 0.07, frontZ + 0.01, grp);
      }
    });
    return {
      grp, W, D, top: base + H,
      dpPort: V(cpu + 0.16, railY - 0.32, frontZ + 0.01),
      ethPort: V(cpu + 0.27, railY - 0.32, frontZ + 0.01),
      ioPort: (k, off = 0) => V(centers[k + 1] + off, railY - 0.38, frontZ + 0.01),
    };
  }
  const placePlc = (io, x, z, parent = field) => { const p = makePlc(io); p.grp.position.set(x, 0, z); parent.add(p.grp); return p; };
  const plc1 = placePlc(4, -2.6, 0.3);
  const plc2 = placePlc(1, -6.0, -3.0, scene);
  const plc3 = placePlc(1, -9.4, 0.6);

  // 4G / VPN router on top of PLC 2's cabinet
  const routerX = 0.35, routerY = plc2.top + 0.075;
  plc2.grp.add(at(box(0.42, 0.1, 0.28, M.device), routerX, routerY, 0));
  [-0.16, 0.16].forEach(dx => plc2.grp.add(at(cyl(0.012, 0.4, M.device, 'y', 8), routerX + dx, routerY + 0.25, -0.1)));
  [-0.12, -0.06, 0].forEach(dx => led(0x62e08e, routerX + dx, routerY, 0.145, plc2.grp));
  scene.updateMatrixWorld(true);
  const world = (plc, v) => plc.grp.localToWorld(v.clone());

  // Process: tank with level transmitter, pump, pipe with pressure / flow / temperature
  const TX = 1.8, TZ = -1.6, PY = 0.6;
  const PX = 3.6, PTX = 4.6, FTX = 5.7, TTX = 6.8, PIPE_END = 7.3;
  field.add(at(cyl(0.75, 2.0, M.tank, 'y', 48), TX, 1.35, TZ));
  const liquid = at(cyl(0.71, 1, M.liquid, 'y', 48), TX, 0.9, TZ);
  liquid.castShadow = false;
  field.add(liquid);
  field.add(at(cyl(0.77, 0.06, M.steel, 'y', 48), TX, 2.36, TZ));
  field.add(at(cyl(0.77, 0.06, M.steel, 'y', 48), TX, 0.34, TZ));
  [[-0.5, -0.5], [0.5, -0.5], [-0.5, 0.5], [0.5, 0.5]].forEach(([dx, dz]) => field.add(at(cyl(0.04, 0.34, M.steel), TX + dx, 0.17, TZ + dz)));
  field.add(at(cyl(0.08, 0.12, M.steel), TX, 2.44, TZ));
  field.add(at(box(0.22, 0.18, 0.2, M.head), TX, 2.59, TZ));

  const pipeStart = TX + 0.7;
  field.add(at(cyl(0.09, PIPE_END - pipeStart, M.steel, 'x'), (PIPE_END + pipeStart) / 2, PY, TZ));
  field.add(at(cyl(0.14, 0.05, M.steel, 'x'), PIPE_END, PY, TZ));
  [4.1, 6.25, 7.2].forEach(x => field.add(at(box(0.08, PY - 0.09, 0.08, M.steel), x, (PY - 0.09) / 2, TZ)));

  field.add(at(cyl(0.24, 0.28, M.motor, 'z'), PX, PY, TZ));
  field.add(at(cyl(0.19, 0.55, M.motor, 'z'), PX, PY, TZ + 0.415));
  field.add(at(cyl(0.2, 0.06, M.steel, 'z'), PX, PY, TZ + 0.72));
  field.add(at(box(0.2, 0.12, 0.2, M.head), PX, PY + 0.25, TZ + 0.4));

  field.add(at(cyl(0.03, 0.32, M.steel), PTX, PY + 0.25, TZ));
  field.add(at(cyl(0.12, 0.12, M.head, 'z'), PTX, 1.1, TZ));

  field.add(at(cyl(0.19, 0.4, M.flow, 'x'), FTX, PY, TZ));
  [FTX - 0.22, FTX + 0.22].forEach(x => field.add(at(cyl(0.22, 0.04, M.steel, 'x'), x, PY, TZ)));
  field.add(at(cyl(0.04, 0.14, M.steel), FTX, PY + 0.25, TZ));
  field.add(at(box(0.24, 0.18, 0.2, M.head), FTX, 1.0, TZ));

  field.add(at(cyl(0.025, 0.38, M.steel), TTX, PY + 0.28, TZ));
  field.add(at(cyl(0.09, 0.14, M.head), TTX, 1.12, TZ));

  // Cable tray in front of the process
  const TRZ = 1.35, TRAY_X0 = -2.95, TRAY_X1 = 7.4;
  field.add(at(box(TRAY_X1 - TRAY_X0, 0.03, 0.5, M.tray), (TRAY_X0 + TRAY_X1) / 2, 0.015, TRZ));
  [TRZ - 0.25, TRZ + 0.25].forEach(z => field.add(at(box(TRAY_X1 - TRAY_X0, 0.08, 0.02, M.tray), (TRAY_X0 + TRAY_X1) / 2, 0.04, z)));

  // Frequency drive (VFD), controlled by PLC 3 over Modbus TCP
  const vfd = new THREE.Group();
  vfd.position.set(-6.6, 0, 2.6);
  field.add(vfd);
  vfd.add(at(box(0.62, 0.12, 0.46, M.plinth), 0, 0.06, 0));
  vfd.add(at(box(0.55, 1.35, 0.42, M.drive), 0, 0.795, 0));
  [-1, 1].forEach(sx => { for (let k = 0; k < 6; k++) vfd.add(at(box(0.05, 1.1, 0.012, M.steel), sx * 0.3, 0.8, -0.15 + k * 0.06)); });
  vfd.add(at(box(0.26, 0.34, 0.03, M.device), 0, 1.2, 0.225));
  const hzCanvas = document.createElement('canvas');
  hzCanvas.width = 128; hzCanvas.height = 64;
  const hz = hzCanvas.getContext('2d');
  const hzTex = new THREE.CanvasTexture(hzCanvas);
  hzTex.colorSpace = THREE.SRGBColorSpace;
  const drawHz = v => {
    hzNow = v;
    hz.fillStyle = '#0b120e'; hz.fillRect(0, 0, 128, 64);
    hz.fillStyle = '#62c27f'; hz.font = 'bold 30px monospace'; hz.textAlign = 'center'; hz.textBaseline = 'middle';
    hz.fillText(v.toFixed(1) + ' Hz', 64, 34);
    hzTex.needsUpdate = true;
  };
  vfd.add(at(new THREE.Mesh(new THREE.PlaneGeometry(0.2, 0.1), new THREE.MeshBasicMaterial({ map: hzTex, toneMapped: false })), 0, 1.28, 0.242));
  [-0.07, 0, 0.07].forEach(dx => vfd.add(at(box(0.04, 0.03, 0.01, M.steel), dx, 1.12, 0.242)));
  led(0x62e08e, 0.1, 1.33, 0.242, vfd, true);

  // Fan motor M-201, driven by the VFD (fan speed follows the drive frequency)
  const fanMotor = new THREE.Group();
  fanMotor.position.set(-4.8, 0, 3.4);
  field.add(fanMotor);
  fanMotor.add(at(box(0.4, 0.08, 0.5, M.plinth), 0, 0.04, 0));
  fanMotor.add(at(cyl(0.2, 0.55, M.motor, 'z'), 0, 0.32, 0));
  fanMotor.add(at(box(0.16, 0.1, 0.16, M.head), 0, 0.57, -0.05));
  const guard = at(mesh(new THREE.TorusGeometry(0.3, 0.02, 8, 40), M.steel), 0, 0.32, 0.36);
  fanMotor.add(guard);
  const fan = at(new THREE.Group(), 0, 0.32, 0.34);
  fanMotor.add(fan);
  fan.add(cyl(0.05, 0.05, M.steel, 'z'));
  for (let k = 0; k < 5; k++) {
    const blade = at(box(0.08, 0.24, 0.01, M.head), 0, 0.14, 0);
    const arm = new THREE.Group();
    arm.rotation.z = (k / 5) * Math.PI * 2;
    blade.rotation.y = 0.35;
    arm.add(blade);
    fan.add(arm);
  }
  let hzNow = 42.5;
  drawHz(hzNow);

  // Tubes that follow a polyline with rounded corners
  function roundedPath(pts, r = 0.16) {
    const path = new THREE.CurvePath();
    let start = pts[0].clone();
    for (let i = 1; i < pts.length - 1; i++) {
      const a = pts[i - 1], p = pts[i], b = pts[i + 1];
      const d1 = p.clone().sub(a), d2 = b.clone().sub(p);
      const rr = Math.min(r, d1.length() / 2, d2.length() / 2);
      const p1 = p.clone().sub(d1.normalize().multiplyScalar(rr));
      const p2 = p.clone().add(d2.normalize().multiplyScalar(rr));
      if (start.distanceTo(p1) > 1e-4) path.add(new THREE.LineCurve3(start, p1));
      path.add(new THREE.QuadraticBezierCurve3(p1, p.clone(), p2));
      start = p2;
    }
    path.add(new THREE.LineCurve3(start, pts[pts.length - 1].clone()));
    return path;
  }
  // flow: 'in' = device -> controller, 'out' = controller -> device, 'both' = traffic both ways
  const cables = [];
  function cable(path, mat, radius, packetColor, count, speed, flow, parent = field) {
    parent.add(mesh(new THREE.TubeGeometry(path, 220, radius, 10, false), mat));
    const pMat = new THREE.MeshBasicMaterial({ color: packetColor, toneMapped: false });
    const packets = [];
    for (let i = 0; i < count; i++) {
      const p = new THREE.Mesh(new THREE.SphereGeometry(radius * 1.9, 12, 12), pMat);
      p.visible = !reduce;
      parent.add(p);
      packets.push({ mesh: p, offset: i / count, rev: flow === 'in' || (flow === 'both' && i % 2 === 1) });
    }
    cables.push({ path, packets, speed });
    return path;
  }

  // Field wiring: PLC 1 I/O modules -> cable tray -> each device
  const cabFront = plc1.grp.position.z + plc1.D / 2;
  const devices = [
    { tag: 'LT-101', port: plc1.ioPort(0, -0.07), end: V(TX, 2.59, TZ + 0.1), riseZ: TZ + 0.92, label: V(TX, 3.0, TZ) },
    { tag: 'M-101', port: plc1.ioPort(2, 0), end: V(PX, PY + 0.25, TZ + 0.5), riseZ: TZ + 0.88, label: V(PX, 1.25, TZ + 0.4), output: true },
    { tag: 'PT-102', port: plc1.ioPort(0, 0.07), end: V(PTX, 1.1, TZ + 0.06), riseZ: TZ + 0.45, label: V(PTX, 1.5, TZ) },
    { tag: 'FT-103', port: plc1.ioPort(1, -0.07), end: V(FTX, 1.0, TZ + 0.1), riseZ: TZ + 0.45, label: V(FTX, 1.4, TZ) },
    { tag: 'TT-104', port: plc1.ioPort(1, 0.07), end: V(TTX, 1.12, TZ + 0.09), riseZ: TZ + 0.45, label: V(TTX, 1.52, TZ) },
  ];
  devices.forEach((d, i) => {
    const p = world(plc1, d.port);
    const drop = cabFront + 0.1 + i * 0.03;
    const lane = TRZ - 0.2 + i * 0.09;
    const y = 0.07;
    cable(roundedPath([
      p, V(p.x, p.y, drop), V(p.x, y, drop), V(p.x, y, lane),
      V(d.end.x, y, lane), V(d.end.x, y, d.riseZ), V(d.end.x, d.end.y, d.riseZ), d.end,
    ]), M.wire, 0.022, 0xe6f7ec, 2, 0.32, d.output ? 'out' : 'in');
  });

  // PROFIBUS DP between PLC 1 and PLC 2 (green)
  const a = world(plc1, plc1.dpPort), b = world(plc2, plc2.dpPort);
  const pbZ = cabFront + 0.07;
  const pbPath = cable(roundedPath([a, V(a.x, a.y, pbZ), V(a.x, 0.07, pbZ), V(b.x, 0.07, pbZ), V(b.x, 0.07, b.z + 0.25), V(b.x, b.y, b.z + 0.25), b]),
    M.profibus, 0.04, 0xc8f5a0, 6, 0.2, 'both');

  // Modbus TCP: PLC 1 -> PLC 3 and PLC 3 -> drive (blue Ethernet); motor cable drive -> fan
  scene.updateMatrixWorld(true);
  const facing = obj => V(Math.sin(obj.rotation.y), 0, Math.cos(obj.rotation.y));
  const e1 = world(plc1, plc1.ethPort), ethZ = cabFront + 0.04, ethRun = TRZ - 0.25;
  const n3 = facing(plc3.grp);
  const e3 = world(plc3, plc3.ethPort), e3a = e3.clone().addScaledVector(n3, 0.35);
  cable(roundedPath([e1, V(e1.x, e1.y, ethZ), V(e1.x, 0.07, ethZ), V(e1.x, 0.07, ethRun), V(e3a.x, 0.07, ethRun),
    V(e3a.x, 0.07, e3a.z), V(e3a.x, e3a.y, e3a.z), e3]), M.ethernet, 0.03, 0xbfe9ff, 4, 0.2, 'both');
  const nV = facing(vfd);
  const d3 = world(plc3, plc3.dpPort), d3a = d3.clone().addScaledVector(n3, 0.3);
  const vIn = vfd.localToWorld(V(-0.12, 0.35, 0.215)), vInA = vIn.clone().addScaledVector(nV, 0.3);
  const drivePath = cable(roundedPath([d3, d3a, V(d3a.x, 0.07, d3a.z), V(d3a.x, 0.07, vInA.z),
    V(vInA.x, 0.07, vInA.z), V(vInA.x, vIn.y, vInA.z), vIn]), M.ethernet, 0.03, 0xbfe9ff, 3, 0.26, 'both');
  const vOut = vfd.localToWorld(V(0.12, 0.25, 0.215)), vOutA = vOut.clone().addScaledVector(nV, 0.22);
  const tb = fanMotor.localToWorld(V(-0.08, 0.57, -0.05)), tbA = tb.clone().add(V(-0.22, 0, 0));
  cable(roundedPath([vOut, vOutA, V(vOutA.x, 0.07, vOutA.z), V(tbA.x, 0.07, vOutA.z), V(tbA.x, 0.07, tbA.z), V(tbA.x, tb.y, tbA.z), tb]),
    M.motorCable, 0.035, 0xffffff, 0, 0, 'out');

  // PLC 2 -> router (Ethernet, up the front of the cabinet)
  const pe = plc2.ethPort, frontOut = plc2.D / 2 + 0.06;
  cable(roundedPath([pe, V(pe.x, pe.y, frontOut), V(pe.x, routerY, frontOut), V(routerX - 0.12, routerY, frontOut), V(routerX - 0.12, routerY, 0.14)].map(v => plc2.grp.localToWorld(v))),
    M.ethernet, 0.025, 0xbfe9ff, 2, 0.3, 'both', scene);

  // Cloud, monitoring server and remote workstation (fade in with the cloud view)
  const ot = new THREE.Group();
  scene.add(ot);
  const CLOUD = V(-7.6, 5.2, -7.4);
  const cloudMat = std(0xeaf4ee, 0, 0.9, { emissive: 0x6cd08e, emissiveIntensity: 0.1 });
  [[0, 0, 0, 0.95], [0.95, -0.15, 0.1, 0.72], [-0.95, -0.2, 0, 0.72], [0.4, 0.5, -0.1, 0.7], [-0.4, 0.42, 0.15, 0.62], [0.1, -0.3, 0.45, 0.6], [-0.2, -0.25, -0.45, 0.6]]
    .forEach(([x, y, z, r]) => {
      const puff = at(mesh(new THREE.SphereGeometry(r, 32, 20), cloudMat), CLOUD.x + x, CLOUD.y + y, CLOUD.z + z);
      puff.castShadow = false;
      ot.add(puff);
    });

  const RACK = V(-10.4, 0, -7.6);
  ot.add(at(box(0.9, 2.1, 0.9, std(0x1d2329, 0.4, 0.5)), RACK.x, 1.05, RACK.z));
  for (let i = 0; i < 6; i++) {
    const y = 0.35 + i * 0.28;
    ot.add(at(box(0.8, 0.22, 0.02, std(0x2d353c, 0.3, 0.5)), RACK.x, y, RACK.z + 0.46));
    led(0x62e08e, RACK.x + 0.3, y, RACK.z + 0.475, ot);
    led(0x3fa9e0, RACK.x + 0.24, y, RACK.z + 0.475, ot);
  }

  const DESK = V(-5.2, 0, -8.8);
  const woodMat = std(0x3b4046, 0.2, 0.6);
  ot.add(at(box(1.5, 0.05, 0.75, woodMat), DESK.x, 0.74, DESK.z));
  [[-0.68, -0.32], [0.68, -0.32], [-0.68, 0.32], [0.68, 0.32]].forEach(([dx, dz]) => ot.add(at(box(0.05, 0.72, 0.05, woodMat), DESK.x + dx, 0.36, DESK.z + dz)));
  ot.add(at(box(0.3, 0.02, 0.2, M.device), DESK.x, 0.775, DESK.z - 0.15));
  ot.add(at(box(0.06, 0.3, 0.06, M.device), DESK.x, 0.93, DESK.z - 0.15));
  ot.add(at(box(1.0, 0.6, 0.04, M.device), DESK.x, 1.3, DESK.z - 0.12));
  ot.add(at(box(0.6, 0.02, 0.2, M.device), DESK.x, 0.775, DESK.z + 0.15));
  const screenCanvas = document.createElement('canvas');
  screenCanvas.width = 256; screenCanvas.height = 144;
  const sc = screenCanvas.getContext('2d');
  sc.fillStyle = '#0b120e'; sc.fillRect(0, 0, 256, 144);
  sc.strokeStyle = 'rgba(255,255,255,0.08)';
  for (let i = 0; i < 256; i += 32) { sc.beginPath(); sc.moveTo(i, 0); sc.lineTo(i, 144); sc.stroke(); }
  sc.fillStyle = 'rgba(98,194,127,0.25)'; sc.fillRect(14, 14, 60, 50); sc.fillRect(84, 14, 60, 50);
  sc.strokeStyle = '#62c27f'; sc.lineWidth = 3; sc.beginPath();
  for (let i = 0; i <= 20; i++) sc.lineTo(14 + i * 11.4, 112 - Math.sin(i / 2.5) * 16 - i);
  sc.stroke();
  const screenTex = new THREE.CanvasTexture(screenCanvas);
  screenTex.colorSpace = THREE.SRGBColorSpace;
  ot.add(at(new THREE.Mesh(new THREE.PlaneGeometry(0.92, 0.52), new THREE.MeshBasicMaterial({ map: screenTex, toneMapped: false })), DESK.x, 1.3, DESK.z - 0.098));

  // Animated dashed links over the internet / VPN
  const dashCanvas = document.createElement('canvas');
  dashCanvas.width = 64; dashCanvas.height = 4;
  const dc = dashCanvas.getContext('2d');
  dc.fillStyle = '#fff'; dc.fillRect(0, 0, 36, 4);
  const dashTex = new THREE.CanvasTexture(dashCanvas);
  dashTex.wrapS = THREE.RepeatWrapping;
  dashTex.repeat.set(26, 1);
  const vpnMat = new THREE.MeshBasicMaterial({ color: 0xb8f09a, alphaMap: dashTex, transparent: true, toneMapped: false });
  const antenna = world(plc2, V(routerX + 0.16, routerY + 0.45, -0.1));
  const smooth = pts => new THREE.CatmullRomCurve3(pts, false, 'centripetal');
  const vpnPath = cable(smooth([antenna, V(antenna.x - 0.3, antenna.y + 1.4, antenna.z - 1.2), V(CLOUD.x + 0.6, CLOUD.y - 1.4, CLOUD.z + 1.1), V(CLOUD.x + 0.3, CLOUD.y - 0.6, CLOUD.z + 0.4)]),
    vpnMat, 0.035, 0xe6ffd6, 3, 0.3, 'both', ot);
  cable(smooth([V(CLOUD.x - 0.9, CLOUD.y - 0.6, CLOUD.z), V(RACK.x + 0.2, CLOUD.y - 1.0, RACK.z + 0.2), V(RACK.x, 2.6, RACK.z), V(RACK.x, 2.15, RACK.z)]),
    vpnMat, 0.035, 0xe6ffd6, 3, 0.3, 'both', ot);
  cable(smooth([V(CLOUD.x + 0.5, CLOUD.y - 0.6, CLOUD.z - 0.3), V(DESK.x - 0.6, CLOUD.y - 1.4, DESK.z + 0.8), V(DESK.x, 2.1, DESK.z - 0.12), V(DESK.x, 1.62, DESK.z - 0.12)]),
    vpnMat, 0.035, 0xe6ffd6, 3, 0.3, 'both', ot);

  const fieldMats = new Map();
  field.traverse(o => {
    if (!o.material) return;
    if (!fieldMats.has(o.material)) {
      const c = o.material.clone();
      c.userData.baseOpacity = o.material.opacity;
      c.userData.baseTransparent = o.material.transparent;
      c.userData.baseDepthWrite = o.material.depthWrite;
      fieldMats.set(o.material, c);
    }
    o.material = fieldMats.get(o.material);
  });
  leds.forEach(l => { if (fieldMats.has(l.mat)) l.mat = fieldMats.get(l.mat); });
  const profibusMat = fieldMats.get(M.profibus) || M.profibus;
  let fieldLevel = 1, fieldTarget = 1;
  const applyFieldFade = () => {
    const solid = fieldLevel >= 1;
    fieldMats.forEach(m => {
      const transparent = !solid || m.userData.baseTransparent;
      if (m.transparent !== transparent) { m.transparent = transparent; m.needsUpdate = true; }
      m.depthWrite = solid ? m.userData.baseDepthWrite : false;
      m.opacity = m.userData.baseOpacity * fieldLevel;
    });
    field.visible = fieldLevel > 0.01;
  };

  const otMats = new Set();
  ot.traverse(o => { if (o.material) otMats.add(o.material); });
  otMats.forEach(m => { m.transparent = true; m.userData.baseOpacity = m.opacity; m.opacity = 0; });
  ot.visible = false;
  let otLevel = 0, otTarget = 0;

  // Labels (texts with a data-i18n key follow the language switch)
  const tag = (text, pos, cls = '', key) => {
    const el = document.createElement('div');
    el.className = 'tag3d ' + cls;
    el.textContent = key ? t9n(key) : text;
    if (key) el.dataset.i18n = key;
    const o = new CSS2DObject(el);
    o.position.copy(pos);
    scene.add(o);
  };
  tag('PLC 1', world(plc1, V(0, 2.85, 0)), 'plc');
  tag('PLC 2', world(plc2, V(0, 2.85, 0)), 'plc keep');
  tag('PLC 3', world(plc3, V(0, 2.85, 0)), 'plc');
  tag('PROFIBUS DP', pbPath.getPointAt(0.74).add(V(0, 0.3, 0)), 'pb');
  tag('MODBUS TCP', drivePath.getPointAt(0.72).add(V(0, 0.3, 0)), 'eth');
  tag('VFD-201', vfd.localToWorld(V(0, 1.75, 0)));
  tag('M-201', fanMotor.localToWorld(V(0, 1.0, 0)));
  devices.forEach(d => tag(d.tag, d.label));
  tag('', world(plc2, V(routerX + 0.55, routerY + 0.95, 0)), 'ot keep', 'tagRouter');
  tag('', vpnPath.getPointAt(0.45).add(V(-0.7, 0, 0.3)), 'ot vpn', 'tagVpn');
  tag('', V(CLOUD.x, CLOUD.y + 1.35, CLOUD.z), 'ot', 'tagCloud');
  tag('', V(RACK.x, 2.55, RACK.z), 'ot', 'tagServer');
  tag('', V(DESK.x, 1.95, DESK.z), 'ot', 'tagRemote');

  // Camera views: field level and cloud / remote access
  const views = {
    field: { target: V(-1.1, 0.9, 0.2), az: 0.62, polar: 1.05, scale: 1, sway: 0.55 },
    ot: { target: V(-7.6, 3.0, -6.0), az: 0.4, polar: 1.02, scale: 0.72, sway: 0.8 },
  };
  let view = 'field';
  const dirOf = v => V(Math.sin(v.az) * Math.sin(v.polar), Math.cos(v.polar), Math.cos(v.az) * Math.sin(v.polar));
  const baseDist = () => Math.min(40, Math.max(21, 33 / camera.aspect));

  // Orbit controls: drag to rotate, no zoom/pan so the page keeps scrolling
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.copy(views.field.target);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.enablePan = false;
  controls.enableZoom = false;
  controls.minPolarAngle = 0.55;
  controls.maxPolarAngle = 1.38;
  controls.autoRotate = !reduce;
  controls.autoRotateSpeed = 0.6;
  renderer.domElement.style.touchAction = 'pan-y';
  let resume = 0;
  const resumeLater = ms => { clearTimeout(resume); if (!reduce) resume = setTimeout(() => { controls.autoRotate = true; }, ms); };
  controls.addEventListener('start', () => {
    controls.autoRotate = false;
    clearTimeout(resume);
    host.classList.add('touched');
  });
  controls.addEventListener('end', () => resumeLater(6000));

  // Fly between the two views
  let tween = null;
  function goTo(name, instant = false) {
    if (!views[name]) return;
    view = name;
    otTarget = name === 'ot' ? 1 : 0;
    fieldTarget = 1 - otTarget;
    const v = views[name];
    const toP = v.target.clone().add(dirOf(v).multiplyScalar(baseDist() * v.scale));
    if (instant || reduce) {
      controls.target.copy(v.target);
      camera.position.copy(toP);
      if (reduce) { otLevel = otTarget; fieldLevel = fieldTarget; applyFieldFade(); }
      return;
    }
    tween = { start: clock.elapsedTime, dur: 1.8, fromT: controls.target.clone(), toT: v.target.clone(), fromP: camera.position.clone(), toP };
    controls.enabled = false;
    controls.autoRotate = false;
    clearTimeout(resume);
  }
  host.addEventListener('commview', e => goTo(e.detail));

  function resize() {
    const w = host.clientWidth, h = host.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h);
    labels.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    if (tween) return;
    const dist = baseDist() * views[view].scale;
    const offset = camera.position.clone().sub(controls.target);
    camera.position.copy(controls.target).add((offset.lengthSq() ? offset.normalize() : dirOf(views[view])).multiplyScalar(dist));
  }
  const clock = new THREE.Clock();
  camera.aspect = (host.clientWidth || 1) / (host.clientHeight || 1);
  goTo(host.dataset.view === 'ot' ? 'ot' : 'field', true);
  resize();
  new ResizeObserver(resize).observe(host);

  // Render loop, only while the card is on screen
  let visible = false, running = false, lastHz = -1;
  const card = host.closest('.wide');
  const idle = () => card && cardIdle(card);
  function frame() {
    if (!visible || document.hidden || idle()) { running = false; return; }
    requestAnimationFrame(frame);
    const dt = Math.min(clock.getDelta(), 0.05);
    const t = clock.elapsedTime;

    if (tween) {
      const k = Math.min(1, (t - tween.start) / tween.dur);
      const e = k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
      controls.target.lerpVectors(tween.fromT, tween.toT, e);
      camera.position.lerpVectors(tween.fromP, tween.toP, e);
      camera.position.y += Math.sin(Math.PI * e) * 2.5;
      if (k >= 1) { tween = null; controls.enabled = true; resumeLater(2500); }
    }

    if (otLevel !== otTarget) {
      otLevel += Math.sign(otTarget - otLevel) * Math.min(Math.abs(otTarget - otLevel), dt * 1.6);
      otMats.forEach(m => { m.opacity = m.userData.baseOpacity * otLevel; });
    }
    ot.visible = otLevel > 0.01;
    if (fieldLevel !== fieldTarget) {
      fieldLevel += Math.sign(fieldTarget - fieldLevel) * Math.min(Math.abs(fieldTarget - fieldLevel), dt * 1.6);
      applyFieldFade();
    }

    if (!reduce) {
      cables.forEach(c => c.packets.forEach(p => {
        const u = (t * c.speed + p.offset) % 1;
        c.path.getPointAt(p.rev ? 1 - u : u, p.mesh.position);
      }));
      dashTex.offset.x -= dt * 0.8;
      const level = 1.05 + 0.3 * Math.sin(t * 0.3);
      liquid.scale.y = level;
      liquid.position.y = 0.37 + level / 2;
      profibusMat.emissiveIntensity = 0.45 + 0.2 * Math.sin(t * 4);
      fan.rotation.z -= dt * hzNow * 0.35;
      if (Math.floor(t) !== lastHz) { lastHz = Math.floor(t); drawHz(42 + 3 * Math.sin(t * 0.25) + Math.random() * 0.4); }
      leds.forEach(l => {
        if (l.fixed || t < l.next) return;
        l.next = t + 0.12 + Math.random() * 0.5;
        l.mat.color.copy(Math.random() > 0.45 ? l.on : l.off);
      });
    }
    if (controls.autoRotate) {
      // sway across the front of the current view instead of spinning to the back
      const { az: c, sway } = views[view], az = controls.getAzimuthalAngle();
      if (az > c + sway) controls.autoRotateSpeed = 0.6;
      else if (az < c - sway) controls.autoRotateSpeed = -0.6;
    }
    controls.update(dt);
    renderer.render(scene, camera);
    labels.render(scene, camera);
  }
  function start() {
    if (running || !visible || document.hidden || idle()) return;
    running = true;
    clock.getDelta();
    requestAnimationFrame(frame);
  }
  new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting;
    start();
  }).observe(host);
  document.addEventListener('visibilitychange', start);
  if (card) card.addEventListener('wake', start);

  controls.update();
  renderer.render(scene, camera);
  labels.render(scene, camera);
  host.classList.add('ready');
}
