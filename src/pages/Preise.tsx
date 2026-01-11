import { Link } from 'react-router-dom';
import { CheckCircle, Mail } from 'lucide-react';

export default function Preise() {
  const pakete = [
    {
      name: 'Stellencheck',
      price: '59€',
      description: 'Klarheit über mehrere Stellen – bevor du Zeit investierst.',
      features: [
        '3 Stellenanzeigen-Checks',
        'Warnzeichen + Schlüsselbegriffe',
        'Priorisierung (A/B/C)',
        'Kompletter Report pro Stelle',
      ],
      emailSubject: 'Anfrage: Stellencheck (59€)',
      highlight: false,
    },
    {
      name: 'Bewerbung auf den Punkt',
      price: '149€',
      description: '1 Stelle – sauber vorbereitet und stimmig.',
      features: [
        'Passungsprüfung (Fit-Bewertung) mit Lebenslauf (optional Dealbreaker)',
        'Empfehlung: Bewerben / Lassen (mit Begründung)',
        '1 zugeschnittener Lebenslauf für diese Stelle',
        'Schlüsselbegriffe: fehlend + Platzierungstipps',
        'Gehaltsband-Indikation für diese Stelle',
        'Bearbeitung innerhalb 48 Stunden nach Einreichung',
      ],
      emailSubject: 'Anfrage: Bewerbung auf den Punkt (149€)',
      highlight: true,
    },
    {
      name: 'Bewerbungs-Sprint (30 Tage)',
      price: '299€',
      description: 'Momentum über 30 Tage – mehrere Optionen, zwei Top-Bewerbungen.',
      features: [
        '5 Stellenanzeigen-Checks (30 Tage nutzbar)',
        '2 zugeschnittene Lebenslaufversionen (Top-2 Stellen)',
        'LinkedIn-Profil Update (Überschrift + Über mich + Schlüsselbegriffe/Skills)',
        'Bearbeitung innerhalb 48 Stunden nach Einreichung',
      ],
      emailSubject: 'Anfrage: Bewerbungs-Sprint (30 Tage) (299€)',
      highlight: false,
    },
  ];

  const steps = [
    {
      number: 1,
      title: 'Paket per E-Mail anfragen',
      description: 'Schreibe uns eine E-Mail an post@martinbeyer.de mit deinem gewünschten Paket und kurzen Infos zu dir.',
    },
    {
      number: 2,
      title: 'Wir melden uns binnen 24h',
      description: 'Wir senden dir eine Bestätigung und fragen ggf. nach weiteren Infos (z.B. Lebenslauf für Paket 2/3).',
    },
    {
      number: 3,
      title: 'Zahlung & Start',
      description: 'Nach Zahlungseingang starten wir die Analyse. Innerhalb von 48h erhältst du deinen Report per E-Mail.',
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
            Preise
          </h1>
          <p style={{ 
            fontSize: 'clamp(18px, 2vw, 20px)', 
            color: 'var(--text-muted)', 
            maxWidth: '70ch',
            marginLeft: 'auto',
            marginRight: 'auto',
            lineHeight: '1.6'
          }}>
            Wähle das Paket, das zu dir passt. Alle Pakete sind einmalig – kein Abo.
          </p>
        </div>

        {/* Upgrade-Hinweis */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg mb-12">
          <p className="text-blue-800 font-semibold mb-2">Upgrade ohne Risiko</p>
          <p className="text-blue-700 text-sm">
            Wenn du später upgraden willst, rechnen wir deine Zahlung zu 100% an.
          </p>
        </div>

        {/* Pakete */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {pakete.map((pkg, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl shadow-lg p-8 flex flex-col transition-all duration-300 ${
                pkg.highlight ? 'border-2 border-[#ff6b35] relative' : ''
              }`}
              style={{
                transform: 'scale(1)',
                boxShadow: pkg.highlight ? '0 14px 34px rgba(15, 23, 42, 0.14)' : '0 12px 30px rgba(15, 23, 42, 0.12)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = pkg.highlight 
                  ? '0 28px 70px rgba(255, 107, 74, 0.5), 0 0 45px rgba(255, 107, 74, 0.4)'
                  : '0 24px 60px rgba(255, 107, 74, 0.45), 0 0 40px rgba(255, 107, 74, 0.35)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = pkg.highlight 
                  ? '0 14px 34px rgba(15, 23, 42, 0.14)'
                  : '0 12px 30px rgba(15, 23, 42, 0.12)';
              }}
            >
              {pkg.highlight && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-white" style={{ backgroundColor: '#ff6b35' }}>
                  Beliebt
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--text)' }}>
                  {pkg.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{pkg.description}</p>
                <div className="mb-4">
                  <span className="text-5xl font-extrabold" style={{ color: 'var(--text)' }}>
                    {pkg.price}
                  </span>
                  <span className="text-gray-500 ml-2">einmalig</span>
                </div>
              </div>

              <ul className="space-y-3 text-gray-700 mb-8 flex-grow">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href={`mailto:post@martinbeyer.de?subject=${encodeURIComponent(pkg.emailSubject)}&body=${encodeURIComponent(`Hallo Smarter2Job-Team,

ich möchte das Paket "${pkg.name}" anfragen.

Name:
E-Mail:
Link zur Stelle (optional):
Kurzinfo zu mir (optional):

Viele Grüße`)}`}
                className={`w-full mt-auto text-center py-3 px-6 rounded-lg font-semibold transition flex items-center justify-center gap-2 ${
                  pkg.highlight ? 'text-white' : 'border-2'
                }`}
                style={{
                  backgroundColor: pkg.highlight ? '#ff6b35' : 'transparent',
                  color: pkg.highlight ? 'white' : '#0a4f5c',
                  borderColor: pkg.highlight ? 'transparent' : '#0a4f5c',
                  textDecoration: 'none',
                }}
                onMouseOver={(e) => {
                  if (pkg.highlight) {
                    e.currentTarget.style.backgroundColor = '#e55a2b';
                  } else {
                    e.currentTarget.style.backgroundColor = '#0a4f5c';
                    e.currentTarget.style.color = 'white';
                  }
                }}
                onMouseOut={(e) => {
                  if (pkg.highlight) {
                    e.currentTarget.style.backgroundColor = '#ff6b35';
                  } else {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#0a4f5c';
                  }
                }}
              >
                <Mail className="w-4 h-4" />
                Paket per E-Mail anfragen
              </a>
            </div>
          ))}
        </div>

        {/* So geht's per E-Mail */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: 'var(--text)' }}>
            So geht's per E-Mail in 3 Schritten
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-white text-2xl font-bold" style={{ backgroundColor: '#0a4f5c' }}>
                  {step.number}
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Zahlungshinweis */}
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg mb-8">
          <p className="text-yellow-800 font-semibold mb-2">Zahlung & Checkout</p>
          <p className="text-yellow-700 text-sm">
            Aktuell läuft die Bestellung per E-Mail. Stripe-Integration für direkte Online-Zahlung folgt in Kürze.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            Fragen zu den Paketen? Schreib uns einfach eine E-Mail.
          </p>
          <Link
            to="/stellencheck"
            className="btn btn-primary btn-lg inline-block"
            style={{ 
              backgroundColor: '#ff6b35',
              textDecoration: 'none'
            }}
          >
            Jetzt kostenlos testen
          </Link>
        </div>
      </div>
    </div>
  );
}
