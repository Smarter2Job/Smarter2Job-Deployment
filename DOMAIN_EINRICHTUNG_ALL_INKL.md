# 🌐 Domain-Einrichtung: smarter2job.com bei All-Inkl.com

Anleitung zur Einrichtung der Domain `smarter2job.com` bei All-Inkl.com für Netlify-Hosting

## 📋 Voraussetzungen

1. ✅ Domain `smarter2job.com` zu All-Inkl.com umgezogen
2. ✅ Zugriff auf All-Inkl.com Kundenmenü
3. ✅ Netlify-Site bereits deployed
4. ✅ Domain in Netlify hinzugefügt

---

## 🚀 Schritt-für-Schritt Anleitung

### Schritt 1: Nameserver prüfen

**Prüfe, ob die Nameserver bereits auf All-Inkl.com zeigen:**

1. Gehe zu: https://www.whatsmydns.net/#NS/smarter2job.com
2. Oder nutze: https://dnschecker.org/#NS/smarter2job.com
3. Schaue, welche Nameserver angezeigt werden

**Erwartetes Ergebnis:**
- Nameserver sollten auf All-Inkl.com zeigen, z.B.:
  - `ns1.kasserver.com`
  - `ns2.kasserver.com`
  - Oder ähnliche All-Inkl.com Nameserver

**Wenn Nameserver noch nicht auf All-Inkl.com zeigen:**

1. Gehe zu All-Inkl.com → **Domain-Verwaltung** → **Nameserver**
2. Stelle sicher, dass All-Inkl.com Nameserver eingestellt sind
3. Warte 5-60 Minuten auf DNS-Propagation

---

### Schritt 2: Domain in Netlify hinzufügen

1. Gehe zu: https://app.netlify.com
2. Wähle deine Site: `smarter2job`
3. Gehe zu: **Site settings** → **Domain management**
4. Klicke auf: **Add custom domain**
5. Gib ein: `smarter2job.com`
6. Klicke: **Verify**

**Wichtig:** Netlify zeigt dir jetzt die benötigten DNS-Einträge an. Notiere dir diese!

---

### Schritt 3: DNS-Einträge bei All-Inkl.com anlegen

**Gehe zu All-Inkl.com:**

1. Logge dich in dein All-Inkl.com Kundenmenü ein
2. Gehe zu: **Tools** → **DNS-Einstellungen**
3. Wähle die Domain: `smarter2job.com`

**Lege die folgenden DNS-Einträge an:**

#### Eintrag 1: Root Domain (smarter2job.com)

1. Klicke auf **"Neuen DNS-Eintrag erstellen"**
2. Fülle aus:
   - **Name:** `@` (oder leer lassen, wenn @ nicht möglich)
   - **Typ/Prio.:** `A`
   - **Data/Value:** `75.2.60.5` (oder die IP-Adresse, die Netlify dir anzeigt)
3. Klicke auf **"speichern"**

#### Eintrag 2: www-Subdomain (www.smarter2job.com)

1. Klicke erneut auf **"Neuen DNS-Eintrag erstellen"**
2. Fülle aus:
   - **Name:** `www` (wichtig: nur "www", nicht "www.smarter2job.com")
   - **Typ/Prio.:** `CNAME`
   - **Data/Value:** `smarter2job.netlify.app` (oder die Domain, die Netlify dir anzeigt)
3. Klicke auf **"speichern"**

**📝 Zusammenfassung der Werte:**

| Eintrag | Name | Typ | Wert |
|---------|------|-----|------|
| Root Domain | `@` | `A` | `75.2.60.5` |
| www-Subdomain | `www` | `CNAME` | `smarter2job.netlify.app` |

**⚠️ WICHTIG:** 
- Falls Netlify eine andere IP-Adresse oder Domain anzeigt, verwende diese!
- Die rote Warnung bei All-Inkl.com kann erscheinen, wenn die Nameserver noch nicht vollständig propagiert sind. Das ist normal.
- **WICHTIG:** Stelle sicher, dass es nur **EINEN** A-Record für die Root-Domain gibt, der auf die Netlify-IP (`75.2.60.5`) zeigt. Falls du einen zweiten A-Record auf eine All-Inkl.com IP (z.B. `85.13.135.18`) hast, entferne diesen, da er zu Konflikten führen kann. Falls du E-Mail oder andere Services bei All-Inkl.com nutzt, verwende Subdomains dafür (z.B. `mail.smarter2job.com`).

---

### Schritt 4: DNS-Propagation abwarten

