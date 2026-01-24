import Anthropic from '@anthropic-ai/sdk';
import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';

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

type ExtractedJobText = {
  jobText: string;
  sourceUrl?: string;
  sourceStrategy?: 'direct_html' | 'jina_proxy';
};

// Modul 0 Prompt (Red Flag Teaser)
const MODUL_0_PROMPT = `# MODUL 0: Freemium-Teaser "Erste Karte aufdecken"

## ROLLE
Du bist ein erfahrener Recruiting-Analyst, der schnell die größten Warnsignale in Stellenbeschreibungen erkennt.

## AUFGABE
Analysiere die folgende Stellenbeschreibung und identifiziere die **3-5 auffälligsten Red Flags**. Dies ist ein kostenloser Teaser – gib genug Mehrwert, um Interesse zu wecken, aber zeige auch, dass es noch viel mehr zu entdecken gibt.

## ANALYSE-FRAMEWORK

### 1. TOP 3-5 RED FLAGS

Identifiziere die **3-5 auffälligsten Red Flags** und erkläre sie kurz.

**Format:**

🔴 **[Red Flag 1: Kurzer Titel]**
- **Was da steht:** "[Originalformulierung aus Job-Description]"
- **Was es bedeutet:** [1-2 Sätze Erklärung]
- **Risiko:** [SEHR HOCH / HOCH / MITTEL / NIEDRIG]

🔴 **[Red Flag 2: Kurzer Titel]**
- **Was da steht:** "[Originalformulierung]"
- **Was es bedeutet:** [1-2 Sätze]
- **Risiko:** [SEHR HOCH / HOCH / MITTEL / NIEDRIG]

🔴 **[Red Flag 3: Kurzer Titel]**
- **Was da steht:** "[Originalformulierung]"
- **Was es bedeutet:** [1-2 Sätze]
- **Risiko:** [SEHR HOCH / HOCH / MITTEL / NIEDRIG]

*(Optional: 4. und 5. Red Flag, falls relevant)*

### 2. GESAMT-RED-FLAGS-ZAHL

Gib die **Gesamtzahl der identifizierten Red Flags** an (auch die, die du nicht im Detail zeigst).
Format: "GESAMT: [Zahl] Red Flags"

### 3. TEASER-TEXT

Schreibe einen kurzen Teaser (1-2 Sätze), der Lust auf die Vollanalyse macht.

## TONALITÄT

- **Knackig & direkt** (keine langen Texte)
- **Aufmerksamkeitsstark** (triggert Neugier)
- **Ehrlich** (zeigt echten Mehrwert, kein Clickbait)

## OUTPUT-FORMAT

Antworte AUSSCHLIESSLICH in folgendem Format:

GESAMT: [Zahl]

RED FLAG 1: [Titel]
WAS DA STEHT: [Original-Zitat]
WAS ES BEDEUTET: [Erklärung]
RISIKO: [SEHR HOCH/HOCH/MITTEL/NIEDRIG]

RED FLAG 2: [Titel]
WAS DA STEHT: [Original-Zitat]
WAS ES BEDEUTET: [Erklärung]
RISIKO: [SEHR HOCH/HOCH/MITTEL/NIEDRIG]

RED FLAG 3: [Titel]
WAS DA STEHT: [Original-Zitat]
WAS ES BEDEUTET: [Erklärung]
RISIKO: [SEHR HOCH/HOCH/MITTEL/NIEDRIG]

TEASER: [1-2 Sätze für Upsell]

---

JETZT ANALYSIERE DIESE STELLENBESCHREIBUNG:`;

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, '/')
    .replace(/&#x60;/g, '`')
    .replace(/&#x3D;/g, '=');
}

function stripHtml(html: string): string {
  const withoutScripts = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ');
  const withNewlines = withoutScripts
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<\/li>/gi, '\n')
    .replace(/<\/h\d>/gi, '\n');
  const withoutTags = withNewlines.replace(/<[^>]+>/g, ' ');
  const decoded = decodeHtmlEntities(withoutTags);
  return decoded.replace(/[ \t]+\n/g, '\n').replace(/\n{3,}/g, '\n\n').replace(/[ \t]{2,}/g, ' ').trim();
}

function clampText(text: string, maxChars: number): string {
  if (text.length <= maxChars) return text;
  return `${text.slice(0, maxChars)}\n\n[... gekürzt ...]`;
}

function extractFirstUrl(input: string): string | null {
  const match = input.match(/https?:\/\/[^\s)]+/i);
  return match ? match[0] : null;
}

