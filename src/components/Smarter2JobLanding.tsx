import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import RedFlagTeaser from './RedFlagTeaser';
import HeroMiniDemo from './landing/HeroMiniDemo';
import ExampleReportTabs from './landing/ExampleReportTabs';
import PreSendStepper from './landing/PreSendStepper';

export default function Smarter2JobLanding() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "Ist das ein Abo?",
      answer: "Nein. Alle Pakete sind einmalig."
    },
    {
      question: "Wie schnell erhalte ich Ergebnisse?",
      answer: "Preview in 30–60 Sekunden. Pakete: Bearbeitung innerhalb 48 Stunden nach Einreichung."
    },
    {
      question: "Warum gibt es die Passungsprüfung erst ab Paket 2?",
      answer: "Weil wir dafür deinen Lebenslauf (und optional Dealbreaker) brauchen."
    },
    {
      question: "Versprecht ihr Einladungen?",
      answer: "Nein. Wir liefern Vorbereitung, Klarheit und Passung – keine Einladungsgarantie."
    },
    {
      question: "Was bedeutet 'automatische Vorauswahl'?",
      answer: "Viele Unternehmen nutzen Bewerbungssoftware, die Bewerbungen vorab sortiert. Schlüsselbegriffe und Aufbau beeinflussen, ob ein Mensch die Bewerbung sieht."
    }
  ];

  return (
    <div className="min-h-screen bg-white">

      {/* 1) HERO Section */}
      <section className="section-hero" style={{ paddingTop: 'clamp(140px, 15vh, 180px)', paddingBottom: '60px' }}>
        <div className="container-narrow">
          <div className="text-center">
            <h1 style={{ 
              color: 'var(--text)', 
              marginBottom: '24px',
              fontSize: 'clamp(40px, 5vw, 60px)',
              lineHeight: '1.1'
            }}>
              Viele Absagen – und du weißt nicht, warum?
            </h1>
            
            <p style={{ 
              fontSize: 'clamp(18px, 2vw, 20px)', 
              color: 'var(--text-muted)', 
              marginBottom: '32px',
              maxWidth: '70ch',
              marginLeft: 'auto',
              marginRight: 'auto',
              lineHeight: '1.6'
            }}>
              Starte vor dem Absenden. Smarter2Job zeigt dir in Minuten, ob eine Stelle wirklich passt – inkl. Warnsignalen, Realismus-Check und Schlüsselbegriffen.
            </p>

            <HeroMiniDemo />
          </div>
        </div>
      </section>

      {/* TABS-BEISPIELREPORT */}
      <ExampleReportTabs />

      {/* 2) INPUT-FRAME Section */}
      <section id="check" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-4" style={{ color: 'var(--text)' }}>
            Stellenanzeige testen (gratis Vorschau)
          </h2>
          <p className="text-center text-gray-600 mb-8" style={{ fontSize: '16px' }}>
            Link einfügen oder Text reinkopieren – du siehst sofort die ersten 3 Warnzeichen.
          </p>
          <RedFlagTeaser />
        </div>
      </section>

      {/* 3) RESULTS/PREVIEW - wird in RedFlagTeaser angezeigt */}

      {/* 4) SO FUNKTIONIERT'S Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: 'var(--text)' }}>
            So funktioniert's
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#0a4f5c', color: 'white', fontSize: '24px', fontWeight: 'bold' }}>
                1
              </div>
              <h3 className="text-lg font-semibold mb-2">Stellenanzeige einfügen</h3>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#ff6b35', color: 'white', fontSize: '24px', fontWeight: 'bold' }}>
                2
              </div>
              <h3 className="text-lg font-semibold mb-2">Warnzeichen & Schlüsselbegriffe erkennen</h3>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#0a4f5c', color: 'white', fontSize: '24px', fontWeight: 'bold' }}>
                3
              </div>
              <h3 className="text-lg font-semibold mb-2">Entscheiden: bewerben – oder lassen</h3>
            </div>
          </div>
        </div>
      </section>

      {/* 5) OUTCOMES Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: 'var(--text)' }}>
            Was du davon hast
          </h2>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold mb-2">Du erkennst vor dem Absenden, ob sich eine Bewerbung lohnt</h3>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold mb-2">Du siehst, welche Anforderungen realistisch sind – und welche nur gut klingen</h3>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold mb-2">Du bekommst Klarheit, welche Schlüsselbegriffe wichtig sind</h3>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold mb-2">Du bewirbst dich gezielter – nicht mehr breiter</h3>
            </div>
          </div>
          <p className="text-center text-sm text-gray-600 italic">
            Keine Einladungsgarantie: Wir verbessern Vorbereitung und Passung.
          </p>
        </div>
      </section>

      {/* 3-STEP SCROLL-STEPPER */}
      <PreSendStepper />

      {/* 6) PAKETE Section */}
      <section id="pakete" className="py-20" style={{ backgroundColor: '#0a4f5c', background: 'linear-gradient(135deg, #0a4f5c 0%, #083d47 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-4" style={{ color: '#ffffff' }}>
            Wähle dein Paket
          </h2>

          <div className="mb-12" style={{ textAlign: 'center' }}>
            <p className="text-sm text-gray-300">
              Upgrade ohne Risiko: Wenn du später upgraden willst, rechnen wir deine Zahlung zu 100% an.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Paket 1 - Stellencheck */}
            <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col transition-all duration-300" style={{ 
              height: '100%',
              transform: 'scale(1)',
              boxShadow: '0 12px 30px rgba(15, 23, 42, 0.12)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.06)';
              e.currentTarget.style.boxShadow = '0 24px 60px rgba(255, 107, 74, 0.45), 0 0 40px rgba(255, 107, 74, 0.35)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 12px 30px rgba(15, 23, 42, 0.12)';
            }}>
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ 
                  fontSize: '24px', 
                  fontWeight: 'var(--font-weight-bold)', 
                  color: 'var(--text)',
                  marginBottom: '8px',
                  lineHeight: '1.2'
                }}>
                  Stellencheck
                </h3>
                <p style={{ 
                  fontSize: '16px', 
                  color: 'var(--text-muted)',
                  lineHeight: '1.6'
                }}>
                  Klarheit über mehrere Stellen – bevor du Zeit investierst.
                </p>
              </div>
              <div style={{ marginBottom: '24px' }}>
                <span style={{ 
                  fontSize: '52px', 
                  fontWeight: 'var(--font-weight-extrabold)', 
                  color: 'var(--text)',
                  lineHeight: '1'
                }}>
                  59€
                </span>
                <span style={{ 
                  fontSize: '16px', 
                  color: 'var(--text-muted)',
                  marginLeft: '4px'
                }}>
                  einmalig
                </span>
              </div>
              <ul className="space-y-2 text-gray-700" style={{ marginBottom: '32px', flexGrow: '1' }}>
                <li>• 3 Stellenanzeigen-Checks</li>
                <li>• Warnzeichen + Schlüsselbegriffe</li>
                <li>• Priorisierung (A/B/C)</li>
                <li>• Kompletter Report pro Stelle</li>
              </ul>
              <a
                href="mailto:post@martinbeyer.de?subject=Anfrage%3A%20Stellencheck%20%2859%E2%82%AC%29&body=Hallo%20Smarter2Job-Team%2C%0A%0Aich%20m%C3%B6chte%20das%20Paket%20Stellencheck%20%2859%E2%82%AC%29%20anfragen.%0A%0AName%3A%0AE-Mail%3A%0ALink%20zur%20Stelle%20%28optional%29%3A%0AKurzinfo%20zu%20mir%20%28optional%29%3A%0A%0AViele%20Gr%C3%BC%C3%9Fe"
                className="w-full mt-auto text-center py-3 px-6 rounded-lg font-semibold transition"
                style={{
                  backgroundColor: 'transparent',
                  color: '#0a4f5c',
                  border: '2px solid #0a4f5c'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#0a4f5c';
                  e.currentTarget.style.color = 'white';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#0a4f5c';
                }}
              >
                Paket per E-Mail anfragen
              </a>
            </div>

            {/* Paket 2 - Bewerbung auf den Punkt */}
            <div className="bg-white p-8 rounded-xl shadow-xl flex flex-col relative border-2 transition-all duration-300" style={{ 
              borderColor: '#ff6b35',
              height: '100%',
              transform: 'scale(1)',
              boxShadow: '0 14px 34px rgba(15, 23, 42, 0.14)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.07)';
              e.currentTarget.style.boxShadow = '0 28px 70px rgba(255, 107, 74, 0.5), 0 0 45px rgba(255, 107, 74, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 14px 34px rgba(15, 23, 42, 0.14)';
            }}>
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-white" style={{ backgroundColor: '#ff6b35' }}>
                Beliebt
              </div>
              <div style={{ marginBottom: '24px', marginTop: '8px' }}>
                <h3 style={{ 
                  fontSize: '24px', 
                  fontWeight: 'var(--font-weight-bold)', 
                  color: 'var(--text)',
                  marginBottom: '8px',
                  lineHeight: '1.2'
                }}>
                  Bewerbung auf den Punkt
                </h3>
                <p style={{ 
                  fontSize: '16px', 
                  color: 'var(--text-muted)',
                  lineHeight: '1.6'
                }}>
                  1 Stelle – sauber vorbereitet und stimmig.
                </p>
              </div>
              <div style={{ marginBottom: '24px' }}>
                <span style={{ 
                  fontSize: '52px', 
                  fontWeight: 'var(--font-weight-extrabold)', 
                  color: 'var(--text)',
                  lineHeight: '1'
                }}>
                  149€
                </span>
                <span style={{ 
                  fontSize: '16px', 
                  color: 'var(--text-muted)',
                  marginLeft: '4px'
                }}>
                  einmalig
                </span>
              </div>
              <ul className="space-y-2 text-gray-700" style={{ marginBottom: '32px', flexGrow: '1' }}>
                <li>• Passungsprüfung (Fit-Bewertung) mit Lebenslauf (optional Dealbreaker)</li>
                <li>• Empfehlung: Bewerben / Lassen (mit Begründung)</li>
                <li>• 1 zugeschnittener Lebenslauf für diese Stelle</li>
                <li>• Schlüsselbegriffe: fehlend + Platzierungstipps</li>
                <li>• Gehaltsband-Indikation für diese Stelle</li>
                <li>• Bearbeitung innerhalb 48 Stunden nach Einreichung</li>
              </ul>
              <a
                href="mailto:post@martinbeyer.de?subject=Anfrage%3A%20Bewerbung%20auf%20den%20Punkt%20%28149%E2%82%AC%29&body=Hallo%20Smarter2Job-Team%2C%0A%0Aich%20m%C3%B6chte%20das%20Paket%20Bewerbung%20auf%20den%20Punkt%20%28149%E2%82%AC%29%20anfragen.%0A%0AName%3A%0AE-Mail%3A%0ALink%20zur%20Stelle%20%28optional%29%3A%0AKurzinfo%20zu%20mir%20%28optional%29%3A%0A%0AViele%20Gr%C3%BC%C3%9Fe"
                className="w-full mt-auto text-center py-3 px-6 rounded-lg font-semibold text-white transition"
                style={{
                  backgroundColor: '#ff6b35',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.15)'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#e55a2b';
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.2)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#ff6b35';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
                }}
              >
                Paket per E-Mail anfragen
              </a>
            </div>

            {/* Paket 3 - Bewerbungs-Sprint */}
            <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col transition-all duration-300" style={{ 
              height: '100%',
              transform: 'scale(1)',
              boxShadow: '0 12px 30px rgba(15, 23, 42, 0.12)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.06)';
              e.currentTarget.style.boxShadow = '0 24px 60px rgba(255, 107, 74, 0.45), 0 0 40px rgba(255, 107, 74, 0.35)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 12px 30px rgba(15, 23, 42, 0.12)';
            }}>
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ 
                  fontSize: '24px', 
                  fontWeight: 'var(--font-weight-bold)', 
                  color: 'var(--text)',
                  marginBottom: '8px',
                  lineHeight: '1.2'
                }}>
                  Bewerbungs-Sprint (30 Tage)
                </h3>
                <p style={{ 
                  fontSize: '16px', 
                  color: 'var(--text-muted)',
                  lineHeight: '1.6'
                }}>
                  Momentum über 30 Tage – mehrere Optionen, zwei Top-Bewerbungen.
                </p>
              </div>
              <div style={{ marginBottom: '24px' }}>
                <span style={{ 
                  fontSize: '52px', 
                  fontWeight: 'var(--font-weight-extrabold)', 
                  color: 'var(--text)',
                  lineHeight: '1'
                }}>
                  299€
                </span>
                <span style={{ 
                  fontSize: '16px', 
                  color: 'var(--text-muted)',
                  marginLeft: '4px'
                }}>
                  einmalig
                </span>
              </div>
              <ul className="space-y-2 text-gray-700" style={{ marginBottom: '32px', flexGrow: '1' }}>
                <li>• 5 Stellenanzeigen-Checks (30 Tage nutzbar)</li>
                <li>• 2 zugeschnittene Lebenslaufversionen (Top-2 Stellen)</li>
                <li>• LinkedIn-Profil Update (Überschrift + Über mich + Schlüsselbegriffe/Skills)</li>
                <li>• Bearbeitung innerhalb 48 Stunden nach Einreichung</li>
              </ul>
              <a
                href="mailto:post@martinbeyer.de?subject=Anfrage%3A%20Bewerbungs-Sprint%20%2830%20Tage%29%20%28299%E2%82%AC%29&body=Hallo%20Smarter2Job-Team%2C%0A%0Aich%20m%C3%B6chte%20das%20Paket%20Bewerbungs-Sprint%20%2830%20Tage%29%20%28299%E2%82%AC%29%20anfragen.%0A%0AName%3A%0AE-Mail%3A%0ALink%20zur%20Stelle%20%28optional%29%3A%0AKurzinfo%20zu%20mir%20%28optional%29%3A%0A%0AViele%20Gr%C3%BC%C3%9Fe"
                className="w-full mt-auto text-center py-3 px-6 rounded-lg font-semibold transition"
                style={{
                  backgroundColor: 'transparent',
                  color: '#0a4f5c',
                  border: '2px solid #0a4f5c'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#0a4f5c';
                  e.currentTarget.style.color = 'white';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#0a4f5c';
                }}
              >
                Sprint per E-Mail anfragen
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 7) FAQ Section */}
      <section id="faq" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16">Häufige Fragen</h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-5 flex justify-between items-center text-left hover:bg-gray-50 transition rounded-lg"
                >
                  <span className="text-lg font-semibold text-gray-900">{faq.question}</span>
                  <ChevronDown 
                    className={`w-5 h-5 text-gray-500 transition-transform ${
                      openFaq === index ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-5 text-gray-700 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8) CLOSING Section */}
      <section className="py-20 bg-white">
        <div className="container-narrow">
          <div className="text-center">
            <p style={{ 
              fontSize: 'clamp(24px, 3vw, 32px)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--text)',
              marginBottom: '16px',
              lineHeight: '1.3'
            }}>
              Bewerben ist kein Swipe – es ist vielleicht dein wichtigstes Karriere-Date.
            </p>
            <p style={{ 
              fontSize: 'clamp(18px, 2vw, 20px)',
              color: 'var(--text-muted)',
              lineHeight: '1.6',
              maxWidth: '70ch',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}>
              Smarter2Job hilft dir, Stellen richtig zu lesen, deine Passung im Vorfeld zu prüfen und deine Bewerbung stimmig sowie für die automatische Vorauswahl sichtbar vorzubereiten.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
