# 🌐 Domain-Setup: smarter2job.com

Anleitung zur Umstellung von `smarter2job.netlify.app` auf `smarter2job.com`

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

Netlify zeigt dir die benötigten DNS-Einträge an. Du musst diese bei deinem Domain-Provider konfigurieren.

#### Option A: Root Domain (smarter2job.com)

**DNS-Einträge hinzufügen:**

1. Gehe zu deinem Domain-Provider (z.B. Namecheap, GoDaddy, Cloudflare, etc.)
2. Öffne die DNS-Verwaltung für `smarter2job.com`
3. Füge folgende Einträge hinzu:

**Für Root Domain:**
```
Type: A
Name: @
Value: [IP-Adresse von Netlify - wird in Netlify angezeigt]
TTL: 3600 (oder Auto)
```

**Für www-Subdomain:**
```
Type: CNAME
Name: www
Value: smarter2job.netlify.app
TTL: 3600 (oder Auto)
```

#### Option B: Nur www-Subdomain (www.smarter2job.com)

Einfacher, aber weniger professionell:

```
Type: CNAME
Name: www
Value: smarter2job.netlify.app
TTL: 3600
```

### Schritt 3: SSL-Zertifikat aktivieren

1. Nach dem Hinzufügen der DNS-Einträge:
   - Netlify erkennt die Domain automatisch
   - SSL-Zertifikat wird automatisch von Let's Encrypt erstellt
   - Dauer: 5-60 Minuten

2. Prüfe den Status:
   - In Netlify: **Domain management** → Status sollte "Active" sein
   - SSL-Status sollte "Certificate issued" anzeigen

### Schritt 4: Domain als Primary Domain setzen

1. In Netlify: **Domain management**
2. Klicke auf die drei Punkte neben `smarter2job.com`
3. Wähle: **Set as primary domain**
4. Bestätige

### Schritt 5: HTTPS-Weiterleitung aktivieren

1. In Netlify: **Domain management**
2. Aktiviere: **Force HTTPS**
3. Aktiviere: **HTTPS redirect**

## 🔧 Optional: netlify.toml Konfiguration

Falls du spezielle Redirects brauchst, kannst du diese in `netlify.toml` hinzufügen:

```toml
[[redirects]]
  from = "https://smarter2job.netlify.app/*"
  to = "https://smarter2job.com/:splat"
  status = 301
  force = true
```

## ✅ Checkliste

- [ ] Domain in Netlify hinzugefügt
- [ ] DNS-Einträge beim Domain-Provider konfiguriert
- [ ] DNS-Propagation abgewartet (kann 24-48h dauern, meist aber schneller)
- [ ] SSL-Zertifikat aktiviert
- [ ] Domain als Primary Domain gesetzt
- [ ] HTTPS-Weiterleitung aktiviert
- [ ] Website unter `https://smarter2job.com` erreichbar
- [ ] Alte Netlify-URL leitet zur neuen Domain weiter

## 🐛 Troubleshooting

### Problem: Domain wird nicht erkannt

**Lösung:**
- Prüfe DNS-Einträge (kann mit `dig smarter2job.com` oder `nslookup smarter2job.com` getestet werden)
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

## 📚 Weitere Ressourcen

- [Netlify Domain Docs](https://docs.netlify.com/domains-https/custom-domains/)
- [DNS Propagation Checker](https://www.whatsmydns.net/)

