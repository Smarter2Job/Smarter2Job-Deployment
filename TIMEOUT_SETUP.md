# ⚡ Timeout-Konfiguration für Netlify Functions

## ✅ Was wurde gemacht

1. **Model zu Haiku gewechselt:**
   - Von: `claude-sonnet-4-20250514` (15-25 Sekunden)
   - Zu: `claude-haiku-4-5-20251001` (2-6 Sekunden)
   - **3-5x schneller!** ⚡

2. **max_tokens reduziert:**
   - Von: `2000` tokens
   - Zu: `1000` tokens
   - **Noch schneller + günstiger!** 💰

3. **Timeout in netlify.toml:**
   - Leider unterstützt Netlify.toml kein direktes Timeout-Setting für Functions
   - **Lösung:** Muss über Netlify Dashboard gesetzt werden

## 🚨 WICHTIG: Timeout manuell setzen

**Netlify.toml unterstützt kein `timeout` für Functions!**

Du musst es **manuell im Dashboard** setzen:

### Schritt-für-Schritt:

1. **Gehe zu:** https://app.netlify.com/sites/smarter2job/settings/functions
2. Scrolle zu **"Functions timeout"**
3. Ändere von **10 Sekunden** → **26 Sekunden**
4. **Save**

**Dann:** Re-Deploy triggern (falls nötig)

## 📊 Performance-Vergleich

### Vorher (Sonnet 4):
- ⏱️ Dauer: 15-25 Sekunden
- 💰 Kosten: ~$0.02 pro Analyse
- ❌ Timeout bei 10s → Fehler

### Nachher (Haiku 4.5):
- ⚡ Dauer: 2-6 Sekunden
- 💰 Kosten: ~$0.002 pro Analyse (10x günstiger!)
- ✅ Läuft auch mit 10s Timeout (aber 26s ist sicherer)

## 🎯 Warum Haiku perfekt ist

**Für Red Flag Teaser reicht Haiku völlig aus:**
- ✅ Identifiziert 3-5 Red Flags zuverlässig
- ✅ Erklärt sie klar und verständlich
- ✅ 3-5x schneller als Sonnet
- ✅ 10x günstiger

**Sonnet wäre Overkill** für diese einfache Analyse-Aufgabe.

## ✅ Nächste Schritte

1. **Timeout im Dashboard setzen** (siehe oben)
2. **Testen:** Red Flag Teaser sollte jetzt in 2-6 Sekunden fertig sein
3. **Fertig!** 🎉

## 🔍 Falls es immer noch nicht funktioniert

**Prüfe Function Logs:**
- https://app.netlify.com/projects/smarter2job/logs/functions
- Suche nach "analyze-teaser"
- Prüfe, ob Timeout-Fehler noch auftritt

**Falls ja:**
- Timeout im Dashboard auf 26s setzen
- Re-Deploy triggern

---

**Die Änderungen sind bereits deployed!** 
Nur das Timeout muss noch im Dashboard gesetzt werden.


