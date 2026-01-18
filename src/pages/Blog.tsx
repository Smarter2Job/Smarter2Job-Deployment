import { Link } from 'react-router-dom';
import { Calendar, Tag, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { parseMDX, type Frontmatter } from '../utils/mdxParser';

interface BlogPost {
  slug: string;
  frontmatter: Frontmatter;
}

// Static imports for blog MDX content
import arbeitsmarkt2026BlogRaw from '../content/blog/arbeitsmarkt-2026-in-7-minuten.mdx?raw';
import automotiveBankingRaw from '../content/blog/automotive-banking-was-jetzt-tun.mdx?raw';
import oeffentlicherDienstRaw from '../content/blog/oeffentlicher-dienst-einstieg-fuer-umsteiger.mdx?raw';

const blogContentMap: Record<string, string> = {
  'arbeitsmarkt-2026-in-7-minuten': arbeitsmarkt2026BlogRaw,
  'automotive-banking-was-jetzt-tun': automotiveBankingRaw,
  'oeffentlicher-dienst-einstieg-fuer-umsteiger': oeffentlicherDienstRaw,
};

function loadBlogPost(slug: string): string {
  const content = blogContentMap[slug];
  if (!content) {
    throw new Error('Content not found');
  }
  return content;
}

export default function Blog() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const slugs = [
      'arbeitsmarkt-2026-in-7-minuten',
      'automotive-banking-was-jetzt-tun',
      'oeffentlicher-dienst-einstieg-fuer-umsteiger',
    ];

    const posts: BlogPost[] = [];
    for (const slug of slugs) {
      try {
        const content = loadBlogPost(slug);
        const parsed = parseMDX(content);
        if (parsed.frontmatter.type === 'blog') {
          posts.push({
            slug,
            frontmatter: parsed.frontmatter,
          });
        }
      } catch (err) {
        console.warn(`Failed to load blog post: ${slug}`, err);
      }
    }

    // Sort by date (desc) - only include posts with date >= 2025-10-01
    const filteredPosts = posts.filter(post => {
      const postDate = new Date(post.frontmatter.date);
      const minDate = new Date('2025-10-01');
      return postDate >= minDate;
    });

    filteredPosts.sort((a, b) => {
      const dateA = new Date(a.frontmatter.date).getTime();
      const dateB = new Date(b.frontmatter.date).getTime();
      return dateB - dateA;
    });

    setBlogPosts(filteredPosts);
    setLoading(false);
  }, []);

  // Legacy blog posts (hardcoded)
  const legacyPosts = [
    {
      slug: 'warnzeichen-in-stellenanzeigen',
      title: 'Die 5 häufigsten Warnsignale in Stellenanzeigen',
      date: '2024-12-15',
      summary: 'Welche Formulierungen sollten dich aufhorchen lassen? Wir zeigen die häufigsten Warnsignale und was sie wirklich bedeuten.',
      tags: ['Warnsignale', 'Tipps'],
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
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-white page-content">
        <div className="container-narrow text-center py-20">
          <p>Lade Blog-Artikel...</p>
        </div>
      </div>
    );
  }

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
          {blogPosts.map((post) => {
            const formattedDate = new Date(post.frontmatter.date).toLocaleDateString('de-DE', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            });

            return (
              <div
                key={post.slug}
                className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition"
              >
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  <Calendar className="w-4 h-4" />
                  <span>{formattedDate}</span>
                </div>
                <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text)' }}>
                  {post.frontmatter.title}
                </h2>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {post.frontmatter.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.frontmatter.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700"
                    >
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>
                {post.frontmatter.pillarSlug ? (
                  <Link
                    to={post.frontmatter.pillarSlug}
                    className="inline-flex items-center gap-2 text-[#ff6b35] font-semibold hover:underline"
                    style={{ textDecoration: 'none' }}
                  >
                    Zum Leitfaden
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                ) : (
                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-[#ff6b35] font-semibold hover:underline"
                    style={{ textDecoration: 'none' }}
                  >
                    Artikel lesen
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            );
          })}

          {/* Legacy posts */}
          {legacyPosts.map((post) => (
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
