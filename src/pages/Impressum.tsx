import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Impressum() {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Impressum – Smarter2Job</h1>

          <p className="text-sm text-gray-600 mb-8">Stand: Dezember 2024</p>

          {/* Angaben gemäß § 5 TMG */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Angaben gemäß § 5 TMG
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="mb-2">
                <strong>Herausgeber:</strong>
                <br />
                Martin Beyer
                <br />
                Smarter2Job
                <br />
                Adelberostraße 16, 36100 Petersberg
                <br />
                Telefon: +49 (661) 380 276 26
                <br />
                E-Mail: post@martinbeyer.de
                <br />
                Website: https://www.smarter2job.com
              </p>

              <p className="mb-2">
                <strong>Inhaber:</strong>
                <br />
                Martin Beyer
              </p>

              <p className="mb-2">
                <strong>Steuern:</strong>
                <br />
                Finanzamt Fulda
                <br />
                Steuernummer: 018 806 05077
              </p>
            </div>
          </section>

          {/* Verantwortlich für Hosting & Programmierung */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Verantwortlich für Hosting &amp; Programmierung
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>
                <strong>Verantwortlich:</strong> Martin Beyer
              </li>
              <li>
                <strong>Hosting:</strong> Vercel / Netlify
              </li>
              <li>
                <strong>Webseitengestaltung:</strong> React/Vite
              </li>
            </ul>
          </section>

          {/* Rechtliche Hinweise */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Rechtliche Hinweise</h2>
            <p className="text-gray-700 leading-relaxed">
              Martin Beyer bemüht sich um Aktualität der Inhalte, übernimmt jedoch keine Haftung
              für Vollständigkeit oder Richtigkeit. Es wird keine Gewähr für die Verfügbarkeit oder
              Fehlerfreiheit der Website übernommen. Änderungen vorbehalten. Für verlinkte fremde
              Inhalte wird keine Verantwortung übernommen. Urheberrechtlich geschützte Inhalte
              (Texte, Bilder, Grafiken) dürfen nur mit ausdrücklicher Zustimmung genutzt werden.
            </p>
          </section>

          {/* Geschäftsbeteiligung & Dienstleistungen */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Geschäftsbereich &amp; Dienstleistungen
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Smarter2Job bietet KI-basierte Analyse- und Beratungsleistungen für Bewerber im
              Bewerbungsprozess. Die angebotenen Services umfassen:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li>Red-Flag-Analyse von Stellenbeschreibungen</li>
              <li>Fit-Score-Berechnung (Bewerber vs. Stelle)</li>
              <li>ATS-Optimierung (Applicant Tracking System)</li>
              <li>CV-Umformulierung &amp; LinkedIn-Optimierung</li>
              <li>Gehaltsband-Indikationen</li>
            </ul>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
              <p className="text-sm text-gray-700">
                <strong>Wichtiger Hinweis:</strong>
                <br />
                Smarter2Job ist ein reiner Analyse- und Beratungsservice und{' '}
                <strong>vermittelt keine Stellen</strong>. Es besteht{' '}
                <strong>
                  kein Anspruch auf erfolgreiche Vermittlung, Zusagen von Unternehmen oder
                  Erfolgsquoten
                </strong>{' '}
                bei der Jobsuche. Die Leistungen sind vergleichbar mit klassischen
                Consulting-/Beratungsleistungen im Karrierebereich.
              </p>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Alle Analysen, Empfehlungen und Scores dienen ausschließlich der Information und
              Unterstützung des Bewerbers. Die endgültige Entscheidung über eine Bewerbung liegt
              beim Nutzer selbst.
            </p>
          </section>

          {/* Haftungsausschluss */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Haftungsausschluss</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Smarter2Job übernimmt <strong>keine Haftung</strong> für:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Erfolg oder Misserfolg von Bewerbungen</li>
              <li>Entscheidungen von Unternehmen oder Recruitern</li>
              <li>Qualität oder Richtigkeit der von Nutzern eingegebenen Daten (CVs, Job-Descriptions)</li>
              <li>Technische Verfügbarkeit der Plattform (z.B. bei API-Ausfällen)</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              Die Nutzung der Plattform erfolgt auf eigene Verantwortung.
            </p>
          </section>

          {/* Bildrechte & Visualisierungen */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Bildrechte &amp; Visualisierungen
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Bilder ohne expliziten Credit sind Eigentum von Martin Beyer / Smarter2Job. Eine
              kommerzielle Nutzung oder Weitergabe ist untersagt. Verwendetes Bildmaterial stammt
              u.a. von Unsplash, Pexels, iStockphoto (siehe ggf. Credits auf der Website).
            </p>
          </section>

          {/* Datenschutz & Ansprechpartner */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Datenschutz &amp; Ansprechpartner</h2>
            <p className="text-gray-700 leading-relaxed">
              Der Datenschutzbereich (DSGVO, Kontaktmöglichkeiten etc.) ist separat aufgeführt und
              kann über die entsprechende Seite aufgerufen werden.
            </p>
          </section>

          {/* Footer */}
          <div className="border-t border-gray-200 pt-8 text-center text-sm text-gray-500">
            © 2025 Martin Beyer / Smarter2Job. Alle Rechte vorbehalten.
          </div>
        </div>
      </div>
    </div>
  )
}


