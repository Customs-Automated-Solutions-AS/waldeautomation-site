// 3D close-up for "Varmeovervåking av el-tavler": one switchboard (1 m deep, see-through door),
// two solutions picked with the buttons (stepped through automatically until someone clicks or drags):
//  ir  – a generic IR sensor on the inside of the door that sees the breakers as a thermal image,
//        with one measurement box per critical breaker
//  tag – a small wireless sensor on every circuit, reporting by radio to a gateway on the
//        bottom rail
// In each view several connections warm up at different rates: early warning at 45 °C, alarm at 60 °C.
// The alert goes from the modem/router out to the chosen channels (Modbus TCP, EtherNet/IP, SMS,
// email, PC log). Dragging turns the view a little (never all the way round) to look inside.
// Loaded lazily, like the communication model above.
const heatHost = document.getElementById('heat3d');
if (heatHost && 'IntersectionObserver' in window) {
  const loader = new IntersectionObserver(entries => {
    if (!entries.some(e => e.isIntersecting)) return;
    loader.disconnect();
    initHeat3d(heatHost).catch(() => {});
  }, { rootMargin: '400px 0px' });
  loader.observe(heatHost);
}

async function initHeat3d(host) {
  const THREE = await import('three');
  const { CSS2DRenderer, CSS2DObject } = await import('three/addons/renderers/CSS2DRenderer.js');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const V = (x, y, z) => new THREE.Vector3(x, y, z);
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const t9n = key => (typeof COPY !== 'undefined' && typeof currentLang !== 'undefined' && COPY[currentLang][key]) || key;
  const lang = () => (typeof currentLang !== 'undefined' ? currentLang : 'no');

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
  const FOV = 30;
  const camera = new THREE.PerspectiveCamera(FOV, 1, 0.05, 80);
  scene.add(new THREE.HemisphereLight(0xe6efe9, 0x0b100d, 1.6));
  const sun = new THREE.DirectionalLight(0xffffff, 2.3);
  sun.position.set(3, 8, 7);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  Object.assign(sun.shadow.camera, { left: -4, right: 4, top: 4, bottom: -4, near: 1, far: 25 });
  sun.shadow.bias = -0.0005;
  sun.shadow.normalBias = 0.02;
  scene.add(sun);
  const fillLight = new THREE.DirectionalLight(0xdfe9e3, 0.9);
  fillLight.position.set(-2, 2, 6);
  scene.add(fillLight);

  // Materials
  const std = (color, metalness, roughness, extra = {}) =>
    new THREE.MeshStandardMaterial({ color, metalness, roughness, ...extra });
  const M = {
    cabinet: std(0xcfd5da, 0.25, 0.55),
    plinth: std(0x3a4148, 0.3, 0.6),
    plate: std(0xb4bcc3, 0.55, 0.45),
    rail: std(0x8d969e, 0.8, 0.3),
    duct: std(0x9aa3ab, 0.1, 0.7),
    mcb: std(0xeceff1, 0.05, 0.55),
    toggle: std(0x2a3036, 0.2, 0.5),
    screw: std(0x8d969e, 0.8, 0.35),
    wire: std(0x2f5f8f, 0.1, 0.6),
    copper: std(0xc8773a, 0.85, 0.3),
    post: std(0x3a4148, 0.2, 0.6),
    main: std(0x2c3238, 0.2, 0.6),
    handle: std(0xd23b2f, 0.1, 0.5),
    sensor: std(0x23272b, 0.35, 0.5),
    tagBody: std(0xf2f4f3, 0.05, 0.5),
    brand: std(0x3dcd58, 0.1, 0.45),
    lens: std(0x050607, 0.9, 0.12),
    window: std(0x1c2024, 0.3, 0.3),
    steel: std(0xb4bcc3, 0.7, 0.3),
    device: std(0x2a3036, 0.3, 0.5),
    glass: std(0xd8ecf5, 0.1, 0.1, { transparent: true, opacity: 0.06, depthWrite: false }),
    sensorCable: std(0x55606a, 0.1, 0.6),
    ethernet: std(0x3fa9e0, 0.1, 0.4, { emissive: 0x1b6e99, emissiveIntensity: 0.45 }),
  };
  const mesh = (geo, mat) => { const m = new THREE.Mesh(geo, mat); m.castShadow = true; m.receiveShadow = true; return m; };
  const flat = (geo, mat) => new THREE.Mesh(geo, mat);
  const box = (w, h, d, mat) => mesh(new THREE.BoxGeometry(w, h, d), mat);
  const cyl = (r, h, mat, axis = 'y', seg = 24) => {
    const m = mesh(new THREE.CylinderGeometry(r, r, h, seg), mat);
    if (axis === 'x') m.rotation.z = Math.PI / 2;
    if (axis === 'z') m.rotation.x = Math.PI / 2;
    return m;
  };
  const at = (obj, x, y, z) => { obj.position.set(x, y, z); return obj; };
  const canvasTex = (w, h) => {
    const c = document.createElement('canvas');
    c.width = w; c.height = h;
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return { c, ctx: c.getContext('2d'), tex };
  };
  // Tubes that follow a polyline with rounded corners
  function roundedPath(raw, r = 0.04) {
    const pts = raw.filter((p, i) => i === 0 || p.distanceTo(raw[i - 1]) > 1e-4);
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
  const smooth = pts => new THREE.CatmullRomCurve3(pts, false, 'centripetal');

  // Floor: faded grid plus a shadow catcher
  const gridT = canvasTex(1024, 1024), g = gridT.ctx;
  g.strokeStyle = 'rgba(160,190,172,0.4)';
  g.lineWidth = 1.5;
  for (let i = 0; i <= 1024; i += 48) {
    g.beginPath(); g.moveTo(i, 0); g.lineTo(i, 1024); g.stroke();
    g.beginPath(); g.moveTo(0, i); g.lineTo(1024, i); g.stroke();
  }
  g.globalCompositeOperation = 'destination-in';
  const fade = g.createRadialGradient(512, 512, 100, 512, 512, 512);
  fade.addColorStop(0, 'rgba(0,0,0,1)');
  fade.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = fade;
  g.fillRect(0, 0, 1024, 1024);
  const grid = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), new THREE.MeshBasicMaterial({ map: gridT.tex, transparent: true, depthWrite: false }));
  grid.rotation.x = -Math.PI / 2;
  grid.position.set(0.3, 0.002, 0);
  scene.add(grid);
  const shadowFloor = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), new THREE.ShadowMaterial({ opacity: 0.35 }));
  shadowFloor.rotation.x = -Math.PI / 2;
  shadowFloor.position.set(0.3, 0, 0);
  shadowFloor.receiveShadow = true;
  scene.add(shadowFloor);

  // Status LEDs (blinking unless fixed)
  const leds = [];
  const led = (color, x, y, z, parent, fixed = false) => {
    const m = at(new THREE.Mesh(new THREE.BoxGeometry(0.022, 0.022, 0.01), new THREE.MeshBasicMaterial({ color: 0x1d2a22, toneMapped: false })), x, y, z);
    parent.add(m);
    const l = { m, on: new THREE.Color(color), off: new THREE.Color(0x1d2a22), next: 0, fixed };
    if (fixed) m.material.color.copy(l.on);
    leds.push(l);
    return l;
  };

  // Objects that belong to one solution fade in and out with the view
  const layers = { ir: new THREE.Group(), tag: new THREE.Group() };
  Object.values(layers).forEach(grp => scene.add(grp));

  // The switchboard: busbars, main switch and three rows of breakers, door shown see-through
  const CW = 1.4, CH = 2.0, CD = 1.0, BASE = 0.1, T = 0.04, TOP = BASE + CH;
  const plateZ = -CD / 2 + 0.07, railZ = plateZ + 0.02, MCB_D = 0.16, frontZ = railZ + 0.02 + MCB_D;
  const DOOR_Z = CD / 2, IMG_Z = frontZ + 0.04;
  const ROWS = [1.36, 0.96, 0.56], PER_ROW = 12, PITCH = 0.085;
  const mcbX = i => -((PER_ROW - 1) * PITCH) / 2 + i * PITCH;
  const BARS = [1.70, 1.78, 1.86];
  scene.add(at(box(CW, BASE, CD, M.plinth), 0, BASE / 2, 0));
  scene.add(at(box(CW, CH, T, M.cabinet), 0, BASE + CH / 2, -CD / 2 + T / 2));
  [-1, 1].forEach(s => scene.add(at(box(T, CH, CD, M.cabinet), s * (CW / 2 - T / 2), BASE + CH / 2, 0)));
  scene.add(at(box(CW, T, CD, M.cabinet), 0, TOP - T / 2, 0));
  scene.add(at(box(CW, T, CD, M.cabinet), 0, BASE + T / 2, 0));
  scene.add(at(box(CW - 0.2, CH - 0.16, 0.02, M.plate), 0, BASE + CH / 2, plateZ - 0.01));
  BARS.forEach(y => scene.add(at(box(0.8, 0.025, 0.012, M.copper), 0.12, y, plateZ + 0.08)));
  [-0.3, 0.54].forEach(x => scene.add(at(box(0.05, 0.24, 0.07, M.post), x, 1.78, plateZ + 0.035)));
  scene.add(at(box(0.18, 0.26, 0.14, M.main), -0.46, 1.78, plateZ + 0.07));
  scene.add(at(box(0.05, 0.1, 0.05, M.handle), -0.46, 1.78, plateZ + 0.165));
  ROWS.forEach(y => scene.add(at(box(1.1, 0.035, 0.04, M.rail), 0, y, railZ)));
  [...ROWS.map(y => y + 0.2), ROWS[2] - 0.2].forEach(y => scene.add(at(box(1.15, 0.1, 0.1, M.duct), 0, y, plateZ + 0.05)));
  scene.add(at(flat(new THREE.BoxGeometry(CW, CH, 0.02), M.glass), 0, BASE + CH / 2, DOOR_Z + 0.01));
  scene.add(at(new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(CW, CH, 0.02)),
    new THREE.LineBasicMaterial({ color: 0xcfd5da, transparent: true, opacity: 0.45 })), 0, BASE + CH / 2, DOOR_Z + 0.01));
  scene.add(at(box(0.03, 0.18, 0.03, M.post), CW / 2 - 0.08, 1.1, DOOR_Z + 0.035));

  // Connections that warm up: several per solution, each at its own pace and peak
  // (rows count from the top; Q numbers run left to right, row by row)
  const FAULTS = {
    ir: [
      { row: 0, i: 7, q: 'Q8', peak: 53, delay: 0 },
      { row: 0, i: 9, q: 'Q10', peak: 74, delay: 1.4 },
    ],
    tag: [
      { row: 0, i: 10, q: 'Q11', peak: 52, delay: 0 },
      { row: 1, i: 4, q: 'Q17', peak: 74, delay: 1.2 },
      { row: 2, i: 2, q: 'Q27', peak: 57, delay: 2.6 },
    ],
  };
  const allFaults = [...FAULTS.ir, ...FAULTS.tag];
  const isFault = (r, i) => allFaults.some(f => f.row === r && f.i === i);

  // Breakers and their outgoing wires as instanced meshes (the gateway takes the last three
  // places on the bottom rail)
  const spots = [];
  ROWS.forEach((y, r) => { for (let i = 0; i < PER_ROW; i++) if (!(r === 2 && i >= 9)) spots.push({ x: mcbX(i), y, r, i }); });
  const mtx = new THREE.Matrix4();
  const inst = (geo, mat, n) => { const m = new THREE.InstancedMesh(geo, mat, n); m.castShadow = true; m.receiveShadow = true; scene.add(m); return m; };
  const bodies = inst(new THREE.BoxGeometry(0.078, 0.2, MCB_D), M.mcb, spots.length);
  const toggles = inst(new THREE.BoxGeometry(0.026, 0.05, 0.03), M.toggle, spots.length);
  const screws = inst(new THREE.BoxGeometry(0.05, 0.018, 0.01), M.screw, spots.length * 2);
  const wired = spots.filter(p => !isFault(p.r, p.i));
  const wires = inst(new THREE.BoxGeometry(0.016, 0.07, 0.016), M.wire, wired.length);
  spots.forEach((p, k) => {
    bodies.setMatrixAt(k, mtx.makeTranslation(p.x, p.y, railZ + 0.02 + MCB_D / 2));
    toggles.setMatrixAt(k, mtx.makeTranslation(p.x, p.y + 0.01, frontZ + 0.015));
    screws.setMatrixAt(2 * k, mtx.makeTranslation(p.x, p.y + 0.08, frontZ + 0.005));
    screws.setMatrixAt(2 * k + 1, mtx.makeTranslation(p.x, p.y - 0.08, frontZ + 0.005));
  });
  wired.forEach((p, k) => wires.setMatrixAt(k, mtx.makeTranslation(p.x, p.y + 0.125, frontZ - 0.03)));

  // Each fault: glowing screw, a cable that heats up, and an additive glow
  const glowT = canvasTex(64, 64);
  const gg = glowT.ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gg.addColorStop(0, 'rgba(255,255,255,1)');
  gg.addColorStop(0.35, 'rgba(255,255,255,0.45)');
  gg.addColorStop(1, 'rgba(255,255,255,0)');
  glowT.ctx.fillStyle = gg;
  glowT.ctx.fillRect(0, 0, 64, 64);
  const warmColor = new THREE.Color(0xffc04d), hotColor = new THREE.Color(0xff3b2f);
  const LIMIT = 60, WARN = 45, COOL = 34, PEAK = 74;
  allFaults.forEach(f => {
    f.pos = V(mcbX(f.i), ROWS[f.row] + 0.08, frontZ + 0.008);
    f.screwMat = std(0x8d969e, 0.6, 0.4, { emissive: 0xff3b1f, emissiveIntensity: 0 });
    f.cableMat = std(0x2f5f8f, 0.1, 0.6, { emissive: 0xff4a1f, emissiveIntensity: 0 });
    scene.add(at(box(0.052, 0.02, 0.012, f.screwMat), f.pos.x, f.pos.y, frontZ + 0.006));
    scene.add(at(box(0.02, 0.07, 0.02, f.cableMat), f.pos.x, ROWS[f.row] + 0.125, frontZ - 0.03));
    f.glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowT.tex, color: warmColor, blending: THREE.AdditiveBlending, transparent: true, depthWrite: false, toneMapped: false }));
    f.glow.position.set(f.pos.x, f.pos.y + 0.02, frontZ + 0.03);
    scene.add(f.glow);
    f.temp = COOL;
  });
  const stageOf = temp => (temp >= LIMIT ? 2 : temp >= WARN ? 1 : 0);
  const STAGE_COL = ['#ffffff', '#f2c14e', '#ff5a4f'];

  // Temperature field of the board (used by the thermal image)
  const staticT = (x, y) => {
    let v = 25;
    if (x > -0.3 && x < 0.54) BARS.forEach(b => { v += 8 * Math.exp(-((y - b) ** 2) / 0.0004); });
    if (Math.abs(x + 0.46) < 0.09 && Math.abs(y - 1.78) < 0.13) v += 4;
    ROWS.forEach((ry, r) => {
      const xMax = r === 2 ? mcbX(8) + 0.04 : 0.51;
      if (x < -0.51 || x > xMax) return;
      v += 5 * Math.exp(-((y - ry - 0.08) ** 2) / 0.0006) * (0.55 + 0.45 * Math.abs(Math.sin(x * 37)));
      v += 2.5 * Math.exp(-((y - ry) ** 2) / 0.006);
    });
    if (x > mcbX(9) - 0.04 && x < mcbX(11) + 0.04 && Math.abs(y - ROWS[2]) < 0.11) v += 5;
    return v;
  };
  // How much a fault's heat reaches a point (terminal plus the cable above it)
  const faultWeight = (f, x, y) => {
    const dy = y < f.pos.y ? y - f.pos.y : y > f.pos.y + 0.08 ? y - f.pos.y - 0.08 : 0;
    return Math.exp(-((x - f.pos.x) ** 2 + dy * dy) / 0.0018);
  };
  // Iron-style palette (dark blue, purple, red, orange, yellow, white)
  const stops = [[0, [11, 11, 46]], [0.22, [59, 15, 112]], [0.42, [140, 41, 129]], [0.6, [222, 73, 104]], [0.78, [254, 159, 109]], [1, [252, 253, 191]]];
  const LUT = [];
  for (let i = 0; i < 256; i++) {
    const k = i / 255;
    let j = 0;
    while (j < stops.length - 2 && k > stops[j + 1][0]) j++;
    const [k0, c0] = stops[j], [k1, c1] = stops[j + 1], f = (k - k0) / (k1 - k0);
    LUT.push(`rgb(${c0.map((v, n) => Math.round(v + (c1[n] - v) * f)).join(',')})`);
  }
  const colour = v => LUT[clamp(Math.round((v - 24) / 48 * 255), 0, 255)];
  const pixelTex = (w, h) => {
    const t = canvasTex(w, h);
    t.tex.magFilter = THREE.NearestFilter;
    t.tex.minFilter = THREE.LinearFilter;
    t.tex.generateMipmaps = false;
    return t;
  };
  const cellTemp = (c, faults) => faults.reduce((v, f, k) => v + (f.temp - COOL) * c.w[k], c.base);

  // ---- Solution 1: an IR sensor on the inside of the door, pointing straight in ----
  const irL = layers.ir;
  // A small dark sensor housing with one IR lens, a status LED and a cable out at the bottom
  // (front towards local +z)
  const IR_LENS = V(0, 0.012, 0.017);
  function buildIR() {
    const g = new THREE.Group();
    g.add(box(0.056, 0.08, 0.025, M.sensor));
    g.add(at(box(0.046, 0.046, 0.003, M.window), 0, 0.012, 0.0138));
    g.add(at(cyl(0.011, 0.004, M.steel, 'z'), 0, 0.012, 0.015));
    g.add(at(cyl(0.008, 0.005, M.lens, 'z'), 0, 0.012, 0.016));
    g.add(at(box(0.006, 0.004, 0.002, M.brand), 0.016, -0.026, 0.0135));
    g.add(at(cyl(0.0045, 0.012, M.post, 'y', 16), 0, -0.046, 0));
    return g;
  }
  // Mounted flat on a bracket on the door (drawn 1.4× life size so it reads), aimed straight at the
  // plate so its image is a true rectangle. About 60 cm away, its 48° × 37° view covers roughly
  // 52 × 39 cm. From the front of the cabinet you see its back; the enlarged copy shows its face.
  const IRS = 1.4;
  const camAim = V(0.15, 1.5, IMG_Z);
  const irs = buildIR();
  irs.scale.setScalar(IRS);
  irs.position.set(camAim.x, camAim.y - IR_LENS.y * IRS, DOOR_Z - 0.012 - 0.0125 * IRS);
  irL.add(irs);
  irs.lookAt(V(irs.position.x, irs.position.y, IMG_Z));
  irL.add(at(box(0.09, 0.14, 0.012, M.steel), irs.position.x, irs.position.y, DOOR_Z - 0.006));
  scene.updateMatrixWorld(true);
  const camLens = irs.localToWorld(IR_LENS.clone());
  const camPos = irs.position.clone();

  // Enlarged copy beside the cabinet, turned towards the viewer, with a leader line to the real one
  const irBig = new THREE.Group();
  irL.add(irBig);
  const irShow = buildIR();
  irShow.scale.setScalar(4.2);
  irShow.position.set(-1.12, 1.62, 0.6);
  irShow.rotation.y = 0.34;
  irBig.add(irShow);
  const leader = (from, to) => {
    const l = new THREE.Line(new THREE.BufferGeometry().setFromPoints([from, to]),
      new THREE.LineDashedMaterial({ color: 0xcfd5da, dashSize: 0.03, gapSize: 0.025, transparent: true, opacity: 0.7 }));
    l.computeLineDistances();
    return l;
  };
  irBig.add(leader(V(-0.98, 1.62, 0.6), camPos.clone().add(V(-0.05, 0, 0))));

  // Projection of its 48° × 37° view onto the breakers (80 × 60 pixels)
  const fwd = camAim.clone().sub(camLens).normalize();
  const right = fwd.clone().cross(V(0, 1, 0)).normalize(), up = right.clone().cross(fwd);
  const TX = Math.tan(THREE.MathUtils.degToRad(24)), TY = Math.tan(THREE.MathUtils.degToRad(18.5));
  const hit = (xn, yn) => {
    const d = fwd.clone().addScaledVector(right, xn * TX).addScaledVector(up, yn * TY);
    return camLens.clone().addScaledVector(d, (IMG_Z - camLens.z) / d.z);
  };
  const toImg = p => {
    const v = p.clone().sub(camLens), z = v.dot(fwd);
    return [v.dot(right) / z / TX, v.dot(up) / z / TY];
  };
  const corners = [hit(-1, -1), hit(1, -1), hit(1, 1), hit(-1, 1)];
  const segs = [], faces = [];
  corners.forEach((c, i) => { const nx = corners[(i + 1) % 4]; segs.push(camLens, c, c, nx); faces.push(camLens, c, nx); });
  irL.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(segs),
    new THREE.LineBasicMaterial({ color: 0xffa552, transparent: true, opacity: 0.45, toneMapped: false })));
  irL.add(flat(new THREE.BufferGeometry().setFromPoints(faces),
    new THREE.MeshBasicMaterial({ color: 0xffa552, transparent: true, opacity: 0.06, side: THREE.DoubleSide, depthWrite: false, toneMapped: false })));

  const AW = 80, AH = 60, AC = 4;
  const irImg = pixelTex(AW * AC, AH * AC), ic = irImg.ctx;
  const irCells = [];
  for (let py = 0; py < AH; py++) for (let px = 0; px < AW; px++) {
    const w = hit((px + 0.5) / AW * 2 - 1, 1 - (py + 0.5) / AH * 2);
    irCells.push({ X: px * AC, Y: py * AC, base: staticT(w.x, w.y), w: FAULTS.ir.map(f => faultWeight(f, w.x, w.y)) });
  }
  // One measurement box per watched breaker, in image pixels
  const toPx = (x, y) => { const [xn, yn] = toImg(V(x, y, IMG_Z)); return [(xn + 1) / 2 * AW * AC, (1 - yn) / 2 * AH * AC]; };
  FAULTS.ir.forEach(f => {
    const [x0, y0] = toPx(f.pos.x - 0.038, f.pos.y + 0.09), [x1, y1] = toPx(f.pos.x + 0.038, f.pos.y - 0.05);
    f.box = [x0, y0, x1 - x0, y1 - y0];
  });
  function drawIr() {
    const faults = FAULTS.ir;
    irCells.forEach(c => { ic.fillStyle = colour(cellTemp(c, faults)); ic.fillRect(c.X, c.Y, AC, AC); });
    ic.font = '600 13px ui-monospace, monospace';
    ic.textBaseline = 'middle';
    faults.forEach((f, k) => {
      const st = stageOf(f.temp), [x, y, w, h] = f.box;
      ic.lineWidth = 3;
      ic.strokeStyle = STAGE_COL[st];
      ic.strokeRect(x, y, w, h);
      const label = `Bx${k + 1} ${f.temp.toFixed(1)}`;
      const lw = ic.measureText(label).width + 8, lx = clamp(x + w / 2 - lw / 2, 0, AW * AC - lw), ly = y + 3;
      ic.fillStyle = st === 2 ? 'rgba(200,40,30,0.92)' : st === 1 ? 'rgba(170,120,10,0.92)' : 'rgba(0,0,0,0.6)';
      ic.fillRect(lx, ly, lw, 17);
      ic.fillStyle = '#fff';
      ic.fillText(label, lx + 4, ly + 9);
    });
    irImg.tex.needsUpdate = true;
  }
  // The image laid onto the breakers as a fine grid, so the perspective stays correct
  const GX = 20, GY = 15, pos = [], uv = [], idx = [];
  for (let j = 0; j <= GY; j++) for (let i = 0; i <= GX; i++) {
    const xn = i / GX * 2 - 1, yn = j / GY * 2 - 1, w = hit(xn, yn);
    pos.push(w.x, w.y, w.z);
    uv.push(i / GX, j / GY);
  }
  for (let j = 0; j < GY; j++) for (let i = 0; i < GX; i++) {
    const a = j * (GX + 1) + i, b = a + 1, c = a + GX + 1, d = c + 1;
    idx.push(a, b, d, a, d, c);
  }
  const irGeo = new THREE.BufferGeometry();
  irGeo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  irGeo.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  irGeo.setIndex(idx);
  irL.add(flat(irGeo, new THREE.MeshBasicMaterial({ map: irImg.tex, transparent: true, opacity: 0.72, depthWrite: false, side: THREE.DoubleSide, toneMapped: false })));

  // ---- Solution 2: a small wireless sensor on every circuit ----
  // Each sensor sits on the outgoing cable just above its breaker and measures right where the heat
  // builds up. They all report by radio to one gateway on the bottom rail, which has Ethernet to
  // the switch.
  const tL = layers.tag;
  const TAG_Y = 0.135, TAG_Z = frontZ - 0.012;
  function buildTag() {
    const g = new THREE.Group();
    g.add(box(0.064, 0.05, 0.03, M.tagBody));
    g.add(at(box(0.064, 0.008, 0.031, M.brand), 0, 0.017, 0));
    g.add(at(box(0.008, 0.008, 0.002, M.brand), -0.02, -0.006, 0.0155));
    return g;
  }
  const tagBodies = new THREE.InstancedMesh(new THREE.BoxGeometry(0.064, 0.05, 0.03), M.tagBody, spots.length);
  const tagStripes = new THREE.InstancedMesh(new THREE.BoxGeometry(0.064, 0.008, 0.031), M.brand, spots.length);
  [tagBodies, tagStripes].forEach(m => { m.castShadow = m.receiveShadow = true; tL.add(m); });
  spots.forEach((p, k) => {
    tagBodies.setMatrixAt(k, mtx.makeTranslation(p.x, p.y + TAG_Y, TAG_Z));
    tagStripes.setMatrixAt(k, mtx.makeTranslation(p.x, p.y + TAG_Y + 0.017, TAG_Z));
  });

  // Gateway on the bottom rail (where the last three breakers would be), with a small display
  const CX = mcbX(10), CY = ROWS[2];
  tL.add(at(box(0.24, 0.22, 0.16, M.tagBody), CX, CY, railZ + 0.1));
  tL.add(at(box(0.24, 0.016, 0.161, M.brand), CX, CY + 0.095, railZ + 0.1));
  tL.add(at(cyl(0.006, 0.07, M.device, 'y', 10), CX + 0.09, CY + 0.145, railZ + 0.12));
  const lcd = canvasTex(128, 56);
  tL.add(at(flat(new THREE.PlaneGeometry(0.17, 0.075), new THREE.MeshBasicMaterial({ map: lcd.tex, toneMapped: false })), CX, CY + 0.03, frontZ + 0.002));
  led(0x62e08e, CX - 0.07, CY - 0.055, frontZ + 0.004, tL, true);
  led(0x62e08e, CX - 0.035, CY - 0.055, frontZ + 0.004, tL);
  const alarmLed = led(0xff4b3e, CX, CY - 0.055, frontZ + 0.004, tL, true);
  function drawLcd(temp) {
    const st = stageOf(temp), l = lcd.ctx;
    l.fillStyle = ['#0d1a12', '#2e2408', '#3a0d0a'][st]; l.fillRect(0, 0, 128, 56);
    l.fillStyle = ['#9be0b0', '#f2c14e', '#ff8a7d'][st];
    l.font = 'bold 30px ui-monospace, monospace'; l.textAlign = 'center'; l.textBaseline = 'middle';
    l.fillText(`${Math.round(temp)}°C`, 64, 30);
    lcd.tex.needsUpdate = true;
  }
  const GW = V(CX + 0.09, CY + 0.18, railZ + 0.12);

  // Radio links: a faint dashed arc from each warming sensor to the gateway antenna
  const radioMat = new THREE.LineDashedMaterial({ color: 0x62c27f, dashSize: 0.02, gapSize: 0.018, transparent: true, opacity: 0.55, toneMapped: false });
  FAULTS.tag.forEach(f => {
    const a = V(f.pos.x, ROWS[f.row] + TAG_Y + 0.03, TAG_Z + 0.02);
    const mid = a.clone().lerp(GW, 0.5).add(V(0, 0.12, 0.32));
    f.radio = new THREE.QuadraticBezierCurve3(a, mid, GW);
    const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(f.radio.getPoints(48)), radioMat);
    line.computeLineDistances();
    tL.add(line);
  });
  // Expanding rings: one on the gateway antenna, one on each sensor that has something to report
  const ringGeo = new THREE.RingGeometry(0.82, 1, 40);
  const pulses = [];
  const pulse = (p, phase, f = null) => {
    const m = flat(ringGeo, new THREE.MeshBasicMaterial({ color: 0x62c27f, transparent: true, opacity: 0, depthWrite: false, side: THREE.DoubleSide, toneMapped: false }));
    m.position.copy(p);
    scene.add(m);
    pulses.push({ m, phase, f });
  };
  pulse(GW, 0);
  pulse(GW, 0.5);
  FAULTS.tag.forEach((f, k) => pulse(f.radio.v0, k * 0.3, f));

  // Enlarged sensor beside the cabinet, on a short piece of cable, with a leader line
  const tagBig = new THREE.Group();
  tL.add(tagBig);
  const tagShow = new THREE.Group();
  tagShow.add(buildTag());
  tagShow.add(cyl(0.008, 0.11, M.wire, 'y', 16));
  tagShow.scale.setScalar(4.2);
  tagShow.position.set(-1.12, 1.5, 0.6);
  tagShow.rotation.y = -0.3;
  tagBig.add(tagShow);
  tagBig.add(leader(V(-1.0, 1.5, 0.6), V(mcbX(0) - 0.04, ROWS[0] + TAG_Y, TAG_Z + 0.02)));

  // ---- Network: an industrial switch (W4S1 style) and a 4G modem/router on the roof ----
  // Sensor/gateway -> switch over Ethernet; from the switch to PLC/monitoring and PC; from the modem out as
  // SMS and email.
  const SWX = -0.22, SWY = TOP + 0.03;
  scene.add(at(box(0.22, 0.06, 0.14, M.device), SWX, SWY, 0));
  for (let k = 0; k < 5; k++) {
    scene.add(at(box(0.026, 0.022, 0.006, M.window), SWX - 0.08 + k * 0.04, SWY - 0.004, 0.071));
    led(0x62e08e, SWX - 0.08 + k * 0.04, SWY + 0.018, 0.071, scene);
  }
  const RX = 0.35, RY = TOP + 0.035;
  scene.add(at(box(0.3, 0.07, 0.2, M.device), RX, RY, 0));
  [-0.11, 0.11].forEach(dx => scene.add(at(cyl(0.01, 0.34, M.device, 'y', 8), RX + dx, RY + 0.2, -0.06)));
  [-0.09, -0.05, -0.01].forEach(dx => led(0x62e08e, RX + dx, RY, 0.102, scene));

  const packets = [];
  const packet = (path, offset, view, speed) => {
    const m = flat(new THREE.SphereGeometry(0.02, 12, 12), new THREE.MeshBasicMaterial({ color: 0xff6b5a, toneMapped: false }));
    m.visible = false;
    scene.add(m);
    packets.push({ m, path, offset, view, speed });
  };
  // IR sensor -> switch: one PoE Ethernet cable from the bottom of the sensor, along the door to the
  // hinge side and up over the roof
  const conn = irs.localToWorld(V(0, -0.052, 0));
  const hingeX = -CW / 2 + 0.08, dz = DOOR_Z - 0.012;
  const axPath = roundedPath([conn, V(conn.x, 1.3, conn.z), V(conn.x, 1.3, dz), V(hingeX, 1.3, dz), V(hingeX, TOP - 0.06, dz),
    V(hingeX, TOP + 0.03, DOOR_Z - 0.12), V(hingeX, TOP + 0.03, 0.04), V(SWX - 0.11, SWY, 0.04)], 0.06);
  irL.add(mesh(new THREE.TubeGeometry(axPath, 200, 0.009, 8, false), M.ethernet));
  // Gateway -> switch: Ethernet up the right-hand wall and across the roof behind the modem
  const ethX = CW / 2 - 0.06;
  const kPath = roundedPath([V(CX + 0.08, CY - 0.06, frontZ), V(CX + 0.08, CY - 0.06, frontZ + 0.03),
    V(ethX, CY - 0.06, frontZ + 0.03), V(ethX, SWY, frontZ + 0.03), V(SWX + 0.06, SWY, frontZ + 0.03), V(SWX + 0.06, SWY, -0.07)]);
  tL.add(mesh(new THREE.TubeGeometry(kPath, 200, 0.012, 8, false), M.ethernet));
  // Switch -> modem
  const swPath = roundedPath([V(SWX + 0.11, SWY, 0.03), V(RX - 0.15, RY, 0.03)]);
  scene.add(mesh(new THREE.TubeGeometry(swPath, 20, 0.01, 8, false), M.ethernet));
  [0, 0.5].forEach(o => packet(axPath, o, 'ir', 0.5));
  [0, 0.5].forEach(o => packet(kPath, o, 'tag', 0.5));
  FAULTS.tag.forEach(f => packet(f.radio, 0, 'tag', 0.7));
  packet(swPath, 0, 'any', 1.2);

  // Switch -> PLC/monitoring channels, modem -> SMS and email. Each has one cable over the roof to the
  // front right-hand corner, then a spine down with a short branch to each chip, so no lines cross
  // (animated dashes; packets while there is a warning or an alarm).
  const dashT = canvasTex(64, 4);
  dashT.ctx.fillStyle = '#fff'; dashT.ctx.fillRect(0, 0, 36, 4);
  dashT.tex.wrapS = THREE.RepeatWrapping;
  dashT.tex.repeat.set(8, 1);
  const CHIP_X = 0.98, CHIP_Z = 0.55;
  const SPINES = {
    sw: { color: 0x7cc8f0, x: 0.9, start: [V(SWX - 0.05, SWY, -0.07), V(SWX - 0.05, SWY + 0.05, -0.22), V(0.9, SWY + 0.05, -0.22)] },
    modem: { color: 0xb8f09a, x: 0.82, start: [V(RX + 0.15, RY, 0.04), V(0.82, RY, 0.04)] },
  };
  const CHANNELS = [
    { name: 'MODBUS TCP', y: 2.0, from: 'sw' },
    { name: 'ETHERNET/IP', y: 1.76, from: 'sw' },
    { name: 'SMS', y: 1.52, from: 'modem' },
    { key: 'heatChipMailName', y: 1.28, from: 'modem' },
  ];
  const dashMat = color => new THREE.MeshBasicMaterial({ color, alphaMap: dashT.tex, transparent: true, toneMapped: false });
  CHANNELS.forEach((ch, i) => {
    const sp = SPINES[ch.from], top = sp.start[sp.start.length - 1];
    ch.path = roundedPath([...sp.start, V(sp.x, top.y, CHIP_Z), V(sp.x, ch.y, CHIP_Z), V(CHIP_X, ch.y, CHIP_Z)], 0.05);
    scene.add(flat(new THREE.TubeGeometry(ch.path, 120, 0.008, 6, false), dashMat(sp.color)));
    packet(ch.path, i * 0.15, 'any', 0.6);
  });

  // Each layer gets its own copies of its materials so it can fade on its own
  const faders = Object.entries(layers).map(([name, grp]) => {
    const map = new Map();
    grp.traverse(o => {
      if (!o.material) return;
      if (!map.has(o.material)) {
        const c = o.material.clone();
        c.userData = { base: o.material.opacity, bt: o.material.transparent, bdw: o.material.depthWrite };
        map.set(o.material, c);
      }
      o.material = map.get(o.material);
    });
    return { name, grp, map, level: 1, target: 1 };
  });
  const applyFade = f => {
    const solid = f.level >= 0.999;
    f.map.forEach(m => {
      const transparent = !solid || m.userData.bt;
      if (m.transparent !== transparent) { m.transparent = transparent; m.needsUpdate = true; }
      m.depthWrite = solid ? m.userData.bdw : false;
      m.opacity = m.userData.base * f.level;
    });
    f.grp.visible = f.level > 0.01;
  };
  const levelOf = name => faders.find(f => f.name === name).level;

  // Labels (texts with a data-i18n key follow the language switch; data-v = views it shows in)
  const tag = (text, pos, cls, key, views) => {
    const el = document.createElement('div');
    el.className = 'tag3d ' + cls;
    el.textContent = key ? t9n(key) : text;
    if (key) el.dataset.i18n = key;
    el.dataset.v = views;
    const o = new CSS2DObject(el);
    o.position.copy(pos);
    scene.add(o);
    return el;
  };
  tag('', V(-1.12, 1.88, 0.6), 'cam call', 'heatCallIr', 'ir');
  tag('', V(-1.12, 1.78, 0.6), 'sens call', 'heatCallTag', 'tag');
  tag('', V(CX, CY - 0.23, frontZ + 0.1), 'sens', 'heatGateway', 'tag');
  tag('', V(RX, RY + 0.42, -0.06), '', 'heatRouter', 'ir tag');
  tag('', V(SWX, SWY + 0.12, 0.05), '', 'heatSwitch', 'ir tag');
  // Alternate heights so labels of neighbouring breakers do not overlap
  Object.entries(FAULTS).forEach(([name, list]) => list.forEach((f, k) => {
    f.tag = tag('', V(f.pos.x, f.pos.y + 0.13 + (k % 2) * 0.1, frontZ + 0.1), 'temp', null, name);
  }));
  CHANNELS.forEach(ch => { ch.el = tag('', V(CHIP_X, ch.y, CHIP_Z), 'chip', null, 'ir tag'); });
  function drawChips(st) {
    CHANNELS.forEach(ch => {
      ch.el.classList.toggle('warn', st === 1);
      ch.el.classList.toggle('hot', st === 2);
      ch.el.textContent = ch.key ? t9n(ch.key) : ch.name;
    });
  }

  // ---- The monitoring software: what the active solution reports ----
  // Drawn from the same temperatures as the 3D model.
  //  ir  – the thermal image. A configured measurement box is a thin dashed frame; when an area gets
  //        hot a solid frame with its class appears around it (yellow = early warning, red = alarm).
  //        A crosshair marks the hottest pixel.
  //  tag – one tile per circuit with its temperature, the gateway in the free slots, and a trend
  //        curve of the circuits that are warming up, with the warning and alarm limits.
  const app = host.parentElement.querySelector('.heat-app');
  const appCv = app && app.querySelector('canvas'), apc = appCv && appCv.getContext('2d');
  const appSrc = app && app.querySelector('.heat-app-src');
  const appScale = app && app.querySelector('.heat-scale');
  const STAGE_KEY = ['heatStOk', 'heatStWarn', 'heatStAlarm'];
  const STAGE_BG = ['rgba(0,0,0,0.6)', 'rgba(160,112,8,0.95)', 'rgba(196,38,28,0.95)'];
  const AX_S = 8;
  // Normal running temperature of each circuit (steady, a little different from circuit to circuit)
  spots.forEach((p, k) => {
    const n = Math.sin(k * 12.9898) * 43758.5453;
    p.base = 27.5 + (n - Math.floor(n)) * 4.5;
    p.fault = FAULTS.tag.find(f => f.row === p.r && f.i === p.i) || null;
  });
  // Trend history of the circuits that warm up: sampled 4 times a second, 30 s shown
  const HIST = 120;
  let hist = FAULTS.tag.map(() => []), histT = 0, histN = 0;
  let appKey = '';

  const label = (text, x, y, bg, W, H) => {
    apc.font = '600 14px ui-monospace, monospace';
    apc.textBaseline = 'middle';
    const w = apc.measureText(text).width + 12, lx = clamp(x, 2, W - w - 2), ly = clamp(y, 2, H - 22);
    apc.fillStyle = bg;
    apc.fillRect(lx, ly, w, 20);
    apc.fillStyle = '#fff';
    apc.fillText(text, lx + 6, ly + 10.5);
  };
  const rrect = (x, y, w, h, r) => { apc.beginPath(); apc.roundRect ? apc.roundRect(x, y, w, h, r) : apc.rect(x, y, w, h); };

  function drawIrApp() {
    const faults = FAULTS.ir, W = AW * AX_S, H = AH * AX_S;
    if (appCv.width !== W || appCv.height !== H) { appCv.width = W; appCv.height = H; }
    apc.setTransform(1, 0, 0, 1, 0, 0);
    apc.setLineDash([]);
    let hot = null;
    irCells.forEach(c => {
      const v = cellTemp(c, faults), x = c.X / AC * AX_S, y = c.Y / AC * AX_S;
      apc.fillStyle = colour(v);
      apc.fillRect(x, y, AX_S + 0.5, AX_S + 0.5);
      if (!hot || v > hot.v) hot = { v, x: x + AX_S / 2, y: y + AX_S / 2 };
    });
    faults.forEach((f, k) => {
      const st = stageOf(f.temp), [x, y, w, h] = f.box.map(v => v / AC * AX_S);
      if (!st) {
        apc.setLineDash([6, 5]);
        apc.lineWidth = 1.5;
        apc.strokeStyle = 'rgba(255,255,255,0.75)';
        apc.strokeRect(x, y, w, h);
        apc.setLineDash([]);
        label(`Bx${k + 1}`, x, y - 22, 'rgba(0,0,0,0.6)', W, H);
        return;
      }
      apc.lineWidth = st === 2 ? 4 : 3;
      apc.strokeStyle = STAGE_COL[st];
      apc.strokeRect(x - 4, y - 4, w + 8, h + 8);
      // every other label goes under its frame, so labels of neighbouring areas do not overlap
      label(`${t9n(STAGE_KEY[st])} · Bx${k + 1} · ${f.temp.toFixed(1)} °C`, x - 4, k % 2 ? y + h + 8 : y - 28, STAGE_BG[st], W, H);
    });
    apc.strokeStyle = '#fff';
    apc.lineWidth = 2;
    apc.beginPath();
    apc.moveTo(hot.x - 9, hot.y); apc.lineTo(hot.x + 9, hot.y);
    apc.moveTo(hot.x, hot.y - 9); apc.lineTo(hot.x, hot.y + 9);
    apc.stroke();
  }

  function drawTagApp(t) {
    // Drawn at twice the size so the text stays sharp when the window is scaled down
    const W = 720, H = 470, S = 2;
    if (appCv.width !== W * S || appCv.height !== H * S) { appCv.width = W * S; appCv.height = H * S; }
    apc.setTransform(S, 0, 0, S, 0, 0);
    apc.setLineDash([]);
    apc.fillStyle = '#0d110f';
    apc.fillRect(0, 0, W, H);
    apc.textBaseline = 'middle';
    // Circuit tiles, laid out like the breakers in the board
    const COLS = 12, GAP = 6, TW = (W - GAP * (COLS - 1)) / COLS, TH = 54;
    apc.font = '500 11px ui-monospace, monospace';
    apc.fillStyle = '#9AA59F';
    apc.fillText(t9n('heatAppCircuits').toUpperCase(), 0, 8);
    const top = 22;
    spots.forEach((p, k) => {
      const temp = p.fault ? p.fault.temp : p.base + Math.sin(t * 0.6 + k) * 0.15;
      const st = stageOf(temp), x = p.i * (TW + GAP), y = top + p.r * (TH + GAP);
      rrect(x, y, TW, TH, 6);
      apc.fillStyle = ['#161c19', 'rgba(150,105,10,0.9)', 'rgba(190,40,30,0.92)'][st];
      apc.fill();
      apc.lineWidth = 1;
      apc.strokeStyle = ['rgba(255,255,255,0.08)', '#F2C14E', '#FF6B5A'][st];
      apc.stroke();
      apc.font = '500 10px ui-monospace, monospace';
      apc.fillStyle = st ? 'rgba(255,255,255,0.85)' : '#7E8983';
      apc.textAlign = 'left';
      apc.fillText(`Q${k + 1}`, x + 6, y + 11);
      apc.font = '600 15px ui-monospace, monospace';
      apc.fillStyle = st ? '#fff' : '#DDE5E0';
      apc.textAlign = 'center';
      apc.fillText(`${temp.toFixed(1)}°`, x + TW / 2, y + 32);
      // level bar at the bottom of the tile
      const lv = clamp((temp - 20) / 60, 0, 1);
      apc.fillStyle = 'rgba(255,255,255,0.08)';
      apc.fillRect(x + 6, y + TH - 9, TW - 12, 3);
      apc.fillStyle = st ? '#fff' : '#62C27F';
      apc.fillRect(x + 6, y + TH - 9, (TW - 12) * lv, 3);
    });
    // The gateway in the three free slots on the bottom row
    const gx = 9 * (TW + GAP), gy = top + 2 * (TH + GAP), gw = 3 * TW + 2 * GAP;
    rrect(gx, gy, gw, TH, 6);
    apc.setLineDash([4, 4]);
    apc.strokeStyle = 'rgba(98,194,127,0.6)';
    apc.stroke();
    apc.setLineDash([]);
    const ph = (t * 0.8) % 1;
    for (let k = 0; k < 3; k++) {
      apc.beginPath();
      apc.arc(gx + 24, gy + TH / 2 + 6, 5 + k * 6, -Math.PI * 0.75, -Math.PI * 0.25);
      apc.strokeStyle = `rgba(98,194,127,${0.35 + 0.65 * (1 - Math.abs(ph * 3 - k - 0.5) / 1.5)})`;
      apc.lineWidth = 2;
      apc.stroke();
    }
    apc.font = '600 13px ui-monospace, monospace';
    apc.fillStyle = '#9BE0B0';
    apc.textAlign = 'left';
    apc.fillText(t9n('heatGateway'), gx + 48, gy + TH / 2);

    // Trend of the circuits that warm up
    const ty = top + 3 * (TH + GAP) + 18, px0 = 34, px1 = W - 110, py0 = ty + 18, py1 = H - 18;
    apc.font = '500 11px ui-monospace, monospace';
    apc.fillStyle = '#9AA59F';
    apc.fillText(t9n('heatAppTrend').toUpperCase(), 0, ty);
    const T0 = 25, T1 = 80, yOf = v => py1 - (clamp(v, T0, T1) - T0) / (T1 - T0) * (py1 - py0);
    apc.lineWidth = 1;
    apc.textAlign = 'right';
    [30, 40, 50, 60, 70, 80].forEach(v => {
      apc.strokeStyle = 'rgba(255,255,255,0.06)';
      apc.beginPath(); apc.moveTo(px0, yOf(v) + 0.5); apc.lineTo(px1, yOf(v) + 0.5); apc.stroke();
      apc.fillStyle = '#6E7973';
      apc.fillText(String(v), px0 - 6, yOf(v));
    });
    [[WARN, '#F2C14E'], [LIMIT, '#FF5A4F']].forEach(([v, c]) => {
      apc.setLineDash([6, 5]);
      apc.strokeStyle = c;
      apc.beginPath(); apc.moveTo(px0, yOf(v) + 0.5); apc.lineTo(px1, yOf(v) + 0.5); apc.stroke();
      apc.setLineDash([]);
    });
    const ends = [];
    FAULTS.tag.forEach((f, n) => {
      const h = hist[n];
      if (!h.length) return;
      const st = stageOf(f.temp), dx = (px1 - px0) / (HIST - 1), x0 = px1 - (h.length - 1) * dx;
      apc.strokeStyle = ['#9BE0B0', '#F2C14E', '#FF6B5A'][st];
      apc.lineWidth = 2;
      apc.beginPath();
      h.forEach((v, j) => (j ? apc.lineTo(x0 + j * dx, yOf(v)) : apc.moveTo(x0 + j * dx, yOf(v))));
      apc.stroke();
      ends.push({ y: yOf(h[h.length - 1]), f, st });
    });
    // End labels, nudged apart so they never overlap
    ends.sort((a, b) => a.y - b.y);
    ends.forEach((e, j) => { if (j) e.y = Math.max(e.y, ends[j - 1].y + 22); });
    apc.textAlign = 'left';
    ends.forEach(e => {
      apc.beginPath(); apc.arc(px1, yOf(e.f.temp), 3.5, 0, Math.PI * 2);
      apc.fillStyle = STAGE_COL[e.st]; apc.fill();
      rrect(px1 + 10, e.y - 10, 96, 20, 4);
      apc.fillStyle = STAGE_BG[e.st]; apc.fill();
      apc.font = '600 12px ui-monospace, monospace';
      apc.fillStyle = '#fff';
      apc.fillText(`${e.f.q} ${e.f.temp.toFixed(1)} °C`, px1 + 16, e.y + 0.5);
    });
    apc.setTransform(1, 0, 0, 1, 0, 0);
  }

  function drawApp(t) {
    if (!apc) return;
    const ir = view === 'ir';
    appSrc.textContent = ir ? t9n('heatSrcIr') : t9n('heatSrcTag').replace('{n}', spots.length);
    appCv.style.imageRendering = ir ? '' : 'auto';
    if (appScale) appScale.style.display = ir ? '' : 'none';
    if (ir) drawIrApp(); else drawTagApp(t);
  }

  // The heating cycle restarts with each view (14 s loop; each fault starts a little later and
  // stops at its own peak). With reduced motion every fault is held at its peak.
  const shape = u => {
    if (u <= 0) return 0;
    u %= 14;
    if (u < 7) { const k = u / 7; return k * k * (3 - 2 * k); }
    if (u < 11) return 1;
    const k = (u - 11) / 3;
    return 1 - k * k * (3 - 2 * k);
  };
  let imgKey = '', chipKey = '';
  function updateHeat(t) {
    let worst = null;
    Object.entries(FAULTS).forEach(([name, list]) => list.forEach(f => {
      const on = name === view;
      // the faults of the other view cool down quickly
      f.temp = on ? (reduce ? f.peak : COOL + (f.peak - COOL) * shape(t - viewStart - f.delay) + (f.peak > LIMIT ? Math.sin(t * 3) * 0.3 : 0))
        : Math.max(COOL, f.temp - 0.6);
      const st = stageOf(f.temp), heat = clamp((f.temp - COOL) / (PEAK - COOL), 0, 1);
      f.glow.material.color.lerpColors(warmColor, hotColor, heat);
      f.glow.material.opacity = (0.15 + heat * 0.6) * heat;
      f.glow.scale.setScalar(0.05 + heat * 0.28);
      f.screwMat.emissiveIntensity = heat * 2.4;
      f.cableMat.emissiveIntensity = heat * 1.6;
      const txt = `${f.q} · ${Math.round(f.temp)} °C`;
      if (f.tag.textContent !== txt) f.tag.textContent = txt;
      f.tag.classList.toggle('warn', st === 1);
      f.tag.classList.toggle('hot', st === 2);
      if (on && (!worst || f.temp > worst.temp)) worst = f;
    }));
    const st = stageOf(worst.temp);
    alarmLed.m.material.color.copy(st === 2 && view === 'tag' && (reduce || Math.sin(t * 10) > 0) ? alarmLed.on : alarmLed.off);
    packets.forEach(p => { p.m.visible = st > 0 && !reduce && (p.view === 'any' || p.view === view); });
    packets.forEach(p => p.m.material.color.set(st === 2 ? 0xff6b5a : 0xf2c14e));
    const key = allFaults.map(f => Math.round(f.temp * 2)).join('|');
    if (key !== imgKey) {
      imgKey = key;
      if (levelOf('ir') > 0.01) drawIr();
      if (levelOf('tag') > 0.01) drawLcd(Math.max(...FAULTS.tag.map(f => f.temp)));
    }
    const ck = `${st}|${lang()}`;
    if (ck !== chipKey) { chipKey = ck; drawChips(st); }
    // Wireless sensors trend: a new sample four times a second
    if (view === 'tag' && t - histT >= 0.25) {
      histT = t;
      histN++;
      FAULTS.tag.forEach((f, n) => { hist[n].push(f.temp); if (hist[n].length > HIST) hist[n].shift(); });
    }
    const ak = view === 'ir' ? `${key}|ir|${lang()}` : `${histN}|${key}|tag|${lang()}`;
    if (ak !== appKey) { appKey = ak; drawApp(t); }
  }

  // Camera: two views of the whole scene, flown between with a short arc. Dragging turns the view a little
  // (sideways ±0.75 rad, a bit up and down) but never all the way round.
  const VIEWS = {
    ir: { target: V(0.08, 1.64, 0.25), az: 0.34, polar: 1.32, fit: [3.3, 2.15], fitC: [2.5, 1.95], layers: { ir: 1, tag: 0 } },
    tag: { target: V(0.08, 1.36, 0.25), az: -0.3, polar: 1.32, fit: [3.3, 2.65], fitC: [2.5, 2.55], layers: { ir: 0, tag: 1 } },
  };
  const ORDER = ['ir', 'tag'];
  const tanH = Math.tan(THREE.MathUtils.degToRad(FOV / 2));
  const compact = () => host.clientWidth < 520;
  const paramsFor = name => {
    const v = VIEWS[name];
    // Narrow screens leave out the enlarged parts on the left, so frame a little tighter
    const [fw, fh] = compact() ? v.fitC : v.fit;
    const d = Math.max(fh / (2 * tanH), fw / (2 * tanH * camera.aspect));
    const p = { target: v.target.clone(), az: v.az, polar: v.polar, dist: d };
    if (compact()) p.target.x += 0.3;
    return p;
  };
  const clock = new THREE.Clock();
  let cur = null, from = null, to = null, tweenStart = 0, view = null, viewStart = 0, auto = !reduce;
  let dragAz = 0, dragPol = 0, drag = null, touched = false;
  const buttons = host.querySelectorAll('.heat-views button');
  function goTo(name, instant = false) {
    if (!VIEWS[name]) return;
    view = name;
    viewStart = clock.elapsedTime;
    hist = FAULTS.tag.map(() => []);
    host.dataset.view = name;
    host.parentElement.dataset.view = name; // the caption below the view follows it too
    buttons.forEach(b => {
      const on = b.dataset.view === name;
      b.classList.toggle('on', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    faders.forEach(f => { f.target = VIEWS[name].layers[f.name]; });
    const dest = paramsFor(name);
    if (cur) { cur.az += dragAz; cur.polar += dragPol; }
    dragAz = dragPol = 0;
    if (instant || reduce || !cur) {
      cur = dest; from = null;
      faders.forEach(f => { f.level = f.target; applyFade(f); });
      imgKey = '';
    } else {
      from = { target: cur.target.clone(), az: cur.az, polar: cur.polar, dist: cur.dist };
      to = dest;
      tweenStart = clock.elapsedTime;
    }
  }
  buttons.forEach(b => b.addEventListener('click', () => { auto = false; goTo(b.dataset.view); start(); }));

  const el = renderer.domElement;
  el.style.touchAction = 'pan-y';
  el.style.cursor = 'grab';
  el.addEventListener('pointerdown', e => {
    drag = { x: e.clientX, y: e.clientY, az: dragAz, pol: dragPol };
    el.setPointerCapture(e.pointerId);
    el.style.cursor = 'grabbing';
    touched = true;
    auto = false;
    host.classList.add('touched');
  });
  el.addEventListener('pointermove', e => {
    if (!drag) return;
    dragAz = clamp(drag.az - (e.clientX - drag.x) * 0.006, -0.75, 0.75);
    dragPol = clamp(drag.pol - (e.clientY - drag.y) * 0.004, -0.32, 0.12);
    if (!running) render(clock.elapsedTime);
  });
  ['pointerup', 'pointercancel'].forEach(ev => el.addEventListener(ev, () => { drag = null; el.style.cursor = 'grab'; }));

  function placeCamera(t) {
    const az = cur.az + dragAz + (reduce || touched ? 0 : Math.sin(t * 0.3) * 0.06);
    const polar = cur.polar + dragPol;
    camera.position.set(Math.sin(az) * Math.sin(polar), Math.cos(polar), Math.cos(az) * Math.sin(polar))
      .multiplyScalar(cur.dist).add(cur.target);
    camera.lookAt(cur.target);
  }
  function render(t) {
    placeCamera(t);
    renderer.render(scene, camera);
    labels.render(scene, camera);
  }

  function resize() {
    const w = host.clientWidth, h = host.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h);
    labels.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    host.classList.toggle('compact', compact());
    irBig.visible = tagBig.visible = !compact();
    if (from) to = paramsFor(view);
    else if (cur) cur = paramsFor(view);
  }
  camera.aspect = (host.clientWidth || 1) / (host.clientHeight || 1);
  goTo('ir', true);
  resize();
  new ResizeObserver(() => { resize(); if (!running) render(clock.elapsedTime); }).observe(host);

  // Render loop, only while the card is on screen and in focus
  let visible = false, running = false;
  const card = host.closest('.wide');
  const idle = () => card && cardIdle(card);
  function frame() {
    if (!visible || document.hidden || idle()) { running = false; return; }
    requestAnimationFrame(frame);
    const dt = Math.min(clock.getDelta(), 0.05);
    const t = clock.elapsedTime;
    // Step to the next solution after one full warm-up, alarm and cool-down
    if (auto && !from && t - viewStart > 16.5) goTo(ORDER[(ORDER.indexOf(view) + 1) % ORDER.length]);
    if (from) {
      const k = Math.min(1, (t - tweenStart) / 1.6);
      const e = k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
      cur.target.lerpVectors(from.target, to.target, e);
      cur.az = from.az + (to.az - from.az) * e;
      cur.polar = from.polar + (to.polar - from.polar) * e;
      cur.dist = from.dist + (to.dist - from.dist) * e + Math.sin(Math.PI * e) * 0.6;
      if (k >= 1) { cur = to; from = null; }
    }
    faders.forEach(f => {
      if (f.level === f.target) return;
      f.level += Math.sign(f.target - f.level) * Math.min(Math.abs(f.target - f.level), dt * 1.8);
      applyFade(f);
      imgKey = '';
    });
    updateHeat(t);
    if (!reduce) {
      packets.forEach(p => { if (p.m.visible) p.path.getPointAt((t * p.speed + p.offset) % 1, p.m.position); });
      dashT.tex.offset.x -= dt * 0.8;
      radioMat.dashOffset -= dt * 0.08;
      const tagLevel = levelOf('tag');
      pulses.forEach(p => {
        const u = (t * 0.7 + p.phase) % 1, busy = !p.f || stageOf(p.f.temp) > 0;
        p.m.visible = tagLevel > 0.01 && busy;
        p.m.scale.setScalar(0.015 + u * 0.09);
        p.m.material.opacity = (1 - u) * 0.7 * tagLevel;
        p.m.lookAt(camera.position);
      });
      irShow.rotation.y = 0.34 + Math.sin(t * 0.5) * 0.45;
      tagShow.rotation.y = -0.3 + Math.sin(t * 0.5) * 0.45;
      leds.forEach(l => {
        if (l.fixed || t < l.next) return;
        l.next = t + 0.12 + Math.random() * 0.5;
        l.m.material.color.copy(Math.random() > 0.45 ? l.on : l.off);
      });
    }
    render(t);
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

  updateHeat(0);
  render(0);
  host.classList.add('ready');
  if (app) app.hidden = false;
}
