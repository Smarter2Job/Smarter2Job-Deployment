# 🌐 Domain-Setup: smarter2job.com

Anleitung zur Umstellung von `smarter2job.netlify.app` auf `smarter2job.com`

## 🎯 Empfehlung für deine Situation

**Da du bereits eine andere Seite bei All-Inkl.com hostest, gibt es zwei Szenarien:**

### Szenario 1: smarter2job.com wird NUR für Netlify verwendet
→ **Empfehlung: Netlify DNS verwenden**
- Beste Performance und einfache Verwaltung
- Automatische Optimierungen
- Einfache Branch-Subdomains für Preview-Deployments

### Szenario 2: smarter2job.com wird auch für andere Services genutzt (E-Mail, andere Subdomains)
→ **Empfehlung: DNS bei All-Inkl.com belassen**
- Zentrale Verwaltung aller Services
- Keine Konflikte mit bestehenden Konfigurationen
- Einfacher zu verwalten, wenn alles an einem Ort ist

**💡 Tipp:** Wenn du unsicher bist, starte mit All-Inkl.com DNS. Du kannst später immer noch zu Netlify DNS wechseln, wenn nötig.

## 📋 Voraussetzungen

1. ✅ Domain `smarter2job.com` registriert
2. ✅ Zugriff auf DNS-Einstellungen der Domain
3. ✅ Netlify-Site bereits deployed

## 🚀 Schritt-für-Schritt Anleitung

### Schritt 1: Domain in Netlify hinzufügen

1. Gehe zu: https://app.netlify.com
2. Wähle deine Site: `smarter2job`
3. Gehe zu: **Site settings** → **Domain management**
4. Klicke auf: **Add custom domain**
5. Gib ein: `smarter2job.com`
6. Klicke: **Verify**

### Schritt 2: DNS-Einstellungen konfigurieren

**⚠️ WICHTIG: Entscheidung zwischen Netlify DNS und Provider DNS**

Du hast zwei Optionen:

#### 🎯 Option 1: Netlify DNS verwenden (EMPFOHLEN für reine Netlify-Sites)

**Vorteile:**
- ✅ Automatische optimale DNS-Einträge
- ✅ Bessere Performance durch optimierte CDN-Integration
- ✅ Einfache Verwaltung (alles in Netlify)
- ✅ Automatische Updates bei Netlify-Änderungen
- ✅ Einfache Nutzung von Branch-Subdomains (z.B. für Preview-Deployments)
- ✅ Keine manuellen DNS-Einträge nötig

**Nachteile:**
- ⚠️ Nameserver müssen zu Netlify geändert werden
- ⚠️ Wenn du andere Services (E-Mail, andere Subdomains) auf dieser Domain nutzt, müssen diese separat konfiguriert werden

**Wann zu empfehlen:**
- Wenn `smarter2job.com` **nur** für die Netlify-Site verwendet wird
- Wenn du die beste Performance willst
- Wenn du Branch-Subdomains nutzen möchtest

**Setup:**
1. In Netlify: **Domain management** → Klicke auf den Link "Richten Sie Netlify DNS für smarter2job.com ein"
2. Folge den Anweisungen zur Nameserver-Änderung
3. Ändere die Nameserver bei All-Inkl.com zu den von Netlify angegebenen Nameservern
4. Netlify übernimmt dann automatisch die DNS-Verwaltung

#### 🔧 Option 2: DNS bei All-Inkl.com belassen

**Vorteile:**
- ✅ Alles an einem Ort (wenn du bereits andere Services bei All-Inkl.com hostest)
- ✅ Keine Nameserver-Änderung nötig
- ✅ Einfache Verwaltung bestehender E-Mail/Subdomain-Konfigurationen

**Nachteile:**
- ⚠️ Manuelle DNS-Einträge erforderlich
- ⚠️ Möglicherweise keine ALIAS/ANAME-Unterstützung (dann nur A-Record möglich)
- ⚠️ Weniger optimal für Netlify-Hosting
- ⚠️ Keine automatischen Updates