function normalizeJobUrl(url: string): string {
  try {
    const u = new URL(url);
    const host = u.hostname.toLowerCase();
    if (host.includes('linkedin.com')) {
      const currentJobId = u.searchParams.get('currentJobId') || u.searchParams.get('currentjobid');
      if (currentJobId) {
        return `https://www.linkedin.com/jobs/view/${currentJobId}/`;
      }
    }
    return url;
  } catch {
    return url;
  }
}

function isLikelyUrlInput(raw: string, extractedUrl: string): boolean {
  const trimmed = raw.trim();
  if (trimmed === extractedUrl) return true;

  // If user pasted a URL plus a tiny bit of fluff, still treat as URL input.
  const remainder = trimmed.replace(extractedUrl, '').trim();
  return remainder.length > 0 && remainder.length <= 30;
}

function extractJobDescriptionFromJsonLd(html: string): string | null {
  const scripts: string[] = [];
  const re = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let match: RegExpExecArray | null;
  while ((match = re.exec(html)) !== null) {
    scripts.push(match[1]);
  }
  if (scripts.length === 0) return null;

  const findJobPostingDescription = (node: any): string | null => {
    if (!node) return null;
    if (Array.isArray(node)) {
      for (const item of node) {
        const found = findJobPostingDescription(item);
        if (found) return found;
      }
      return null;
    }
    if (typeof node === 'object') {
      const type = node['@type'];
      const isJobPosting =
        type === 'JobPosting' ||
        (Array.isArray(type) && type.includes('JobPosting')) ||
        (typeof type === 'string' && type.toLowerCase().includes('jobposting'));
      if (isJobPosting && typeof node.description === 'string' && node.description.trim().length > 0) {
        return node.description;
      }
      for (const key of Object.keys(node)) {
        const found = findJobPostingDescription(node[key]);
        if (found) return found;
      }
    }
    return null;
  };

  for (const raw of scripts) {
    try {
      const json = JSON.parse(raw.trim());
      const desc = findJobPostingDescription(json);
      if (desc) return desc;
    } catch {
      // ignore invalid JSON-LD blocks
    }
  }
  return null;
}

async function fetchText(url: string, timeoutMs: number): Promise<{ ok: boolean; status: number; text: string }> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
      signal: controller.signal,
    });
    const text = await res.text();
    return { ok: res.ok, status: res.status, text };
  } finally {
    clearTimeout(timeout);
  }
}

async function extractJobTextFromInput(input: string): Promise<ExtractedJobText> {
  const url = extractFirstUrl(input);
  if (!url || !isLikelyUrlInput(input, url)) {
    return { jobText: input.trim() };
  }

  const normalizedUrl = normalizeJobUrl(url);
  console.log(`🔎 URL input erkannt. Versuche Stellenanzeige zu laden: ${normalizedUrl}`);

  // 1) Direct HTML fetch
  try {
    const direct = await fetchText(normalizedUrl, 12000);
    if (direct.ok && direct.text && direct.text.length > 0) {
      const jsonLdDesc = extractJobDescriptionFromJsonLd(direct.text);
      const extracted = jsonLdDesc ? stripHtml(jsonLdDesc) : stripHtml(direct.text);
      const cleaned = clampText(extracted, 12000);
      if (cleaned.length >= 300) {
        return { jobText: cleaned, sourceUrl: normalizedUrl, sourceStrategy: 'direct_html' };
      }
      console.log(`⚠️ Direct fetch zu kurz (${cleaned.length} chars). Fallback via Proxy.`);
    } else {
      console.log(`⚠️ Direct fetch nicht ok (status ${direct.status}). Fallback via Proxy.`);
    }
  } catch (e: any) {
    console.log(`⚠️ Direct fetch failed (${e?.message || 'unknown'}). Fallback via Proxy.`);
  }

  // 2) Fallback: Jina AI proxy (returns readable text, often bypasses CORS/login walls)
  const jinaUrl = `https://r.jina.ai/${normalizedUrl}`;
  const proxied = await fetchText(jinaUrl, 15000);
  const proxiedText = clampText(proxied.text.trim(), 12000);
  if (proxied.ok && proxiedText.length >= 300) {
    return { jobText: proxiedText, sourceUrl: normalizedUrl, sourceStrategy: 'jina_proxy' };
  }

  return { jobText: '', sourceUrl: normalizedUrl };
}

