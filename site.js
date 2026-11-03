const COPY = {
  no: {
    // Service pages and the service overview
    svcMore: 'Les mer',
    svcNew: 'Ny',
    svcBack: 'Alle tjenester',
    svcAbout: 'Om tjenesten',
    svcOther: 'Andre tjenester',
    svcCtaTitle: 'Har du et prosjekt?',
    svcCtaText: 'Fortell oss kort hva du trenger, så tar vi kontakt for en uforpliktende prat.',
    svc0Short: 'Programmering, feilsøking og idriftsettelse av PLS-er, HMI-paneler og displayer.',
    svc1Short: 'Pålitelig kommunikasjon mellom feltutstyr og styringssystemer.',
    svc2Short: 'OT-arkitektur, nettverk, VPN og fjerntilgang satt sammen til én helhet.',
    svc3Short: 'Rådgivning fra 400 V kraftforsyning til 24 V styrestrøm, PLS og sensorer.',
    svc4Short: 'Apper for iPhone og iPad i Swift og SwiftUI.',
    svc5Short: 'Raske og moderne nettsider som fungerer like godt på mobil som på PC.',
    svc6Short: 'AI som tar seg av utvalgte oppgaver i arbeidsflyten din.',
    svc7Short: 'Temperaturovervåking av sikringsskap og el-tavler, med varsel før det blir brann eller driftsstans.',
    pgKommTitle: 'Industriell kommunikasjon og systemintegrasjon',
    pgKommShort: 'Vi kobler feltutstyr, styringer og nettverk sammen, fra sensoren i felt til fjerntilgang og sky.',
    plsMetaTitle: 'PLS-, HMI- og displayprogrammering i Bergen | Walde Automation',
    plsMetaDesc: 'Programmering, feilsøking og idriftsettelse av PLS-er, HMI-paneler og displayer fra Siemens, Schneider, Danfoss og EOTE. Bergen og Vestlandet.',
    kommMetaTitle: 'Industriell kommunikasjon og systemintegrasjon | Walde Automation',
    kommMetaDesc: 'Modbus, PROFINET, Profibus, OPC UA og CAN, OT-nettverk, VPN og fjerntilgang. Walde Automation i Bergen og på Vestlandet.',
    elektroMetaTitle: 'Elektroteknisk rådgivning i Bergen | Walde Automation',
    elektroMetaDesc: 'Rådgivning innen elektroteknikk og styringssystemer, fra 400 V kraftforsyning til 24 V styrestrøm, PLS og sensorer.',
    appMetaTitle: 'App- og programvareutvikling | Walde Automation',
    appMetaDesc: 'Vi lager apper for iPhone og iPad i Swift og SwiftUI, publisert på App Store.',
    webMetaTitle: 'Nettsider | Walde Automation',
    webMetaDesc: 'Raske og moderne nettsider som fungerer like godt på mobil som på PC, med fokus på ytelse, universell utforming og synlighet i søk.',
    aiMetaTitle: 'AI-integrasjon | Walde Automation',
    aiMetaDesc: 'Vi kobler AI inn i arbeidsflyten din og automatiserer utvalgte oppgaver, som sortering av e-post, support-tickets og rapporter.',
    heatMetaTitle: 'Varmeovervåking av el-tavler | Walde Automation',
    heatMetaDesc: 'Temperaturovervåking av sikringsskap og el-tavler døgnet rundt, med forvarsel og alarm før det blir brann eller driftsstans.',
    metaTitle: 'PLS- og HMI-programmering i Bergen | Walde Automation',
    metaDesc: 'PLS-, HMI- og displayprogrammering, industriell kommunikasjon og elektroteknisk rådgivning i Bergen og på Vestlandet. Også apper, nettsider og AI.',
    a11yMenu: 'Meny',
    a11yTheme: 'Lys / mørk modus',
    a11yComm3d: '3D-modell som kan roteres: PLC-er koblet til feltsensorer, PROFIBUS DP, og en frekvensomformer via Modbus TCP, med fjerntilgang via 4G-ruter og sky',
    a11yView: 'Visning',
    a11ySchem: 'Animert koblingsskjema: 3-fase 400 V inn, motorvernbryter Q1 og kontaktor K1 foran motor M1, 24 V DC strømforsyning G1 og PLS A1. Når den induktive PNP-sensoren B1 på inngang I0.0 ser metall, slår utgang Q0.0 på kontaktoren og motoren går.',
    a11yPhone: 'iPhone som viser en SwiftUI-forhåndsvisning som bygges opp mens koden skrives',
    navOm: 'Om', navKompetanse: 'Kompetanse', navTjenester: 'Tjenester', navNye: 'Nye tjenester', navProsjekter: 'Prosjekter',
    nyEyebrow: 'Nye tjenester', nyTitle: 'Tilstandsovervåking av el-tavler',
    cta: 'Ta kontakt', ctaSecondary: 'Se tjenester',
    heroEyebrow: 'Automasjon · Systemintegrasjon · Elektroteknikk',
    heroTitleA: 'Styring og automasjon –', heroTitleB: 'fra felt til sky',
    heroLead: 'Walde Automation leverer automasjon, systemintegrasjon og elektroteknisk rådgivning i Bergen og på Vestlandet — fra PLS-programmering og industriell kommunikasjon til programvareutvikling.',
    omEyebrow: 'Om',
    omTitle: 'Ingeniørarbeid i grensesnittet mellom fagene',
    omP1: 'Walde Automation er et enkeltpersonforetak drevet av Mikael Walde, med spesialkompetanse innen industriell automasjon og systemintegrasjon. Arbeidet ligger i grensesnittene mellom mekanikk, elektro, programvare, kommunikasjon og styring — der fagene møtes, og der utfordringene ofte oppstår. Med base i Bergen tar vi oppdrag over hele Vestlandet.',
    kompEyebrow: 'Kompetanse', kompTitle: 'Verktøy, plattformer og språk vi jobber med',
    kPlcTitle: 'PLS og styring', kPlcDesc: 'Programmering, feilsøking og videreutvikling av styringer for industri, prosessanlegg og mobile maskiner.',
    kHmiTitle: 'HMI og operatørpaneler', kHmiDesc: 'Skjermbilder, alarmer og betjening som er enkle å forstå for de som står ved anlegget.',
    kNetTitle: 'Industriell kommunikasjon', kNetDesc: 'Vi kobler PLS-er, frekvensomformere og feltutstyr sammen, og videre til overvåkingssystemer og sky.',
    kLangTitle: 'Programmeringsspråk og standarder', kLangDesc: 'Strukturert og dokumentert kode etter IEC 61131-3, som er enkel å vedlikeholde over tid.',
    kAppTitle: 'App, web og AI', kAppDesc: 'Apper, nettsider og AI-løsninger som henter data fra anlegget og automatiserer hverdagen.',
   chipHmi: 'HMI-paneler', chipOperatorPanel: 'Operatørgrensesnitt', chipAlarms: 'Alarmer',
    chipMobile: 'Mobile kontrollere',
    tjEyebrow: 'Tjenester', tjTitle: 'Dette kan vi hjelpe deg med',
    svc0Title: 'PLS-, HMI- og displayprogrammering', svc0Desc: 'Vi programmerer, feilsøker og setter i drift PLS-er, HMI-paneler og displayer fra Schneider, Siemens, Danfoss og EOTE — med tilstandsmaskiner, forriglinger, feilhåndtering, oversiktlige skjermbilder og grundig teknisk dokumentasjon.',
    svc1Title: 'Industriell kommunikasjon', svc1Desc: 'Modbus TCP/RTU, PROFINET, Profibus DP, OPC UA, S7 og CAN / J1939 — pålitelig kommunikasjon mellom feltutstyr og styringssystemer.',
    svc2Title: 'Systemintegrasjon & OT', svc2Desc: 'OT-arkitektur, nettverkssegmentering, VPN og fjern-idriftsettelse — mekanikk, elektro, programvare og nettverk satt sammen til én robust helhet.',
    svc3Title: 'Elektroteknisk rådgivning', svc3Desc: 'Rådgivning innen elektroteknikk og styringssystemer — fra 400 V kraftforsyning og motorkurser til 24 V styrestrøm, PLS og sensorer, blant annet på elektriske spesialkjøretøy.',
    svc4Title: 'App- & programvareutvikling', svc4Desc: 'Vi lager apper for iPhone og iPad i Swift og SwiftUI, publisert på App Store.',
    svc5Title: 'Nettsider', svc5Desc: 'Vi lager raske og moderne nettsider som fungerer like godt på mobil som på PC — med fokus på ytelse, universell utforming og synlighet i søk.',
    svc6Title: 'AI-integrasjon', svc6Desc: 'Vi kobler AI inn i arbeidsflyten din og automatiserer utvalgte oppgaver — for eksempel sortering av e-post, oppretting av support-tickets og ukentlige rapporter.',
    webUrl: 'dinbedrift.no', webLogo: 'Bedrift', webL1: 'Tjenester', webL2: 'Om oss', webL3: 'Kontakt', webHero: 'Moderne nettside', webCta: 'Ta kontakt',
    webDesktop: 'Desktop', webTablet: 'Nettbrett', webMobile: 'Mobil', webPerf: 'Ytelse', webA11y: 'Tilgjengelighet', webSeo: 'SEO',
    aiTasks: ['les gjennom kundetilbakemeldinger', 'opprett support-tickets automatisk', 'kjør hver tirsdag kl. 14:00', 'oppsummer ukens henvendelser', 'kategoriser innkommende e-post'],
    dragHint: 'Dra for å rotere', legendField: 'Feltkabler', legendVpn: 'VPN-tunnel', legendMotor: 'Motorkabel',
    viewField: 'Feltnivå', viewOt: 'Sky & fjerntilgang',
    plcComment: '// M1: start/stopp med selvhold', hmiTapHint: 'Prøv selv – trykk på knappene',
    hmiTitle: 'M1 · Transportbånd', hmiBelt: 'Transportbånd', hmiCurrent: 'Strøm', hmiSpeed: 'Turtall', hmiHours: 'Driftstimer',
    hmiTabProc: 'Prosess', hmiTabAlarm: 'Alarmer', hmiTime: 'Tid', hmiMsg: 'Melding', hmiAck: 'Kvitter',
    hmiRunning: 'I DRIFT', hmiStopped: 'STOPPET', hmiFault: 'FEIL', hmiActive: 'Aktiv', hmiAcked: 'Kvittert',
    hmiActiveCount: '{n} aktiv alarm', hmiNoAlarms: 'Ingen aktive alarmer', hmiAlmQ1: 'Q1 motorvern utløst', hmiAlmEstop: 'Nødstopp aktivert',
    appDone: 'Alt klart!', appDoneSub: '3 av 3 fullført', appNewTask: 'Ny oppgave',
    flowMail: 'E-post', flowForm: 'Skjema', flowCron: 'Tir 14:00', flowTicket: 'Ticket', flowReport: 'Rapport',
    tagRouter: '4G-ruter / VPN', tagVpn: 'VPN · 4G', tagCloud: 'Sky', tagServer: 'Overvåkingsserver', tagRemote: 'Fjerntilgang',
    svc7Title: 'Varmeovervåking av el-tavler', svc7Desc: 'Vi overvåker temperaturen i sikringsskap og el-tavler døgnet rundt, enten det er i industri, næringsbygg, datasentre eller annen kritisk drift. Løsningen tilpasses tavla: en IR-sensor inne i skapet som ser koblingene som et varmebilde, eller trådløse sensorer direkte på hver kurs. Koblinger som begynner å bli varme gir forvarsel lenge før det blir brann eller driftsstans, og varselet går dit du ønsker.',
    legendCam: 'IR-sensor: varmebilde av koblingene', legendSens: 'Trådløse sensorer: én sensor på hver kurs', legendAlarm: 'Forvarsel ved 45 °C, alarm ved 60 °C', legendSms: 'Varsel dit du ønsker: Modbus TCP, EtherNet/IP, SMS, e-post',
    a11yHeat3d: '3D-nærbilde av et sikringsskap med to løsninger: en IR-sensor på innsiden av døra som ser koblingene som et varmebilde, og trådløse sensorer direkte på hver kurs. I hver visning blir flere koblinger varme; først kommer forvarsel, så alarm, og varselet sendes ut over Modbus TCP, EtherNet/IP, SMS og e-post. Dra for å se inn i skapet.',
    heatCapIr: 'En IR-sensor på innsiden av tavledøra ser koblingene som et varmebilde. Vi legger et målefelt over hver kritisk kobling, og sensoren gir forvarsel når et felt blir varmere og alarm når det passerer grensen.',
    heatCapTag: 'Med trådløse sensorer sitter en liten sensor direkte på hver kurs og måler temperaturen der varmen oppstår. Sensorene sender trådløst til en gateway i tavla, som kobles via en industriell switch til PLS, overvåkingssystem og modem.',
    heatDragHint: 'Dra for å se inn i skapet', heatRouter: 'Modem / 4G-ruter', heatSwitch: 'Industriell switch',
    heatCallIr: 'IR-sensor · forstørret', heatCallTag: 'Trådløs sensor · forstørret', heatGateway: 'Gateway', heatBtnIr: 'IR-sensor', heatBtnTag: 'Trådløse sensorer',
    heatSrcIr: 'IR-sensor · varmebilde', heatSrcTag: 'Trådløse sensorer · {n} kurser', heatAppTrend: 'Temperatur, siste 30 s', heatAppCircuits: 'Kurser',
    heatAppTitle: 'Overvåkingsprogram', heatAppZone: 'sone',
    heatStOk: 'OK', heatStWarn: 'FORVARSEL', heatStAlarm: 'ALARM',
   
    a11yHeatApp: 'Det overvåkingsprogrammet viser: varmebildet med måleområder, eller temperaturen på hver kurs med en trendkurve. Et område eller en kurs som blir for varm blir gul (forvarsel) eller rød (alarm).',
    heatChipMailName: 'E-POST',
   
   
   
   
    prosjEyebrow: 'Referanseprosjekter', prosjTitle: 'Utvalgte prosjekter',
    projPhoto: 'Prosjektbilde',
    proj1Meta: 'Prosessindustri · Årstall', proj1Title: 'Pumpestyring',
    proj2Meta: 'Prosessanlegg · Årstall', proj2Title: 'Anleggsautomasjon',
    proj3Meta: 'Industri · Årstall', proj3Title: 'Styringssystem',
    projDesc: 'Kort beskrivelse av prosjektet kommer her.',
    kontaktEyebrow: 'Kontakt', kontaktTitle: 'Ta kontakt',
    kontaktLead: 'Ta gjerne kontakt for en uforpliktende prat om ditt prosjekt.',
    labelNavn: 'Navn', labelEpost: 'E-post', labelMelding: 'Melding', sendBtn: 'Send melding',
    contactPerson: 'Kontaktperson', linkedinLink: 'Se profilen',
    companyFormLabel: 'Selskapsform', companyFormValue: 'Enkeltpersonforetak (ENK)',
    orgLabel: 'Org.nr',
    areaLabel: 'Område', areaValue: 'Bergen og Vestlandet',
    privacy: 'Opplysningene brukes kun for å besvare din henvendelse og lagres ikke utover det. Les mer i',
    privacyLink: 'personvernerklæringen',
    footerPrivacy: 'Personvernerklæring',
    statuses: { fill: 'Vennligst fyll ut alle feltene.', email: 'Vennligst oppgi en gyldig e-postadresse.', sending: 'Sender melding …', sent: 'Takk! Meldingen er sendt. Vi tar kontakt så snart som mulig.', error: 'Noe gikk galt. Prøv igjen, eller send e-post direkte til mikael@waldeautomation.no.' }
  },
  en: {
    // Service pages and the service overview
    svcMore: 'Read more',
    svcNew: 'New',
    svcBack: 'All services',
    svcAbout: 'About the service',
    svcOther: 'Other services',
    svcCtaTitle: 'Have a project in mind?',
    svcCtaText: 'Tell us briefly what you need, and we will get back to you for a no-obligation chat.',
    svc0Short: 'Programming, troubleshooting and commissioning of PLCs, HMI panels and displays.',
    svc1Short: 'Reliable communication between field devices and control systems.',
    svc2Short: 'OT architecture, networks, VPN and remote access brought together as one whole.',
    svc3Short: 'Consulting from 400 V power supply to 24 V control power, PLCs and sensors.',
    svc4Short: 'Apps for iPhone and iPad in Swift and SwiftUI.',
    svc5Short: 'Fast, modern websites that work just as well on a phone as on a desktop.',
    svc6Short: 'AI that takes care of selected tasks in your workflow.',
    svc7Short: 'Temperature monitoring of cabinets and switchboards, with alerts before a fire or downtime.',
    pgKommTitle: 'Industrial Communication & Systems Integration',
    pgKommShort: 'We connect field devices, controllers and networks, from the sensor in the field to remote access and the cloud.',
    plsMetaTitle: 'PLC, HMI and Display Programming in Bergen | Walde Automation',
    plsMetaDesc: 'Programming, troubleshooting and commissioning of PLCs, HMI panels and displays from Siemens, Schneider, Danfoss and EOTE. Bergen and Western Norway.',
    kommMetaTitle: 'Industrial Communication and Systems Integration | Walde Automation',
    kommMetaDesc: 'Modbus, PROFINET, Profibus, OPC UA and CAN, OT networks, VPN and remote access. Walde Automation in Bergen and Western Norway.',
    elektroMetaTitle: 'Electrical Engineering Consultation in Bergen | Walde Automation',
    elektroMetaDesc: 'Consulting in electrical engineering and control systems, from 400 V power supply to 24 V control power, PLCs and sensors.',
    appMetaTitle: 'App and Software Development | Walde Automation',
    appMetaDesc: 'We build apps for iPhone and iPad in Swift and SwiftUI, published on the App Store.',
    webMetaTitle: 'Websites | Walde Automation',
    webMetaDesc: 'Fast, modern websites that work just as well on a phone as on a desktop, with a focus on performance, accessibility and search visibility.',
    aiMetaTitle: 'AI Integration | Walde Automation',
    aiMetaDesc: 'We connect AI to your workflows and automate selected tasks, such as sorting email, support tickets and reports.',
    heatMetaTitle: 'Thermal Monitoring of Switchboards | Walde Automation',
    heatMetaDesc: 'Around-the-clock temperature monitoring of cabinets and switchboards, with early warnings and alarms before a fire or downtime.',
    metaTitle: 'PLC and HMI Programming in Bergen | Walde Automation',
    metaDesc: 'PLC, HMI and display programming, industrial communication and electrical engineering consultation in Bergen and Western Norway. Also apps, websites and AI.',
    a11yMenu: 'Menu',
    a11yTheme: 'Light / dark mode',
    a11yComm3d: 'Rotatable 3D model: PLCs wired to field sensors, PROFIBUS DP, and a frequency converter over Modbus TCP, with remote access via a 4G router and the cloud',
    a11yView: 'View',
    a11ySchem: 'Animated circuit diagram: 3-phase 400 V supply, motor protection switch Q1 and contactor K1 ahead of motor M1, 24 V DC power supply G1 and PLC A1. When the inductive PNP sensor B1 on input I0.0 detects metal, output Q0.0 switches on the contactor and the motor runs.',
    a11yPhone: 'iPhone showing a SwiftUI preview that builds up as the code is typed',
    navOm: 'About', navKompetanse: 'Expertise', navTjenester: 'Services', navNye: 'New services', navProsjekter: 'Projects',
    nyEyebrow: 'New services', nyTitle: 'Condition monitoring of switchboards',
    cta: 'Get in touch', ctaSecondary: 'View services',
    heroEyebrow: 'Automation · Systems Integration · Electrical Engineering',
    heroTitleA: 'Control and automation –', heroTitleB: 'from field to cloud',
    heroLead: 'Walde Automation delivers automation, systems integration and electrical engineering consultation in Bergen and Western Norway — from PLC programming and industrial communication to software development.',
    omEyebrow: 'About',
    omTitle: 'Engineering at the interfaces between disciplines',
    omP1: 'Walde Automation is a sole proprietorship run by Mikael Walde, specialising in industrial automation and systems integration. The work lives at the interfaces between mechanical, electrical, software, communication and control systems — where the disciplines meet, and where problems often arise. Based in Bergen, we take on assignments across Western Norway.',
    kompEyebrow: 'Expertise', kompTitle: 'The tools, platforms and languages we work with',
    kPlcTitle: 'PLC & control', kPlcDesc: 'Programming, troubleshooting and further development of control systems for industry, process plants and mobile machines.',
    kHmiTitle: 'HMI & operator panels', kHmiDesc: 'Screens, alarms and controls that are easy to understand for the people running the plant.',
    kNetTitle: 'Industrial communication', kNetDesc: 'We connect PLCs, drives and field devices, and on to monitoring systems and the cloud.',
    kLangTitle: 'Languages & standards', kLangDesc: 'Structured, documented code to IEC 61131-3 that is easy to maintain over time.',
    kAppTitle: 'App, web & AI', kAppDesc: 'Apps, websites and AI solutions that use data from the plant and automate everyday work.',
   chipHmi: 'HMI panels', chipOperatorPanel: 'Operator interfaces', chipAlarms: 'Alarms',
    chipMobile: 'Mobile controllers',
    tjEyebrow: 'Services', tjTitle: 'How we can help',
    svc0Title: 'PLC, HMI & Display Programming', svc0Desc: 'We develop, troubleshoot and commission PLCs, HMI panels and displays from Schneider, Siemens, Danfoss and EOTE — with state machines, interlocks, fault handling, clear operator screens and thorough technical documentation.',
    svc1Title: 'Industrial Communication', svc1Desc: 'Modbus TCP/RTU, PROFINET, Profibus DP, OPC UA, S7 and CAN / J1939 — reliable communication between field devices and control systems.',
    svc2Title: 'Systems Integration & OT', svc2Desc: 'OT architecture, network segmentation, VPN and remote commissioning — mechanical, electrical, software and network brought together into one robust whole.',
    svc3Title: 'Electrical Engineering Consultation', svc3Desc: 'Consulting in electrical engineering and control systems — from 400 V power supply and motor circuits to 24 V control power, PLCs and sensors, including on electric special-purpose vehicles.',
    svc4Title: 'App & Software Development', svc4Desc: 'We build apps for iPhone and iPad in Swift and SwiftUI, published on the App Store.',
    svc5Title: 'Websites', svc5Desc: 'We build fast, modern websites that work just as well on a phone as on a desktop — with a focus on performance, accessibility and search visibility.',
    svc6Title: 'AI Integration', svc6Desc: 'We connect AI to your workflows and automate selected tasks — such as sorting email, creating support tickets and weekly reports.',
    webUrl: 'yourcompany.com', webLogo: 'Company', webL1: 'Services', webL2: 'About', webL3: 'Contact', webHero: 'A modern website', webCta: 'Contact us',
    webDesktop: 'Desktop', webTablet: 'Tablet', webMobile: 'Mobile', webPerf: 'Performance', webA11y: 'Accessibility', webSeo: 'SEO',
    aiTasks: ['read through customer feedback', 'create support tickets automatically', 'run every Tuesday at 2:00 PM', 'summarise this week\u2019s enquiries', 'categorise incoming email'],
    dragHint: 'Drag to rotate', legendField: 'Field wiring', legendVpn: 'VPN tunnel', legendMotor: 'Motor cable',
    viewField: 'Field level', viewOt: 'Cloud & remote access',
    plcComment: '// M1: start/stop with seal-in', hmiTapHint: 'Try it – tap the buttons',
    hmiTitle: 'M1 · Conveyor', hmiBelt: 'Conveyor', hmiCurrent: 'Current', hmiSpeed: 'Speed', hmiHours: 'Run hours',
    hmiTabProc: 'Process', hmiTabAlarm: 'Alarms', hmiTime: 'Time', hmiMsg: 'Message', hmiAck: 'Acknowledge',
    hmiRunning: 'RUNNING', hmiStopped: 'STOPPED', hmiFault: 'FAULT', hmiActive: 'Active', hmiAcked: 'Acknowledged',
    hmiActiveCount: '{n} active alarm', hmiNoAlarms: 'No active alarms', hmiAlmQ1: 'Q1 motor protection tripped', hmiAlmEstop: 'Emergency stop activated',
    appDone: 'All done!', appDoneSub: '3 of 3 completed', appNewTask: 'New task',
    flowMail: 'Email', flowForm: 'Form', flowCron: 'Tue 2 PM', flowTicket: 'Ticket', flowReport: 'Report',
    tagRouter: '4G router / VPN', tagVpn: 'VPN · 4G', tagCloud: 'Cloud', tagServer: 'Monitoring server', tagRemote: 'Remote access',
    svc7Title: 'Thermal Monitoring of Switchboards', svc7Desc: 'We monitor the temperature in electrical cabinets and switchboards around the clock, whether in industry, commercial buildings, data centres or other critical operations. The solution is matched to the board: an IR sensor inside the cabinet that sees the connections as a thermal image, or wireless sensors directly on each circuit. Connections that start to heat up trigger an early warning long before a fire or downtime, and the alert goes wherever you want it.',
    legendCam: 'IR sensor: thermal image of the connections', legendSens: 'Wireless sensors: one sensor on each circuit', legendAlarm: 'Early warning at 45 °C, alarm at 60 °C', legendSms: 'Alerts wherever you want: Modbus TCP, EtherNet/IP, SMS, email',
    a11yHeat3d: '3D close-up of an electrical cabinet with two solutions: an IR sensor on the inside of the door that sees the connections as a thermal image, and wireless sensors directly on each circuit. In each view several connections heat up; first comes an early warning, then an alarm, and the alert goes out over Modbus TCP, EtherNet/IP, SMS and email. Drag to look inside the cabinet.',
    heatCapIr: 'An IR sensor on the inside of the panel door sees the connections as a thermal image. We place a measurement box over each critical connection, and the sensor gives an early warning when a box warms up and an alarm when it passes the limit.',
    heatCapTag: 'With wireless sensors, a small sensor sits directly on each circuit and measures the temperature where the heat builds up. The sensors report wirelessly to a gateway in the board, which connects through an industrial switch to the PLC, monitoring system and modem.',
    heatDragHint: 'Drag to look inside', heatRouter: 'Modem / 4G router', heatSwitch: 'Industrial switch',
    heatCallIr: 'IR sensor · enlarged', heatCallTag: 'Wireless sensor · enlarged', heatGateway: 'Gateway', heatBtnIr: 'IR sensor', heatBtnTag: 'Wireless sensors',
    heatSrcIr: 'IR sensor · thermal image', heatSrcTag: 'Wireless sensors · {n} circuits', heatAppTrend: 'Temperature, last 30 s', heatAppCircuits: 'Circuits',
    heatAppTitle: 'Monitoring software', heatAppZone: 'zone',
    heatStOk: 'OK', heatStWarn: 'WARNING', heatStAlarm: 'ALARM',
   
    a11yHeatApp: 'What the monitoring software shows: the thermal image with measurement areas, or the temperature of each circuit with a trend curve. An area or circuit that gets too hot turns yellow (early warning) or red (alarm).',
    heatChipMailName: 'EMAIL',
   
   
   
   
    prosjEyebrow: 'Reference projects', prosjTitle: 'Selected projects',
    projPhoto: 'Project image',
    proj1Meta: 'Process industry · Year', proj1Title: 'Pump control',
    proj2Meta: 'Process plant · Year', proj2Title: 'Plant automation',
    proj3Meta: 'Industry · Year', proj3Title: 'Control system',
    projDesc: 'A short project description goes here.',
    kontaktEyebrow: 'Contact', kontaktTitle: 'Get in touch',
    kontaktLead: 'Feel free to get in touch for a no-obligation chat about your project.',
    labelNavn: 'Name', labelEpost: 'Email', labelMelding: 'Message', sendBtn: 'Send message',
    contactPerson: 'Contact', linkedinLink: 'View profile',
    companyFormLabel: 'Company form', companyFormValue: 'Sole proprietorship (ENK)',
    orgLabel: 'Org. no.',
    areaLabel: 'Area', areaValue: 'Bergen and Western Norway',
    privacy: 'Your information is used only to answer your enquiry and is not stored beyond that. Read more in the',
    privacyLink: 'privacy policy',
    footerPrivacy: 'Privacy policy',
    statuses: { fill: 'Please fill in all fields.', email: 'Please enter a valid email address.', sending: 'Sending message …', sent: 'Thank you! Your message has been sent. We\u2019ll get back to you as soon as possible.', error: 'Something went wrong. Please try again, or email mikael@waldeautomation.no directly.' }
  }
};