**Wann zu empfehlen:**
- Wenn du bereits andere Services (E-Mail, andere Websites) auf dieser Domain bei All-Inkl.com nutzt
- Wenn du die DNS-Verwaltung zentral bei All-Inkl.com behalten möchtest

**Setup (siehe unten):**

---

### Schritt 2a: DNS bei All-Inkl.com konfigurieren (Option 2)

**📝 Konkrete DNS-Einträge für All-Inkl.com**

**✅ Bestätigt:** All-Inkl.com unterstützt **KEINE** ALIAS/ANAME-Records. Wir verwenden daher die A-Record-Lösung.

Gehe zu deinem All-Inkl.com Kundenmenü und öffne die DNS-Verwaltung für `smarter2job.com`.

---

#### 📋 Die 2 DNS-Einträge, die du anlegen musst:

**Eintrag 1: Root Domain (smarter2job.com)**

1. Klicke auf **"Neuen DNS-Eintrag erstellen"** (oder ähnlich)
2. Fülle folgende Felder aus:
   - **Name:** `@` (oder leer lassen, wenn @ nicht möglich - dann wird automatisch die Root-Domain verwendet)
   - **Typ/Prio.:** `A`
   - **Data/Value:** `75.2.60.5`
3. Klicke auf **"speichern"**

**Eintrag 2: www-Subdomain (www.smarter2job.com)**

1. Klicke erneut auf **"Neuen DNS-Eintrag erstellen"**
2. Fülle folgende Felder aus:
   - **Name:** `www` (wichtig: nur "www", nicht "www.smarter2job.com")
   - **Typ/Prio.:** `CNAME`
   - **Data/Value:** `smarter2job.netlify.app`
3. Klicke auf **"speichern"**

---

#### 📝 Zusammenfassung der Werte:

| Eintrag | Name | Typ | Wert |
|---------|------|-----|------|
| Root Domain | `@` | `A` | `75.2.60.5` |
| www-Subdomain | `www` | `CNAME` | `smarter2job.netlify.app` |

**⚠️ WICHTIG:** 
- Mit einem A-Record auf die Root-Domain kannst du die Vorteile eines CDN nicht voll ausschöpfen. 
- Netlify empfiehlt daher, `www.smarter2job.com` als primäre Domain zu verwenden.
- Die Root-Domain (`smarter2job.com`) funktioniert trotzdem und kann zu www weiterleiten.

---

#### 📋 Zusammenfassung: Was du anlegen musst

**Mindestens 2 DNS-Einträge:**

1. **Root Domain** (`smarter2job.com`):
   - ALIAS/ANAME → `apex-loadbalancer.netlify.com` ODER
   - A-Record → `75.2.60.5`

2. **www-Subdomain** (`www.smarter2job.com`):
   - CNAME → `smarter2job.netlify.app`

**💡 Empfehlung:** Lege beide Einträge an, auch wenn du primär die www-Subdomain nutzen willst. So funktioniert auch `smarter2job.com` (ohne www) und kann zu www weiterleiten.

---

#### 🎯 Schritt-für-Schritt bei All-Inkl.com

1. Logge dich in dein All-Inkl.com Kundenmenü ein
2. Gehe zu: **Domains** → **DNS-Verwaltung** (oder ähnlich)
3. Wähle die Domain: `smarter2job.com`
4. Füge die beiden Einträge hinzu (siehe oben)
5. Speichere die Änderungen
6. Warte auf DNS-Propagation (meist 5-60 Minuten, kann bis zu 48h dauern)

---

#### ⚠️ KRITISCH: Nameserver-Problem (Rote Warnung)

**Was bedeutet die rote Warnung?**

Die Warnung "Für die Domain smarter2job.com sind nicht unsere Nameserver hinterlegt" bedeutet:

- ❌ Die DNS-Einträge, die du bei All-Inkl.com angelegt hast, werden **NICHT wirksam**
- ❌ Die Nameserver der Domain zeigen **NICHT** auf All-Inkl.com
- ❌ Die Domain nutzt aktuell einen anderen DNS-Provider

**Warum ist das ein Problem?**

