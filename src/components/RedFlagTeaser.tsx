import { useState } from 'react';
import { AlertCircle, Loader2, CheckCircle } from 'lucide-react';

// TypeScript Interfaces
interface RedFlag {
  title: string;
  originalText: string;
  meaning: string;
  risk: 'HOCH' | 'SEHR HOCH' | 'MITTEL' | 'NIEDRIG';
  riskColor: 'red' | 'yellow' | 'green';
}

interface AnalysisResult {
  totalRedFlags: number;
  shownRedFlags: RedFlag[];
  hiddenRedFlagsCount: number;
  upsellText: string;
}

export default function RedFlagTeaser() {
  const [jobInput, setJobInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Analyse starten
  const handleAnalyze = async () => {
    if (!jobInput.trim()) {
      setError('Bitte gib eine Stellen-URL oder Stellenbeschreibung ein');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // API Call zur Netlify Function
      const response = await fetch('/.netlify/functions/analyze-teaser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jobText: jobInput }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unbekannter Fehler' }));
        throw new Error(errorData.error || 'Analyse fehlgeschlagen');
      }

      const data: AnalysisResult = await response.json();
      
      console.log('📊 Received data:', data);
      console.log('📊 Warnsignale count:', data.shownRedFlags?.length || 0);
      
      // Prüfe ob Daten vorhanden sind
      if (!data || !data.shownRedFlags || data.shownRedFlags.length === 0) {
        console.warn('⚠️ No warnsignale in response:', data);
        setError('Die Analyse wurde durchgeführt, aber es wurden keine Warnsignale gefunden. Bitte versuche es mit einer anderen Stellenbeschreibung.');
        setLoading(false);
        return;
      }
      
      setResult(data);
      setLoading(false);

      // Smooth scroll zum Ergebnis
      setTimeout(() => {
        document.getElementById('teaser-result')?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);

    } catch (err: any) {
      console.error('Analysis error:', err);
      
      // Benutzerfreundliche Fehlermeldung, verstecke technische Details
      let userFriendlyError = 'Etwas ist schiefgelaufen. Bitte versuche es erneut.';
      
      if (err.message && err.message.includes('API Key')) {
        userFriendlyError = 'Die Analyse ist vorübergehend nicht verfügbar. Bitte versuche es später erneut oder kontaktiere uns unter post@martinbeyer.de';
      } else if (err.message && err.message.includes('zu kurz')) {
        userFriendlyError = err.message; // Diese Meldung ist benutzerfreundlich
      }
      
      setError(userFriendlyError);
      setLoading(false);
    }
  };

  // Risiko-Icon basierend auf Level
  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'SEHR HOCH':
      case 'HOCH':
        return '🔴';
      case 'MITTEL':
        return '🟡';
      case 'NIEDRIG':
        return '🟢';
      default:
        return '⚪';
    }
  };

  // Border-Farbe basierend auf Risiko
  const getBorderColor = (riskColor: string) => {
    switch (riskColor) {
      case 'red':
        return 'border-l-red-500';
      case 'yellow':
        return 'border-l-yellow-500';
      case 'green':
        return 'border-l-green-500';
      default:
        return 'border-l-gray-300';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-12">
      {/* Input Section */}
      <div className="bg-white rounded-xl shadow-xl p-10 mb-8 border-2" style={{ borderColor: '#ff6b35', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
        <textarea
          value={jobInput}
          onChange={(e) => setJobInput(e.target.value)}
          placeholder="Link oder Text der Stellenanzeige hier einfügen …"
          className="w-full min-h-[120px] p-4 border-2 border-gray-200 rounded-lg focus:border-[#0a4f5c] focus:outline-none resize-y text-gray-900"
          disabled={loading}
        />

        {error && (
          <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-500 rounded">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        <button
          onClick={handleAnalyze}
          disabled={loading || !jobInput.trim()}
          className="mt-6 w-full bg-[#ff6b35] text-white py-4 px-8 rounded-lg font-semibold text-lg hover:bg-[#e55a2b] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Analysiere...
            </>
          ) : (
            <>
              Stellenanzeige prüfen
            </>
          )}
        </button>

        <p className="text-sm text-gray-500 text-center mt-4" style={{ textAlign: 'center' }}>
          Kostenlos · Keine Anmeldung · Ergebnis in 30–60 Sekunden
        </p>

        <p className="text-xs text-gray-400 text-center mt-2" style={{ textAlign: 'center' }}>
          Vorschau: bis zu 3 Warnsignale gratis.
        </p>
      </div>

      {/* UX-Microelement: Quote Box */}
      <div className="bg-gray-50 border-l-4 border-[#ff6b35] rounded-lg p-6 mb-8 max-w-2xl mx-auto">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
          Aktueller Satz aus Gesprächen mit Bewerbern
        </p>
        <blockquote className="text-lg font-semibold text-gray-900 mb-3 italic">
          „Leider momentan sehr viele Absagen."
        </blockquote>
        <p className="text-gray-700">
          Genau deshalb starten wir vor dem Absenden – nicht nach der nächsten Absage.
        </p>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-[#0a4f5c] animate-spin mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              🔍 Analysiere Warnsignale...
            </h3>
            
            <div className="max-w-md mx-auto">
              <div className="w-full bg-gray-200 rounded-full h-3 mb-4 overflow-hidden">
                <div className="bg-[#0a4f5c] h-3 rounded-full animate-pulse" style={{ width: '65%' }} />
              </div>
              
              <div className="space-y-2 text-left text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Stellenanzeige geparst</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Formulierungen dekodiert</span>
                </div>
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 text-[#0a4f5c] animate-spin" />
          <span>Warnsignale identifizieren...</span>
                </div>
              </div>

              <p className="text-gray-500 mt-4">Noch ~20 Sekunden...</p>
            </div>
          </div>
        </div>
      )}

      {/* Results Section */}
      {result && !loading && (
        <div id="teaser-result" className="space-y-6">
          {/* Header */}
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Dein Stellencheck ist fertig.
            </h2>
            <p className="text-gray-600">
              Basierend auf der Stellenanzeige – ohne Lebenslauf.
            </p>
            {(!result.shownRedFlags || result.shownRedFlags.length === 0) && (
              <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded">
                <p className="text-yellow-700">
                ⚠️ Die Analyse wurde durchgeführt, aber es wurden keine detaillierten Warnsignale extrahiert. 
                  Bitte versuche es mit einer längeren Stellenbeschreibung (mindestens 200 Zeichen).
                </p>
              </div>
            )}
            <p className="text-gray-700 mt-4">
              Wir haben <strong>{result.totalRedFlags || 0} mögliche Warnsignale</strong> gefunden.<br />
              Hier siehst du die Vorschau (bis zu 3). Den kompletten Report mit allen Warnsignalen und Begründungen kannst du ansehen.
            </p>
          </div>

          {/* Warnsignale Cards - Nur erste 3 anzeigen */}
          {result.shownRedFlags && result.shownRedFlags.length > 0 ? (
            <>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Warnsignale (Vorschau)</h3>
              {result.shownRedFlags.slice(0, 3).map((flag, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl shadow-md p-6 border-l-4 ${getBorderColor(flag.riskColor)} hover:shadow-lg transition mb-4`}
              >
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-3xl">{getRiskIcon(flag.risk)}</span>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      Warnsignal #{index + 1}: {flag.title}
                    </h3>
                  </div>
                </div>

                <div className="ml-12 space-y-3">
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-1">Was da steht:</p>
                    <p className="text-gray-600 italic">"{flag.originalText}"</p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-1">Was es bedeutet:</p>
                    <p className="text-gray-800">{flag.meaning}</p>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <span className="text-sm font-semibold text-gray-700">Risiko:</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                      flag.riskColor === 'red' 
                        ? 'bg-red-100 text-red-700' 
                        : flag.riskColor === 'yellow'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {getRiskIcon(flag.risk)} {flag.risk}
                    </span>
                  </div>
                </div>
              </div>
              ))}
            </>
          ) : (
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded">
              <p className="text-yellow-700">
                ⚠️ Keine Warnsignale konnten extrahiert werden. Bitte versuche es mit einer längeren Stellenbeschreibung (mindestens 200 Zeichen).
              </p>
            </div>
          )}

          {/* Locked/Upgrade Block */}
          <div className="bg-white border-2 border-[#0a4f5c] rounded-xl shadow-lg p-8 mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">
              Kompletten Report ansehen
            </h3>
            <p className="text-gray-700 mb-6 text-center">
              Alle gefundenen Warnsignale inkl. Begründung und Hinweise, worauf du in der Bewerbung achten solltest.
            </p>
            <a
              href="#pricing"
              className="block w-full bg-[#ff6b35] text-white py-4 px-6 rounded-lg font-bold text-lg hover:bg-[#e55a2b] transition shadow-lg hover:shadow-xl transform hover:scale-105 text-center"
            >
              Stellencheck aktivieren (59 €)
            </a>
            <p className="text-gray-500 text-sm text-center mt-4">
              Einmalig · Kein Abo
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

