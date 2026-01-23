import { useState } from 'react';
import { Loader2, AlertTriangle } from 'lucide-react';

type TeaserRedFlag = {
  title: string;
};

type TeaserResponse =
  | { totalRedFlags: number; shownRedFlags: Array<{ title: string }>; hiddenRedFlagsCount: number; upsellText: string }
  | { error: string };

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
  const [redFlags, setRedFlags] = useState<TeaserRedFlag[]>([]);
  const [error, setError] = useState<string | null>(null);

  const scrollToId = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      // Fallback to pricing page if no element found
      window.location.href = '/preise';
    }
  };

  const handleAnalyze = async () => {
    const jobText = input.trim();
    if (!jobText) return;

    setLoading(true);
    setError(null);
    setShowPreview(false);
    setRedFlags([]);

    try {
      const res = await fetch('/.netlify/functions/analyze-teaser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobText }),
      });

      const data: TeaserResponse = await res.json().catch(() => ({ error: 'Unbekannter Fehler' }));
      if (!res.ok || 'error' in data) {
        setError(('error' in data && data.error) || 'Analyse fehlgeschlagen. Bitte versuche es erneut.');
        setLoading(false);
        return;
      }

      const titles = (data.shownRedFlags || []).slice(0, 3).map((f) => ({ title: f.title }));
      setRedFlags(titles);
      setShowPreview(true);
    } catch {
      setError('Analyse fehlgeschlagen. Bitte versuche es erneut.');
    } finally {
      setLoading(false);
    }
  };

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
          {error && (
            <p className="text-sm text-red-600 mt-3">
              {error}
            </p>
          )}
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
                <span className="text-gray-700">{flag.title}</span>
              </li>
            ))}
          </ul>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-gray-700 font-medium">
              Wir haben weitere Warnsignale erkannt.
            </p>
          </div>
          <a
            href="/preise"
            className="block w-full text-white py-3 px-6 rounded-lg font-semibold transition text-center"
            style={{
              backgroundColor: '#0a4f5c',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              textDecoration: 'none'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#083d47';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#0a4f5c';
            }}
          >
            Weitere Warnsignale anzeigen (Stellencheck)
          </a>
        </div>
      )}
    </div>
  );
}