DNS funktioniert so: Die Nameserver bestimmen, **wo** die DNS-Einträge gelesen werden. Wenn die Nameserver nicht auf All-Inkl.com zeigen, werden die Einträge bei All-Inkl.com ignoriert.

**Was musst du jetzt tun?**

Du hast **2 Optionen**:

##### Option A: Nameserver zu All-Inkl.com ändern (wenn Domain bei All-Inkl.com registriert)

1. Finde heraus, wo die Domain registriert ist (bei All-Inkl.com oder woanders?)
2. Wenn bei All-Inkl.com: Gehe zu **Domain-Verwaltung** → **Nameserver**
3. Ändere die Nameserver zu All-Inkl.com Nameservern (z.B. `ns1.kasserver.com`, `ns2.kasserver.com` - All-Inkl zeigt dir die korrekten)
4. Nach 5-60 Minuten sollten die DNS-Einträge wirksam werden

##### Option B: DNS-Einträge beim aktuellen DNS-Provider anlegen (EMPFOHLEN)

Wenn die Domain **nicht** bei All-Inkl.com registriert ist oder du die Nameserver nicht ändern willst:

1. **Finde heraus, wo die Nameserver aktuell hinzeigen:**
   - Gehe zu deinem Domain-Registrar (wo du die Domain registriert hast)
   - Schaue nach "Nameserver" oder "DNS-Einstellungen"
   - Oder nutze einen Online-Checker: https://www.whatsmydns.net/#NS/smarter2job.com

2. **Lege die DNS-Einträge beim aktuellen DNS-Provider an:**
   - Gehe zu deinem Domain-Registrar oder DNS-Provider
   - Öffne die DNS-Verwaltung für `smarter2job.com`
   - Lege die gleichen 2 Einträge an:
     - **A-Record:** `@` → `75.2.60.5`
     - **CNAME:** `www` → `smarter2job.netlify.app`

**💡 Empfehlung:** Wenn die Domain nicht bei All-Inkl.com registriert ist, nutze Option B. So musst du keine Nameserver ändern.

---

#### 🎯 Schritt-für-Schritt: DNS-Einträge bei GoDaddy anlegen

**✅ Deine Domain ist bei GoDaddy registriert - hier die Anleitung:**

1. **Logge dich bei GoDaddy ein:**
   - Gehe zu: https://www.godaddy.com
   - Melde dich mit deinem Account an

2. **Öffne die DNS-Verwaltung:**
   - Klicke auf **"Meine Produkte"** (My Products)
   - Finde `smarter2job.com` in der Liste
   - Klicke auf die drei Punkte (⋮) neben der Domain
   - Wähle **"DNS verwalten"** (Manage DNS) oder **"DNS"**

3. **Lege den A-Record für die Root-Domain an:**
   - Scrolle zu **"Records"** oder **"DNS-Einträge"**
   - Klicke auf **"Hinzufügen"** (Add) oder **"+"**
   - Fülle aus:
     - **Typ:** `A`
     - **Name:** `@` (oder leer lassen - bedeutet Root-Domain)
     - **Wert:** `75.2.60.5`
     - **TTL:** `600` (oder Standard/Minimum)
   - Klicke auf **"Speichern"** (Save)

4. **Lege den CNAME-Record für www an:**
   - Klicke erneut auf **"Hinzufügen"** (Add) oder **"+"**
   - Fülle aus:
     - **Typ:** `CNAME`
     - **Name:** `www`
     - **Wert:** `smarter2job.netlify.app`
     - **TTL:** `600` (oder Standard/Minimum)
   - Klicke auf **"Speichern"** (Save)

5. **Prüfe die Einträge:**
   - Du solltest jetzt 2 neue Einträge sehen:
     - `@` → `A` → `75.2.60.5`
     - `www` → `CNAME` → `smarter2job.netlify.app`

6. **Warte auf DNS-Propagation:**
   - GoDaddy: meist 5-15 Minuten
   - Kann bis zu 48 Stunden dauern (selten)
   - Prüfe mit: https://www.whatsmydns.net/#A/smarter2job.com

**⚠️ WICHTIG:** 
- Die DNS-Einträge bei All-Inkl.com kannst du **ignorieren** oder **löschen** - sie werden nicht verwendet
- Alle DNS-Einträge müssen bei **GoDaddy** angelegt werden