let currentLang = 'no';
try { const s = localStorage.getItem('walde-lang'); if (s === 'no' || s === 'en') currentLang = s; } catch (e) {}

function applyLang(lang) {
  currentLang = lang;
  try { localStorage.setItem('walde-lang', lang); } catch (e) {}
  const t = COPY[lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) el.textContent = t[key];
  });
  document.querySelectorAll('[data-i18n-label]').forEach(el => {
    const label = t[el.getAttribute('data-i18n-label')];
    if (label === undefined) return;
    el.setAttribute('aria-label', label);
    if (el.hasAttribute('title')) el.title = label;
  });
  ['no', 'en'].forEach(l => {
    const b = document.getElementById(l === 'no' ? 'langNo' : 'langEn');
    b.classList.toggle('active', lang === l);
    b.setAttribute('aria-pressed', lang === l);
  });
  document.documentElement.lang = lang;
  // Each page has its own title and description (data-page on <html>, e.g. "pls" -> plsMetaTitle)
  const page = document.documentElement.dataset.page;
  document.title = (page && t[page + 'MetaTitle']) || t.metaTitle;
  document.querySelector('meta[name="description"]').content = (page && t[page + 'MetaDesc']) || t.metaDesc;
  restartAiTyper();
  restartAppPreview();
  refreshHmi();
}

