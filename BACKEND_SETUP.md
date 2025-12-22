# Backend-Setup für Red Flag Teaser API

## Aktueller Status

Die Red Flag Teaser-Komponente ist integriert und funktioniert mit **Mock-Daten** für die Entwicklung. Für die Produktion benötigst du eine Backend-API, die die Claude API aufruft.

## Optionen für Backend-Integration

### Option 1: Express.js Backend (Empfohlen)

1. **Neues Backend-Projekt erstellen:**
```bash
mkdir smarter2job-backend
cd smarter2job-backend
npm init -y
npm install express @anthropic-ai/sdk cors dotenv
npm install --save-dev @types/express @types/node typescript ts-node
```

2. **API-Route erstellen:** Siehe `src/api/analyzeTeaser.example.ts` für vollständigen Code

3. **Server starten:**
```bash
npm run dev
```

4. **Vite Proxy konfiguriert:** Die `vite.config.ts` leitet `/api`-Requests an `http://localhost:3000` weiter

### Option 2: Netlify Functions (für Netlify Deployment)

1. **Netlify Functions erstellen:**
```bash
mkdir netlify/functions
```

2. **Function erstellen:** `netlify/functions/analyze-teaser.ts`
   - Nutze den Code aus `src/api/analyzeTeaser.example.ts`
   - Passe für Netlify Serverless Functions an

3. **Environment Variables auf Netlify setzen:**
   - Gehe zu: Netlify Dashboard → Site Settings → Environment Variables
   - Füge hinzu: `CLAUDE_API_KEY` = `sk-ant-api03-...`

### Option 3: Vercel Serverless Functions (für Vercel Deployment)

1. **API-Route erstellen:** `api/analyze-teaser.ts`
   - Nutze den Code aus `src/api/analyzeTeaser.example.ts`
   - Passe für Vercel Serverless Functions an

2. **Environment Variables auf Vercel setzen:**
   - Gehe zu: Vercel Dashboard → Project Settings → Environment Variables
   - Füge hinzu: `CLAUDE_API_KEY` = `sk-ant-api03-...`

## Claude API Key erhalten

1. Gehe zu: https://console.anthropic.com/
2. Melde dich an (oder erstelle Account)
3. Navigiere zu: **API Keys** → **Create Key**
4. Kopiere den Key (beginnt mit `sk-ant-api03-...`)
5. Füge ihn in deine Environment Variables ein

## Aktuelle Mock-Implementierung

Die `RedFlagTeaser.tsx` Komponente verwendet aktuell Mock-Daten, wenn die API nicht erreichbar ist. Das ist perfekt für die Entwicklung, aber für die Produktion solltest du die echte API einrichten.

## Kosten

**Claude API:**
- ~$0.02 pro Analyse
- 100 Analysen/Tag = $60/Monat
- ROI: ~2.350% (bei 40% Conversion)

## Testing

1. Starte den Dev-Server: `npm run dev`
2. Öffne: http://localhost:5173
3. Scrolle zur "Erste Karte aufdecken" Sektion
4. Füge eine Job-Beschreibung ein
5. Klicke auf "Erste Karte aufdecken"
6. Mock-Daten werden angezeigt (bis Backend eingerichtet ist)

## Nächste Schritte

1. ✅ Red Flag Teaser Komponente erstellt
2. ✅ In Landing Page integriert
3. ✅ Mock-Daten für Entwicklung
4. ⏳ Backend-API einrichten (Express.js / Netlify Functions / Vercel)
5. ⏳ Claude API Key konfigurieren
6. ⏳ Echte API-Integration testen
7. ⏳ Deployment


