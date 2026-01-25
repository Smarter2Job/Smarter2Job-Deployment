import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, CheckCircle } from 'lucide-react';
import HeroMiniDemo from '../components/landing/HeroMiniDemo';
import LeadMagnetCard from '../components/LeadMagnetCard';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'warnsignale' | 'schluesselbegriffe' | 'passungspruefung'>('warnsignale');
  const [showVideoModal, setShowVideoModal] = useState(false);

  // Testimonials: Nur Screenshots, keine Text-Zitate
  const testimonialCount = 3;

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
      <section className="section-hero" style={{ paddingTop: 'clamp(100px, 12vh, 180px)', paddingBottom: '60px' }}>
        <div className="container-narrow">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left Column: Text */}
            <div className="text-center md:text-left">
              <p className="text-sm md:text-base font-medium mb-3" style={{ color: 'var(--text-muted)' }}>
                Frust bei der Jobsuche?
              </p>
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

              <Link
                to="/so-funktionierts"
                className="text-[#0a4f5c] hover:underline font-medium text-sm inline-block mb-6"
                style={{ textDecoration: 'none', display: 'block' }}
              >
                So funktioniert's →
              </Link>
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

      {/* Storyline-Block */}
      <section className="py-20 bg-white">
        <div className="container-narrow">
          <div className="max-w-3xl mx-auto">
            <div style={{ 
              fontSize: 'clamp(16px, 1.8vw, 18px)', 
              color: 'var(--text)', 
              lineHeight: '1.75'
            }}>
              <p className="mb-6">
                <strong>Das Gemeine ist:</strong> Du bekommst Absagen – aber kein echtes Feedback. Oft nur Standardtexte, ohne ehrliche Begründung. So wiederholst du unbewusst dieselben Muster – und kassierst die nächste Absage.
              </p>
              
              <p className="mb-6">
                Das ist, als würdest du durch eine Matheklausur fallen oder die Fahrprüfung nicht bestehen – <strong>ohne zu erfahren, wo deine Fehler lagen</strong>. Und genau das ist unfair: Du sollst besser werden, bekommst aber keine Chance zu lernen.
              </p>
              
              <p className="mb-6">
                <strong>Genau hier setzt Smarter2Job an – wie ein Nachhilfelehrer für deinen Bewerbungsprozess.</strong> Wir dechiffrieren die Stellenanzeige (Schlüsselbegriffe, Anforderungen, Warnsignale), gleichen das mit deinem Profil ab und zeigen dir, <strong>wo du dich klarer und passender positionieren kannst</strong>. Und wenn du willst, gehen wir den Schritt weiter: von der konkreten Lebenslauf-Optimierung bis zur stimmigen Positionierung auf LinkedIn.
              </p>
            </div>
            
            <div className="text-center mt-8" style={{ 
              fontSize: 'clamp(20px, 2.2vw, 24px)', 
              fontWeight: '600',
              letterSpacing: '0.05em',
              color: 'var(--text)'
            }}>
              Verstehen. Entscheiden. Umsetzen.
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: 3-Step Erklärung */}
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
              <h3 className="text-lg font-semibold mb-2">Warnsignale & Schlüsselbegriffe erkennen</h3>
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

      {/* Section 3: Feature-Tabs */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: 'var(--text)' }}>
            Was du bekommst
          </h2>
          
          <div className="flex justify-center gap-2 mb-8 flex-wrap">
            <button
              onClick={() => setActiveTab('warnsignale')}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                activeTab === 'warnsignale'
                  ? 'bg-[#ff6b35] text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Warnsignale
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
            {activeTab === 'warnsignale' && (
              <div>
                <h3 className="text-2xl font-bold mb-4">Warnsignale erkennen</h3>
                <ul className="space-y-3 text-gray-700 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <span>Unrealistische Anforderungen identifizieren</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <span>Warnsignale in Formulierungen erkennen</span>
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

      {/* Section 4: Video Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8" style={{ color: 'var(--text)' }}>
            Job-Decoding in 60 Sekunden erklärt
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
              <p className="text-lg font-semibold mb-2 text-center">Smarter2Job erklärt</p>
              <p className="text-sm opacity-90 text-center">Klick zum Abspielen</p>
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
                  <video
                    className="w-full h-full rounded-lg"
                    controls
                    autoPlay
                    style={{ objectFit: 'contain' }}
                  >
                    <source src="/videos/Intro-Video-Smarter2Job.mov" type="video/quicktime" />
                    <source src="/videos/Intro-Video-Smarter2Job.mov" type="video/mp4" />
                    Ihr Browser unterstützt das Video-Element nicht.
                  </video>
                  <button
                    onClick={() => setShowVideoModal(false)}
                    className="absolute top-2 right-2 bg-white rounded-full p-2 hover:bg-gray-100 shadow-lg z-10"
                    aria-label="Video schließen"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Section 5: Pakete-Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: 'var(--text)' }}>
            Wähle dein Paket
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { price: '59€', name: 'Verstehen', productName: 'Stellencheck (3 Stellen)', features: ['3 Stellenanzeigen-Checks', 'Du siehst, was wirklich gefordert ist', 'Du erkennst Warnsignale und Hinweise'], buttonText: 'Stellenanzeige verstehen' },
              { price: '149€', name: 'Entscheiden', productName: 'Passungscheck (1 Stelle + Lebenslauf)', features: ['Abgleich: Stellenanzeige und Lebenslauf', '1 optimierter Lebenslauf', 'Klare Empfehlung: Go / No-Go'], buttonText: 'Chancen einschätzen', highlight: true },
              { price: '299€', name: 'Umsetzen', productName: 'Bewerbungspaket (5 Stellen + Top-2)', features: ['5 Stellenanzeigen-Checks in 30 Tagen', '2 optimierte Lebensläufe', 'LinkedIn-Vorschläge'], buttonText: 'Lebenslauf optimieren' },
            ].map((pkg, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl shadow-lg p-6 ${pkg.highlight ? 'border-2 border-[#ff6b35]' : ''}`}
              >
                <h3 className="text-xl font-bold mb-1">{pkg.name}</h3>
                {pkg.productName && (
                  <p className="text-gray-500 text-sm mb-2" style={{ fontSize: '14px' }}>{pkg.productName}</p>
                )}
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
                  {pkg.buttonText || 'Zu Preisen'}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: Social Proof */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: 'var(--text)' }}>
            Was Teilnehmer sagen
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {Array.from({ length: testimonialCount }).map((_, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg">
                <img 
                  src={`/testimonials/Testimonial ${index + 1}.png`}
                  alt={`Testimonial ${index + 1}`}
                  className="w-full h-auto rounded-lg shadow-sm"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7: FAQ Preview */}
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

      {/* Section 8: Lead Magnet - Bewerbungs-Checkliste (sekundär) */}
      <section id="checkliste" className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 md:gap-6">
            <LeadMagnetCard
              placement="homepage_faq_bottom"
              variant="secondary"
              tag="checkliste"
              headline="Kostenlose Bewerbungs-Checkliste"
              subline="In 5 Minuten prüfen: Schlüsselbegriffe, Aufbau, häufige Fehler – damit du nicht am ATS scheiterst."
              buttonText="Checkliste per E-Mail erhalten"
              successText="Bitte bestätige deine E-Mail (schau in dein Postfach)."
            />

            <LeadMagnetCard
              placement="homepage_faq_bottom"
              variant="secondary"
              tag="webinar_next"
              headline="Nächstes Webinar – Einladung per E-Mail"
              subline="Du bekommst eine kurze Mail, sobald Termin & Link feststehen."
              buttonText="Einladung erhalten"
              successText="Bitte bestätige deine E-Mail (schau in dein Postfach)."
            />
          </div>
        </div>
      </section>
    </div>
  );
}