document.getElementById('langNo').addEventListener('click', () => applyLang('no'));
document.getElementById('langEn').addEventListener('click', () => applyLang('en'));

document.getElementById('navToggle').addEventListener('click', e => {
  const open = document.getElementById('mainNav').classList.toggle('open');
  e.currentTarget.setAttribute('aria-expanded', open);
});

document.getElementById('year').textContent = new Date().getFullYear();

// Contact form
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');
const WEB3FORMS_KEY = '233279a6-81c6-4edc-b7d0-c42508850bfd';
if (form) form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();
  const t = COPY[currentLang];
  if (!name || !email || !message) { showStatus(t.statuses.fill, 'error'); return; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showStatus(t.statuses.email, 'error'); return; }

  showStatus(t.statuses.sending, 'pending');
  const submitBtn = form.querySelector('button[type="submit"]');
  if (submitBtn) submitBtn.disabled = true;

  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        name: name,
        email: email,
        message: message,
        subject: 'Ny henvendelse via kontaktskjemaet',
        from_name: name + ' (kontaktskjema)'
      })
    });
    const data = await res.json();
    if (res.ok && data.success) {
      showStatus(t.statuses.sent, 'success');
      form.reset();
    } else {
      showStatus(t.statuses.error, 'error');
    }
  } catch (err) {
    showStatus(t.statuses.error, 'error');
  } finally {
    if (submitBtn) submitBtn.disabled = false;
  }
});
function showStatus(msg, type) {
  status.textContent = msg;
  status.className = 'form-status ' + type;
}

