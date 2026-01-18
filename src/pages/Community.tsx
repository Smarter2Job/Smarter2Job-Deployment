import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, MessageSquare, BookOpen, Mail } from 'lucide-react';

export default function Community() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would submit to Netlify Forms or your backend
    console.log('Newsletter signup:', email);
    setSubmitted(true);
    setEmail('');
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-white page-content">
      <div className="container-narrow">
        <div className="text-center mb-16">
          <h1 style={{ 
            color: 'var(--text)', 
            marginBottom: '24px',
            fontSize: 'clamp(40px, 5vw, 48px)',
            lineHeight: '1.1'
          }}>
            Community
          </h1>
          <p style={{ 
            fontSize: 'clamp(18px, 2vw, 20px)', 
            color: 'var(--text-muted)', 
            maxWidth: '70ch',
            marginLeft: 'auto',
            marginRight: 'auto',
            lineHeight: '1.6'
          }}>
            Tausche dich mit anderen aus, die gezielter und smarter bewerben wollen.
          </p>
        </div>

        {/* Warum Community */}
        <div className="mb-16">
          <div className="bg-gray-50 rounded-xl p-8 mb-8">
            <div className="flex items-start gap-4 mb-6">
              <Users className="w-8 h-8 text-[#0a4f5c] mt-1 flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text)' }}>
                  Warum Community?
                </h2>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Bewerbungen sind individuell – aber viele Herausforderungen sind ähnlich. In der Community tauschen wir uns aus über:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-[#ff6b35] mt-1">•</span>
                    <span>Erfahrungen mit Stellenanzeigen und Warnsignalen</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#ff6b35] mt-1">•</span>
                    <span>Tipps für Lebensläufe und Schlüsselbegriffe</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#ff6b35] mt-1">•</span>
                    <span>Best Practices für gezielte Bewerbungen</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#ff6b35] mt-1">•</span>
                    <span>Unterstützung und Motivation</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-8">
            <div className="flex items-start gap-4 mb-6">
              <MessageSquare className="w-8 h-8 text-[#ff6b35] mt-1 flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text)' }}>
                  Was bekommst du dort?
                </h2>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <BookOpen className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <span><strong>Exklusive Inhalte:</strong> Erweiterte Analysen, Best Practices, Case Studies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Users className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <span><strong>Networking:</strong> Kontakte zu anderen Bewerbern, Tipps austauschen</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <MessageSquare className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <span><strong>Direkter Support:</strong> Fragen stellen, Feedback bekommen</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Mail className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <span><strong>Newsletter:</strong> Updates, neue Features, Tipps direkt ins Postfach</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup / Waitlist */}
        <div className="bg-white rounded-xl shadow-lg p-8 border-2" style={{ borderColor: '#ff6b35' }}>
          <h2 className="text-2xl font-bold text-center mb-4" style={{ color: 'var(--text)' }}>
            Newsletter & Waitlist
          </h2>
          <p className="text-gray-600 text-center mb-6">
            Bleib auf dem Laufenden über neue Features, Community-Updates und Tipps.
          </p>

          {submitted ? (
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded text-center">
              <p className="text-green-800 font-semibold">Danke! Du bist jetzt auf der Liste.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Deine E-Mail-Adresse"
                  required
                  className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#0a4f5c] focus:outline-none text-gray-900"
                />
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ 
                    backgroundColor: '#ff6b35',
                    whiteSpace: 'nowrap'
                  }}
                >
                  Anmelden
                </button>
              </div>
              <p className="text-xs text-gray-500 text-center mt-2">
                Keine Spam-Mails. Jederzeit abmelbar.
              </p>
            </form>
          )}

          {/* Alternative: LinkedIn Gruppe Link */}
          <div className="mt-8 pt-8 border-t border-gray-200 text-center">
            <p className="text-gray-600 mb-4">
              Oder trete unserer LinkedIn-Gruppe bei:
            </p>
            <a
              href="#"
              className="text-[#ff6b35] font-semibold hover:underline"
              onClick={(e) => {
                e.preventDefault();
                alert('LinkedIn-Gruppe folgt in Kürze. Für Updates melde dich für den Newsletter an!');
              }}
            >
              Zur LinkedIn-Gruppe →
            </a>
            <p className="text-xs text-gray-500 mt-2">
              (Platzhalter – Gruppe wird in Kürze erstellt)
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
          <p className="text-blue-800 font-semibold mb-2">Hinweis</p>
          <p className="text-blue-700 text-sm">
            Die Community befindet sich aktuell im Aufbau. Mit dem Newsletter bleibst du über den Start auf dem Laufenden.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Bereit zum Starten? Teste Smarter2Job kostenlos.
          </p>
          <Link
            to="/stellencheck"
            className="btn btn-primary btn-lg inline-block"
            style={{ 
              backgroundColor: '#ff6b35',
              textDecoration: 'none'
            }}
          >
            Jetzt Stellenanzeige prüfen
          </Link>
        </div>
      </div>
    </div>
  );
}