---

#### 🔄 Nameserver zurück zu GoDaddy ändern (wenn zu früh umgezogen)

**Problem:** Du hast die Nameserver zu All-Inkl.com geändert, aber die Domain ist bei GoDaddy registriert. Jetzt kannst du bei GoDaddy keine DNS-Einträge mehr vornehmen.

**Lösung: Nameserver wieder zu GoDaddy zurück ändern**

##### Schritt 1: Nameserver bei GoDaddy ändern

1. **Logge dich bei GoDaddy ein:**
   - Gehe zu: https://www.godaddy.com
   - Melde dich mit deinem Account an

2. **Öffne die Domain-Verwaltung:**
   - Klicke auf **"Meine Produkte"** (My Products)
   - Finde `smarter2job.com` in der Liste
   - Klicke auf die drei Punkte (⋮) neben der Domain
   - Wähle **"DNS verwalten"** (Manage DNS) oder **"DNS"**

3. **Ändere die Nameserver:**
   - Suche nach **"Nameserver"** oder **"Nameservers"**
   - Klicke auf **"Ändern"** (Change) oder **"Bearbeiten"** (Edit)
   - Wähle **"GoDaddy Nameserver verwenden"** (Use GoDaddy Nameservers)
   - Oder setze manuell die GoDaddy Nameserver ein:
     - `ns1.godaddy.com`
     - `ns2.godaddy.com`
   - Klicke auf **"Speichern"** (Save)

4. **Warte auf Propagation:**
   - DNS-Propagation: 5-60 Minuten (meist schneller)
   - Prüfe mit: https://www.whatsmydns.net/#NS/smarter2job.com
   - Die Nameserver sollten auf `ns1.godaddy.com` und `ns2.godaddy.com` zeigen

##### Schritt 2: DNS-Einträge bei GoDaddy anlegen

Nachdem die Nameserver wieder auf GoDaddy zeigen (siehe Schritt 1):

1. Gehe zu GoDaddy → **Meine Produkte** → **DNS verwalten** für `smarter2job.com`
2. Lege die DNS-Einträge an (siehe Anleitung oben):
   - **A-Record:** `@` → `75.2.60.5`
   - **CNAME:** `www` → `smarter2job.netlify.app`

**💡 Tipp:** Du kannst auch die Nameserver bei All-Inkl.com ändern, aber dann musst du die DNS-Einträge bei All-Inkl.com anlegen (nicht bei GoDaddy). Da die Domain bei GoDaddy registriert ist, ist es einfacher, die Nameserver bei GoDaddy zu belassen.

---

#### ✅ Alternative Lösung: DNS-Einträge direkt bei All-Inkl.com anlegen

**Wenn die Nameserver bei GoDaddy nicht geändert werden können** (z.B. Domain-Status verhindert Änderungen oder Domain wurde zu All-Inkl.com übertragen):

**Lösung: Nutze die DNS-Einträge bei All-Inkl.com**

Da die Nameserver bereits auf All-Inkl.com zeigen (oder die Domain zu All-Inkl.com übertragen wurde), kannst du die DNS-Einträge direkt bei All-Inkl.com anlegen:

1. **Gehe zu All-Inkl.com:**
   - Logge dich in dein All-Inkl.com Kundenmenü ein
   - Gehe zu: **Tools** → **DNS-Einstellungen**
   - Wähle die Domain: `smarter2job.com`

2. **Lege den A-Record für die Root-Domain an:**
   - Klicke auf **"Neuen DNS-Eintrag erstellen"**
   - **Name:** `@` (oder leer lassen)
   - **Typ/Prio.:** `A`
   - **Data/Value:** `75.2.60.5`
   - Klicke auf **"speichern"**

3. **Lege den CNAME-Record für www an:**
   - Klicke erneut auf **"Neuen DNS-Eintrag erstellen"**
   - **Name:** `www`
   - **Typ/Prio.:** `CNAME`
   - **Data/Value:** `smarter2job.netlify.app`
   - Klicke auf **"speichern"**