// Shared helpers for the service card animations
const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
function typedHtml(segs, n) {
  let out = '', count = 0;
  for (const sg of segs) {
    if (count >= n) break;
    const take = Math.min(sg.t.length, n - count);
    out += '<span style="color:' + sg.c + '">' + esc(sg.t.slice(0, take)) + '</span>';
    count += take;
    if (take < sg.t.length) break;
  }
  return out;
}
// A service card is idle while another card is in focus
const cardIdle = card => card.classList.contains('idle');
// Tracks whether el is on screen and its service card is in focus
function watchVisible(el, onChange) {
  const card = el.closest('.tj-grid .wide');
  const state = { inView: true, get visible() { return this.inView && !(card && cardIdle(card)); } };
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      state.inView = entries[0].isIntersecting;
      if (onChange) onChange(state.visible);
    }).observe(el);
  }
  if (card && onChange) card.addEventListener('wake', () => onChange(state.visible));
  return state;
}
// Runs step(dt) every frame, but only while el is on screen and the tab is visible
function animateWhileVisible(el, step) {
  let running = false, last = 0;
  const vis = watchVisible(el, () => start());
  function frame(now) {
    if (!vis.visible || document.hidden) { running = false; return; }
    step(Math.min(0.1, (now - last) / 1000));
    last = now;
    requestAnimationFrame(frame);
  }
  function start() {
    if (running || !vis.visible || document.hidden) return;
    running = true;
    last = performance.now();
    requestAnimationFrame(frame);
  }
  document.addEventListener('visibilitychange', start);
  start();
}