// Hilfsfunktion: Response parsen
function parseClaudeResponse(response: string): AnalysisResult {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📝 Parse Claude Response...');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📄 Full Response:', response);
  
  const lines = response.split('\n').filter(line => line.trim());
  console.log(`📊 Total lines: ${lines.length}`);
  
  // Extrahiere Gesamt-Anzahl
  const gesamtLine = lines.find(line => line.startsWith('GESAMT:'));
  const totalRedFlags = gesamtLine 
    ? parseInt(gesamtLine.replace('GESAMT:', '').trim()) 
    : 4; // Fallback

  console.log(`✅ Total Red Flags: ${totalRedFlags}`);

  const redFlags: RedFlag[] = [];
  let currentFlag: Partial<RedFlag> | null = null;

  // Parse Red Flags - robuster Parser für verschiedene Formate
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const upperLine = line.toUpperCase();

    // Flexible Pattern-Matching für "RED FLAG"
    if (upperLine.includes('RED FLAG') || upperLine.match(/^RED\s*FLAG\s*\d+/i)) {
      // Speichere vorherige Flag, falls vorhanden
      if (currentFlag && currentFlag.title && currentFlag.originalText && currentFlag.meaning && currentFlag.risk) {
        redFlags.push(currentFlag as RedFlag);
        console.log(`✅ Saved flag: ${currentFlag.title}`);
      }
      
      // Neue Flag starten - extrahiere Titel
      const titleMatch = line.match(/RED\s*FLAG\s*\d+[:\-]?\s*(.+)/i);
      const title = titleMatch ? titleMatch[1].trim() : line.replace(/RED\s*FLAG\s*\d+[:\-]?\s*/i, '').trim();
      
      currentFlag = { 
        title: title || 'Unbekannter Red Flag',
        originalText: '',
        meaning: '',
        risk: 'MITTEL',
        riskColor: 'yellow'
      };
      console.log(`🆕 New flag started: ${title}`);
    } 
    // Flexible Pattern-Matching für "WAS DA STEHT"
    else if ((upperLine.includes('WAS DA STEHT') || upperLine.includes('WAS DA STEH') || upperLine.includes('ORIGINAL')) && currentFlag) {
      const text = line.replace(/WAS\s*DA\s*STEH[ET]*[:\-]?\s*/i, '').replace(/ORIGINAL[:\-]?\s*/i, '').trim();
      if (text) {
        currentFlag.originalText = text;
        console.log(`📝 Original text: ${text.substring(0, 50)}...`);
      }
    } 
    // Flexible Pattern-Matching für "WAS ES BEDEUTET"
    else if ((upperLine.includes('WAS ES BEDEUTET') || upperLine.includes('BEDEUTET') || upperLine.includes('BEDEUTUNG') || upperLine.includes('MEANING')) && currentFlag) {
      const text = line.replace(/WAS\s*ES\s*BEDEUTET[:\-]?\s*/i, '').replace(/BEDEUTUNG[:\-]?\s*/i, '').replace(/MEANING[:\-]?\s*/i, '').trim();
      if (text) {
        currentFlag.meaning = text;
        console.log(`💡 Meaning: ${text.substring(0, 50)}...`);
      }
    } 
    // Flexible Pattern-Matching für "RISIKO"
    else if ((upperLine.includes('RISIKO') || upperLine.includes('RISK')) && currentFlag) {
      const riskText = line.replace(/RISIKO[:\-]?\s*/i, '').replace(/RISK[:\-]?\s*/i, '').trim().toUpperCase();
      
      // Bestimme Risiko-Level
      let risk: RedFlag['risk'] = 'MITTEL';
      if (riskText.includes('SEHR HOCH') || riskText.includes('VERY HIGH')) {
        risk = 'SEHR HOCH';
      } else if (riskText.includes('HOCH') || riskText.includes('HIGH')) {
        risk = 'HOCH';
      } else if (riskText.includes('NIEDRIG') || riskText.includes('LOW')) {
        risk = 'NIEDRIG';
      } else {
        risk = 'MITTEL';
      }
      
      currentFlag.risk = risk;
      
      // Setze Farbe basierend auf Risiko
      if (risk === 'SEHR HOCH' || risk === 'HOCH') {
        currentFlag.riskColor = 'red';
      } else if (risk === 'MITTEL') {
        currentFlag.riskColor = 'yellow';
      } else {
        currentFlag.riskColor = 'green';
      }
      console.log(`⚠️ Risk: ${risk}`);
    }
  }

  // Speichere letzte Flag
  if (currentFlag && currentFlag.title && currentFlag.originalText && currentFlag.meaning && currentFlag.risk) {
    redFlags.push(currentFlag as RedFlag);
  }

  console.log(`✅ Parsed ${redFlags.length} Red Flags`);

  // Extrahiere Teaser-Text
  const teaserLine = lines.find(line => line.startsWith('TEASER:') || line.toUpperCase().includes('TEASER'));
  const teaserText = teaserLine 
    ? teaserLine.replace(/TEASER[:\-]?\s*/i, '').trim()
    : `Es gibt noch ${Math.max(0, totalRedFlags - redFlags.length)} weitere versteckte Warnsignale in dieser Stelle.`;

  return {
    totalRedFlags: Math.max(totalRedFlags, redFlags.length),
    shownRedFlags: redFlags.slice(0, 5), // Max 5 zeigen
    hiddenRedFlagsCount: Math.max(0, totalRedFlags - redFlags.length),
    upsellText: teaserText
  };
}

