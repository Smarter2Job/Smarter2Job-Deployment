import { Link } from 'react-router-dom';
import { Calendar, Tag } from 'lucide-react';

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
}

const blogPosts: BlogPost[] = [
  {
    slug: 'warnzeichen-in-stellenanzeigen',
    title: 'Die 5 häufigsten Warnzeichen in Stellenanzeigen',
    date: '2024-12-15',
    summary: 'Welche Formulierungen sollten dich aufhorchen lassen? Wir zeigen die häufigsten Red Flags und was sie wirklich bedeuten.',
    tags: ['Warnzeichen', 'Tipps'],
  },
  {
    slug: 'schluesselbegriffe-im-lebenslauf',
    title: 'Schlüsselbegriffe im Lebenslauf: So platzierst du sie richtig',
    date: '2024-12-10',
    summary: 'Nicht nur die Begriffe zählen, sondern auch wo sie stehen. Strategische Platzierung für bessere Sichtbarkeit bei automatischer Vorauswahl.',
    tags: ['Lebenslauf', 'Schlüsselbegriffe'],
  },
  {
    slug: 'realismus-check',
    title: 'Realismus-Check: Wann ist eine Stelle wirklich passend?',
    date: '2024-12-05',
    summary: 'Wie du einschätzt, ob die Anforderungen realistisch sind – oder ob die Stelle vielleicht nicht zu dir passt.',
    tags: ['Passung', 'Bewerbung'],
  },
  {
    slug: 'automatische-vorauswahl-verstehen',
    title: 'Automatische Vorauswahl verstehen: So funktioniert sie',
    date: '2024-11-28',
    summary: 'Viele Unternehmen nutzen Software zur Vorauswahl. Wir erklären, wie das funktioniert und was du beachten solltest.',
    tags: ['Vorauswahl', 'Bewerbungsprozess'],
  },
  {
    slug: 'gezielt-bewerben',
    title: 'Gezielt bewerben statt breit streuen: Warum weniger mehr ist',
    date: '2024-11-20',
    summary: 'Masse statt Klasse funktioniert nicht. Warum gezielte Bewerbungen mit besserer Passung erfolgreicher sind.',
    tags: ['Bewerbungsstrategie', 'Tipps'],
  },
  {
    slug: 'dealbreaker-erkennen',
    title: 'Dealbreaker erkennen: Wann solltest du dich nicht bewerben?',
    date: '2024-11-15',
    summary: 'Nicht jede Stelle ist es wert. Wir zeigen, welche Anzeichen auf echte Dealbreaker hindeuten.',
    tags: ['Warnzeichen', 'Bewerbungsentscheidung'],
  },
  {
    slug: 'lebenslauf-optimieren',
    title: 'Lebenslauf optimieren: 5 Tipps für bessere Passung',
    date: '2024-11-10',
    summary: 'Wie du deinen Lebenslauf auf eine spezifische Stelle zuschneidest – ohne zu lügen.',
    tags: ['Lebenslauf', 'Optimierung'],
  },
  {
    slug: 'gehaltsband-indikation',
    title: 'Gehaltsband-Indikation: So liest du Gehaltsangaben in Stellenanzeigen',
    date: '2024-11-05',
    summary: 'Gehaltsangaben in Stellenanzeigen richtig interpretieren und realistische Erwartungen setzen.',
    tags: ['Gehalt', 'Verhandlung'],
  },
];

export default function Blog() {
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
            Blog
          </h1>
          <p style={{ 
            fontSize: 'clamp(18px, 2vw, 20px)', 
            color: 'var(--text-muted)', 
            maxWidth: '70ch',
            marginLeft: 'auto',
            marginRight: 'auto',
            lineHeight: '1.6'
          }}>
            Tipps, Insights und Best Practices für gezielte und smarte Bewerbungen.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition group"
            >
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                <Calendar className="w-4 h-4" />
                <span>{new Date(post.date).toLocaleDateString('de-DE', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <h2 className="text-xl font-bold mb-3 group-hover:text-[#ff6b35] transition" style={{ color: 'var(--text)' }}>
                {post.title}
              </h2>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                {post.summary}
              </p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700"
                  >
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-gray-50 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text)' }}>
            Bereit zum Starten?
          </h2>
          <p className="text-gray-600 mb-6">
            Teste Smarter2Job kostenlos – ohne Anmeldung.
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
