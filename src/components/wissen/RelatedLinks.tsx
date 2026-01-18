import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface RelatedLink {
  title: string;
  href: string;
  description?: string;
}

interface RelatedLinksProps {
  links: RelatedLink[];
}

export default function RelatedLinks({ links }: RelatedLinksProps) {
  if (links.length === 0) return null;

  return (
    <div className="bg-gray-50 rounded-xl p-8 mb-12 border border-gray-200">
      <h3 className="text-xl font-bold mb-6" style={{ color: 'var(--text)' }}>
        Weiterführende Ressourcen
      </h3>
      <ul className="space-y-4">
        {links.map((link, index) => (
          <li key={index}>
            <Link
              to={link.href}
              className="flex items-start gap-3 group hover:text-[#ff6b35] transition"
              style={{ textDecoration: 'none', color: 'var(--text)' }}
            >
              <ArrowRight className="w-5 h-5 mt-1 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
              <div>
                <div className="font-semibold mb-1">{link.title}</div>
                {link.description && (
                  <div className="text-sm text-gray-600">{link.description}</div>
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
