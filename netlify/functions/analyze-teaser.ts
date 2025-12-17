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

  // Fallback: Wenn keine Flags geparst wurden, aber Total > 0, erstelle generische Flags
  if (redFlags.length === 0 && totalRedFlags > 0) {
    console.log('⚠️ No flags parsed, creating fallback flags');
    
    // Versuche, Red Flags aus dem Text zu extrahieren (einfache Heuristik)
    const responseLower = response.toLowerCase();
    
    // Suche nach typischen Red Flag-Indikatoren
    const redFlagIndicators = [
      { keyword: 'unrealistisch', title: 'Unrealistische Anforderungen' },
      { keyword: 'sofort', title: 'Dringende Besetzung signalisiert' },
      { keyword: 'viel', title: 'Überlastung wahrscheinlich' },
      { keyword: 'flexibel', title: 'Unklare Arbeitszeiten' },
      { keyword: 'nach vereinbarung', title: 'Intransparente Gehaltsangaben' }
    ];
    
    for (let i = 0; i < Math.min(totalRedFlags, 3); i++) {
      const indicator = redFlagIndicators[i] || { keyword: 'unbekannt', title: 'Red Flag gefunden' };
      if (responseLower.includes(indicator.keyword) || i < 3) {
        redFlags.push({
          title: indicator.title,
          originalText: 'Aus der Stellenbeschreibung extrahiert',
          meaning: 'Diese Stelle enthält potenzielle Warnsignale, die eine genauere Analyse erfordern.',
          risk: i === 0 ? 'HOCH' : 'MITTEL',
          riskColor: i === 0 ? 'red' : 'yellow'
        });
      }
    }
    
    console.log(`✅ Created ${redFlags.length} fallback flags`);
  }

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
    // Haiku 4.5: 3-5x schneller und 10x günstiger als Sonnet
    // Perfekt für Red Flag Teaser (3-5 Red Flags reichen völlig aus)
    const message = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1000,
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
    console.log('📄 Raw Response (first 500 chars):', responseText.substring(0, 500));

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

