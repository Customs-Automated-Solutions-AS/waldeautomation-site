# Walde Automation – nettside

Enkel statisk nettside (HTML/CSS/JS), klar for versjonskontroll og gratis hosting via GitHub Pages.

## Struktur

```
waldeautomation-site/
├── index.html
├── personvern.html
├── css/
│   └── style.css
├── js/
│   └── script.js
└── images/          (tom – legg bilder her)
```

## 1. Legg koden i git

```bash
cd waldeautomation-site
git init
git add .
git commit -m "Første versjon av nettsiden"
```

## 2. Push til GitHub

1. Opprett et nytt (tomt) repo på github.com, f.eks. `waldeautomation-site`
2. Koble lokalt repo til GitHub:

```bash
git remote add origin https://github.com/DITT-BRUKERNAVN/waldeautomation-site.git
git branch -M main
git push -u origin main
```

## 3. Skru på GitHub Pages

1. Gå til repoet på github.com → **Settings** → **Pages**
2. Under **Source**, velg branch `main` og mappe `/ (root)`
3. Klikk **Save**

Du får nå en adresse på formen `dittbrukernavn.github.io/waldeautomation-site`.

## 4. Verifiser det egendefinerte domenet (viktig, gjør dette FØR steg 5)

For å hindre at noen andre kan koble waldeautomation.no til sitt eget repo:

1. Gå til github.com → profilinnstillinger → **Settings** → **Pages** → **Verified domains**
2. Følg GitHubs veiledning for å legge til en TXT-record hos domene.no som bekrefter at du eier domenet

## 5. Koble på eget domene (waldeautomation.no)

1. I repoet: **Settings → Pages**, skriv `waldeautomation.no` i feltet **Custom domain** → **Save**
   (dette lager automatisk en `CNAME`-fil i repoet ditt)
2. Logg inn på [domene.no](https://domene.no) → DNS-innstillinger for domenet, og legg til:

   **A-records** for rot-domenet (`@`) – legg til alle fire:
   ```
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```

   **CNAME** for `www` → `dittbrukernavn.github.io`

3. Vent på DNS-propagering (minutter til noen timer)
4. Når det er klart: huk av **Enforce HTTPS** i GitHub Pages-innstillingene

## Sikkerhet – kort sjekkliste

- [ ] 2FA på GitHub-kontoen
- [ ] 2FA på Domeneshop-kontoen
- [ ] Domenet verifisert i GitHub (steg 4 over)
- [ ] Ingen API-nøkler i klientkode (f.eks. hvis du kobler til Formspree)

## Neste steg

- **Design:** HTML-strukturen er semantisk og umerket av designvalg, klar for styling i Claude Design.
- **Kontaktskjema:** Skjemaet validerer i klienten, men sender ikke noe ennå. Koble til f.eks.
  [Formspree](https://formspree.io) (gratis, enkel), eller en egen løsning.
- **Innhold:** Bytt ut placeholder-tekst i "Referanseprosjekter", org.nr i footer og i
  `personvern.html`, samt navn på ev. sendetjeneste i personvernerklæringen.
- **Personvern:** `personvern.html` er et utgangspunkt, ikke ferdig juridisk tekst –
  vurder om du trenger bistand til å kvalitetssikre den, spesielt om du legger til
  analytics/cookies senere.
