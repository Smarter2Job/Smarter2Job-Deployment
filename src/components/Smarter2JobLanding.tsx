import { useState } from 'react';
import { ChevronDown, CheckCircle } from 'lucide-react';
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
      answer: "Weil wir dafür deinen Lebenslauf (und optional Dealbreaker) brauchen. Im Paket \"Verstehen\" analysieren wir nur die Stellenanzeige selbst – ohne dein Profil."
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
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left Column: Text */}
            <div className="text-center md:text-left">
              <h1 style={{ 
                color: 'var(--text)', 
                marginBottom: '20px',
                fontSize: 'clamp(42px, 5vw, 60px)',
                lineHeight: '1.1'
              }}>
                Viele Absagen – und niemand verrät dir warum?
              </h1>
              
              <h2 style={{ 
                fontSize: 'clamp(18px, 2vw, 20px)', 
                color: 'var(--text-muted)', 
                marginBottom: '24px',
                lineHeight: '1.6',
                fontWeight: 'normal'
              }}>
                Smarter2Job zeigt dir, was in der Stellenanzeige wirklich zählt – und wie du deinen Lebenslauf so formulierst, dass er passt.
              </h2>

              <h3 style={{ 
                fontSize: 'clamp(16px, 1.8vw, 18px)', 
                color: 'var(--text)', 
                marginBottom: '32px',
                fontWeight: 'var(--font-weight-semibold)',
                lineHeight: '1.5'
              }}>
                Mit Smarter2Job bekommst du Klarheit und einen Plan, was du besser machen kannst – noch bevor du deine Bewerbung absendest.
              </h3>

              <a
                href="#so-funktionierts"
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById('so-funktionierts') || document.querySelector('[id*="funktioniert"]');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="text-[#0a4f5c] hover:underline font-medium text-sm inline-block mb-6"
                style={{ textDecoration: 'none', display: 'block' }}
              >
                So funktioniert's →
              </a>
            </div>

            {/* Right Column: Input Card */}
            <div>
              <HeroMiniDemo 
                headline="Checke deine Wunschstelle, bevor du dich bewirbst."
                subline="Wir zeigen dir 3 Warnsignale gratis."
                buttonText="Stellenanzeige checken →"
                footerText="Ohne Anmeldung · Ergebnis in 30–60 Sekunden · 3 Warnsignale gratis"
                textareaHeight="min-h-[200px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* TABS-BEISPIELREPORT */}
      <ExampleReportTabs />

      {/* Section: Was du liefern musst / Was du bekommst */}
      <section className="py-16 bg-gray-50">
        <div className="container-narrow">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3" style={{ color: 'var(--text)' }}>
              In 2 Minuten startklar: Das brauchen wir von dir
            </h2>
            <p className="text-lg text-gray-600">
              Je sauberer der Input, desto präziser die Empfehlung.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Card 1: Was du liefern musst */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--text)' }}>
                Was du liefern musst
              </h3>
              <ul className="space-y-3 text-gray-700 mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-[#ff6b35] mt-1">•</span>
                  <span>Deinen Lebenslauf (PDF oder Text)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#ff6b35] mt-1">•</span>
                  <span>Deine ‚Das will ich‘-Liste (z. B. Rolle, Branche, Gehalt, Arbeitsmodell, Standort)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#ff6b35] mt-1">•</span>
                  <span>Deine ‚Das will ich nicht‘-Liste (klare No-Gos & Ausschlusskriterien)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#ff6b35] mt-1">•</span>
                  <span>Die Stellenbeschreibung – am besten als kompletter Text (Copy & Paste)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#ff6b35] mt-1">•</span>
                  <span>Alternativ: der Link zur Stelle (funktioniert, Volltext ist aber genauer)</span>
                </li>
              </ul>
              <p className="text-xs text-gray-500 italic mt-4 pt-4 border-t border-gray-200">
                Warum Volltext besser ist: Viele Job-Portale kürzen Inhalte dynamisch oder laden Teile nach – mit dem kompletten Text erkennen wir Anforderungen und Keywords zuverlässiger.
              </p>
            </div>

            {/* Card 2: Was du bekommst */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--text)' }}>
                Was du bekommst
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <span>Eine klare Empfehlung: GO / CONDITIONAL GO / NO GO</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <span>Begründung in Klartext: Was passt – und was passt (noch) nicht</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <span>ATS- & Keyword-Check: Welche Begriffe fehlen oder sind schwach abgedeckt</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <span>Risikocheck der Stelle: Warnsignale, Realismus, versteckte Anforderungen</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <span>Konkreter Maßnahmenplan: Was du sofort verbessern kannst (priorisiert)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <span>Optionaler Text-Output: Vorschlag für ein passendes Anschreiben (auf die Stelle zugeschnitten)</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Micro-CTA */}
          <div className="text-center">
            <p className="text-sm text-gray-600 italic">
              Tipp: Paste die Stellenbeschreibung als Text – dann ist deine Analyse am treffsichersten.
            </p>
          </div>
        </div>
      </section>

      {/* 4) SO FUNKTIONIERT'S Section */}
      <section id="so-funktionierts" className="py-20 bg-gray-50">
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
                  <h3 className="text-lg font-semibold mb-2">Warnsignale & Schlüsselbegriffe erkennen</h3>
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
            {/* Paket 1 - Verstehen */}
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
                  marginBottom: '4px',
                  lineHeight: '1.2'
                }}>
                  Verstehen
                </h3>
                <p style={{ 
                  fontSize: '14px', 
                  color: 'var(--text-muted)',
                  marginBottom: '8px',
                  lineHeight: '1.4'
                }}>
                  Stellencheck (3 Stellen)
                </p>
                <p style={{ 
                  fontSize: '16px', 
                  color: 'var(--text-muted)',
                  lineHeight: '1.6'
                }}>
                  Prüfe zuerst die Stellen – bevor du Zeit investierst.
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
                <li>• Du siehst, was wirklich gefordert ist – und was eher Beiwerk ist</li>
                <li>• Du erkennst Warnsignale, Widersprüche und Hinweise zwischen den Zeilen (z. B. Überforderung, Chaos, unrealistische Erwartungen)</li>
              </ul>
              <a
                href="mailto:post@martinbeyer.de?subject=Anfrage%3A%20Verstehen%20%28Stellencheck%29%20%2859%E2%82%AC%29&body=Hallo%20Smarter2Job-Team%2C%0A%0Aich%20m%C3%B6chte%20das%20Paket%20Verstehen%20%28Stellencheck%29%20%2859%E2%82%AC%29%20anfragen.%0A%0AName%3A%0AE-Mail%3A%0ALink%20zur%20Stelle%20%28optional%29%3A%0AKurzinfo%20zu%20mir%20%28optional%29%3A%0A%0AViele%20Gr%C3%BC%C3%9Fe"
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
                Stellenanzeige verstehen
              </a>
            </div>

            {/* Paket 2 - Entscheiden */}
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
                  marginBottom: '4px',
                  lineHeight: '1.2'
                }}>
                  Entscheiden
                </h3>
                <p style={{ 
                  fontSize: '14px', 
                  color: 'var(--text-muted)',
                  marginBottom: '8px',
                  lineHeight: '1.4'
                }}>
                  Passungscheck (1 Stelle + Lebenslauf)
                </p>
                <p style={{ 
                  fontSize: '16px', 
                  color: 'var(--text-muted)',
                  lineHeight: '1.6'
                }}>
                  Passt diese Stelle wirklich zu dir? (mit Lebenslauf)
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
              <ul className="space-y-2 text-gray-700" style={{ marginBottom: '12px', flexGrow: '1' }}>
                <li>• Abgleich: Stellenanzeige und dein Lebenslauf</li>
                <li>• 1 optimierter Lebenslauf für eine konkrete Zielstelle</li>
                <li>• Klare Empfehlung: Go / eingeschränktes Go / No-Go</li>
              </ul>
              <p style={{ 
                fontSize: '13px', 
                color: 'var(--text-muted)',
                lineHeight: '1.5',
                fontStyle: 'normal',
                marginBottom: '16px',
                paddingTop: '8px'
              }}>
                Du entscheidest, für welche Stelle wir deinen Lebenslauf optimieren – am besten für eine, die von uns ein Go bekommt.
              </p>
              <a
                href="mailto:post@martinbeyer.de?subject=Anfrage%3A%20Entscheiden%20%28Passungscheck%29%20%28149%E2%82%AC%29&body=Hallo%20Smarter2Job-Team%2C%0A%0Aich%20m%C3%B6chte%20das%20Paket%20Entscheiden%20%28Passungscheck%29%20%28149%E2%82%AC%29%20anfragen.%0A%0AName%3A%0AE-Mail%3A%0ALink%20zur%20Stelle%20%28optional%29%3A%0AKurzinfo%20zu%20mir%20%28optional%29%3A%0A%0AViele%20Gr%C3%BC%C3%9Fe"
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
                Chancen einschätzen
              </a>
            </div>

            {/* Paket 3 - Umsetzen */}
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
                  marginBottom: '4px',
                  lineHeight: '1.2'
                }}>
                  Umsetzen
                </h3>
                <p style={{ 
                  fontSize: '14px', 
                  color: 'var(--text-muted)',
                  marginBottom: '8px',
                  lineHeight: '1.4'
                }}>
                  Bewerbungspaket (5 Stellen + Top-2 optimieren)
                </p>
                <p style={{ 
                  fontSize: '16px', 
                  color: 'var(--text-muted)',
                  lineHeight: '1.6'
                }}>
                  Baue Momentum: erst prüfen, dann zwei Bewerbungen sauber fertig machen.
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
                <li>• 5 Stellenanzeigen-Checks in 30 Tagen</li>
                <li>• 2 optimierte Lebensläufe für zwei Stellen, die du auswählst</li>
                <li>• Konkrete Vorschläge für dein LinkedIn-Profil, passend zu deiner Zielrichtung</li>
              </ul>
              <a
                href="mailto:post@martinbeyer.de?subject=Anfrage%3A%20Umsetzen%20%28Bewerbungspaket%29%20%28299%E2%82%AC%29&body=Hallo%20Smarter2Job-Team%2C%0A%0Aich%20m%C3%B6chte%20das%20Paket%20Umsetzen%20%28Bewerbungspaket%29%20%28299%E2%82%AC%29%20anfragen.%0A%0AName%3A%0AE-Mail%3A%0ALink%20zur%20Stelle%20%28optional%29%3A%0AKurzinfo%20zu%20mir%20%28optional%29%3A%0A%0AViele%20Gr%C3%BC%C3%9Fe"
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
                Lebenslauf optimieren
              </a>
            </div>
          </div>

          {/* ADD-ON SEKTION: Skalieren */}
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-center mb-3" style={{ color: '#ffffff' }}>
                Skalieren – wenn du mehr Stellen parallel prüfen willst
              </h3>
              <p className="text-center text-gray-200 mb-8" style={{ fontSize: '16px' }}>
                Erweitere jederzeit um zusätzliche Stellenchecks oder weitere Lebenslaufversionen.
              </p>
              <ul className="space-y-3 text-gray-200 max-w-2xl mx-auto" style={{ fontSize: '15px' }}>
                <li className="flex items-start gap-3">
                  <span className="text-[#ff6b35] mt-1">•</span>
                  <span>Zusätzliche Stellenchecks (+1 / +3 / +5)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#ff6b35] mt-1">•</span>
                  <span>Zusätzliche Lebenslaufversion pro Stelle</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#ff6b35] mt-1">•</span>
                  <span>Anschreiben-Service (optional)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#ff6b35] mt-1">•</span>
                  <span>LinkedIn-Optimierung (optional)</span>
                </li>
              </ul>
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
            {/* Desktop-Version */}
            <p className="hidden md:block" style={{ 
              fontSize: 'clamp(18px, 2vw, 20px)',
              color: 'var(--text-muted)',
              lineHeight: '1.6',
              maxWidth: '70ch',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}>
              Smarter2Job hilft dir, Stellen richtig zu lesen, deine Chancen einzuschätzen und deinen Lebenslauf so zu optimieren, dass er zur Stelle passt – bevor du abschickst.
            </p>
            {/* Mini-Version für mobile/responsive */}
            <p className="block md:hidden" style={{ 
              fontSize: 'clamp(16px, 1.8vw, 18px)',
              color: 'var(--text-muted)',
              lineHeight: '1.6',
              maxWidth: '70ch',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}>
              Stelle verstehen. Chancen einschätzen. Lebenslauf optimieren – bevor du abschickst.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