4. **Prüfe die Einträge:**
   - Du solltest jetzt beide Einträge in der Liste sehen
   - Die rote Warnung kann weiterhin erscheinen, aber die Einträge sollten funktionieren, wenn die Nameserver auf All-Inkl.com zeigen

5. **Warte auf DNS-Propagation:**
   - 5-60 Minuten (meist schneller)
   - Prüfe mit: https://www.whatsmydns.net/#A/smarter2job.com

**💡 Wichtig:** 
- Wenn die Nameserver auf All-Inkl.com zeigen, funktionieren die DNS-Einträge dort
- Die rote Warnung bei All-Inkl.com kann erscheinen, wenn die Domain nicht bei All-Inkl.com registriert ist, aber die Einträge funktionieren trotzdem, wenn die Nameserver dort hinzeigen
- Du kannst die bereits angelegten Einträge bei All-Inkl.com nutzen (sie sollten bereits vorhanden sein)

### Schritt 3: SSL-Zertifikat aktivieren

1. Nach dem Hinzufügen der DNS-Einträge:
   - Netlify erkennt die Domain automatisch
   - SSL-Zertifikat wird automatisch von Let's Encrypt erstellt
   - Dauer: 5-60 Minuten

2. Prüfe den Status:
   - In Netlify: **Domain management** → Status sollte "Active" sein
   - SSL-Status sollte "Certificate issued" anzeigen

### Schritt 4: Domain als Primary Domain setzen

**💡 Empfehlung:** Netlify empfiehlt, `www.smarter2job.com` als primäre Domain zu verwenden, da:
- ✅ Vollständige CDN-Vorteile nutzbar (bei Root-Domain mit A-Record eingeschränkt)
- ✅ Bessere Performance
- ✅ Professioneller (Standard für moderne Websites)

**Setup:**

1. In Netlify: **Domain management**
2. Klicke auf die drei Punkte neben `www.smarter2job.com` (oder `smarter2job.com` wenn du die Root-Domain bevorzugst)
3. Wähle: **Set as primary domain**
4. Bestätige

**Optional:** Redirect von Root-Domain zu www-Subdomain einrichten (siehe netlify.toml Konfiguration unten)

### Schritt 5: HTTPS-Weiterleitung aktivieren

1. In Netlify: **Domain management**
2. Aktiviere: **Force HTTPS**
3. Aktiviere: **HTTPS redirect**

## 🔧 Optional: netlify.toml Konfiguration

Falls du spezielle Redirects brauchst, kannst du diese in `netlify.toml` hinzufügen:

```toml
# Redirect von Netlify-Subdomain zur Custom Domain
[[redirects]]
  from = "https://smarter2job.netlify.app/*"
  to = "https://www.smarter2job.com/:splat"
  status = 301
  force = true

# Optional: Redirect von Root-Domain zu www-Subdomain (empfohlen)
[[redirects]]
  from = "https://smarter2job.com/*"
  to = "https://www.smarter2job.com/:splat"
  status = 301
  force = true
```

## ✅ Checkliste

### Entscheidung getroffen:
- [ ] Entscheidung getroffen: Netlify DNS oder All-Inkl.com DNS?

### Wenn Netlify DNS gewählt:
- [ ] Nameserver bei All-Inkl.com zu Netlify-Nameservern geändert
- [ ] Netlify DNS automatisch konfiguriert

### Wenn All-Inkl.com DNS gewählt:
- [ ] DNS-Einträge bei All-Inkl.com konfiguriert (ALIAS/ANAME oder A-Record)
- [ ] CNAME für www-Subdomain erstellt

### Wenn Domain bei GoDaddy registriert (wie in deinem Fall):
- [ ] DNS-Einträge bei GoDaddy angelegt (NICHT bei All-Inkl.com!)
- [ ] A-Record `@` → `75.2.60.5` bei GoDaddy erstellt
- [ ] CNAME `www` → `smarter2job.netlify.app` bei GoDaddy erstellt
- [ ] DNS-Propagation abgewartet (5-15 Minuten bei GoDaddy)