// PLC / HMI card: an operator panel you can rotate and use. START / STOP on the panel drive a
// seal-in circuit, shown online with live values in the PLC code next to it. When nobody is
// using the panel, a short demo runs (start, stop, a Q1 trip, acknowledge).
// Redraws the HMI in the current language, also while it is off-screen
let refreshHmi = () => {};
(function setupPlcHmi() {
  const stage = document.getElementById('hmiStage');
  const box = document.getElementById('hmi3d');
  const el = document.getElementById('plcCode');
  const panel = document.getElementById('plcPanel');
  if (!stage || !box || !el || !panel) return;
  const q = sel => box.querySelector(sel);
  const tr = key => COPY[currentLang][key];
  const num = (v, d) => { const s = v.toFixed(d); return currentLang === 'no' ? s.replace('.', ',') : s; };

  // PLC code: typed once, then it stays online
  const K = '#7FC8FF', W = '#E4E4E7', P = '#71717A', G = '#6B7A72';
  const segs = () => [
    { c: G, t: tr('plcComment') + '\n' },
    { c: W, t: 'Run', v: 'run' }, { c: P, t: ' := (' }, { c: W, t: 'Start', v: 'start' }, { c: W, t: '\n     ' },
    { c: K, t: 'OR' }, { c: W, t: ' Run', v: 'run' }, { c: P, t: ')' }, { c: W, t: '\n    ' },
    { c: K, t: 'AND NOT' }, { c: W, t: ' Stop', v: 'stop' }, { c: W, t: '\n    ' },
    { c: K, t: 'AND NOT' }, { c: W, t: ' Fault', v: 'fault' }, { c: P, t: ';' }
  ];
  function onlineHtml() {
    const lines = [[]];
    for (const sg of segs()) {
      sg.t.split('\n').forEach((part, i) => {
        if (i) lines.push([]);
        if (part) lines[lines.length - 1].push('<span style="color:' + sg.c + '">' + esc(part) + '</span>');
      });
      if (sg.v) lines[lines.length - 1].push('<span class="pv" data-v="' + sg.v + '">FALSE</span>');
    }
    return lines.map(l => '<div class="plc-line">' + l.join('') + '</div>').join('');
  }
  let online = false;
  function goOnline() { online = true; panel.classList.add('online'); el.innerHTML = onlineHtml(); }
  function setPills(key, v) {
    el.querySelectorAll('[data-v="' + key + '"]').forEach(b => { b.textContent = v ? 'TRUE' : 'FALSE'; b.classList.toggle('t', v); });
  }

  // Motor logic and HMI state
  let now = 0, run = false, fault = false, startUntil = -1, stopUntil = -1;
  let amp = 0, rpm = 0, beltOff = 0, lastUser = -99;
  const t0 = Date.now();
  const alarms = [
    { at: new Date(t0 - 47 * 60000 - 12000), key: 'hmiAlmQ1', active: false },
    { at: new Date(t0 - 2 * 3600000 - 331000), key: 'hmiAlmEstop', active: false }
  ];
  const ampEl = q('[data-h="amp"]'), rpmEl = q('[data-h="rpm"]'), hoursEl = q('[data-h="hours"]');
  const chipEl = q('.chip-t'), clockEl = q('.h3-clock'), rowsEl = q('.h3-rows'), countEl = q('.h3-count');
  const ackBtn = q('[data-cmd="ack"]'), boxes = box.querySelectorAll('.box');
  const hhmmss = d => d.toTimeString().slice(0, 8);

  function renderAlarms() {
    const list = alarms.slice().sort((a, b) => b.at - a.at).slice(0, 5);
    rowsEl.innerHTML = list.map(a =>
      '<div class="h3-row ' + (a.active ? 'act' : 'ack') + '"><span>' + hhmmss(a.at) + '</span><span>' + esc(tr(a.key)) +
      '</span><span>' + esc(tr(a.active ? 'hmiActive' : 'hmiAcked')) + '</span></div>').join('');
    const n = alarms.filter(a => a.active).length;
    countEl.textContent = n ? tr('hmiActiveCount').replace('{n}', n) : tr('hmiNoAlarms');
    ackBtn.disabled = !n;
    box.classList.toggle('alarm', n > 0);
    box.querySelectorAll('.h3-bell b, .h3-tab b').forEach(b => { b.textContent = n; });
  }
  // Hints: each pill goes away once the visitor has done that thing
  const hintRot = stage.querySelector('.hint-rot'), hintTap = stage.querySelector('.hint-tap');
  box.classList.add('tap-hint');
  function hintDone(part) {
    if (part.classList.contains('done')) return;
    part.classList.add('done');
    if (part === hintTap) box.classList.remove('tap-hint');
    setTimeout(() => { part.hidden = true; }, 400);
  }
  function press(cmd, fromUser) {
    if (fromUser) { lastUser = now; hintDone(hintTap); }
    const btn = q('[data-cmd="' + cmd + '"]');
    if (btn) { btn.classList.add('pressed'); setTimeout(() => btn.classList.remove('pressed'), 220); }
    if (cmd === 'start') startUntil = now + 0.45;
    if (cmd === 'stop') stopUntil = now + 0.45;
    if (cmd === 'ack' && fault) {
      alarms.forEach(a => { a.active = false; });
      fault = false;
      renderAlarms();
    }
  }
  function trip() {
    if (fault) return; // already tripped and not yet acknowledged
    fault = true;
    alarms.push({ at: new Date(), key: 'hmiAlmQ1', active: true });
    renderAlarms();
  }
  function show(view, fromUser) {
    if (fromUser) { lastUser = now; hintDone(hintTap); }
    box.querySelectorAll('.h3-view').forEach(v => v.classList.toggle('on', v.dataset.view === view));
    box.querySelectorAll('.h3-tab').forEach(t => t.classList.toggle('on', t.dataset.tab === view));
  }
  box.addEventListener('click', e => {
    const b = e.target.closest('button');
    if (!b) return;
    if (b.dataset.cmd) press(b.dataset.cmd, true);
    if (b.dataset.tab) show(b.dataset.tab, true);
  });

  // PLC scan, 10 times per second
  function scan() {
    const start = now < startUntil, stop = now < stopUntil, was = run;
    run = (start || run) && !stop && !fault;
    if (run && !was) amp = 44; // inrush current on a direct-on-line start
    if (online) { setPills('run', run); setPills('start', start); setPills('stop', stop); setPills('fault', fault); }
  }

  // Demo when the panel is left alone for a while
  const DEMO = [[1, () => press('start')], [7.5, () => press('stop')], [10, () => press('start')], [14, trip],
    [15.2, () => show('alarm')], [18.5, () => press('ack')], [20.5, () => show('proc')]];
  let demoT = 0, demoIdx = 0;
  function demo(dt) {
    if (reduceMotion || now - lastUser < 12) { demoT = 0; demoIdx = 0; return; }
    demoT += dt;
    while (demoIdx < DEMO.length && demoT >= DEMO[demoIdx][0]) DEMO[demoIdx++][1]();
    if (demoT >= 24) { demoT = 0; demoIdx = 0; }
  }

  // Drag to rotate; clicks on the screen still work when the pointer barely moved
  const DEF_YAW = -18, DEF_PITCH = 8;
  let yaw = DEF_YAW, pitch = DEF_PITCH, down = null, dragged = false, lastDrag = -99;
  const applyRot = () => { box.style.transform = 'rotateX(' + pitch.toFixed(2) + 'deg) rotateY(' + yaw.toFixed(2) + 'deg)'; };
  stage.addEventListener('pointerdown', e => {
    if (e.button !== 0 || e.target.closest('.plc-panel')) return;
    down = { x: e.clientX, y: e.clientY, yaw, pitch };
    dragged = false;
  });
  window.addEventListener('pointermove', e => {
    if (!down) return;
    const dx = e.clientX - down.x, dy = e.clientY - down.y;
    if (!dragged) {
      if (Math.hypot(dx, dy) < 6) return;
      dragged = true;
      stage.classList.add('dragging');
      hintDone(hintRot);
    }
    yaw = down.yaw + dx * 0.45;
    pitch = Math.max(-28, Math.min(32, down.pitch - dy * 0.3));
    lastDrag = now;
    applyRot();
  });
  const endDrag = () => { if (!down) return; down = null; stage.classList.remove('dragging'); lastDrag = now; };
  window.addEventListener('pointerup', endDrag);
  window.addEventListener('pointercancel', endDrag);
  stage.addEventListener('click', e => { if (dragged) { e.stopPropagation(); e.preventDefault(); dragged = false; } }, true);
  // Swing the panel once the first time it comes into view, so it is clear that it turns
  let intro = -1;
  if (!reduceMotion && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      if (entries[0].intersectionRatio < 0.5) return;
      io.disconnect();
      if (lastDrag < 0) intro = 0;
    }, { threshold: 0.5 });
    io.observe(stage);
  }
  function rotate(dt) {
    if (down || reduceMotion || now - lastDrag < 2.5) return;
    // Ease back towards the front (the nearest way round), with a gentle sway
    let ty = DEF_YAW + Math.sin(now * 0.5) * 6;
    if (intro >= 0 && intro < 3.5) { intro += dt; ty += 42 * Math.sin(intro * 2.4) * Math.exp(-intro * 0.75); }
    const d = ((yaw - ty) % 360 + 540) % 360 - 180;
    yaw = ty + d * Math.max(0, 1 - dt * 1.8);
    pitch += (DEF_PITCH + Math.sin(now * 0.37) * 2 - pitch) * Math.min(1, dt * 1.8);
    applyRot();
  }

  // Fit the panel to the space it has
  const wrap = stage.querySelector('.h3-wrap');
  const fit = () => stage.style.setProperty('--s', Math.max(0.5, Math.min(1, wrap.clientWidth / 520)).toFixed(3));
  fit();
  if ('ResizeObserver' in window) new ResizeObserver(fit).observe(stage);

  let scanAcc = 0, lastLang = '', lastClock = '';
  function frame(dt) {
    now += dt;
    if (currentLang !== lastLang) {
      lastLang = currentLang;
      renderAlarms();
      hoursEl.textContent = (currentLang === 'no' ? '1 284' : '1,284') + ' h';
      if (online) el.innerHTML = onlineHtml();
    }
    demo(dt);
    for (scanAcc += dt; scanAcc >= 0.1; scanAcc -= 0.1) scan();
    rpm = run ? rpm + (1460 - rpm) * Math.min(1, dt * 3.5) : Math.max(0, rpm - 700 * dt);
    amp += ((run ? 7.4 + Math.sin(now * 7) * 0.08 : 0) - amp) * Math.min(1, dt * (run ? 4 : 12));
    if (!reduceMotion) beltOff = (beltOff + 40 * (rpm / 1460) * dt) % 204;
    rotate(dt);
    box.classList.toggle('run', run);
    box.classList.toggle('fault', fault);
    ampEl.textContent = num(Math.max(0, amp), 1) + ' A';
    rpmEl.textContent = Math.round(rpm) + ' rpm';
    chipEl.textContent = tr(fault ? 'hmiFault' : run ? 'hmiRunning' : 'hmiStopped');
    boxes.forEach((b, i) => b.setAttribute('x', (70 + (i * 68 + beltOff) % 204).toFixed(1)));
    const c = hhmmss(new Date());
    if (c !== lastClock) { lastClock = c; clockEl.textContent = c; }
  }
  frame(0);
  refreshHmi = () => frame(0);
  animateWhileVisible(stage, frame);

  if (reduceMotion) { goOnline(); return; }
  const vis = watchVisible(stage);
  const caretHtml = '<span class="caret"></span>';
  let n = 0;
  (function type() {
    if (!vis.visible) { setTimeout(type, 300); return; }
    const sg = segs(), total = sg.reduce((a, s) => a + s.t.length, 0);
    el.innerHTML = typedHtml(sg, ++n) + caretHtml;
    if (n < total) setTimeout(type, 22 + Math.random() * 28);
    else setTimeout(goOnline, 600);
  })();
})();

