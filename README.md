# Smarter2Job Landing Page

Landingpage für Smarter2Job - Eine KI-gestützte Plattform zur Optimierung von Bewerbungen.

## 🚀 Entwicklung

### Voraussetzungen

- Node.js (Version 18 oder höher)
- npm oder yarn

### Installation

```bash
npm install
```

### Development Server starten

```bash
npm run dev
```

Die Anwendung läuft dann auf `http://localhost:5173`

### Build für Produktion

```bash
npm run build
```

Der Build wird im `dist`-Ordner erstellt.

### Preview des Production Builds

```bash
npm run preview
```

## 🛠️ Technologien

- **React 19** - UI Framework
- **TypeScript** - Type Safety
- **Vite** - Build Tool
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

## 📁 Projektstruktur

```
src/
  ├── components/
  │   └── Smarter2JobLanding.tsx  # Haupt-Landingpage-Komponente
  ├── App.tsx                      # App-Komponente
  ├── main.tsx                     # Entry Point
  └── index.css                    # Tailwind CSS Imports
```

## 🌐 Deployment

Das Projekt ist für das Deployment auf Netlify vorbereitet. Nach dem Build kann der `dist`-Ordner direkt auf Netlify deployed werden.

### Netlify Deployment

1. Build erstellen: `npm run build`
2. `dist`-Ordner auf Netlify hochladen
3. Oder: Netlify mit GitHub/GitLab verbinden für automatisches Deployment

## 📝 Features

- Responsive Design
- Storytelling-Sektion mit echten Geschichten
- Features-Übersicht
- Pricing-Pläne
- FAQ-Sektion mit Accordion
- Smooth Scrolling Navigation

## 🎨 Design

- Primärfarbe: `#0a4f5c` (Teal)
- Akzentfarbe: `#ff6b35` (Orange)
- Dark Section: `#0f172a` (Slate)
