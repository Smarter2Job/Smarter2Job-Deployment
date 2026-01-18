import { useState } from 'react';
import { Loader2, AlertTriangle } from 'lucide-react';

interface HeroMiniDemoProps {
  headline?: string;
  subline?: string;
  buttonText?: string;
  footerText?: string;
  textareaHeight?: string;
}

export default function HeroMiniDemo({ 
  headline = "Vorschau: bis zu 3 Warnsignale gratis",
  subline,
  buttonText = "Stellenanzeige prüfen",
  footerText = "Keine Anmeldung · Ergebnis in 30–60 Sekunden · 3 Warnsignale als Vorschau",
  textareaHeight = "min-h-[120px]"
}: HeroMiniDemoProps = {}) {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const scrollToId = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      // Fallback to mailto if no element found
      window.location.href = 'mailto:post@martinbeyer.de?subject=Stellencheck%20anfragen&body=Hallo,%0A%0Aich%20möchte%20den%20Stellencheck%20nutzen.%0A%0AStellenlink:%20%5Bbitte%20einfügen%5D%0A%0AVielen%20Dank!';
    }
  };

  const handleAnalyze = () => {
    if (!input.trim()) return;
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowPreview(true);
    }, 900);
  };

  const redFlags = [
    "Unklare Verantwortlichkeiten (klingt nach 'alles machen')",
    "'Dynamisches Umfeld' (kann Chaos / hoher Druck bedeuten)",
    "'Hands-on' trotz Senior-Titel (Rollen-Mismatch möglich)"
  ];

  return (
    <div id="hero-demo">
      {!showPreview ? (
        <div className="bg-white rounded-xl shadow-lg p-8 border-2" style={{ borderColor: '#ff6b35' }}>
          <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text)' }}>
            {headline}
          </h3>
          {subline && (
            <p className="text-sm text-gray-600 mb-6" style={{ color: 'var(--text-muted)' }}>
              {subline}
            </p>
          )}
          <div className={subline ? '' : 'mb-6'}>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Link oder Text der Stellenanzeige hier einfügen …"
              className={`w-full ${textareaHeight} p-4 border-2 border-gray-200 rounded-lg focus:border-[#0a4f5c] focus:outline-none resize-y text-gray-900`}
              style={{ fontFamily: 'inherit', fontSize: '16px' }}
              disabled={loading}
            />
          </div>
          <button
            onClick={handleAnalyze}
            disabled={loading || !input.trim()}
            className={`${subline ? 'mt-0' : 'mt-6'} w-full text-white py-3 px-8 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
            style={{
              backgroundColor: '#ff6b35',
              boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
              fontSize: '16px'
            }}
            onMouseOver={(e) => {
              if (!loading && input.trim()) {
                e.currentTarget.style.backgroundColor = '#e55a2b';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.2)';
              }
            }}
            onMouseOut={(e) => {
              if (!loading && input.trim()) {
                e.currentTarget.style.backgroundColor = '#ff6b35';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
              }
            }}
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Analysiere...
              </>
            ) : (
              buttonText
            )}
          </button>
          <p className="text-sm text-gray-500 text-center mt-4">
            {footerText}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg p-8 border-2" style={{ borderColor: '#0a4f5c' }}>
          <h3 className="text-2xl font-bold mb-6" style={{ color: 'var(--text)' }}>
            Erste Warnsignale gefunden
          </h3>
          <ul className="space-y-3 mb-6">
            {redFlags.map((flag, index) => (
              <li key={index} className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                <span className="text-gray-700">{flag}</span>
              </li>
            ))}
          </ul>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-gray-700 font-medium">
              Wir haben weitere Warnsignale erkannt.
            </p>
          </div>
          <button
            onClick={() => scrollToId('pakete')}
            className="w-full text-white py-3 px-6 rounded-lg font-semibold transition"
            style={{
              backgroundColor: '#0a4f5c',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#083d47';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#0a4f5c';
            }}
          >
            Weitere Warnsignale anzeigen (Stellencheck)
          </button>
        </div>
      )}
    </div>
  );
}
