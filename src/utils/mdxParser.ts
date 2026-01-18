export interface Frontmatter {
  title: string;
  description: string;
  date: string;
  tags: string[];
  type: 'pillar' | 'blog';
  pillarSlug?: string;
  readingTime?: number;
  heroKicker?: string;
  ctaPrimary?: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
}

export interface ParsedMDX {
  frontmatter: Frontmatter;
  content: string;
}

export function parseMDX(mdxContent: string): ParsedMDX {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = mdxContent.match(frontmatterRegex);

  if (!match) {
    throw new Error('Invalid MDX format: Frontmatter not found');
  }

  const frontmatterText = match[1];
  const content = match[2].trim();

  // Parse YAML frontmatter
  const frontmatter: Partial<Frontmatter> = {};
  const lines = frontmatterText.split('\n');

  let currentObject: any = null;
  let indentLevel = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    if (trimmed === '' || trimmed.startsWith('#')) continue;

    const currentIndent = line.match(/^(\s*)/)?.[1].length || 0;

    // Check if this is a key-value pair
    const keyValueMatch = line.match(/^(\s*)(\w+):\s*(.+)$/);
    if (keyValueMatch) {
      const [, indent, key, value] = keyValueMatch;
      indentLevel = indent.length;

      // If we're inside an object (indented), add to current object
      if (currentObject && indentLevel > 0) {
        const cleanValue = value.replace(/^["']|["']$/g, '');
        if (key === 'label' || key === 'href') {
          currentObject[key] = cleanValue;
        }
        continue;
      }

      // Reset object context if we're at root level
      if (indentLevel === 0) {
        currentObject = null;
      }

      // Handle array values
      if (value.startsWith('[')) {
        const arrayContent = value.match(/\[(.*)\]/)?.[1] || '';
        frontmatter[key as keyof Frontmatter] = arrayContent
          .split(',')
          .map(item => item.trim().replace(/^["']|["']$/g, '')) as any;
      }
      // Handle object start (ctaPrimary, ctaSecondary)
      else if (key === 'ctaPrimary' || key === 'ctaSecondary') {
        currentObject = {};
        frontmatter[key as keyof Frontmatter] = currentObject as any;
      }
      // Handle simple values
      else {
        const cleanValue = value.replace(/^["']|["']$/g, '');
        if (key === 'readingTime') {
          frontmatter[key as keyof Frontmatter] = Number(cleanValue) as any;
        } else {
          frontmatter[key as keyof Frontmatter] = cleanValue as any;
        }
      }
    }
    // Handle indented lines (object properties)
    else if (currentObject && currentIndent > indentLevel) {
      const propMatch = line.match(/^(\s+)(\w+):\s*(.+)$/);
      if (propMatch) {
        const [, , prop, value] = propMatch;
        const cleanValue = value.replace(/^["']|["']$/g, '');
        currentObject[prop] = cleanValue;
      }
    }
  }

  return {
    frontmatter: frontmatter as Frontmatter,
    content,
  };
}

// Simple markdown to HTML converter (basic)
export function markdownToHTML(markdown: string): string {
  let html = markdown;

  // First, ensure paragraphs are properly separated
  // Split by double newlines to get paragraphs
  const paragraphs = html.split(/\n\n+/);
  
  // Process each paragraph
  let processedParagraphs: string[] = [];
  
  for (let i = 0; i < paragraphs.length; i++) {
    let para = paragraphs[i].trim();
    if (!para) continue;

    // Check if it's a header
    if (para.match(/^### /)) {
      const headerText = para.replace(/^### /, '').trim();
      const headerId = headerText.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      // Add spacing before H3 (if previous was not a header)
      if (i > 0 && !paragraphs[i - 1].trim().match(/^#{1,3} /)) {
        processedParagraphs.push('');
      }
      processedParagraphs.push(`<h3 id="${headerId}" class="text-2xl font-bold mt-10 mb-6" style="color: var(--text);">${headerText}</h3>`);
      // Add 2 empty lines after H3
      processedParagraphs.push('');
      processedParagraphs.push('');
    } else if (para.match(/^## /)) {
      const headerText = para.replace(/^## /, '').trim();
      const headerId = headerText.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      
      // Special handling for "Passende Artikel" - make it smaller and dezent
      if (headerText.includes('Passende Artikel') || headerText.includes('Teaser')) {
        // Add spacing before
        if (i > 0 && !paragraphs[i - 1].trim().match(/^#{1,3} /)) {
          processedParagraphs.push('');
        }
        processedParagraphs.push(`<div class="mt-12 mb-6 pt-6 border-t border-gray-200"><h4 class="text-lg font-semibold mb-3" style="color: var(--text-muted);">${headerText}</h4>`);
        // Don't add extra spacing after - the list will come next
      } else {
        // Add spacing before H2 (if previous was not a header)
        if (i > 0 && !paragraphs[i - 1].trim().match(/^#{1,3} /)) {
          processedParagraphs.push('');
        }
        processedParagraphs.push(`<h2 id="${headerId}" class="text-3xl font-bold mt-14 mb-8" style="color: var(--text);">${headerText}</h2>`);
        // Add 2 empty lines after H2
        processedParagraphs.push('');
        processedParagraphs.push('');
      }
    } else if (para.match(/^# /)) {
      const headerText = para.replace(/^# /, '').trim();
      // Add spacing before H1 (if previous was not a header)
      if (i > 0 && !paragraphs[i - 1].trim().match(/^#{1,3} /)) {
        processedParagraphs.push('');
      }
      processedParagraphs.push(`<h1 class="text-4xl font-bold mt-10 mb-6" style="color: var(--text);">${headerText}</h1>`);
      // Add 2 empty lines after H1
      processedParagraphs.push('');
      processedParagraphs.push('');
    } else {
      // Regular paragraph - add spacing before if previous was not a header
      if (i > 0 && !paragraphs[i - 1].trim().match(/^#{1,3} /)) {
        processedParagraphs.push('');
      }
      
      // Process inline formatting
      para = para.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      para = para.replace(/\*(.*?)\*/g, '<em>$1</em>');
      para = para.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-[#0a4f5c] hover:underline">$1</a>');
      
      // Check if it's a list
      if (para.match(/^[\-\*] /) || para.match(/^\d+\. /)) {
        // Handle lists
        const listItems = para.split('\n').filter(line => line.trim());
        const isOrdered = listItems[0].match(/^\d+\. /);
        const tag = isOrdered ? 'ol' : 'ul';
        
        // Check if previous was "Passende Artikel" - if so, make it a dezent list
        const isTeaserList = i > 0 && paragraphs[i - 1].trim().match(/^## .*(Passende Artikel|Teaser)/);
        const listClass = isTeaserList 
          ? 'space-y-2 my-3 text-sm list-none' 
          : 'list-disc list-inside space-y-2 my-4 ml-4';
        const itemClass = isTeaserList ? 'text-gray-600' : '';
        
        let listHTML = `<${tag} class="${listClass}">${listItems.map(item => {
          const cleanItem = item.replace(/^[\-\*]\s+/, '').replace(/^\d+\.\s+/, '');
          // Process inline formatting in list items
          const processedItem = cleanItem.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>').replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-[#0a4f5c] hover:underline">$1</a>');
          return `<li class="${itemClass}">${processedItem}</li>`;
        }).join('')}</${tag}>`;
        
        // If it's a teaser list, close the div we started earlier
        if (isTeaserList) {
          listHTML = listHTML + '</div>';
        }
        
        processedParagraphs.push(listHTML);
      } else {
        // Regular paragraph - ensure it's not bold by default
        processedParagraphs.push(`<p class="mb-6 leading-relaxed font-normal" style="font-weight: 400;">${para}</p>`);
      }
    }
  }

  html = processedParagraphs.join('\n');

  // Clean up multiple consecutive empty lines (keep max 2)
  html = html.replace(/\n{3,}/g, '\n\n');

  return html;
}
