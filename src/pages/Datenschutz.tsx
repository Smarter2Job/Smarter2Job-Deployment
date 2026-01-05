import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Datenschutz() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation zurück */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link
              to="/"
              className="flex items-center gap-2 text-gray-600 hover:text-[#0a4f5c] transition"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Zurück zur Startseite</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Datenschutzerklärung</h1>

          <p className="text-gray-700 leading-relaxed mb-8">
            Der Schutz Ihrer personenbezogenen Daten ist uns ein wichtiges Anliegen. Im Folgenden
            informieren wir Sie gemäß der geltenden gesetzlichen Datenschutzbestimmungen,
            insbesondere der Datenschutz-Grundverordnung (DSGVO), über die Erhebung, Verarbeitung
            und Nutzung Ihrer personenbezogenen Daten im Rahmen der Nutzung unserer Website{' '}
            <strong>smarter2job.com</strong>.
          </p>

          {/* 1. Verantwortlicher */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Verantwortlicher</h2>
            <div className="prose prose-lg max-w-none">
              <p>
                Martin Beyer
                <br />
                Smarter2Job
                <br />
                Adelberostraße 16
                <br />
                36100 Petersberg
                <br />
                E-Mail: post@martinbeyer.de
                <br />
                Tel.: +49 661 380 276 26
              </p>
            </div>
          </section>

          {/* 2. Erhebung und Verwendung personenbezogener Daten */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              2. Erhebung und Verwendung personenbezogener Daten
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Wir verarbeiten Ihre personenbezogenen Daten ausschließlich zu dem Zweck, Ihnen die
              angeforderten Analyse- und Beratungsleistungen zu erbringen. Dies umfasst:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>
                <strong>Job-Descriptions:</strong> Von Ihnen eingegebene Stellenbeschreibungen zur
                Analyse
              </li>
              <li>
                <strong>CVs / Lebensläufe:</strong> Von Ihnen hochgeladene Dokumente zur
                Fit-Score-Berechnung und Optimierung
              </li>
              <li>
                <strong>Kontaktdaten:</strong> E-Mail-Adresse für Account-Verwaltung, Zustellung von
                Ergebnissen und Support
              </li>
              <li>
                <strong>ABC-Listen:</strong> Ihre persönlichen Präferenzen und Deal-Breaker (aus
                Workshop oder Self-Service)
              </li>
              <li>
                <strong>Nutzungsdaten:</strong> Technische Daten zur Nutzung der Plattform (z.B.
                welche Karten genutzt wurden)
              </li>
            </ul>
          </section>

          {/* 3. Weitergabe von Daten an Dritte */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              3. Weitergabe von Daten an Dritte
            </h2>
            <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-4">
              <p className="text-sm text-gray-700">
                <strong>Wichtig:</strong> Ihre Daten werden <strong>NICHT</strong> an Dritte
                weitergegeben oder verkauft.
              </p>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Ausnahmen:</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li>
                <strong>Claude API (Anthropic):</strong> Zur KI-basierten Analyse werden
                Job-Descriptions und CVs an die Claude API von Anthropic übermittelt. Anthropic
                verarbeitet diese Daten gemäß ihrer Datenschutzrichtlinien und speichert sie{' '}
                <strong>nicht dauerhaft</strong> für Trainingszwecke (sofern in den
                API-Einstellungen entsprechend konfiguriert).
              </li>
              <li>
                <strong>Payment-Provider (Stripe):</strong> Zahlungsdaten werden über Stripe
                verarbeitet. Smarter2Job selbst speichert keine Kreditkartendaten.
              </li>
              <li>
                <strong>Hosting-Provider:</strong> Die Website wird bei Vercel/Netlify gehostet.
                Technische Logs können von diesen Diensten verarbeitet werden.
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              <strong>Keine Weitergabe an Recruiter, Unternehmen oder Jobportale:</strong> Im
              Gegensatz zu Lead-Generierungs-Plattformen werden Ihre Daten ausschließlich für die
              Analyse verwendet und nicht an potenzielle Arbeitgeber weitergeleitet.
            </p>
          </section>

          {/* 4. Speicherdauer */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Speicherdauer</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>
                <strong>Account-Daten:</strong> Solange Ihr Account aktiv ist + 6 Monate nach
                Löschung (für Support-Zwecke)
              </li>
              <li>
                <strong>CVs &amp; Job-Descriptions:</strong> 12 Monate nach Upload (danach
                automatische Löschung)
              </li>
              <li>
                <strong>Analyse-Ergebnisse:</strong> 24 Monate (für Verlauf und Vergleiche)
              </li>
              <li>
                <strong>ABC-Listen:</strong> Solange Ihr Account besteht
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              Sie können <strong>jederzeit eine vollständige Löschung Ihrer Daten anfordern</strong>{' '}
              (siehe Punkt 5).
            </p>
          </section>

          {/* 5. Ihre Rechte */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Ihre Rechte</h2>
            <p className="text-gray-700 leading-relaxed mb-4">Sie haben jederzeit das Recht auf:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>
                <strong>Auskunft:</strong> Welche Daten wir über Sie gespeichert haben
              </li>
              <li>
                <strong>Berichtigung:</strong> Korrektur falscher Daten
              </li>
              <li>
                <strong>Löschung:</strong> Vollständige Entfernung Ihrer Daten (außer gesetzliche
                Aufbewahrungspflichten)
              </li>
              <li>
                <strong>Einschränkung der Verarbeitung:</strong> Temporäre Sperrung Ihrer Daten
              </li>
              <li>
                <strong>Datenübertragbarkeit:</strong> Export Ihrer Daten in maschinenlesbarem
                Format
              </li>
              <li>
                <strong>Widerspruch:</strong> Gegen die Verarbeitung Ihrer Daten
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              Sie können sich hierzu unter <strong>datenschutz@martinbeyer.de</strong> oder{' '}
              <strong>post@martinbeyer.de</strong> an uns wenden.
            </p>
          </section>

          {/* 6. Cookies & Tracking */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Cookies &amp; Tracking</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Wir verwenden <strong>essenzielle Cookies</strong> für die Funktionalität der
              Plattform (z.B. Login, Session-Management). Tracking- oder Marketing-Cookies werden{' '}
              <strong>nicht eingesetzt</strong>.
            </p>
            <p className="text-sm text-gray-600 italic">
              <strong>Optional (falls später implementiert):</strong>
              <br />
              Falls wir in Zukunft Analyse-Tools wie Google Analytics oder ähnliche Dienste nutzen,
              werden Sie vorab darüber informiert und können der Nutzung widersprechen.
            </p>
          </section>

          {/* 7. Verwendung von Drittanbieterdiensten */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              7. Verwendung von Drittanbieterdiensten
            </h2>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">
              7.1 Claude API (Anthropic)
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Wir nutzen die Claude API von Anthropic Inc. zur KI-basierten Analyse von
              Stellenbeschreibungen und CVs. Die Datenverarbeitung erfolgt auf Grundlage von Art. 6
              Abs. 1 lit. b DSGVO (Vertragserfüllung).
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Wichtig:</strong> Anthropic verarbeitet Ihre Daten ausschließlich zur
              Bereitstellung der API-Leistung und speichert übermittelte Inhalte{' '}
              <strong>nicht</strong> für Trainingszwecke (sofern entsprechend konfiguriert).
            </p>
            <p className="text-sm text-gray-600">
              Weitere Informationen:{' '}
              <a
                href="https://www.anthropic.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0a4f5c] hover:underline"
              >
                Anthropic Privacy Policy
              </a>
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">7.2 Stripe (Payment)</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Zahlungen werden über Stripe Inc. abgewickelt. Stripe verarbeitet Ihre Zahlungsdaten
              gemäß ihrer Datenschutzrichtlinien. Smarter2Job selbst speichert keine
              Kreditkartendaten.
            </p>
            <p className="text-sm text-gray-600">
              Weitere Informationen:{' '}
              <a
                href="https://stripe.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0a4f5c] hover:underline"
              >
                Stripe Privacy Policy
              </a>
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">
              7.3 E-Mail-Versand
            </h3>
            <p className="text-gray-700 leading-relaxed">
              E-Mails werden über einen SMTP-Provider (z.B. SendGrid) versendet. Ihre E-Mail-Adresse
              und der E-Mail-Inhalt werden ausschließlich zur Zustellung von Analyse-Ergebnissen und
              Service-E-Mails verwendet.
            </p>
          </section>

          {/* 8. Sicherheit */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Sicherheit</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Wir setzen technische und organisatorische Maßnahmen ein, um Ihre Daten gegen
              Manipulation, Verlust, Zerstörung oder unbefugten Zugriff zu schützen. Dazu gehören:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>SSL/TLS-Verschlüsselung</li>
              <li>Sichere Passwort-Hashing-Verfahren</li>
              <li>Regelmäßige Sicherheits-Updates</li>
              <li>Zugriffsbeschränkungen auf Datenbanken</li>
            </ul>
          </section>

          {/* 9. Änderungen dieser Datenschutzerklärung */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              9. Änderungen dieser Datenschutzerklärung
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Wir behalten uns vor, diese Datenschutzerklärung bei Bedarf zu aktualisieren. Die
              aktuelle Version ist stets auf dieser Seite verfügbar.
            </p>
            <p className="text-sm text-gray-600 mt-4">
              <strong>Stand:</strong> Dezember 2024
            </p>
          </section>

          {/* Footer */}
          <div className="border-t border-gray-200 pt-8 text-center">
            <p className="text-gray-700 mb-2">Vielen Dank für Ihr Vertrauen.</p>
            <p className="text-sm text-gray-600">
              <strong>Smarter2Job / Martin Beyer</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}






