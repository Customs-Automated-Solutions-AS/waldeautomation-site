# Walde Automation – nettside

Enkel statisk nettside. CSS og JS ligger inline i hver HTML-fil (ingen mapper),
klar for å laste rett opp til GitHub.

## Struktur

```
waldeautomation-site/
├── index.html        (inkl. CSS og JS inline)
├── personvern.html    (inkl. CSS og JS inline)
├── CNAME
└── README.md
```

## 1. Last opp til GitHub

Bruk **Add file → Upload files** på repo-siden, eller dra filene inn i
GitHub Desktop og commit + publish. Siden alt ligger flatt (ingen undermapper),
er det ingenting som kan gå galt med filstrukturen ved opplasting.

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
- **Kontaktskjema:** Validerer i klienten, men sender ikke noe ennå. Koble til
  f.eks. [Formspree](https://formspree.io).
- **Innhold:** Bytt ut `[org.nr]`, `[dato]` og placeholder-prosjekttekster.
- Hvis du senere vil dele opp CSS/JS i egne filer igjen (f.eks. når siden vokser),
  er det bare å be meg om det – nå er alt inline for å gjøre opplastingen enklest mulig.
