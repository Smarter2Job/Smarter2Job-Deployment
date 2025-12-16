# 🚀 Netlify Deployment - Smarter2Job

## ✅ Was wurde gemacht

1. ✅ **Mock-Daten entfernt** - Alle Mock-Daten aus `RedFlagTeaser.tsx` entfernt
2. ✅ **Netlify Function erstellt** - `netlify/functions/analyze-teaser.ts` mit Claude API Integration
3. ✅ **Komponente aktualisiert** - Nutzt jetzt echte API statt Mock-Daten
4. ✅ **Dependencies installiert** - `@anthropic-ai/sdk` und `@netlify/functions`
5. ✅ **Build getestet** - Production Build funktioniert

## 🔑 WICHTIGSTER SCHRITT: Environment Variable setzen

**Nach dem Deployment in Netlify:**

1. Gehe zu: https://app.netlify.com
2. Klicke auf deine Site (Smarter2Job)
3. **Site Settings** (oben rechts)
4. Linke Sidebar: **Environment variables**
5. Klicke **Add a variable**

**Füge ein:**
```
Key:   CLAUDE_API_KEY
Value: sk-ant-api03-[DEIN_KEY_HIER]
Scopes: ☑ All scopes (oder Builds + Functions)
```

6. **Save** klicken

**⚠️ WICHTIG:** Nach dem Speichern MUSS die Site neu deployt werden!

## 🔄 Re-Deploy triggern

**Option A: Automatisch**
- Pushe nochmal etwas zu Git
- Netlify deployed automatisch

**Option B: Manuell** (schneller!)
1. Gehe zu **Deploys** Tab
2. Klicke **Trigger deploy** Button (rechts oben)
3. Wähle **Deploy site**
4. Warte 2-3 Minuten

## 🧪 Testen

1. Öffne deine Live-Site: `https://[deine-site].netlify.app`
2. Scrolle zum Red Flag Teaser
3. Füge eine ECHTE Job-Description ein (z.B. von LinkedIn)
4. Klicke "Erste Karte aufdecken"

**Erwartetes Ergebnis:**
- ✅ 3-5 Red Flags, die SPEZIFISCH zur eingegebenen Stelle passen
- ✅ Zitate aus der tatsächlichen Job-Description
- ✅ KEINE generischen Mock-Daten mehr

## 📊 Netlify Function Logs prüfen

**So siehst du, was die API macht:**

1. Netlify Dashboard → Deine Site
2. **Functions** Tab (oben)
3. Klicke auf `analyze-teaser`
4. **Logs** (rechts)

**Du solltest sehen:**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚀 API Route: /api/analyze-teaser
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔑 API Key Check:
   - CLAUDE_API_KEY present: true ✅
📤 Sende Request an Claude API...
✅ Claude Response erhalten in 2456 ms
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ ERFOLG - Parsed Result:
   - Total Red Flags: 7
   - Shown Red Flags: 4
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Falls du siehst:**
```
🔑 API Key present: false ❌
```
→ Environment Variable nicht gesetzt oder Re-Deploy vergessen!

## 🐛 Troubleshooting

### Problem 1: "API Key not found" Error

**Lösung:**
1. Prüfe Netlify Environment Variables
   → Site Settings → Environment variables
   → Ist CLAUDE_API_KEY gesetzt?
2. Prüfe Key ist korrekt
   → Muss beginnen mit: `sk-ant-api03-`
   → Keine Leerzeichen vor/nach dem Key
3. Re-Deploy!
   → Deploys Tab → Trigger deploy → Deploy site

### Problem 2: "Function invocation failed"

**Lösung:**
1. Gehe zu: Site Settings → Functions
2. Erhöhe "Functions timeout" auf 26 seconds
3. Save
4. Re-Deploy

### Problem 3: Build schlägt fehl

**Lösung:**
```bash
# Terminal:
npm install @anthropic-ai/sdk @netlify/functions

# Commit & Push:
git add package.json package-lock.json
git commit -m "fix: Add dependencies"
git push
```

## 💰 Kosten im Blick behalten

**Claude API kostet Geld!**

- ~$0.02 pro Analyse
- 100 Tests/Tag = $2
- 1000 Analysen = $20

**Budget setzen:**
1. Gehe zu https://console.anthropic.com/settings/limits
2. Setze Monthly Budget auf $50 (oder weniger)
3. Email Alert bei 80% einrichten

## 📁 Dateistruktur

```
Smarter2Job-Deployment/
├── netlify/
│   └── functions/
│       └── analyze-teaser.ts    ← Netlify Function mit Claude API
├── src/
│   └── components/
│       └── RedFlagTeaser.tsx    ← Frontend Komponente (ohne Mock-Daten)
├── netlify.toml                 ← Netlify Konfiguration
└── package.json                  ← Dependencies
```

## ✅ Checkliste vor Deployment

- [x] Mock-Daten entfernt
- [x] Netlify Function erstellt
- [x] Dependencies installiert
- [x] Build getestet
- [ ] Git committed & gepusht
- [ ] Netlify Site erstellt
- [ ] Environment Variable `CLAUDE_API_KEY` gesetzt
- [ ] Re-Deploy getriggert
- [ ] Live-Site getestet

## 🎯 Nächste Schritte

1. **Git Push:**
   ```bash
   git add .
   git commit -m "feat: Remove mock data, integrate Claude API"
   git push origin main
   ```

2. **Netlify Environment Variable setzen** (siehe oben)

3. **Re-Deploy** (siehe oben)

4. **Testen** auf Live-Site

**Viel Erfolg! 🎉**

