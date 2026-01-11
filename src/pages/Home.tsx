import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, CheckCircle } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'warnzeichen' | 'schluesselbegriffe' | 'passungspruefung'>('warnzeichen');
  const [showVideoModal, setShowVideoModal] = useState(false);

  const testimonials = [
    {
      quote: "Endlich verstehe ich, was in Stellenanzeigen wirklich steht.",
      author: "Sarah M.",
    },
    {
      quote: "Die Warnzeichen haben mir mehrere Fehlbewerbungen erspart.",
      author: "Thomas K.",
    },
    {
      quote: "Klarheit vor dem Absenden – genau das, was ich brauchte.",
      author: "Lisa R.",
    },
  ];

  const faqPreview = [
    {
      question: "Ist das ein Abo?",
      answer: "Nein. Alle Pakete sind einmalig."
    },
    {
      question: "Wie schnell erhalte ich Ergebnisse?",
      answer: "Preview in 30–60 Sekunden. Pakete: Bearbeitung innerhalb 48 Stunden nach Einreichung."
    },
    {
      question: "Was bedeutet 'automatische Vorauswahl'?",
      answer: "Viele Unternehmen nutzen Bewerbungssoftware, die Bewerbungen vorab sortiert. Schlüsselbegriffe und Aufbau beeinflussen, ob ein Mensch die Bewerbung sieht."
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Section 1: Hero */}
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
              Smarter2Job hilft, Stellenanzeigen zu lesen, Warnzeichen zu erkennen, Schlüsselbegriffe zu verstehen, Passung vorzubereiten.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-4">
              <Link
                to="/stellencheck"
                className="btn btn-primary btn-lg"
                style={{ 
                  backgroundColor: '#ff6b35',
                  textDecoration: 'none'
                }}
              >
                Stellenanzeige prüfen
              </Link>
              <Link
                to="/so-funktionierts"
                className="btn btn-secondary btn-lg"
                style={{ 
                  textDecoration: 'none'
                }}
              >
                So funktioniert's
              </Link>
            </div>
            
            <p style={{ 
              fontSize: '14px',
              color: 'var(--text-muted)',
              textAlign: 'center'
            }}>
              Ohne Anmeldung · Ergebnis in 30–60 Sekunden · 3 Warnzeichen als Vorschau
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Interaktiver Teaser */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-8 border-2" style={{ borderColor: '#ff6b35' }}>
            <h2 className="text-2xl font-bold text-center mb-4" style={{ color: 'var(--text)' }}>
              Vorschau: bis zu 3 Warnzeichen gratis
            </h2>
            <div className="mb-6">
              <textarea
                placeholder="Link oder Text der Stellenanzeige hier einfügen …"
                className="w-full min-h-[100px] p-4 border-2 border-gray-200 rounded-lg focus:border-[#0a4f5c] focus:outline-none resize-y text-gray-900"
                style={{ fontFamily: 'inherit' }}
              />
            </div>
            <Link
              to="/stellencheck"
              className="block w-full text-center btn btn-primary"
              style={{ 
                backgroundColor: '#ff6b35',
                textDecoration: 'none'
              }}
            >
              Zum Stellencheck
            </Link>
            <p className="text-sm text-gray-500 text-center mt-4">
              Kostenlos · Keine Anmeldung · Ergebnis in 30–60 Sekunden
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: 3-Step Erklärung */}
      <section className="py-20 bg-white">
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
              <h3 className="text-lg font-semibold mb-2">Entscheiden + Bewerbung gezielt vorbereiten</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Feature-Tabs */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: 'var(--text)' }}>
            Was du bekommst
          </h2>
          
          <div className="flex justify-center gap-2 mb-8 flex-wrap">
            <button
              onClick={() => setActiveTab('warnzeichen')}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                activeTab === 'warnzeichen'
                  ? 'bg-[#ff6b35] text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Warnzeichen
            </button>
            <button
              onClick={() => setActiveTab('schluesselbegriffe')}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                activeTab === 'schluesselbegriffe'
                  ? 'bg-[#ff6b35] text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Schlüsselbegriffe
            </button>
            <button
              onClick={() => setActiveTab('passungspruefung')}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                activeTab === 'passungspruefung'
                  ? 'bg-[#ff6b35] text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Passungsprüfung
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 min-h-[300px]">
            {activeTab === 'warnzeichen' && (
              <div>
                <h3 className="text-2xl font-bold mb-4">Warnzeichen erkennen</h3>
                <ul className="space-y-3 text-gray-700 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <span>Unrealistische Anforderungen identifizieren</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <span>Red Flags in Formulierungen erkennen</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <span>Realismus-Check für dein Profil</span>
                  </li>
                </ul>
                <Link to="/so-funktionierts" className="text-[#ff6b35] font-semibold hover:underline">
                  Mehr erfahren →
                </Link>
              </div>
            )}

            {activeTab === 'schluesselbegriffe' && (
              <div>
                <h3 className="text-2xl font-bold mb-4">Schlüsselbegriffe verstehen</h3>
                <ul className="space-y-3 text-gray-700 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <span>Wichtige Begriffe für automatische Vorauswahl</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <span>Fehlende Begriffe identifizieren</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <span>Platzierungstipps für Lebenslauf</span>
                  </li>
                </ul>
                <Link to="/so-funktionierts" className="text-[#ff6b35] font-semibold hover:underline">
                  Mehr erfahren →
                </Link>
              </div>
            )}

            {activeTab === 'passungspruefung' && (
              <div>
                <h3 className="text-2xl font-bold mb-4">Passungsprüfung (ab Paket 2)</h3>
                <ul className="space-y-3 text-gray-700 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <span>Fit-Bewertung mit deinem Lebenslauf</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <span>Empfehlung: Bewerben / Lassen mit Begründung</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <span>Zugeschnittener Lebenslauf für diese Stelle</span>
                  </li>
                </ul>
                <Link to="/so-funktionierts" className="text-[#ff6b35] font-semibold hover:underline">
                  Mehr erfahren →
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Section 5: Video Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8" style={{ color: 'var(--text)' }}>
            In 90 Sekunden erklärt
          </h2>
          <div 
            className="relative bg-gray-900 rounded-xl shadow-2xl cursor-pointer overflow-hidden group"
            style={{ aspectRatio: '16/9', maxWidth: '800px', margin: '0 auto' }}
            onClick={() => setShowVideoModal(true)}
          >
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#0a4f5c] to-[#083d47]">
              <Play className="w-20 h-20 text-white group-hover:scale-110 transition-transform" style={{ marginLeft: '4px' }} />
            </div>
            <div className="absolute bottom-4 left-4 right-4 text-white text-center">
              <p className="text-lg font-semibold mb-2">Smarter2Job erklärt</p>
              <p className="text-sm opacity-90">Klick zum Abspielen</p>
            </div>
          </div>

          {showVideoModal && (
            <div 
              className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
              onClick={() => setShowVideoModal(false)}
            >
              <div 
                className="bg-white rounded-lg p-4 max-w-4xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative" style={{ aspectRatio: '16/9' }}>
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded">
                    <p className="text-gray-500">Video Platzhalter – Hier kommt das Erklärvideo</p>
                  </div>
                  <button
                    onClick={() => setShowVideoModal(false)}
                    className="absolute top-2 right-2 bg-white rounded-full p-2 hover:bg-gray-100"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Section 6: Pakete-Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: 'var(--text)' }}>
            Wähle dein Paket
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { price: '59€', name: 'Stellencheck', features: ['3 Stellenanzeigen-Checks', 'Warnzeichen + Schlüsselbegriffe', 'Priorisierung'] },
              { price: '149€', name: 'Bewerbung auf den Punkt', features: ['Passungsprüfung mit Lebenslauf', '1 zugeschnittener Lebenslauf', 'Empfehlung: Bewerben/Lassen'], highlight: true },
              { price: '299€', name: 'Bewerbungs-Sprint', features: ['5 Stellenanzeigen-Checks (30 Tage)', '2 zugeschnittene Lebensläufe', 'LinkedIn-Profil Update'] },
            ].map((pkg, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl shadow-lg p-6 ${pkg.highlight ? 'border-2 border-[#ff6b35]' : ''}`}
              >
                <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">{pkg.price}</span>
                  <span className="text-gray-500 ml-2">einmalig</span>
                </div>
                <ul className="space-y-2 text-sm text-gray-700 mb-6">
                  {pkg.features.map((feature, i) => (
                    <li key={i}>• {feature}</li>
                  ))}
                </ul>
                <Link
                  to="/preise"
                  className="block w-full text-center py-2 px-4 rounded-lg font-semibold transition"
                  style={{
                    backgroundColor: pkg.highlight ? '#ff6b35' : 'transparent',
                    color: pkg.highlight ? 'white' : '#0a4f5c',
                    border: pkg.highlight ? 'none' : '2px solid #0a4f5c',
                    textDecoration: 'none'
                  }}
                  onMouseOver={(e) => {
                    if (!pkg.highlight) {
                      e.currentTarget.style.backgroundColor = '#0a4f5c';
                      e.currentTarget.style.color = 'white';
                    } else {
                      e.currentTarget.style.backgroundColor = '#e55a2b';
                    }
                  }}
                  onMouseOut={(e) => {
                    if (!pkg.highlight) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = '#0a4f5c';
                    } else {
                      e.currentTarget.style.backgroundColor = '#ff6b35';
                    }
                  }}
                >
                  Zu Preisen
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7: Social Proof */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: 'var(--text)' }}>
            Was andere sagen
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 italic mb-4">"{testimonial.quote}"</p>
                <p className="text-sm text-gray-500">— {testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 8: FAQ Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: 'var(--text)' }}>
            Häufige Fragen
          </h2>
          <div className="space-y-4 mb-8">
            {faqPreview.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-semibold mb-2">{faq.question}</h3>
                <p className="text-gray-700 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link
              to="/faq"
              className="text-[#ff6b35] font-semibold hover:underline"
            >
              Alle FAQs ansehen →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