// Netlify Function Handler
export const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🚀 API Route: /api/analyze-teaser');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  // CORS Headers
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  // Handle OPTIONS request (CORS preflight)
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // Nur POST erlauben
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    // API Key Check
    console.log('🔑 API Key Check:');
    const apiKey = process.env.CLAUDE_API_KEY || process.env.ANTHROPIC_API_KEY;
    console.log(`   - CLAUDE_API_KEY present: ${!!process.env.CLAUDE_API_KEY}`);
    console.log(`   - ANTHROPIC_API_KEY present: ${!!process.env.ANTHROPIC_API_KEY}`);
    
    if (!apiKey) {
      console.error('❌ KRITISCHER FEHLER: Kein API Key gefunden!');
      console.error('   ⚠️  Bitte CLAUDE_API_KEY in Netlify Environment Variables setzen');
      return {
        statusCode: 503,
        headers,
        body: JSON.stringify({ 
          error: 'Die Analyse ist vorübergehend nicht verfügbar. Bitte versuche es später erneut.' 
        }),
      };
    }

    // Parse Request Body
    const body = JSON.parse(event.body || '{}');
    const { jobText } = body;

    if (!jobText || typeof jobText !== 'string') {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          error: 'Bitte gib eine Stellen-URL oder eine Stellenbeschreibung ein.' 
        }),
      };
    }

    // URL → echten Text extrahieren (wenn der Input im Wesentlichen ein Link ist)
    const extracted = await extractJobTextFromInput(jobText);
    const effectiveJobText = extracted.jobText;

    if (!effectiveJobText || effectiveJobText.trim().length < 200) {
      const url = extracted.sourceUrl;
      const extraHint =
        url && url.includes('linkedin.com/jobs/search')
          ? ' Tipp: Bei LinkedIn bitte den direkten Job-Link (…/jobs/view/123456/) oder den Text aus der Stellenanzeige einfügen (nicht die Suchseite).'
          : '';

      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error:
            'Konnte die Stellenanzeige nicht zuverlässig auslesen. Bitte füge den Text der Stellenanzeige ein (mindestens 200 Zeichen) oder einen direkten Link zur konkreten Stellenanzeige.' +
            extraHint,
        }),
      };
    }

    console.log(`📤 Sende Request an Claude API...`);
    console.log(`   - Job Text Length: ${effectiveJobText.length} chars`);
    if (extracted.sourceUrl) {
      console.log(`   - Source URL: ${extracted.sourceUrl}`);
      console.log(`   - Fetch strategy: ${extracted.sourceStrategy || 'n/a'}`);
    }

    // Claude API initialisieren
    const anthropic = new Anthropic({
      apiKey: apiKey,
    });

    const startTime = Date.now();

    // Claude API Call
    // Haiku 4.5: 3-5x schneller und 10x günstiger als Sonnet
    // Perfekt für Red Flag Teaser (3-5 Red Flags reichen völlig aus)
    const message = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1000,
      messages: [{
        role: 'user',
        content: `${MODUL_0_PROMPT}\n\n${effectiveJobText}`
      }]
    });

    const duration = Date.now() - startTime;
    console.log(`✅ Claude Response erhalten in ${duration} ms`);

    // Extrahiere Text-Content
    const responseText = message.content
      .filter((block: any) => block.type === 'text')
      .map((block: any) => block.text)
      .join('\n');

    console.log(`📝 Response Length: ${responseText.length} chars`);
    console.log('📄 Raw Response (first 500 chars):', responseText.substring(0, 500));

    // Parse Response
    const result = parseClaudeResponse(responseText);
    if (!result.shownRedFlags || result.shownRedFlags.length === 0) {
      return {
        statusCode: 502,
        headers,
        body: JSON.stringify({
          error:
            'Analyse war erfolgreich, aber es konnten keine konkreten Warnsignale extrahiert werden. Bitte versuche es mit einer anderen Stellenanzeige oder füge mehr Text ein.',
        }),
      };
    }

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✅ ERFOLG - Parsed Result:');
    console.log(`   - Total Red Flags: ${result.totalRedFlags}`);
    console.log(`   - Shown Red Flags: ${result.shownRedFlags.length}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    // Return Result
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(result),
    };

  } catch (error: any) {
    console.error('❌ FEHLER:', error);
    console.error('Error Message:', error.message);
    console.error('Error Stack:', error.stack);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Analyse fehlgeschlagen. Bitte versuche es erneut.',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      }),
    };
  }
};

