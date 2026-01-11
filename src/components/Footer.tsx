import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-semibold mb-4">Smarter2Job</h3>
            <p className="text-sm text-gray-400 mb-4">
              Stellenanzeigen richtig lesen, Passung prüfen, Bewerbung gezielt vorbereiten.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition">Home</Link>
              </li>
              <li>
                <Link to="/so-funktionierts" className="hover:text-white transition">So funktioniert's</Link>
              </li>
              <li>
                <Link to="/preise" className="hover:text-white transition">Preise</Link>
              </li>
              <li>
                <Link to="/story" className="hover:text-white transition">Story</Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-white transition">Blog</Link>
              </li>
              <li>
                <Link to="/community" className="hover:text-white transition">Community</Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition">FAQ</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quicklinks</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/stellencheck" className="hover:text-white transition">Stellenanzeige prüfen</Link>
              </li>
              <li>
                <Link to="/preise" className="hover:text-white transition">Pakete ansehen</Link>
              </li>
              <li>
                <Link to="/community" className="hover:text-white transition">Community beitreten</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/impressum" className="hover:text-white transition">Impressum</Link>
              </li>
              <li>
                <Link to="/datenschutz" className="hover:text-white transition">Datenschutz</Link>
              </li>
              <li>
                <Link to="/agb" className="hover:text-white transition">AGB</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} Smarter2Job. Alle Rechte vorbehalten.
            </p>
            <Link
              to="/stellencheck"
              className="btn btn-primary text-sm"
              style={{ 
                backgroundColor: '#ff6b35', 
                color: 'white', 
                padding: '10px 24px', 
                borderRadius: '8px', 
                fontWeight: '500', 
                border: 'none', 
                cursor: 'pointer',
                transition: 'all 0.2s',
                textDecoration: 'none'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#e55a2b';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#ff6b35';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Jetzt Stellenanzeige prüfen
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