// AI task typing animation
let aiTimer = null;
function restartAiTyper() {
  clearTimeout(aiTimer);
  const el = document.getElementById('aiText');
  if (!el) return;
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  el.textContent = '';
  if (reduce) { el.textContent = COPY[currentLang].aiTasks[0]; return; }
  const card = el.closest('.tj-grid .wide');
  let li = 0, ci = 0, deleting = false;
  function tick() {
    if (card && cardIdle(card)) { aiTimer = setTimeout(tick, 300); return; }
    const lines = COPY[currentLang].aiTasks;
    const full = lines[li % lines.length];
    if (!deleting) {
      ci++;
      el.textContent = full.slice(0, ci);
      if (ci >= full.length) { deleting = true; aiTimer = setTimeout(tick, 1800); return; }
      aiTimer = setTimeout(tick, 55 + Math.random() * 45);
    } else {
      ci--;
      el.textContent = full.slice(0, Math.max(0, ci));
      if (ci <= 0) { deleting = false; li = (li + 1) % lines.length; aiTimer = setTimeout(tick, 320); return; }
      aiTimer = setTimeout(tick, 26);
    }
  }
  aiTimer = setTimeout(tick, 520);
}

// App card: SwiftUI code is typed, and the preview on the phone builds up as each line lands
let restartAppPreview = () => {};
(function setupAppPreview() {
  const el = document.getElementById('swiftCode');
  const pv = document.getElementById('appPreview');
  if (!el || !pv) return;
  const T = 'var(--accent)', B = '#7FC8FF', W = '#E4E4E7', P = '#71717A', S = '#F4B860';
  const segsFor = t => [
    { c: T, t: 'VStack' }, { c: P, t: '(' }, { c: W, t: 'spacing' }, { c: P, t: ': ' }, { c: S, t: '12' }, { c: P, t: ') {' }, { c: W, t: '\n  ' },
    { c: T, t: 'Image' }, { c: P, t: '(' }, { c: W, t: 'systemName' }, { c: P, t: ': ' }, { c: S, t: '"bolt.fill"' }, { c: P, t: ')', s: 'icon' }, { c: W, t: '\n    ' },
    { c: B, t: '.font' }, { c: P, t: '(' }, { c: B, t: '.system' }, { c: P, t: '(' }, { c: W, t: 'size' }, { c: P, t: ': ' }, { c: S, t: '56' }, { c: P, t: '))', s: 'iconSize' }, { c: W, t: '\n    ' },
    { c: B, t: '.foregroundStyle' }, { c: P, t: '(' }, { c: B, t: '.green' }, { c: P, t: ')', s: 'iconColor' }, { c: W, t: '\n  ' },
    { c: T, t: 'Text' }, { c: P, t: '(' }, { c: S, t: '"' + t.appDone + '"' }, { c: P, t: ')', s: 'title' }, { c: W, t: '\n    ' },
    { c: B, t: '.font' }, { c: P, t: '(' }, { c: B, t: '.title.bold()' }, { c: P, t: ')', s: 'titleFont' }, { c: W, t: '\n  ' },
    { c: T, t: 'Text' }, { c: P, t: '(' }, { c: S, t: '"' + t.appDoneSub + '"' }, { c: P, t: ')', s: 'sub' }, { c: W, t: '\n    ' },
    { c: B, t: '.foregroundStyle' }, { c: P, t: '(' }, { c: B, t: '.secondary' }, { c: P, t: ')', s: 'subColor' }, { c: W, t: '\n  ' },
    { c: T, t: 'Button' }, { c: P, t: '(' }, { c: S, t: '"' + t.appNewTask + '"' }, { c: P, t: ') { }', s: 'btn' }, { c: W, t: '\n    ' },
    { c: B, t: '.buttonStyle' }, { c: P, t: '(' }, { c: B, t: '.borderedProminent' }, { c: P, t: ')', s: 'btnStyle' }, { c: W, t: '\n}' }
  ];
  const caretHtml = '<span class="caret" style="width:6px;height:12px;"></span>';
  const vis = watchVisible(pv.closest('.app-stage'));
  let timer = null, n = 0, segs = [], total = 0, marks = [];
  function reset() {
    const t = COPY[currentLang];
    segs = segsFor(t);
    total = segs.reduce((a, sg) => a + sg.t.length, 0);
    marks = [];
    let c = 0;
    segs.forEach(sg => { c += sg.t.length; if (sg.s) marks.push([c, sg.s]); });
    pv.className = 'pvw';
    pv.querySelector('.pvw-title').textContent = t.appDone;
    pv.querySelector('.pvw-sub').textContent = t.appDoneSub;
    pv.querySelector('.pvw-btn').textContent = t.appNewTask;
    n = 0;
  }
  const applySteps = () => marks.forEach(([c, s]) => { if (n >= c) pv.classList.add('s-' + s); });
  function tick() {
    if (!vis.visible) { timer = setTimeout(tick, 300); return; }
    n++;
    el.innerHTML = typedHtml(segs, n) + caretHtml;
    applySteps();
    if (n < total) { timer = setTimeout(tick, 14 + Math.random() * 22); return; }
    timer = setTimeout(() => {
      pv.classList.add('tap');
      timer = setTimeout(() => {
        pv.classList.add('fade');
        timer = setTimeout(() => { reset(); el.innerHTML = caretHtml; timer = setTimeout(tick, 600); }, 450);
      }, 3000);
    }, 900);
  }
  restartAppPreview = () => {
    clearTimeout(timer);
    reset();
    if (reduceMotion) { n = total; el.innerHTML = typedHtml(segs, total); applySteps(); return; }
    el.innerHTML = caretHtml;
    timer = setTimeout(tick, 700);
  };
  restartAppPreview();
})();

