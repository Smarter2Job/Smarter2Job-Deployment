import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { parseMDX, markdownToHTML, type Frontmatter } from '../utils/mdxParser';
import ArticleHero from '../components/wissen/ArticleHero';
import TableOfContents from '../components/wissen/TableOfContents';
import CTAStack from '../components/wissen/CTAStack';
import RelatedLinks from '../components/wissen/RelatedLinks';

// Static imports for MDX content
import arbeitsmarkt2026Raw from '../content/wissen/arbeitsmarkt-2026-gewinner-verlierer.mdx?raw';
import leitfadenArbeitsmarkt2026Raw from '../content/wissen/leitfaden-arbeitsmarkt-2026.mdx?raw';

const wissenContentMap: Record<string, string> = {
  'arbeitsmarkt-2026-gewinner-verlierer': arbeitsmarkt2026Raw,
  'leitfaden-arbeitsmarkt-2026': leitfadenArbeitsmarkt2026Raw,
};

function loadMDXContent(slug: string): string {
  const content = wissenContentMap[slug];
  if (!content) {
    throw new Error('Content not found');
  }
  return content;
}

export default function Wissen() {
  const { slug } = useParams<{ slug: string }>();
  const [parsed, setParsed] = useState<{ frontmatter: Frontmatter; content: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setError('Slug nicht gefunden');
      setLoading(false);
      return;
    }

    try {
      const content = loadMDXContent(slug);
      const parsedContent = parseMDX(content);
      setParsed(parsedContent);
      setLoading(false);
    } catch (err) {
      setError('Artikel nicht gefunden');
      setLoading(false);
      console.error(err);
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white page-content">
        <div className="container-narrow text-center py-20">
          <p>Lade Artikel...</p>
        </div>
      </div>
    );
  }

  if (error || !parsed) {
    return (
      <div className="min-h-screen bg-white page-content">
        <div className="container-narrow text-center py-20">
          <h1 className="text-3xl font-bold mb-4">Artikel nicht gefunden</h1>
          <p className="text-gray-600">{error || 'Der angeforderte Artikel konnte nicht geladen werden.'}</p>
        </div>
      </div>
    );
  }

  const htmlContent = markdownToHTML(parsed.content);

  // Extract related links from content (simple regex for now)
  const relatedLinks = [
    { title: 'Branchenwechsel 2026: Skill-Transfer', href: '/wissen/branchenwechsel-2026-skill-transfer', description: 'Detaillierter Leitfaden für den Wechsel' },
    { title: 'Bewerbung im öffentlichen Dienst', href: '/wissen/bewerbung-oeffentlicher-dienst-leitfaden', description: 'Spezifischer Leitfaden für ÖD-Bewerbungen' },
    { title: 'Stellenanzeige verstehen', href: '/stellencheck', description: 'Prüfe, ob eine Stelle wirklich passt' },
    { title: 'Chancen einschätzen', href: '/preise', description: 'Passungsprüfung mit Lebenslauf' },
  ];

  return (
    <div className="min-h-screen bg-white page-content">
      <div className="container-narrow">
        <ArticleHero frontmatter={parsed.frontmatter} />
        
        <div className="grid md:grid-cols-4 gap-8">
          {/* Sidebar: Table of Contents */}
          <aside className="md:col-span-1">
            <div className="sticky top-24 max-w-[200px]">
              <TableOfContents />
            </div>
          </aside>

          {/* Main Content */}
          <main className="md:col-span-3 min-w-0">
            <article
              className="max-w-none mb-12"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
              style={{
                color: 'var(--text)',
                fontSize: '19px',
                lineHeight: '1.75',
              }}
            />

            <CTAStack />

            <RelatedLinks links={relatedLinks} />
          </main>
        </div>
      </div>
    </div>
  );
}
