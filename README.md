# Walde Automation – nettside

Enkel statisk nettside. Alle filer ligger flatt i rotmappen (ingen undermapper).
Forsiden har en kort oversikt over tjenestene, og hver tjeneste har sin egen side
med den interaktive demoen.

## Struktur

```
waldeautomation-site/
├── index.html                       (forside: om, kompetanse, tjenesteoversikt, kontakt)
├── pls-hmi-programmering.html       (tjenesteside)
├── industriell-kommunikasjon.html   (tjenesteside, 3D-modell i comm3d.js)
├── elektroteknisk-radgivning.html   (tjenesteside)
├── app-utvikling.html               (tjenesteside)
├── nettsider.html                   (tjenesteside)
├── ai-integrasjon.html              (tjenesteside)
├── varmeovervaking.html             (tjenesteside, 3D-modell i heat3d.js)
├── site.css                         (felles stil for alle sidene over)
├── site.js                          (felles skript: språk, tema, meny, skjema, demoer)
├── comm3d.js / heat3d.js            (3D-modellene, lastes bare på sin side)
├── personvern.html       (inkl. CSS og JS inline)
├── logo.png              (logoen i toppmeny og kontaktkort)
├── favicon.png           (ikon i nettleserfanen)
├── apple-touch-icon.png  (ikon på iPhone-hjemskjerm)
├── og-image.jpg          (bilde når lenken deles)
├── sitemap.xml           (sideoversikt for Google)
├── robots.txt            (peker søkemotorer til sitemap.xml)
├── CNAME
└── README.md
```

Alle tekster (norsk og engelsk) ligger i `COPY` øverst i `site.js`. Hver side har
`data-page` på `<html>`, som velger sidetittel og beskrivelse (f.eks. `plsMetaTitle`).
Toppmeny og bunntekst er kopiert inn i hver side, så endringer der må gjøres i alle.

## 1. Last opp til GitHub

Bruk **Add file → Upload files** på repo-siden, eller dra filene inn i
GitHub Desktop og commit + publish. Siden alt ligger flatt (ingen undermapper),
er det ingenting som kan gå galt med filstrukturen ved opplasting. Husk å laste opp
alle filene, også `site.css`, `site.js`, `comm3d.js` og `heat3d.js`.

## 2. Skru på GitHub Pages

1. Repo → **Settings** → **Pages**
2. Under **Source**, velg **Deploy from a branch**
3. **Branch:** `main`, mappe: **/ (root)** → **Save**
4. Vent ~1 min, refresh → du får en live-URL

## 3. Verifiser det egendefinerte domenet (gjør dette FØR steg 4)

1. github.com → profilbilde → **Settings** (kontoinnstillinger) → **Pages** → **Verified domains**
2. **Add a domain** → `waldeautomation.no`
3. Legg til TXT-recorden GitHub gir deg hos domene.no → kom tilbake og **Verify**

## 4. Koble på eget domene (waldeautomation.no)

1. Repo → **Settings → Pages** → **Custom domain**: skriv `waldeautomation.no` → **Save**
   (dette oppdaterer `CNAME`-filen automatisk – den ligger allerede i repoet)
2. Hos domene.no → DNS-innstillinger, legg til:

   **A-records** for rot-domenet (`@`) – alle fire:
   ```
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```

   **CNAME** for `www` → `dittbrukernavn.github.io`

3. Vent på DNS-propagering, huk deretter av **Enforce HTTPS** i Pages-innstillingene

## Sikkerhet – kort sjekkliste

- [ ] 2FA på GitHub-kontoen
- [ ] 2FA på Domeneshop-kontoen
- [ ] Domenet verifisert i GitHub (steg 3 over)
- [ ] Ingen API-nøkler i klientkode (f.eks. hvis du kobler til Formspree)

## Neste steg

- **Design:** Alt er ren struktur, ingen designbeslutninger – klart for Claude Design.
- **Kontaktskjema:** Sendes via [Web3Forms](https://web3forms.com) (access key ligger i
  `site.js`; den er laget for å være offentlig).
- **Innhold:** Bytt ut `[org.nr]`, `[dato]` og placeholder-prosjekttekster.
