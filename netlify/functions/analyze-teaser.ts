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

// Hilfsfunktion: Response parsen
function parseClaudeResponse(response: string): AnalysisResult {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📝 Parse Claude Response...');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  
  const lines = response.split('\n').filter(line => line.trim());
  
  // Extrahiere Gesamt-Anzahl
  const gesamtLine = lines.find(line => line.startsWith('GESAMT:'));
  const totalRedFlags = gesamtLine 
    ? parseInt(gesamtLine.replace('GESAMT:', '').trim()) 
    : 4; // Fallback

  console.log(`✅ Total Red Flags: ${totalRedFlags}`);

  const redFlags: RedFlag[] = [];
  let currentFlag: Partial<RedFlag> | null = null;

  // Parse Red Flags
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith('RED FLAG')) {
      // Speichere vorherige Flag, falls vorhanden
      if (currentFlag && currentFlag.title && currentFlag.originalText && currentFlag.meaning && currentFlag.risk) {
        redFlags.push(currentFlag as RedFlag);
      }
      
      // Neue Flag starten
      const title = line.replace(/RED FLAG \d+:\s*/i, '').trim();
      currentFlag = { 
        title,
        originalText: '',
        meaning: '',
        risk: 'MITTEL',
        riskColor: 'yellow'
      };
    } else if (line.startsWith('WAS DA STEHT:') && currentFlag) {
      currentFlag.originalText = line.replace('WAS DA STEHT:', '').trim();
    } else if (line.startsWith('WAS ES BEDEUTET:') && currentFlag) {
      currentFlag.meaning = line.replace('WAS ES BEDEUTET:', '').trim();
    } else if (line.startsWith('RISIKO:') && currentFlag) {
      const risk = line.replace('RISIKO:', '').trim() as RedFlag['risk'];
      currentFlag.risk = risk;
      
      // Setze Farbe basierend auf Risiko
      if (risk === 'SEHR HOCH' || risk === 'HOCH') {
        currentFlag.riskColor = 'red';
      } else if (risk === 'MITTEL') {
        currentFlag.riskColor = 'yellow';
      } else {
        currentFlag.riskColor = 'green';
      }
    }
  }

  // Speichere letzte Flag
  if (currentFlag && currentFlag.title && currentFlag.originalText && currentFlag.meaning && currentFlag.risk) {
    redFlags.push(currentFlag as RedFlag);
  }

  console.log(`✅ Parsed ${redFlags.length} Red Flags`);

  // Extrahiere Teaser-Text
  const teaserLine = lines.find(line => line.startsWith('TEASER:'));
  const teaserText = teaserLine 
    ? teaserLine.replace('TEASER:', '').trim()
    : `Es gibt noch ${totalRedFlags - redFlags.length} weitere versteckte Warnsignale in dieser Stelle.`;

  return {
    totalRedFlags,
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

    if (!jobText || jobText.trim().length < 50) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          error: 'Job-Beschreibung zu kurz. Bitte füge mindestens 50 Zeichen ein.' 
        }),
      };
    }

    console.log(`📤 Sende Request an Claude API...`);
    console.log(`   - Job Text Length: ${jobText.length} chars`);

    // Claude API initialisieren
    const anthropic = new Anthropic({
      apiKey: apiKey,
    });

    const startTime = Date.now();

    // Claude API Call
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      messages: [{
        role: 'user',
        content: `${MODUL_0_PROMPT}\n\n${jobText}`
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

    // Parse Response
    const result = parseClaudeResponse(responseText);

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

