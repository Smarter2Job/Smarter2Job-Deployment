import { useEffect, useState } from 'react';

interface Heading {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);

  useEffect(() => {
    const articleContent = document.querySelector('article');
    if (!articleContent) return;

    const headingElements = articleContent.querySelectorAll('h2, h3');
    const extractedHeadings: Heading[] = [];

    headingElements.forEach((heading) => {
      const id = heading.textContent
        ?.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '') || '';
      heading.id = id;
      extractedHeadings.push({
        id,
        text: heading.textContent || '',
        level: parseInt(heading.tagName.charAt(1)),
      });
    });

    setHeadings(extractedHeadings);
  }, []);

  if (headings.length === 0) return null;

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="bg-gray-50 rounded-xl p-6 mb-8 border border-gray-200 break-words overflow-hidden">
      <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text)' }}>
        Inhaltsverzeichnis
      </h3>
      <nav>
        <ul className="space-y-2">
          {headings.map((heading) => (
            <li key={heading.id} className="break-words">
              <button
                onClick={() => scrollToHeading(heading.id)}
                className={`text-left text-sm hover:text-[#ff6b35] transition break-words ${
                  heading.level === 3 ? 'ml-4' : ''
                }`}
                style={{ color: 'var(--text-muted)', wordBreak: 'break-word' }}
              >
                {heading.text}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
