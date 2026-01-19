import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/so-funktionierts', label: 'So funktioniert\'s' },
    { path: '/preise', label: 'Preise' },
    { path: '/story', label: 'Gründerstory' },
    { path: '/blog', label: 'Blog' },
    { path: '/faq', label: 'FAQ' },
  ];

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <Link to="/" className="flex items-center">
            <img 
              src="/logo.png" 
              alt="Smarter2Job Logo" 
              className="h-10 w-auto"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const parent = e.currentTarget.parentElement;
                if (parent && !parent.querySelector('.logo-fallback')) {
                  const fallback = document.createElement('div');
                  fallback.className = 'logo-fallback text-2xl font-bold';
                  fallback.style.color = '#0a4f5c';
                  fallback.textContent = 'Smarter2Job';
                  parent.appendChild(fallback);
                }
              }}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'text-[#0a4f5c] font-semibold'
                    : 'text-gray-600 hover:text-[#0a4f5c]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/stellencheck"
              className="btn btn-primary"
              style={{ 
                backgroundColor: '#0a4f5c', 
                color: 'white', 
                padding: '8px 24px', 
                borderRadius: '8px', 
                fontWeight: '500', 
                border: 'none', 
                cursor: 'pointer',
                transition: 'background-color 0.2s',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                textDecoration: 'none'
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#083d47')}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#0a4f5c')}
            >
              Stellenanzeige prüfen
            </Link>
          </div>

          {/* Mobile Burger Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-[#0a4f5c] transition-colors"
            aria-label="Menü öffnen"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation - Burger Menu (collapsible) */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-2 rounded-lg transition-colors ${
                    location.pathname === link.path
                      ? 'bg-[#0a4f5c] text-white font-semibold'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/stellencheck"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center mt-4 py-3 px-6 rounded-lg font-semibold text-white transition"
                style={{ 
                  backgroundColor: '#ff6b35',
                  textDecoration: 'none'
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#e55a2b')}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#ff6b35')}
              >
                Stellenanzeige prüfen
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
