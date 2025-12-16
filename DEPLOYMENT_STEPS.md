# 🚀 Deployment zu Netlify - Schritt für Schritt

## ✅ Git Commit ist fertig!

Der Code wurde erfolgreich committed:
```
Commit: feat: Remove mock data, integrate Claude API with Netlify Functions
```

## 📋 Nächste Schritte

### Option 1: GitHub/GitLab/Bitbucket + Netlify (Empfohlen)

**1. Erstelle ein Git-Repository:**

**GitHub:**
```bash
# Erstelle ein neues Repo auf github.com
# Dann:
git remote add origin https://github.com/DEIN_USERNAME/smarter2job-deployment.git
git branch -M main
git push -u origin main
```

**GitLab:**
```bash
# Erstelle ein neues Repo auf gitlab.com
# Dann:
git remote add origin https://gitlab.com/DEIN_USERNAME/smarter2job-deployment.git
git branch -M main
git push -u origin main
```

**2. Netlify Deployment:**

1. Gehe zu: https://app.netlify.com
2. Klicke auf **"Add new site"** → **"Import an existing project"**
3. Wähle deinen Git-Provider (GitHub/GitLab/Bitbucket)
4. Wähle das Repository: `smarter2job-deployment`
5. Build Settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
6. Klicke **"Deploy site"**

**3. Environment Variable setzen:**

Nach dem ersten Deployment:

1. Gehe zu: **Site Settings** → **Environment variables**
2. Klicke **"Add a variable"**
3. Füge ein:
   ```
   Key:   CLAUDE_API_KEY
   Value: sk-ant-api03-[DEIN_KEY_HIER]
   Scopes: ☑ All scopes
   ```
4. **Save**
5. **Re-Deploy** triggern (Deploys Tab → Trigger deploy)

---

### Option 2: Direktes Deployment mit Netlify CLI

**1. Netlify Login:**
```bash
npx netlify login
```
(Folge den Anweisungen im Browser)

**2. Deploy:**
```bash
npx netlify deploy --prod --dir=dist
```

**3. Environment Variable setzen:**
- Gehe zu: https://app.netlify.com
- Site Settings → Environment variables
- Füge `CLAUDE_API_KEY` hinzu
- Re-Deploy

---

## 🔍 Aktueller Git-Status

```bash
# Prüfe Status:
git status

# Zeige letzten Commit:
git log --oneline -1
```

## 📝 Wichtige Dateien

- ✅ `netlify.toml` - Netlify Konfiguration
- ✅ `netlify/functions/analyze-teaser.ts` - Claude API Function
- ✅ `src/components/RedFlagTeaser.tsx` - Frontend (ohne Mock-Daten)
- ✅ `.gitignore` - Git Ignore Rules

## 🎯 Nach dem Deployment

1. **Teste die Live-Site:**
   - Öffne: `https://[deine-site].netlify.app`
   - Teste den Red Flag Teaser

2. **Prüfe Function Logs:**
   - Netlify Dashboard → Functions Tab
   - Klicke auf `analyze-teaser`
   - Prüfe Logs für Fehler

3. **Environment Variable prüfen:**
   - Site Settings → Environment variables
   - Stelle sicher, dass `CLAUDE_API_KEY` gesetzt ist

---

**Viel Erfolg! 🚀**

