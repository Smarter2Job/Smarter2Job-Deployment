import { Link } from 'react-router-dom';

export default function CTAStack() {
  return (
    <div className="bg-gradient-to-br from-[#0a4f5c] to-[#083d47] rounded-xl p-8 mb-12 text-white">
      <h3 className="text-2xl font-bold mb-6 text-center">
        Nächste Schritte
      </h3>
      <div className="grid md:grid-cols-3 gap-6">
        <Link
          to="/stellencheck"
          className="bg-white text-[#0a4f5c] rounded-lg p-6 text-center font-semibold hover:bg-gray-100 transition shadow-lg"
          style={{ textDecoration: 'none' }}
        >
          <div className="text-2xl mb-2">1</div>
          <div className="font-bold mb-2">Stellenanzeige verstehen</div>
          <div className="text-sm">Prüfe, ob sich eine Bewerbung lohnt</div>
        </Link>
        <Link
          to="/preise"
          className="bg-[#ff6b35] text-white rounded-lg p-6 text-center font-semibold hover:bg-[#e55a2b] transition shadow-lg"
          style={{ textDecoration: 'none' }}
        >
          <div className="text-2xl mb-2">2</div>
          <div className="font-bold mb-2">Chancen einschätzen</div>
          <div className="text-sm">Passungsprüfung mit Lebenslauf</div>
        </Link>
        <Link
          to="/preise"
          className="bg-white text-[#0a4f5c] rounded-lg p-6 text-center font-semibold hover:bg-gray-100 transition shadow-lg"
          style={{ textDecoration: 'none' }}
        >
          <div className="text-2xl mb-2">3</div>
          <div className="font-bold mb-2">Lebenslauf optimieren</div>
          <div className="text-sm">2 optimierte Lebensläufe für Top-Stellen</div>
        </Link>
      </div>
    </div>
  );
}
