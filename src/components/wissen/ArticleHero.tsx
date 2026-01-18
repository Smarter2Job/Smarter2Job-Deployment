import { Calendar, Clock, Tag } from 'lucide-react';
import { type Frontmatter } from '../../utils/mdxParser';

interface ArticleHeroProps {
  frontmatter: Frontmatter;
}

export default function ArticleHero({ frontmatter }: ArticleHeroProps) {
  const formattedDate = new Date(frontmatter.date).toLocaleDateString('de-DE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="mb-12">
      {frontmatter.heroKicker && (
        <p className="text-sm font-semibold text-[#ff6b35] uppercase tracking-wide mb-4">
          {frontmatter.heroKicker}
        </p>
      )}
      <h1
        style={{
          color: 'var(--text)',
          marginBottom: '16px',
          fontSize: 'clamp(32px, 4vw, 48px)',
          lineHeight: '1.2',
        }}
      >
        {frontmatter.title}
      </h1>
      <p
        style={{
          fontSize: 'clamp(18px, 2vw, 20px)',
          color: 'var(--text-muted)',
          marginBottom: '24px',
          lineHeight: '1.6',
        }}
      >
        {frontmatter.description}
      </p>
      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span>{formattedDate}</span>
        </div>
        {frontmatter.readingTime && (
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{frontmatter.readingTime} Min. Lesezeit</span>
          </div>
        )}
        {frontmatter.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <Tag className="w-4 h-4" />
            {frontmatter.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
