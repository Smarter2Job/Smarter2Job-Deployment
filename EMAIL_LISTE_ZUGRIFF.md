# E-Mail-Adressen aus Netlify Forms exportieren

## 📧 Wo werden die E-Mail-Adressen gespeichert?

Alle E-Mail-Adressen aus dem Lead-Magnet-Formular werden in **Netlify Forms** gespeichert.

## 🔍 Zugriff auf die E-Mail-Liste

### Option 1: Netlify Dashboard (Web-Interface)

1. **Gehe zu:** https://app.netlify.com/sites/smarter2job/forms
2. Du siehst das Formular: **"cv-checklist"**
3. Klicke auf **"cv-checklist"** → alle Submissions werden angezeigt
4. Jede Zeile zeigt:
   - E-Mail-Adresse
   - Datum/Uhrzeit der Submission
   - IP-Adresse (optional)

**Export als CSV:**
- Oben rechts: **"Export to CSV"** Button
- Download CSV-Datei
- Öffne in Excel/Google Sheets

### Option 2: E-Mail-Benachrichtigungen aktivieren

**Sofortige Benachrichtigung bei jeder neuen Anmeldung:**

1. Gehe zu: https://app.netlify.com/sites/smarter2job/settings/forms
2. Klicke auf **"Form notifications"**
3. Klicke **"Add notification"**
4. Wähle: **"Email notification"**
5. Füge deine E-Mail-Adresse ein: `post@martinbeyer.de`
6. Wähle Formular: **"cv-checklist"**
7. Save

**Jetzt erhältst du eine E-Mail bei jeder neuen Anmeldung!**

### Option 3: Zapier/Make Integration (für automatische Verarbeitung)

**Automatisch in Mailchimp/ConvertKit/ActiveCampaign übertragen:**

1. Gehe zu: https://app.netlify.com/sites/smarter2job/settings/forms
2. Klicke auf **"Form notifications"**
3. Klicke **"Add notification"**
4. Wähle: **"Outgoing webhook"**
5. Webhook URL: `https://hooks.zapier.com/hooks/catch/...` (von Zapier)
6. Zapier leitet die E-Mails automatisch an dein E-Mail-Tool weiter

**Zapier Zap erstellen:**
- Trigger: Netlify Form Submission
- Action: Add to Mailchimp/ConvertKit

### Option 4: API-Zugriff (programmgesteuert)

**Netlify API nutzen (für Entwickler):**

```bash
# Get API Token from: https://app.netlify.com/user/applications/personal
export NETLIFY_TOKEN="your-token"

# Get all form submissions
curl -H "Authorization: Bearer $NETLIFY_TOKEN" \
  "https://api.netlify.com/api/v1/sites/smarter2job/forms/cv-checklist/submissions"
```

## 📊 Datenstruktur

**Jede Submission enthält:**
```json
{
  "id": "...",
  "email": "user@example.com",
  "created_at": "2024-12-17T12:34:56Z",
  "form_name": "cv-checklist",
  "data": {
    "email": "user@example.com"
  }
}
```

## 📨 Workshop-Einladung versenden

### Schritt 1: E-Mail-Liste exportieren

1. https://app.netlify.com/sites/smarter2job/forms → "cv-checklist"
2. **"Export to CSV"** klicken
3. CSV-Datei herunterladen

### Schritt 2: In E-Mail-Tool importieren

**Mailchimp:**
1. Audience → Import contacts → CSV
2. Upload die CSV-Datei
3. Mapping: E-Mail-Spalte zuweisen
4. Tag hinzufügen: "CV-Checkliste-Download"

**Gmail (manuell):**
1. CSV öffnen in Excel
2. E-Mail-Adressen kopieren
3. In Gmail: Compose → BCC: [alle E-Mails]
4. Betreff: "Kostenloser Workshop: Red Flags in Job-Beschreibungen"

### Schritt 3: Workshop-Einladung schreiben

**E-Mail-Template:**

```
Betreff: 📅 Einladung zum kostenlosen Workshop (Dienstag, 18:00 Uhr)

Hallo [Vorname],

vielen Dank für den Download der CV-Basics-Checkliste! 🎉

Ich hoffe, du konntest damit schon erste Optimierungen vornehmen.

Jetzt möchte ich dich zum kostenlosen Workshop einladen:

📅 Termin: Dienstag, [DATUM], 18:00 Uhr
⏰ Dauer: 60 Minuten
📍 Ort: Zoom (Link wird 1h vorher verschickt)

Was du lernst:
✅ Red Flags in Stellenbeschreibungen erkennen
✅ Dein persönliches Job-Navi erstellen (ABC-Listen-Methode)
✅ ATS-Keywords dekodieren (live an einer echten Stelle)

[BUTTON: Jetzt anmelden]

Noch Fragen? Einfach auf diese Mail antworten!

Bis bald,
Martin | Smarter2Job

P.S.: Plätze sind begrenzt – sichere dir jetzt deinen Spot!
```

## 🔒 Datenschutz

**Wichtig:**
- E-Mail-Adressen nur für Workshop-Einladungen nutzen
- Opt-out-Link in jeder E-Mail
- DSGVO-konform: Netlify speichert in Europa

**Opt-out-Text:**
```
Du erhältst diese E-Mail, weil du die CV-Basics-Checkliste 
auf Smarter2Job heruntergeladen hast.

Möchtest du keine weiteren E-Mails erhalten?
[Abmelden]
```

## ⚙️ Automatisierung (fortgeschritten)

**E-Mail-Sequenz automatisch versenden:**

1. **Mailchimp Automation:**
   - Trigger: Neuer Kontakt mit Tag "CV-Checkliste"
   - E-Mail 1 (sofort): Willkommen + Checkliste
   - E-Mail 2 (Tag 3): Workshop-Einladung
   - E-Mail 3 (Tag 7): Reminder

2. **Zapier Workflow:**
   - Netlify Form Submit → Add to Mailchimp → Trigger Automation

## 📈 Aktueller Stand

**Prüfe Anzahl der Submissions:**
https://app.netlify.com/sites/smarter2job/forms

Du siehst sofort:
- Anzahl der Anmeldungen heute/diese Woche/gesamt
- Conversion-Rate (Besucher vs. Anmeldungen)

## 🆘 Support

**Falls keine E-Mails ankommen:**
1. Prüfe Netlify Forms Dashboard
2. Prüfe Spam-Ordner
3. Prüfe Form-Name: `cv-checklist` (muss exakt übereinstimmen)

---

**Quick-Links:**
- Forms Dashboard: https://app.netlify.com/sites/smarter2job/forms
- CSV Export: https://app.netlify.com/sites/smarter2job/forms/cv-checklist
- E-Mail-Benachrichtigungen: https://app.netlify.com/sites/smarter2job/settings/forms