// Websites card: the same small site at desktop, tablet and phone width, with scores counting up
(function setupWebDemo() {
  const stage = document.getElementById('webStage');
  if (!stage) return;
  const browser = stage.querySelector('.web-browser');
  const label = stage.querySelector('.web-device span'), px = stage.querySelector('.web-device em');
  const rings = stage.querySelectorAll('.ring');
  const STEPS = [
    { w: 1, key: 'webDesktop', px: 1280, dev: 'desktop' },
    { w: 0.68, key: 'webTablet', px: 768, dev: 'tablet' },
    { w: 0.42, key: 'webMobile', px: 390, dev: 'phone' }
  ];
  const SCORES = [99, 100, 100];
  function countTo(el, v) {
    if (reduceMotion) { el.textContent = v; return; }
    const from = +el.textContent || 0, t0 = performance.now();
    (function f(t) {
      const k = Math.min(1, (t - t0) / 1100);
      el.textContent = Math.round(from + (v - from) * (1 - Math.pow(1 - k, 3)));
      if (k < 1) requestAnimationFrame(f);
    })(t0);
  }
  function setScores(on) {
    rings.forEach((r, k) => {
      const v = on ? SCORES[k] : 0;
      r.querySelector('.fg').style.strokeDashoffset = (113.1 * (1 - v / 100)).toFixed(1);
      countTo(r.querySelector('b'), v);
    });
  }
  function show(step) {
    browser.style.width = step.w * 100 + '%';
    browser.classList.toggle('as-phone', step.dev === 'phone');
    stage.dataset.device = step.dev;
    label.textContent = COPY[currentLang][step.key];
    px.textContent = step.px + ' px';
  }
  let i = 0, started = false;
  const vis = watchVisible(stage, v => {
    if (!v || started) return;
    started = true;
    setScores(true);
    if (!reduceMotion) setTimeout(next, 2800);
  });
  function next() {
    if (!vis.visible) { setTimeout(next, 400); return; }
    i = (i + 1) % STEPS.length;
    show(STEPS[i]);
    if (i === 0) { setScores(false); setTimeout(() => setScores(true), 500); }
    setTimeout(next, 2800);
  }
  show(STEPS[0]);
})();

// AI card: jobs travel from a trigger, through the AI agent, to where they belong
(function setupAiFlow() {
  const flow = document.getElementById('aiFlow');
  if (!flow) return;
  const svg = flow.querySelector('.flow-wires');
  const NS = 'http://www.w3.org/2000/svg';
  const node = k => flow.querySelector('[data-node="' + k + '"]');
  const ai = node('ai');
  const inputs = ['mail', 'form', 'cron'], outputs = ['ticket', 'crm', 'report'];
  const routes = { mail: ['ticket', 'ticket', 'crm'], form: ['crm'], cron: ['report'] };
  const order = ['mail', 'form', 'mail', 'cron', 'mail', 'form'];
  const wires = {};
  inputs.concat(outputs).forEach(k => {
    const el = document.createElementNS(NS, 'path');
    svg.appendChild(el);
    wires[k] = { el, len: 0, busy: 0 };
  });
  function layout() {
    const box = flow.getBoundingClientRect();
    if (!box.width) return;
    svg.setAttribute('viewBox', '0 0 ' + box.width + ' ' + box.height);
    const at = el => { const b = el.getBoundingClientRect(); return { l: b.left - box.left, r: b.right - box.left, y: b.top - box.top + b.height / 2 }; };
    const curve = (x1, y1, x2, y2) => { const m = (x2 - x1) / 2; return 'M' + x1 + ',' + y1 + ' C' + (x1 + m) + ',' + y1 + ' ' + (x2 - m) + ',' + y2 + ' ' + x2 + ',' + y2; };
    const a = at(ai);
    inputs.forEach(k => { const s = at(node(k)); wires[k].el.setAttribute('d', curve(s.r, s.y, a.l, a.y)); });
    outputs.forEach(k => { const o = at(node(k)); wires[k].el.setAttribute('d', curve(a.r, a.y, o.l, o.y)); });
    Object.values(wires).forEach(w => { w.len = w.el.getTotalLength(); });
  }
  layout();
  if ('ResizeObserver' in window) {
    const ro = new ResizeObserver(layout);
    ro.observe(flow);
    flow.querySelectorAll('.fnode').forEach(n => ro.observe(n));
  }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(layout);
  if (reduceMotion) return;

  const IN = 0.9, THINK = 0.7, OUT = 0.9;
  const ease = k => (k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2);
  const jobs = [];
  let t = 0, nextJob = 0.4, orderIdx = 0;
  function ping(el) { el.classList.add('ping'); setTimeout(() => el.classList.remove('ping'), 90); }
  function hold(k) { wires[k].busy++; wires[k].el.classList.add('hot'); }
  function release(k) { if (--wires[k].busy <= 0) { wires[k].busy = 0; wires[k].el.classList.remove('hot'); } }
  function place(dot, w, k) {
    if (!w.len) return;
    const p = w.el.getPointAtLength(w.len * k);
    dot.setAttribute('cx', p.x.toFixed(1));
    dot.setAttribute('cy', p.y.toFixed(1));
  }
  function spawn() {
    const src = order[orderIdx++ % order.length];
    const outs = routes[src];
    const dot = document.createElementNS(NS, 'circle');
    dot.setAttribute('r', '3');
    svg.appendChild(dot);
    jobs.push({ src, out: outs[Math.floor(Math.random() * outs.length)], t0: t, dot, stage: 0 });
    place(dot, wires[src], 0);
    ping(node(src));
    hold(src);
  }
  animateWhileVisible(flow, dt => {
    t += dt;
    if (t >= nextJob) { spawn(); nextJob = t + 1.1 + Math.random() * 0.7; }
    let thinking = 0;
    for (let i = jobs.length - 1; i >= 0; i--) {
      const j = jobs[i], e = t - j.t0;
      if (e < IN) {
        place(j.dot, wires[j.src], ease(e / IN));
      } else if (e < IN + THINK) {
        if (j.stage === 0) { j.stage = 1; release(j.src); j.dot.style.opacity = 0; }
        thinking++;
      } else if (e < IN + THINK + OUT) {
        if (j.stage === 1) { j.stage = 2; j.dot.style.opacity = 1; hold(j.out); }
        place(j.dot, wires[j.out], ease((e - IN - THINK) / OUT));
      } else {
        release(j.out);
        const target = node(j.out);
        ping(target);
        const cnt = target.querySelector('.cnt');
        cnt.textContent = +cnt.textContent + 1;
        j.dot.remove();
        jobs.splice(i, 1);
      }
    }
    ai.classList.toggle('busy', thinking > 0);
  });
})();

