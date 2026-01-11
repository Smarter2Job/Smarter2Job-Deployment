# 🚀 Push & Deployment Anleitung

## Aktueller Status
✅ **Commit lokal erstellt** (Hash: `6fe2871`)
❌ **Push zu GitHub noch ausstehend**
❌ **Netlify Deployment noch nicht getriggert**

## Schritt 1: Push zu GitHub

Öffne ein Terminal und führe aus:

```bash
cd /Users/martinbeyer/Documents/Smarter2Job-Deployment
git push origin main
```

**Falls Authentifizierung benötigt wird:**

### Option A: GitHub Personal Access Token (empfohlen)
1. Gehe zu: https://github.com/settings/tokens
2. Klicke "Generate new token" → "Generate new token (classic)"
3. Wähle Scopes: `repo` (vollständiger Repository-Zugriff)
4. Kopiere den Token
5. Wenn Git nach Username/Password fragt:
   - Username: Dein GitHub-Username
   - Password: Der Token (nicht dein Passwort!)

### Option B: GitHub CLI (falls installiert)
```bash
gh auth login
git push origin main
```

### Option C: SSH (falls SSH-Keys konfiguriert)
```bash
git remote set-url origin git@github.com:Smarter2Job/Smarter2Job-Deployment.git
git push origin main
```

## Schritt 2: Netlify Auto-Deploy prüfen

Nach erfolgreichem Push sollte Netlify automatisch deployen (wenn Auto-Deploy aktiviert ist).

**Prüfen:**
1. Gehe zu: https://app.netlify.com
2. Klicke auf deine Site (Smarter2Job)
3. Gehe zum **Deploys** Tab
4. Du solltest einen neuen Deploy sehen, der automatisch gestartet wurde

**Falls Auto-Deploy nicht funktioniert:**
- Prüfe, ob GitHub-Integration aktiviert ist
- Site Settings → Build & deploy → Continuous Deployment
- Repository sollte verbunden sein: `Smarter2Job/Smarter2Job-Deployment`

## Schritt 3: Manuelles Deploy (optional)

Falls Auto-Deploy nicht funktioniert:

1. Netlify Dashboard → Deine Site
2. **Deploys** Tab
3. Klicke **Trigger deploy** (rechts oben)
4. Wähle **Deploy site**
5. Warte 2-3 Minuten

## Was wurde geändert?

**Commit:** `6fe2871 - feat: Landingpage A komplett neu aufgesetzt`

**Geänderte Dateien:**
- `src/components/Smarter2JobLanding.tsx` (neue schlanke Struktur)
- `src/components/RedFlagTeaser.tsx` (neue Texte)
- `package.json` (Landingpage 1 Identifikation)
- `README.md` (Landingpage 1 Identifikation)

**Änderungen:**
- ✂️ ~1832 Zeilen entfernt (alte Sections)
- ➕ ~209 Zeilen hinzugefügt (neue schlanke Struktur)
- 🎯 8 Sections: Hero, Input, So funktioniert's, Outcomes, Pakete, FAQ, Closing, Footer

## Build-Konfiguration (Netlify)

Die `netlify.toml` ist bereits korrekt konfiguriert:
- Build Command: `npm run build`
- Publish Directory: `dist`
- Functions: `netlify/functions/`

**Viel Erfolg! 🎉**