### Allgemein:
- [ ] Domain in Netlify hinzugefügt
- [ ] DNS-Propagation abgewartet (kann 24-48h dauern, meist aber schneller)
- [ ] SSL-Zertifikat aktiviert
- [ ] Domain als Primary Domain gesetzt (empfohlen: www.smarter2job.com)
- [ ] HTTPS-Weiterleitung aktiviert
- [ ] Website unter `https://www.smarter2job.com` erreichbar
- [ ] Website unter `https://smarter2job.com` erreichbar (oder leitet zu www weiter)
- [ ] Alte Netlify-URL leitet zur neuen Domain weiter

## 🐛 Troubleshooting

### Problem: Rote Warnung "Nameserver nicht hinterlegt" bei All-Inkl.com

**Symptom:**
- Rote Warnung: "Für die Domain smarter2job.com sind nicht unsere Nameserver hinterlegt"
- DNS-Einträge bei All-Inkl.com werden nicht wirksam

**Ursache:**
- Die Domain ist bei einem anderen Registrar registriert (z.B. GoDaddy)
- Die Nameserver zeigen auf den Registrar, nicht auf All-Inkl.com
- DNS-Einträge müssen beim Registrar angelegt werden, nicht bei All-Inkl.com

**Lösung:**

**Wenn Domain bei GoDaddy registriert (wie in deinem Fall):**
1. **Ignoriere die Einträge bei All-Inkl.com** - sie werden nicht verwendet
2. Gehe zu GoDaddy → **Meine Produkte** → **DNS verwalten**
3. Lege die DNS-Einträge bei GoDaddy an:
   - A-Record: `@` → `75.2.60.5`
   - CNAME: `www` → `smarter2job.netlify.app`
4. Warte 5-15 Minuten auf DNS-Propagation

**Wenn Domain bei einem anderen Registrar registriert:**
1. Gehe zu deinem Domain-Registrar
2. Öffne die DNS-Verwaltung dort
3. Lege die DNS-Einträge beim Registrar an (nicht bei All-Inkl.com)
4. Die Einträge sind: A-Record `@` → `75.2.60.5` und CNAME `www` → `smarter2job.netlify.app`

**Wenn Domain bei All-Inkl.com registriert:**
1. Gehe zu All-Inkl.com → **Domain-Verwaltung** → **Nameserver**
2. Stelle sicher, dass All-Inkl.com Nameserver eingestellt sind
3. Warte 5-60 Minuten auf Propagation

### Problem: Domain wird nicht erkannt

**Lösung:**
- Prüfe DNS-Einträge (kann mit `dig smarter2job.com` oder `nslookup smarter2job.com` getestet werden)
- Prüfe, ob die Nameserver korrekt sind (siehe Problem oben)
- Warte auf DNS-Propagation (kann bis zu 48h dauern)
- Prüfe, ob TTL-Werte nicht zu hoch sind

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

### Problem: Nameserver zu früh zu All-Inkl.com geändert - kann bei GoDaddy keine DNS-Einträge mehr anlegen

**Symptom:**
- Domain ist bei GoDaddy registriert
- Nameserver wurden zu All-Inkl.com geändert
- Bei GoDaddy ist "DNS verwalten" nicht verfügbar oder zeigt keine Einträge
- Meldung: "Nameserver werden von einem anderen Provider verwaltet"

**Lösung:**

**Option 1: Nameserver zurück zu GoDaddy ändern (EMPFOHLEN)**

1. **Bei GoDaddy:**
   - Gehe zu **Meine Produkte** → `smarter2job.com` → **DNS verwalten**
   - Suche nach **"Nameserver"** oder **"Nameservers"**
   - Klicke auf **"Ändern"** (Change)
   - Wähle **"GoDaddy Nameserver verwenden"**
   - Oder setze manuell: `ns1.godaddy.com` und `ns2.godaddy.com`
   - Speichere

2. **Warte 5-60 Minuten** auf DNS-Propagation

3. **Lege DNS-Einträge bei GoDaddy an:**
   - A-Record: `@` → `75.2.60.5`
   - CNAME: `www` → `smarter2job.netlify.app`

