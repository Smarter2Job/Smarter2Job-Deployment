# 🔍 Debugging Guide für Red Flag Teaser

## Problem: Keine Red Flags werden angezeigt

### Schritt 1: Browser Console prüfen

**Öffne die Browser Console (F12 oder Cmd+Option+I):**

1. Teste den Red Flag Teaser
2. Schaue in die Console nach:
   - `📊 Received data:` - Zeigt die komplette Response
   - `📊 Red Flags count:` - Anzahl der gefundenen Flags
   - `⚠️ No red flags in response:` - Falls keine Flags gefunden

**Was du sehen solltest:**
```javascript
📊 Received data: {totalRedFlags: 4, shownRedFlags: Array(3), ...}
📊 Red Flags count: 3
```

**Falls du siehst:**
```javascript
📊 Red Flags count: 0
⚠️ No red flags in response
```
→ Das Problem liegt im Parser (Backend)

### Schritt 2: Netlify Function Logs prüfen

**Gehe zu:** https://app.netlify.com/projects/smarter2job/logs/functions

**Suche nach dem neuesten Request:**
- Timestamp sollte zu deinem Test passen
- Suche nach `analyze-teaser`

**Was du sehen solltest:**
```
📄 Full Response: [komplette Claude-Response]
📊 Total lines: 25
🆕 New flag started: [Titel]
📝 Original text: [Text]
💡 Meaning: [Bedeutung]
⚠️ Risk: HOCH
✅ Saved flag: [Titel]
✅ Parsed 3 Red Flags
```

**Falls du siehst:**
```
✅ Parsed 0 Red Flags
⚠️ No flags parsed, creating fallback flags
```
→ Der Parser findet die Flags nicht im Claude-Format

### Schritt 3: Claude Response Format prüfen

**In den Function Logs findest du:**
```
📄 Full Response: [hier steht die komplette Response]
```

**Kopiere diese Response und prüfe:**
- Beginnt sie mit "GESAMT:"?
- Gibt es Zeilen mit "RED FLAG 1:", "RED FLAG 2:"?
- Gibt es "WAS DA STEHT:" und "WAS ES BEDEUTET:"?

**Falls das Format anders ist:**
- Haiku gibt manchmal ein anderes Format zurück
- Der Parser muss angepasst werden

### Schritt 4: Manueller Test

**Teste mit einer längeren Stellenbeschreibung:**

1. Kopiere eine komplette Job-Description (mindestens 200 Zeichen)
2. Füge sie in den Red Flag Teaser ein
3. Klicke "Erste Karte aufdecken"
4. Prüfe Console und Logs

**Falls es mit längerem Text funktioniert:**
→ Das Problem ist die minimale Textlänge (50 Zeichen ist zu wenig)

## 🐛 Häufige Probleme

### Problem 1: Parser findet keine Flags

**Symptom:**
- Function Logs zeigen: `✅ Parsed 0 Red Flags`
- Browser zeigt: "Keine Red Flags gefunden"

**Lösung:**
- Prüfe die `📄 Full Response` in den Logs
- Kopiere sie mir, dann passe ich den Parser an

### Problem 2: Response ist leer

**Symptom:**
- Function Logs zeigen: `📝 Response Length: 0 chars`
- Oder: `❌ FEHLER: [Error Message]`

**Lösung:**
- Prüfe API Key in Netlify Environment Variables
- Prüfe Claude API Credits

### Problem 3: Loading läuft endlos

**Symptom:**
- Loading-Animation läuft, aber kein Ergebnis

**Lösung:**
- Prüfe Browser Console auf JavaScript-Fehler
- Prüfe Network Tab (F12 → Network)
- Suche nach Request zu `/.netlify/functions/analyze-teaser`
- Prüfe Status Code (sollte 200 sein)

## 📊 Was die Logs zeigen sollten

### ✅ Erfolgreich:
```
🚀 API Route: /api/analyze-teaser
🔑 API Key present: true ✅
📤 Sende Request an Claude API...
✅ Claude Response erhalten in 2687 ms
📝 Response Length: 423 chars
📄 Full Response: GESAMT: 4
RED FLAG 1: [Titel]
...
✅ Parsed 3 Red Flags
✅ ERFOLG - Parsed Result:
   - Total Red Flags: 4
   - Shown Red Flags: 3
```

### ❌ Problem:
```
✅ Parsed 0 Red Flags
⚠️ No flags parsed, creating fallback flags
```

## 🆘 Nächste Schritte

**Falls es immer noch nicht funktioniert:**

1. **Kopiere die vollständige Response aus den Function Logs**
2. **Schicke sie mir** (oder poste sie hier)
3. **Ich passe den Parser an das exakte Format an**

**Function Logs:** https://app.netlify.com/projects/smarter2job/logs/functions

---

**Die Browser-Console-Fehler (utils.js, tabutils.js, etc.) sind von Browser-Extensions und können ignoriert werden!**




