import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Danke() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center py-12">
        
        {/* Success Icon */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
          </svg>
        </div>

        {/* Headline */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          🎉 Checkliste ist unterwegs!
        </h1>

        <p className="text-xl text-gray-600 mb-8">
          Prüfe dein Postfach – die CV-Basics-Checkliste wurde an deine E-Mail-Adresse gesendet.
        </p>

        {/* Download Backup */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
          <p className="text-gray-700 mb-4">
            <strong>Download funktioniert nicht?</strong>
          </p>
          <a 
            href="/downloads/CV_Basics_Checkliste.pdf"
            download
            className="inline-block bg-[#ff6b35] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#e55a2b] transition"
          >
            Hier nochmal herunterladen
          </a>
        </div>

        {/* Next Steps */}
        <div className="bg-gray-50 p-6 rounded-xl">
          <h2 className="text-2xl font-semibold mb-4">📅 Nächster Schritt:</h2>
          <p className="text-gray-700 mb-4">
            Melde dich zum <strong>kostenlosen Workshop</strong> an und lerne, wie du Warnsignale in Stellenbeschreibungen erkennst.
          </p>
          <p className="text-sm text-gray-500 mb-4">
            Jeden Dienstag, 18:00 Uhr • Kostenlos • Keine Vorkenntnisse nötig
          </p>
          <p className="text-sm text-gray-600">
            Workshop-Anmeldung folgt in Kürze per E-Mail.
          </p>
        </div>

        {/* Back to Home */}
        <Link 
          to="/"
          className="inline-flex items-center gap-2 mt-8 text-gray-600 hover:text-gray-900 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Zurück zur Startseite</span>
        </Link>

      </div>
    </div>
  );
}