**Option 2: DNS-Einträge bei All-Inkl.com anlegen (wenn Nameserver dort bleiben sollen)**

1. **Bei All-Inkl.com:**
   - Gehe zu **DNS-Verwaltung** für `smarter2job.com`
   - Lege die DNS-Einträge an:
     - A-Record: `@` → `75.2.60.5`
     - CNAME: `www` → `smarter2job.netlify.app`

2. **Warte 5-60 Minuten** auf DNS-Propagation

**💡 Empfehlung:** Da die Domain bei GoDaddy registriert ist, ist Option 1 (Nameserver zurück zu GoDaddy) einfacher und übersichtlicher.

### Problem: Nameserver können bei GoDaddy nicht geändert werden - "Diese Funktion steht für diese Domain wegen ihres Status nicht zur Verfügung"

**Symptom:**
- Domain ist bei GoDaddy registriert
- Nameserver können nicht geändert werden
- Fehlermeldung: "Diese Funktion steht für diese Domain wegen ihres Status nicht zur Verfügung"
- DNS-Verwaltung bei GoDaddy nicht möglich

**Mögliche Ursachen:**
1. Domain wurde zu All-Inkl.com übertragen (Domain Transfer)
2. Domain hat einen speziellen Status (Lock, Transfer in Progress, etc.)
3. Domain-Registrierung läuft ab oder ist gesperrt

**Lösung: DNS-Einträge bei All-Inkl.com anlegen**

Da die Nameserver bereits auf All-Inkl.com zeigen (oder die Domain zu All-Inkl.com übertragen wurde):

1. **Prüfe, ob die DNS-Einträge bei All-Inkl.com bereits vorhanden sind:**
   - Gehe zu All-Inkl.com → **DNS-Einstellungen** → `smarter2job.com`
   - Schaue, ob die Einträge bereits angelegt sind:
     - A-Record: `@` → `75.2.60.5`
     - CNAME: `www` → `smarter2job.netlify.app`

2. **Wenn Einträge fehlen, lege sie bei All-Inkl.com an:**
   - Siehe Anleitung oben: "Alternative Lösung: DNS-Einträge direkt bei All-Inkl.com anlegen"

3. **Prüfe die Nameserver:**
   - Nutze: https://www.whatsmydns.net/#NS/smarter2job.com
   - Wenn die Nameserver auf All-Inkl.com zeigen, funktionieren die DNS-Einträge dort

4. **Warte auf DNS-Propagation:**
   - 5-60 Minuten
   - Prüfe mit: https://www.whatsmydns.net/#A/smarter2job.com

**💡 Wichtig:** 
- Die rote Warnung bei All-Inkl.com kann erscheinen, aber die DNS-Einträge funktionieren trotzdem, wenn die Nameserver auf All-Inkl.com zeigen
- Du musst die Nameserver nicht zurück zu GoDaddy ändern - nutze einfach die DNS-Einträge bei All-Inkl.com

---

#### ✅ Nächster Schritt: Nameserver prüfen und ggf. ändern

**Status:** Die DNS-Einträge bei All-Inkl.com sind korrekt angelegt ✅

**Jetzt musst du prüfen, wo die Nameserver aktuell hinzeigen:**

1. **Prüfe die Nameserver online:**
   - Gehe zu: https://www.whatsmydns.net/#NS/smarter2job.com
   - Oder nutze: https://dnschecker.org/#NS/smarter2job.com
   - Schaue, welche Nameserver angezeigt werden

2. **Mögliche Szenarien:**

   **Szenario A: Nameserver zeigen auf All-Inkl.com (z.B. `ns1.kasserver.com`, `ns2.kasserver.com`)**
   - ✅ Perfekt! Die DNS-Einträge bei All-Inkl.com sollten funktionieren
   - Warte 5-60 Minuten auf DNS-Propagation
   - Prüfe mit: https://www.whatsmydns.net/#A/smarter2job.com
   - Die Domain sollte dann auf Netlify zeigen

   **Szenario B: Nameserver zeigen auf GoDaddy (z.B. `ns35.domaincontrol.com`, `ns36.domaincontrol.com`) - DEIN FALL**
   - ❌ Die DNS-Einträge bei All-Inkl.com werden nicht verwendet
   - Du musst die Nameserver zu All-Inkl.com ändern
   - **Problem:** Du kannst die Nameserver bei GoDaddy nicht ändern (Domain-Status verhindert Änderung)
   - **Lösung:** Siehe detaillierte Anleitung unten

   **Szenario C: Nameserver zeigen auf einen anderen Provider**
   - Prüfe, wo die Nameserver hinzeigen
   - Ändere die Nameserver zu All-Inkl.com (bei deinem Domain-Registrar)

