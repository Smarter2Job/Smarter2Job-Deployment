import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function AGB() {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Allgemeine Geschäftsbedingungen (AGB)
          </h1>
          <p className="text-gray-700 leading-relaxed mb-8">für die Nutzung von Smarter2Job</p>

          {/* 1. Geltungsbereich */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Geltungsbereich</h2>
            <p className="text-gray-700 leading-relaxed">
              Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für die Nutzung der Plattform{' '}
              <strong>Smarter2Job.com</strong> durch Endkunden (nachfolgend „Nutzer&quot;), die
              Unterstützung bei Bewerbungsprozessen suchen. Betreiber der Plattform ist{' '}
              <strong>Martin Beyer</strong>, Adelberostraße 16, 36100 Petersberg.
            </p>
          </section>

          {/* 2. Leistungen von Smarter2Job */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              2. Leistungen von Smarter2Job
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Smarter2Job bietet <strong>KI-basierte Analyse- und Beratungsleistungen</strong> für
              Bewerber an. Das Angebot umfasst folgende Karten:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li>
                <strong>Karte 1:</strong> Warnzeichen-Schnellcheck (kostenlos)
              </li>
              <li>
                <strong>Karte 2:</strong> Objektive Stellenanalyse (10-15 Red Flags, Kultur-Score)
              </li>
              <li>
                <strong>Karte 3:</strong> Persönliche Red Flags (Abgleich mit Ihren Präferenzen)
              </li>
              <li>
                <strong>Karte 4:</strong> Fit-Score &amp; Handlungsempfehlung
              </li>
              <li>
                <strong>Karte 5:</strong> ATS Keyword Research
              </li>
              <li>
                <strong>Karte 6:</strong> Gehaltsband-Indikationen
              </li>
              <li>
                <strong>Karte 7:</strong> CV-Umformulierung (ATS-optimiert)
              </li>
              <li>
                <strong>Karte 8:</strong> LinkedIn-Optimierung
              </li>
              <li>
                <strong>Karte 9:</strong> Anschreiben-Service (Add-on)
              </li>
            </ul>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <p className="text-sm text-gray-700">
                <strong>Wichtiger Hinweis:</strong>
                <br />
                Smarter2Job ist ein <strong>reiner Analyse- und Beratungsservice</strong> und{' '}
                <strong>vermittelt keine Stellen</strong>. Es besteht{' '}
                <strong>
                  kein Anspruch auf erfolgreiche Vermittlung, Zusagen von Unternehmen oder
                  Erfolgsquoten
                </strong>{' '}
                bei der Jobsuche. Die Leistungen sind vergleichbar mit klassischen
                Consulting-/Beratungsleistungen im Karrierebereich.
              </p>
            </div>
          </section>

          {/* 3. Vertragsschluss & Preise */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              3. Vertragsschluss &amp; Preise
            </h2>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">3.1 Packages</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Smarter2Job bietet drei Packages an:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li>
                <strong>Starter:</strong> 49€ (3 Analysen)
              </li>
              <li>
                <strong>Professional:</strong> 129€ (7 Analysen + CV-Umformulierung + Gehaltsband)
              </li>
              <li>
                <strong>Executive:</strong> 249€ (10 Analysen + CV + LinkedIn + Gehaltsband)
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              Alle Preise verstehen sich als <strong>Einmalzahlung</strong> inkl. MwSt. Der Vertrag
              kommt mit der Zahlungsbestätigung über Stripe zustande.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">3.2 Add-ons</h3>
            <p className="text-gray-700 leading-relaxed">
              Zusätzliche Analysen und Anschreiben können jederzeit nachgebucht werden (siehe
              Pricing-Seite).
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">
              3.3 Laufzeit &amp; Kündigung
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Die Packages sind <strong>nicht abonnementbasiert</strong>. Es gibt{' '}
              <strong>keine Mindestlaufzeit</strong> und <strong>keine automatische Verlängerung</strong>. Der Zugang zu den gebuchten Leistungen bleibt für{' '}
              <strong>6 Monate</strong> nach Kauf aktiv.
            </p>
          </section>

          {/* 4. Widerrufsrecht */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              4. Widerrufsrecht (7 Tage Geld-zurück-Garantie)
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Als Verbraucher haben Sie ein <strong>7-tägiges Widerrufsrecht</strong>. Sie können
              innerhalb von 7 Tagen nach Kauf ohne Angabe von Gründen vom Vertrag zurücktreten und
              erhalten eine volle Rückerstattung.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Widerruf per E-Mail an:</strong> post@martinbeyer.de
            </p>
            <p className="text-sm text-gray-600 italic">
              <strong>Wichtig:</strong> Das Widerrufsrecht erlischt vorzeitig, wenn Sie bereits mehr
              als 50% der gebuchten Analysen genutzt haben.
            </p>
          </section>

          {/* 5. Leistungserbringung & Verfügbarkeit */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              5. Leistungserbringung &amp; Verfügbarkeit
            </h2>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">
              5.1 Analyse-Turnaround
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Analysen werden in der Regel <strong>sofort (1-3 Minuten)</strong> generiert. Bei
              technischen Problemen (z.B. API-Ausfällen) kann es zu Verzögerungen kommen. In solchen
              Fällen werden betroffene Nutzer per E-Mail informiert.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">
              5.2 Qualität der Analysen
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Die Qualität der Analysen hängt maßgeblich von der{' '}
              <strong>Qualität der Eingabedaten</strong> (Job-Descriptions, CVs) ab. Smarter2Job
              übernimmt <strong>keine Haftung</strong> für:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Unvollständige oder fehlerhafte Eingabedaten</li>
              <li>Subjektive Interpretationen von Stellenbeschreibungen</li>
              <li>Entscheidungen des Nutzers basierend auf den Analysen</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">
              5.3 Keine Erfolgsgarantie
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Es besteht <strong>kein Anspruch auf</strong>:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Erfolgreiche Bewerbungen</li>
              <li>Einladungen zu Vorstellungsgesprächen</li>
              <li>Jobangebote</li>
              <li>Bestimmte Erfolgsquoten</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              Die Analysen dienen ausschließlich der <strong>Information und Unterstützung</strong>{' '}
              des Nutzers. Die endgültige Entscheidung über eine Bewerbung liegt beim Nutzer selbst.
            </p>
          </section>

          {/* 6. Haftungsausschluss */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Haftungsausschluss</h2>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">
              6.1 Haftung für Inhalte
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Die auf der Plattform dargestellten Informationen, Scores und Empfehlungen werden{' '}
              <strong>nach bestem Wissen und Gewissen</strong> erstellt, jedoch ohne Gewähr für:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>
                <strong>Richtigkeit:</strong> KI-basierte Analysen können Fehler enthalten
              </li>
              <li>
                <strong>Vollständigkeit:</strong> Nicht alle Red Flags können erkannt werden
              </li>
              <li>
                <strong>Aktualität:</strong> Marktdaten (z.B. Gehaltsangaben) können veraltet sein
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">
              6.2 Haftung für Schäden
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Smarter2Job haftet <strong>nicht</strong> für:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Erfolg oder Misserfolg von Bewerbungen</li>
              <li>Entscheidungen von Unternehmen oder Recruitern</li>
              <li>Verpasste Job-Chancen aufgrund von Analysen</li>
              <li>Technische Ausfälle (z.B. API-Probleme, Server-Downtime)</li>
            </ul>
            <p className="text-sm text-gray-600 italic mt-4">
              <strong>Ausnahme:</strong> Bei grober Fahrlässigkeit oder Vorsatz haftet Martin Beyer
              nach den gesetzlichen Bestimmungen.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">6.3 Externe Links</h3>
            <p className="text-gray-700 leading-relaxed">
              Smarter2Job enthält Links zu externen Websites (z.B. LinkedIn, Job-Portale). Für die
              Inhalte dieser Seiten sind ausschließlich deren Betreiber verantwortlich. Eine Haftung
              für verlinkte Inhalte ist ausgeschlossen.
            </p>
          </section>

          {/* 7. Pflichten des Nutzers */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Pflichten des Nutzers</h2>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">7.1 Korrekte Angaben</h3>
            <p className="text-gray-700 leading-relaxed">
              Der Nutzer verpflichtet sich, <strong>wahrheitsgemäße und vollständige Angaben</strong>{' '}
              zu machen (z.B. bei CVs, ABC-Listen).
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">7.2 Eigenverantwortung</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Der Nutzer ist <strong>selbst verantwortlich</strong> für:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Die Entscheidung, sich auf eine Stelle zu bewerben</li>
              <li>Die Formulierung von Anschreiben (auch wenn Karte 9 genutzt wurde)</li>
              <li>Die Überprüfung von Gehaltsangaben und Red Flags</li>
              <li>Die Einhaltung von Bewerbungsfristen und Anforderungen</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">7.3 Missbrauch</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Der Nutzer darf die Plattform <strong>nicht missbrauchen</strong>, insbesondere nicht:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Für automatisierte Massenbewerbungen</li>
              <li>Zur Weitergabe von Account-Zugängen</li>
              <li>Zum Kopieren oder Weiterverkauf der Analyse-Ergebnisse</li>
            </ul>
          </section>

          {/* 8. Datenschutz */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Datenschutz</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Die Erhebung, Verarbeitung und Nutzung personenbezogener Daten erfolgt gemäß unserer{' '}
              <Link to="/datenschutz" className="text-[#0a4f5c] hover:underline">
                Datenschutzerklärung
              </Link>
              .
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>Wichtig:</strong> Im Gegensatz zu Lead-Generierungs-Plattformen werden Ihre
              Daten <strong>NICHT</strong> an Dritte (z.B. Recruiter, Unternehmen) weitergegeben.
              Ausnahmen: Claude API (Anthropic) für KI-Analysen, Stripe für Zahlungen.
            </p>
          </section>

          {/* 9. Geistiges Eigentum */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Geistiges Eigentum</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Alle Inhalte der Plattform (Texte, Grafiken, Logos, Karten) sind urheberrechtlich
              geschützt. Eine Vervielfältigung, Verbreitung oder öffentliche Wiedergabe ist nur mit
              ausdrücklicher Zustimmung von Martin Beyer gestattet.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>Ihre Daten:</strong> CVs, Job-Descriptions und Analyse-Ergebnisse bleiben Ihr
              Eigentum. Sie können diese jederzeit exportieren oder löschen.
            </p>
          </section>

          {/* 10. Änderungen der AGB */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Änderungen der AGB</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Smarter2Job behält sich vor, diese AGB bei Bedarf zu ändern (z.B. bei neuen Leistungen
              oder gesetzlichen Änderungen). Nutzer werden per E-Mail über wesentliche Änderungen
              informiert.
            </p>
            <p className="text-sm text-gray-600 italic">
              <strong>Widerspruchsrecht:</strong> Bei Änderungen können Sie innerhalb von 14 Tagen
              widersprechen und Ihren Account löschen.
            </p>
          </section>

          {/* 11. Schlussbestimmungen */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Schlussbestimmungen</h2>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">11.1 Anwendbares Recht</h3>
            <p className="text-gray-700 leading-relaxed">
              Es gilt <strong>deutsches Recht</strong> unter Ausschluss des UN-Kaufrechts.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">11.2 Gerichtsstand</h3>
            <p className="text-gray-700 leading-relaxed">
              Gerichtsstand ist, soweit gesetzlich zulässig, Petersberg / Fulda.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">
              11.3 Salvatorische Klausel
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Sollten einzelne Bestimmungen dieser AGB ganz oder teilweise unwirksam sein, bleibt
              die Gültigkeit der übrigen Bestimmungen unberührt.
            </p>
          </section>

          {/* Footer */}
          <div className="border-t border-gray-200 pt-8">
            <p className="text-sm text-gray-600 mb-4">
              <strong>Stand:</strong> Dezember 2024
            </p>
            <div className="text-gray-700">
              <p className="mb-2">
                <strong>Kontakt:</strong>
              </p>
              <p>
                Martin Beyer / Smarter2Job
                <br />
                Adelberostraße 16, 36100 Petersberg
                <br />
                E-Mail: post@martinbeyer.de
                <br />
                Telefon: +49 661 380 276 26
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}