// Header background on scroll
const headerEl = document.querySelector('header');
function onScroll() { headerEl.classList.toggle('scrolled', window.scrollY > 12); }
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Close mobile menu after picking a link
document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => {
  document.getElementById('mainNav').classList.remove('open');
  document.getElementById('navToggle').setAttribute('aria-expanded', 'false');
}));

// Scroll to in-page sections ourselves, so links also work where
// hash navigation is blocked (e.g. previews that load the page as a data: URL)
document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
  const id = a.getAttribute('href').slice(1);
  const target = id && document.getElementById(id);
  if (!target) return;
  e.preventDefault();
  glideTo(target);
  try { history.pushState(null, '', '#' + id); } catch (err) {}
}));

// Coming from another page with a link like index.html#tjenester: go to that section once the page
// has its final layout (fonts and animations can move it after the browser's own jump)
(function jumpToHash() {
  const id = decodeURIComponent(location.hash.slice(1));
  const target = id && document.getElementById(id);
  if (!target) return;
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  // stop correcting as soon as the visitor scrolls themselves
  let moved = false;
  ['wheel', 'touchstart', 'keydown'].forEach(ev => window.addEventListener(ev, () => { moved = true; }, { passive: true, once: true }));
  const go = () => {
    if (moved) return;
    const root = document.documentElement, prev = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto';
    target.scrollIntoView({ block: 'start' });
    root.style.scrollBehavior = prev;
  };
  go();
  window.addEventListener('load', go, { once: true });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(go);
})();

// Slow, eased scroll (the browser's own smooth scroll is quite fast).
// Stops as soon as the visitor scrolls themselves.
function glideTo(target) {
  const root = document.documentElement;
  const offset = parseFloat(getComputedStyle(root).scrollPaddingTop) || 0;
  const startY = window.scrollY;
  const endY = Math.min(target.getBoundingClientRect().top + startY - offset, root.scrollHeight - window.innerHeight);
  const distance = endY - startY;
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || Math.abs(distance) < 2) { window.scrollTo(0, endY); return; }
  const duration = Math.min(1800, Math.max(1000, 700 + Math.abs(distance) * 0.35));
  const ease = k => (k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2);
  const prevBehavior = root.style.scrollBehavior;
  root.style.scrollBehavior = 'auto';
  let start = null, cancelled = false;
  const cancel = () => { cancelled = true; };
  const events = ['wheel', 'touchstart', 'keydown', 'mousedown'];
  events.forEach(ev => window.addEventListener(ev, cancel, { passive: true, once: true }));
  const finish = () => {
    events.forEach(ev => window.removeEventListener(ev, cancel));
    root.style.scrollBehavior = prevBehavior;
  };
  requestAnimationFrame(function step(now) {
    if (cancelled) { finish(); return; }
    if (start === null) start = now;
    const k = Math.min(1, (now - start) / duration);
    window.scrollTo(0, startY + distance * ease(k));
    if (k < 1) requestAnimationFrame(step); else finish();
  });
}

// Electrical drawing: draw the schematic each time it scrolls into view
(function setupSchematic() {
  const svg = document.querySelector('.schem');
  if (!svg) return;
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) { svg.classList.add('go'); return; }
  new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.intersectionRatio >= 0.35 && !svg.classList.contains('go')) {
      svg.classList.remove('reset');
      svg.getBoundingClientRect();
      svg.classList.add('go');
    } else if (!entry.isIntersecting) {
      svg.classList.add('reset');
      svg.classList.remove('go');
    }
  }), { threshold: [0, 0.35] }).observe(svg);
})();

// 3D card: switch between field level and cloud / remote access
(function setupCommViews() {
  const host = document.getElementById('comm3d');
  if (!host) return;
  const buttons = host.querySelectorAll('.comm3d-views button');
  buttons.forEach(btn => btn.addEventListener('click', () => {
    const view = btn.dataset.view;
    buttons.forEach(b => {
      b.classList.toggle('on', b === btn);
      b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
    });
    document.querySelectorAll('.comm-pane').forEach(p => p.classList.toggle('on', p.dataset.pane === view));
    host.dataset.view = view;
    host.classList.toggle('view-ot', view === 'ot');
    host.dispatchEvent(new CustomEvent('commview', { detail: view }));
  }));
})();

// Pause decorative animations while they are off-screen
(function setupPause() {
  if (!('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => entry.target.classList.toggle('offscreen', !entry.isIntersecting));
  });
  document.querySelectorAll('.schem-wrap, .marquee').forEach(el => io.observe(el));
})();

// Highlight the nav link for the section in view
(function setupActiveNav() {
  if (!('IntersectionObserver' in window)) return;
  const links = {};
  document.querySelectorAll('.nav-links a[href^="#"]:not(.btn-cta)').forEach(a => { links[a.getAttribute('href').slice(1)] = a; });
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      Object.values(links).forEach(l => l.classList.remove('active'));
      const link = links[entry.target.id];
      if (link) link.classList.add('active');
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  document.querySelectorAll('main section').forEach(sec => io.observe(sec));
})();

// Light / dark theme
(function setupTheme() {
  const root = document.documentElement;
  const meta = document.querySelector('meta[name="theme-color"]');
  const sync = () => { meta.content = root.dataset.theme === 'dark' ? '#0B0D0C' : '#F6F8F6'; };
  sync();
  // Follows the device's light / dark setting until the visitor picks one with the toggle
  const mq = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
  const saved = () => { try { return localStorage.getItem('walde-theme'); } catch (e) { return null; } };
  function apply(theme) {
    root.classList.add('theme-anim');
    if (theme === 'dark') root.dataset.theme = 'dark'; else delete root.dataset.theme;
    sync();
    setTimeout(() => root.classList.remove('theme-anim'), 450);
  }
  document.getElementById('themeToggle').addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    apply(next);
    // Picking the same as the device goes back to following the device
    try {
      if (mq && (next === 'dark') === mq.matches) localStorage.removeItem('walde-theme');
      else localStorage.setItem('walde-theme', next);
    } catch (e) {}
  });
  if (mq && mq.addEventListener) mq.addEventListener('change', e => { if (!saved()) apply(e.matches ? 'dark' : 'light'); });
})();

// Services: each card comes in step by step as you scroll to it, and only the card in focus
// animates, so several animations never run side by side
(function setupServiceFocus() {
  const cards = [...document.querySelectorAll('.tj-grid > .wide')];
  if (!cards.length) return;
  const clamp01 = v => Math.min(1, Math.max(0, v));
  let focus = null;
  function setFocus(best) {
    if (best === focus) return;
    focus = best;
    cards.forEach((c, i) => {
      const idle = i !== focus;
      if (idle === cardIdle(c)) return;
      c.classList.toggle('idle', idle);
      if (!idle) c.dispatchEvent(new Event('wake'));
    });
  }
  function update() {
    const vh = window.innerHeight, mid = vh / 2;
    let best = -1, bestD = Infinity;
    cards.forEach((c, i) => {
      // Layout position, unaffected by the card's own lift and scale
      // (cards can sit in different sections, so measure from each card's own offset parent)
      const top = c.offsetParent.getBoundingClientRect().top + c.offsetTop, bottom = top + c.offsetHeight;
      if (!reduceMotion) {
        // 0 while the card is below the screen, 1 once its top is a little above the middle
        c.style.setProperty('--p', clamp01((vh - top) / (vh * 0.6)).toFixed(3));
      }
      if (bottom < 0 || top > vh) return;
      const d = top <= mid && bottom >= mid ? 0 : Math.min(Math.abs(top - mid), Math.abs(bottom - mid));
      if (d < bestD) { bestD = d; best = i; }
    });
    setFocus(best);
  }
  let queued = false;
  window.addEventListener('scroll', () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => { queued = false; update(); });
  }, { passive: true });
  window.addEventListener('resize', update);
  update();
})();

// Gentle fade-up as content scrolls into view
(function setupReveal() {
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('section:not(.hero) .eyebrow, section:not(.hero) .section-title, .om-card, .komp-card, .svc-card, .svc-cta, .prosj-card, .kontakt-form-card, .kontakt-info').forEach(el => {
    const i = Array.prototype.indexOf.call(el.parentNode.children, el);
    el.classList.add('reveal');
    el.style.setProperty('--d', (i % 3) * 70 + 'ms');
    io.observe(el);
  });
})();

applyLang(currentLang);
