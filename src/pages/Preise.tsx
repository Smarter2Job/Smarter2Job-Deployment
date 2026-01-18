import { Link } from 'react-router-dom';
import { CheckCircle, Mail } from 'lucide-react';
import BuyButton from '../components/BuyButton';
import { PACKAGES, type PackageId } from '../lib/packages';

export default function Preise() {
  const pakete = [
    {
      packageId: 'verstehen' as PackageId,
      name: 'Verstehen',
      productName: 'Stellencheck (3 Stellen)',
      price: PACKAGES.verstehen.displayPrice,
      description: 'Prüfe zuerst die Stellen – bevor du Zeit investierst.',
      features: [
        '3 Stellenanzeigen-Checks',
        'Du siehst, was wirklich gefordert ist – und was eher Beiwerk ist',
        'Du erkennst Warnsignale, Widersprüche und Hinweise zwischen den Zeilen (z. B. Überforderung, Chaos, unrealistische Erwartungen)',
      ],
      emailSubject: 'Anfrage: Verstehen (Stellencheck) (59€)',
      buttonText: 'Stellenanzeige verstehen',
      highlight: false,
    },
    {
      packageId: 'entscheiden' as PackageId,
      name: 'Entscheiden',
      productName: 'Passungscheck (1 Stelle + Lebenslauf)',
      price: PACKAGES.entscheiden.displayPrice,
      description: 'Passt diese Stelle wirklich zu dir? (mit Lebenslauf)',
      features: [
        'Abgleich: Stellenanzeige und dein Lebenslauf',
        '1 optimierter Lebenslauf für eine konkrete Zielstelle',
        'Klare Empfehlung: Go / eingeschränktes Go / No-Go',
      ],
      note: 'Du entscheidest, für welche Stelle wir deinen Lebenslauf optimieren – am besten für eine, die von uns ein Go bekommt.',
      emailSubject: 'Anfrage: Entscheiden (Passungscheck) (149€)',
      buttonText: 'Chancen einschätzen',
      highlight: true,
    },
    {
      packageId: 'umsetzen' as PackageId,
      name: 'Umsetzen',
      productName: 'Bewerbungspaket (5 Stellen + Top-2 optimieren)',
      price: PACKAGES.umsetzen.displayPrice,
      description: 'Baue Momentum: erst prüfen, dann zwei Bewerbungen sauber fertig machen.',
      features: [
        '5 Stellenanzeigen-Checks in 30 Tagen',
        '2 optimierte Lebensläufe für zwei Stellen, die du auswählst',
        'Konkrete Vorschläge für dein LinkedIn-Profil, passend zu deiner Zielrichtung',
      ],
      emailSubject: 'Anfrage: Umsetzen (Bewerbungspaket) (299€)',
      buttonText: 'Lebenslauf optimieren',
      highlight: false,
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
                <h3 className="text-2xl font-bold mb-1" style={{ color: 'var(--text)' }}>
                  {pkg.name}
                </h3>
                {pkg.productName && (
                  <p className="text-gray-500 text-sm mb-3" style={{ fontSize: '14px' }}>
                    {pkg.productName}
                  </p>
                )}
                <p className="text-gray-600 text-sm mb-4">{pkg.description}</p>
                <div className="mb-4">
                  <span className="text-5xl font-extrabold" style={{ color: 'var(--text)' }}>
                    {pkg.price}
                  </span>
                  <span className="text-gray-500 ml-2">einmalig</span>
                </div>
              </div>

              <ul className="space-y-3 text-gray-700 mb-4 flex-grow">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              {pkg.note && (
                <p className="text-gray-500 text-xs mb-4" style={{ fontSize: '13px', lineHeight: '1.5', fontStyle: 'normal' }}>
                  {pkg.note}
                </p>
              )}

              {pkg.packageId ? (
                <BuyButton
                  packageId={pkg.packageId}
                  buttonText={pkg.buttonText || 'Paket kaufen'}
                  highlight={pkg.highlight}
                />
              ) : (
                <a
                  href={`mailto:post@martinbeyer.de?subject=${encodeURIComponent(pkg.emailSubject)}&body=${encodeURIComponent(`Hallo Smarter2Job-Team,

ich möchte das Paket "${pkg.name}"${pkg.productName ? ` (${pkg.productName})` : ''} anfragen.

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
                >
                  <Mail className="w-4 h-4" />
                  {pkg.buttonText || 'Paket per E-Mail anfragen'}
                </a>
              )}
            </div>
          ))}
        </div>

        {/* ADD-ON SEKTION: Skalieren */}
        <div className="mb-16">
          <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
            <h3 className="text-2xl font-bold text-center mb-3" style={{ color: 'var(--text)' }}>
              Skalieren – wenn du mehr Stellen parallel prüfen willst
            </h3>
            <p className="text-center text-gray-600 mb-8" style={{ fontSize: '16px' }}>
              Erweitere jederzeit um zusätzliche Stellenchecks oder weitere Lebenslaufversionen.
            </p>
            <ul className="space-y-3 text-gray-700 max-w-2xl mx-auto" style={{ fontSize: '15px' }}>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <span>Zusätzliche Stellenchecks (+1 / +3 / +5)</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <span>Zusätzliche Lebenslaufversion pro Stelle</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <span>Anschreiben-Service (optional)</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <span>LinkedIn-Optimierung (optional)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* So geht's in 3 Schritten */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: 'var(--text)' }}>
            So geht's in 3 Schritten
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-white text-2xl font-bold" style={{ backgroundColor: '#0a4f5c' }}>
                1
              </div>
              <h3 className="text-lg font-semibold mb-2">Paket auswählen</h3>
              <p className="text-gray-600 text-sm">Wähle das Paket, das zu dir passt, und klicke auf den Button.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-white text-2xl font-bold" style={{ backgroundColor: '#ff6b35' }}>
                2
              </div>
              <h3 className="text-lg font-semibold mb-2">Sicher bezahlen</h3>
              <p className="text-gray-600 text-sm">Bezahle sicher über unser Zahlungssystem (Mollie) – alle gängigen Zahlungsmethoden verfügbar.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-white text-2xl font-bold" style={{ backgroundColor: '#0a4f5c' }}>
                3
              </div>
              <h3 className="text-lg font-semibold mb-2">Report erhalten</h3>
              <p className="text-gray-600 text-sm">Innerhalb von 48 Stunden erhältst du deinen individuellen Report per E-Mail.</p>
            </div>
          </div>
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
