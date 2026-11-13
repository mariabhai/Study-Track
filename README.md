# StudyTrack

StudyTrack är en kursöversikt över min utbildning, byggd med React och TypeScript som en individuell inlämningsuppgift.

## Länkar

- GitHub: https://github.com/mariabhai/Study-Track
- Vercel: https://study-track-wheat.vercel.app

## Funktioner

- Visa alla kurser som kurskort.
- Filtrera på Alla, Kommande, Pågående och Avslutade.
- Visa en detaljsida med bild, status, kurspoäng och längd samt utbildningsmoment.
- Skapa, redigera och ta bort kurser.
- Visa laddningsindikatorer och felmeddelanden vid API-anrop.
- Visa en 404-sida för adresser som inte finns.
- Responsiv design för mobil, surfplatta och dator.

## Teknik

- React
- TypeScript
- Vite
- React Router
- CSS
- Fetch API

## Kör projektet lokalt

Du behöver ha Node.js och npm installerat.

1. Klona projektet:

   ```bash
   git clone https://github.com/mariabhai/Study-Track.git
   cd Study-Track
   ```

2. Installera beroenden:

   ```bash
   npm install
   ```

3. Starta utvecklingsservern:

   ```bash
   npm run dev
   ```

4. Öppna adressen som visas i terminalen.

## Övriga kommandon

```bash
npm run build
```

Kontrollerar TypeScript och bygger appen för publicering.

```bash
npm run lint
```

Kontrollerar koden med ESLint.

```bash
npm run preview
```

Visar den byggda appen lokalt efter att du kört build.

## API

Appen använder Shelf API för att hämta, skapa, ändra och ta bort kurser.

- Dokumentation: https://shelf-api-mu.vercel.app/docs
- Handle: `maria-studytrack`
- API-adress: https://shelf-api-mu.vercel.app/api/maria-studytrack/items

API-inställningarna finns i `src/config.ts`.

API:et kallar posterna `items`, men i appen visas de som kurser.
Kurslängd sparas i `subtitle` och utbildningsmoment i `tags`.

Shelf API saknar inloggning. Handle skiljer olika samlingar åt,
men alla som känner till det kan ändra innehållet. 

## Betygsnivå

Projektet är byggt för G-kraven med CRUD, komponenter med props,
routing, TypeScript, laddningsindikatorer och felhantering.

VG-funktionerna med egna fetch-hooks och ett filter som sparas
med useLocalStorage är inte implementerade.