1. **Warte 5-60 Minuten** auf DNS-Propagation
2. **Prüfe die DNS-Einträge:**
   - Gehe zu: https://www.whatsmydns.net/#A/smarter2job.com
   - Die A-Record sollte `75.2.60.5` zeigen
   - Gehe zu: https://www.whatsmydns.net/#CNAME/www.smarter2job.com
   - Die CNAME sollte `smarter2job.netlify.app` zeigen

---

### Schritt 5: SSL-Zertifikat aktivieren

1. **In Netlify:**
   - Gehe zu: **Domain management** → `smarter2job.com`
   - Netlify erkennt die Domain automatisch (nach DNS-Propagation)
   - SSL-Zertifikat wird automatisch von Let's Encrypt erstellt
   - Dauer: 5-60 Minuten

2. **Prüfe den Status:**
   - In Netlify: **Domain management** → Status sollte "Active" sein
   - SSL-Status sollte "Certificate issued" anzeigen

---

### Schritt 6: Domain als Primary Domain setzen

**💡 Empfehlung:** Netlify empfiehlt, `www.smarter2job.com` als primäre Domain zu verwenden.

1. In Netlify: **Domain management**
2. Klicke auf die drei Punkte neben `www.smarter2job.com`
3. Wähle: **Set as primary domain**
4. Bestätige

**Optional:** Redirect von Root-Domain zu www-Subdomain einrichten (siehe netlify.toml)

---

### Schritt 7: HTTPS-Weiterleitung aktivieren

1. In Netlify: **Domain management**
2. Aktiviere: **Force HTTPS**
3. Aktiviere: **HTTPS redirect**

---

## ✅ Checkliste

- [ ] Nameserver zeigen auf All-Inkl.com
- [ ] Domain in Netlify hinzugefügt
- [ ] DNS-Einträge bei All-Inkl.com angelegt:
  - [ ] A-Record `@` → `75.2.60.5`
  - [ ] CNAME `www` → `smarter2job.netlify.app`
- [ ] DNS-Propagation abgewartet (5-60 Minuten)
- [ ] DNS-Einträge geprüft (whatsmydns.net)
- [ ] SSL-Zertifikat aktiviert
- [ ] Domain als Primary Domain gesetzt (empfohlen: www.smarter2job.com)
- [ ] HTTPS-Weiterleitung aktiviert
- [ ] Website unter `https://www.smarter2job.com` erreichbar
- [ ] Website unter `https://smarter2job.com` erreichbar (oder leitet zu www weiter)

---

## 🐛 Troubleshooting

### Problem: Rote Warnung bei All-Inkl.com "Nameserver nicht hinterlegt"

**Ursache:**
- Nameserver zeigen noch nicht auf All-Inkl.com
- Oder DNS-Propagation noch nicht abgeschlossen

**Lösung:**
1. Prüfe die Nameserver: https://www.whatsmydns.net/#NS/smarter2job.com
2. Wenn Nameserver nicht auf All-Inkl.com zeigen:
   - Gehe zu All-Inkl.com → **Domain-Verwaltung** → **Nameserver**
   - Stelle sicher, dass All-Inkl.com Nameserver eingestellt sind
3. Warte 5-60 Minuten auf Propagation
4. Die rote Warnung kann weiterhin erscheinen, aber die DNS-Einträge funktionieren trotzdem, wenn die Nameserver korrekt sind

### Problem: Domain wird in Netlify nicht erkannt

**Lösung:**
- Prüfe DNS-Einträge (kann mit https://www.whatsmydns.net/#A/smarter2job.com getestet werden)
- Warte auf DNS-Propagation (kann bis zu 48h dauern, meist aber schneller)
- Prüfe, ob die IP-Adresse in Netlify mit der in All-Inkl.com übereinstimmt

### Problem: SSL-Zertifikat wird nicht erstellt

**Lösung:**
- Stelle sicher, dass DNS-Einträge korrekt sind
- Warte 5-60 Minuten
- Prüfe in Netlify: **Domain management** → **HTTPS** → **Certificate status**

### Problem: Website lädt nicht

**Lösung:**
- Prüfe, ob Domain als Primary Domain gesetzt ist
- Prüfe DNS-Einträge erneut
- Teste mit: `curl -I https://smarter2job.com`
- Prüfe, ob die Site in Netlify deployed ist

---

## 📚 Weitere Ressourcen

- [Netlify Domain Docs](https://docs.netlify.com/domains-https/custom-domains/)
- [DNS Propagation Checker](https://www.whatsmydns.net/)
- [All-Inkl.com Support](https://all-inkl.com/support/)

