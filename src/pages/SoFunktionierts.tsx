import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, CheckCircle, AlertTriangle, Key } from 'lucide-react';

export default function SoFunktionierts() {
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const sections = [
    {
      title: 'Warnzeichen-Logik',
      content: (
        <div>
          <p className="mb-4">Wir analysieren Stellenanzeigen auf verschiedene Warnzeichen hin:</p>
          <ul className="space-y-2 mb-4">
            <li className="flex items-start gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
              <span><strong>Unrealistische Anforderungen:</strong> Wenn eine Stelle 10+ Jahre Erfahrung in einer Technologie verlangt, die erst 5 Jahre existiert.</span>
            </li>
            <li className="flex items-start gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-500 mt-1 flex-shrink-0" />
              <span><strong>Vage Formulierungen:</strong> "Rockstar", "Ninja", "100% commitment" – oft Code für Überstunden.</span>
            </li>
            <li className="flex items-start gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
              <span><strong>Rote Flaggen:</strong> "Familienatmosphäre" kann auf fehlende Work-Life-Balance hindeuten.</span>
            </li>
          </ul>
          <p className="text-sm text-gray-600 italic">
            Beispiel: Eine Stelle für "Senior React Developer" verlangt 8 Jahre React-Erfahrung, obwohl React erst 2013 veröffentlicht wurde. → Warnzeichen: Unrealistische Anforderungen.
          </p>
        </div>
      ),
    },
    {
      title: 'Schlüsselbegriffe & automatische Vorauswahl',
      content: (
        <div>
          <p className="mb-4">Viele Unternehmen nutzen Bewerbungssoftware, die Bewerbungen vorab sortiert. Diese Systeme scannen nach bestimmten Schlüsselbegriffen:</p>
          <ul className="space-y-2 mb-4">
            <li className="flex items-start gap-2">
              <Key className="w-5 h-5 text-[#0a4f5c] mt-1 flex-shrink-0" />
              <span><strong>Must-Have Begriffe:</strong> Diese müssen im Lebenslauf stehen, sonst wird die Bewerbung aussortiert.</span>
            </li>
            <li className="flex items-start gap-2">
              <Key className="w-5 h-5 text-[#0a4f5c] mt-1 flex-shrink-0" />
              <span><strong>Nice-to-Have Begriffe:</strong> Erhöhen die Relevanz, sind aber nicht zwingend erforderlich.</span>
            </li>
            <li className="flex items-start gap-2">
              <Key className="w-5 h-5 text-[#0a4f5c] mt-1 flex-shrink-0" />
              <span><strong>Platzierung:</strong> Begriffe sollten strategisch platziert werden – nicht nur am Ende.</span>
            </li>
          </ul>
          <p className="text-sm text-gray-600 italic">
            Beispiel: Eine Stelle verlangt "TypeScript, React, Zustand". Fehlen diese Begriffe im Lebenslauf, wird die Bewerbung oft automatisch aussortiert, bevor ein Mensch sie sieht.
          </p>
        </div>
      ),
    },
    {
      title: 'Passungsprüfung mit Lebenslauf (ab Paket 2)',
      content: (
        <div>
          <p className="mb-4">Im Paket "Bewerbung auf den Punkt" prüfen wir die Passung zwischen deinem Profil und der Stelle:</p>
          <ul className="space-y-2 mb-4">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
              <span><strong>Fit-Bewertung:</strong> Wie gut passt dein Profil zu den Anforderungen? (A/B/C-Bewertung)</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
              <span><strong>Empfehlung:</strong> Solltest du dich bewerben oder lieber lassen? Mit klarer Begründung.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
              <span><strong>Zugeschnittener Lebenslauf:</strong> Eine Version, die genau auf diese Stelle passt – mit richtigen Schlüsselbegriffen an der richtigen Stelle.</span>
            </li>
          </ul>
          <p className="text-sm text-gray-600 italic">
            Beispiel: Du hast 3 Jahre React-Erfahrung, die Stelle verlangt 5+. Wir empfehlen: "Bewerben, wenn du dich schnell einarbeiten kannst, sonst lassen" – mit konkreter Begründung.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-white page-content">
      <div className="container-narrow">
        <div className="text-center mb-16">
          <h1 style={{ 
            color: 'var(--text)', 
            marginBottom: '24px',
            fontSize: 'clamp(40px, 5vw, 48px)',
            lineHeight: '1.1'
          }}>
            So funktioniert's
          </h1>
          <p style={{ 
            fontSize: 'clamp(18px, 2vw, 20px)', 
            color: 'var(--text-muted)', 
            maxWidth: '70ch',
            marginLeft: 'auto',
            marginRight: 'auto',
            lineHeight: '1.6'
          }}>
            Hier erklären wir dir, wie Smarter2Job funktioniert und was du von jedem Schritt erwarten kannst.
          </p>
        </div>

        {/* Interaktive Accordion-Sections */}
        <div className="space-y-4 mb-16">
          {sections.map((section, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full px-6 py-5 flex justify-between items-center text-left hover:bg-gray-50 transition"
              >
                <span className="text-xl font-semibold text-gray-900">{section.title}</span>
                <ChevronDown 
                  className={`w-5 h-5 text-gray-500 transition-transform ${
                    openAccordion === index ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              {openAccordion === index && (
                <div className="px-6 pb-6 text-gray-700 leading-relaxed border-t border-gray-200">
                  {section.content}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 3-Step Process Visual */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: 'var(--text)' }}>
            Der Prozess im Überblick
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center text-white text-2xl font-bold" style={{ backgroundColor: '#0a4f5c' }}>
                1
              </div>
              <h3 className="text-lg font-semibold mb-2">Stellenanzeige einfügen</h3>
              <p className="text-gray-600 text-sm">
                Link oder Text der Stelle einfügen – keine Anmeldung nötig.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center text-white text-2xl font-bold" style={{ backgroundColor: '#ff6b35' }}>
                2
              </div>
              <h3 className="text-lg font-semibold mb-2">Analyse läuft</h3>
              <p className="text-gray-600 text-sm">
                Automatische Erkennung von Warnzeichen, Schlüsselbegriffen und Passung.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center text-white text-2xl font-bold" style={{ backgroundColor: '#0a4f5c' }}>
                3
              </div>
              <h3 className="text-lg font-semibold mb-2">Report erhalten</h3>
              <p className="text-gray-600 text-sm">
                Detaillierter Report mit Handlungsempfehlungen und (optional) zugeschnittenem Lebenslauf.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gray-50 rounded-xl p-8 text-center mb-16">
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text)' }}>
            Bereit zum Starten?
          </h2>
          <p className="text-gray-600 mb-6">
            Teste die Vorschau kostenlos – ohne Anmeldung.
          </p>
          <Link
            to="/stellencheck"
            className="btn btn-primary btn-lg inline-block"
            style={{ 
              backgroundColor: '#ff6b35',
              textDecoration: 'none'
            }}
          >
            Jetzt Stellenanzeige prüfen
          </Link>
        </div>
      </div>
    </div>
  );
}