3. **Nach Nameserver-Änderung:**
   - Warte 5-60 Minuten auf Propagation
   - Prüfe mit: https://www.whatsmydns.net/#NS/smarter2job.com
   - Die Nameserver sollten dann auf All-Inkl.com zeigen
   - Die DNS-Einträge bei All-Inkl.com werden dann wirksam

---

#### 🔧 Lösung für Szenario B: Nameserver von GoDaddy zu All-Inkl.com ändern

**Deine Situation:**
- ✅ DNS-Einträge bei All-Inkl.com sind korrekt angelegt
- ❌ Nameserver zeigen auf GoDaddy (`ns35.domaincontrol.com`, `ns36.domaincontrol.com`)
- ❌ Nameserver können bei GoDaddy nicht selbst geändert werden

**Du hast 3 Optionen:**

##### Option 1: GoDaddy Support kontaktieren (EMPFOHLEN)

1. **Kontaktiere GoDaddy Support:**
   - Gehe zu: https://www.godaddy.com/help
   - Oder rufe an: +49 (0) 800 723 4656 (Deutschland)
   - Oder nutze den Live-Chat im GoDaddy-Konto

2. **Bitte um Änderung der Nameserver:**
   - Sage: "Ich möchte die Nameserver für die Domain smarter2job.com ändern"
   - Nenne die All-Inkl.com Nameserver (siehe unten, wie du diese findest)
   - Oder bitte um Freischaltung, damit du die Nameserver selbst ändern kannst

3. **All-Inkl.com Nameserver finden:**
   - Gehe zu All-Inkl.com → **Domain-Verwaltung** → **Nameserver**
   - Oder kontaktiere All-Inkl.com Support
   - Typische All-Inkl.com Nameserver:
     - `ns1.kasserver.com`
     - `ns2.kasserver.com`
     - (All-Inkl zeigt dir die korrekten Nameserver für deinen Account)

##### Option 2: Prüfe, ob Nameserver bei All-Inkl.com geändert werden können

1. **Gehe zu All-Inkl.com:**
   - Logge dich in dein Kundenmenü ein
   - Gehe zu: **Domain-Verwaltung** → **Nameserver**
   - Prüfe, ob du die Nameserver dort ändern kannst

2. **Wenn möglich:**
   - Ändere die Nameserver zu All-Inkl.com Nameservern
   - Warte auf Propagation (5-60 Minuten)

##### Option 3: Netlify DNS verwenden (Alternative)

Wenn die Nameserver-Änderung nicht möglich ist, kannst du Netlify DNS verwenden:

1. **In Netlify:**
   - Gehe zu: **Domain management** → `smarter2job.com`
   - Klicke auf: **"Richten Sie Netlify DNS für smarter2job.com ein"**
   - Netlify zeigt dir die Nameserver an

2. **Bitte GoDaddy Support, die Nameserver zu Netlify zu ändern:**
   - Kontaktiere GoDaddy Support
   - Bitte um Änderung der Nameserver zu den von Netlify angegebenen Nameservern
   - Netlify übernimmt dann die DNS-Verwaltung automatisch

**💡 Empfehlung:** Option 1 (GoDaddy Support kontaktieren) ist am einfachsten. Die Nameserver müssen zu All-Inkl.com geändert werden, damit die DNS-Einträge dort wirksam werden.

## 📚 Weitere Ressourcen

- [Netlify Domain Docs](https://docs.netlify.com/domains-https/custom-domains/)
- [DNS Propagation Checker](https://www.whatsmydns.net/)

