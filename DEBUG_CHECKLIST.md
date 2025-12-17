# Debug-Checklist für Red Flag Teaser

## Fehler: 500 Status bei /.netlify/functions/analyze-teaser

### 1. API Key prüfen

**Gehe zu:** https://app.netlify.com/sites/smarter2job/configuration/env

**Prüfe:**
- [ ] `CLAUDE_API_KEY` ist gesetzt
- [ ] Key beginnt mit `sk-ant-api03-`
- [ ] Keine Leerzeichen vor/nach dem Key
- [ ] Scope ist auf "All" oder "Functions" gesetzt

### 2. Function Logs prüfen

**Gehe zu:** https://app.netlify.com/projects/smarter2job/logs/functions

**Suche nach:**
- `analyze-teaser` Function
- Letzte Logs (jetzt gerade)
- Fehlermeldungen

**Erwartete Logs (Success):**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚀 API Route: /api/analyze-teaser
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔑 API Key Check:
   - CLAUDE_API_KEY present: true ✅
📤 Sende Request an Claude API...
✅ Claude Response erhalten in 2456 ms
```

**Mögliche Fehler:**
```
🔑 API Key present: false ❌
```
→ API Key nicht gesetzt oder falsch benannt

```
Error: API call failed with status 401
```
→ API Key ungültig

```
Error: API call failed with status 429
```
→ Rate Limit erreicht (zu viele Requests)

### 3. API Key testen (Claude Console)

**Gehe zu:** https://console.anthropic.com/settings/keys

**Prüfe:**
- [ ] Key ist aktiv (nicht deaktiviert)
- [ ] Credits verfügbar
- [ ] Keine Rate Limits

### 4. Manueller Test

**Test in Netlify Dev (lokal):**

```bash
cd /Users/martinbeyer/Documents/Smarter2Job-Deployment

# Setze API Key lokal
export CLAUDE_API_KEY="sk-ant-api03-XXX..."

# Starte Netlify Dev
npx netlify dev

# Öffne: http://localhost:8888
# Teste Red Flag Teaser
```

### 5. Häufige Probleme

**Problem 1: API Key falsch formatiert**
```bash
# Falsch (mit Anführungszeichen):
CLAUDE_API_KEY="sk-ant-api03-XXX"

# Richtig (ohne Anführungszeichen):
CLAUDE_API_KEY=sk-ant-api03-XXX
```

**Problem 2: Falscher Key-Name**
- Muss `CLAUDE_API_KEY` heißen (nicht `ANTHROPIC_API_KEY`)
- Oder beide setzen

**Problem 3: Re-Deploy vergessen**
- Nach Setzen des Keys: Re-Deploy triggern!

### 6. Quick Fix

**Setze beide Keys:**

1. Gehe zu: https://app.netlify.com/sites/smarter2job/configuration/env
2. Füge hinzu:
   - `CLAUDE_API_KEY` = `sk-ant-api03-XXX...`
   - `ANTHROPIC_API_KEY` = `sk-ant-api03-XXX...` (gleicher Key)
3. Save
4. Re-Deploy: https://app.netlify.com/sites/smarter2job/deploys
5. Klicke "Trigger deploy" → "Deploy site"

### 7. Temporärer Workaround

Falls API weiterhin nicht funktioniert, aktiviere Mock-Daten für Testing:

In `src/components/RedFlagTeaser.tsx`:
```tsx
// Temporär: Immer Mock-Daten zeigen
const mockResult: AnalysisResult = {
  totalRedFlags: 12,
  shownRedFlags: [
    {
      title: 'Unrealistische Anforderungen',
      originalText: '"10 Jahre Erfahrung mit Tools, die es erst seit 2 Jahren gibt"',
      meaning: 'Diese Anforderung ist physisch unmöglich zu erfüllen.',
      risk: 'SEHR HOCH',
      riskColor: 'red'
    },
    // ... mehr Flags
  ],
  hiddenRedFlagsCount: 9,
  upsellText: 'Es gibt noch 9 weitere Red Flags.'
};
setResult(mockResult);
```

---

## Next Steps

1. **Prüfe Function Logs** (siehe Link oben)
2. **Kopiere Fehlermeldung** aus den Logs
3. **Schicke mir die Logs**, dann kann ich dir genau sagen, was das Problem ist

**Function Logs:** https://app.netlify.com/projects/smarter2job/logs/functions

