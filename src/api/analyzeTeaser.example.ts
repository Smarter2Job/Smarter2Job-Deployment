/**
 * BEISPIEL-API-ROUTE für Warnsignale Teaser
 * 
 * Diese Datei zeigt, wie die Backend-API aussehen sollte.
 * 
 * Für Vite/React: Diese Route muss auf einem separaten Backend-Server laufen
 * (z.B. Express.js, Next.js API Routes, oder Serverless Functions)
 * 
 * ODER: Nutze einen API-Proxy in vite.config.ts
 */

import Anthropic from '@anthropic-ai/sdk';

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

// Modul 0 Prompt (Warnsignale Teaser)
const MODUL_0_PROMPT = `# MODUL 0: Freemium-Teaser "Erste Karte aufdecken"

## ROLLE
Du bist ein erfahrener Recruiting-Analyst, der schnell die größten Warnsignale in Stellenbeschreibungen erkennt.

## AUFGABE
Analysiere die folgende Stellenbeschreibung und identifiziere die **3-5 auffälligsten Warnsignale**. Dies ist ein kostenloser Teaser – gib genug Mehrwert, um Interesse zu wecken, aber zeige auch, dass es noch viel mehr zu entdecken gibt.

## ANALYSE-FRAMEWORK

### 1. TOP 3-5 WARNSIGNALE

Identifiziere die **3-5 auffälligsten Warnsignale** und erkläre sie kurz.

**Format:**

🔴 **[Warnsignal 1: Kurzer Titel]**
- **Was da steht:** "[Originalformulierung aus Job-Description]"
- **Was es bedeutet:** [1-2 Sätze Erklärung]
- **Risiko:** [SEHR HOCH / HOCH / MITTEL / NIEDRIG]

🔴 **[Warnsignal 2: Kurzer Titel]**
- **Was da steht:** "[Originalformulierung]"
- **Was es bedeutet:** [1-2 Sätze]
- **Risiko:** [SEHR HOCH / HOCH / MITTEL / NIEDRIG]

🔴 **[Warnsignal 3: Kurzer Titel]**
- **Was da steht:** "[Originalformulierung]"
- **Was es bedeutet:** [1-2 Sätze]
- **Risiko:** [SEHR HOCH / HOCH / MITTEL / NIEDRIG]

*(Optional: 4. und 5. Warnsignal, falls relevant)*

### 2. GESAMT-WARNSIGNALE-ZAHL

Gib die **Gesamtzahl der identifizierten Warnsignale** an (auch die, die du nicht im Detail zeigst).
Format: "GESAMT: [Zahl] Warnsignale"

### 3. TEASER-TEXT

Schreibe einen kurzen Teaser (1-2 Sätze), der Lust auf die Vollanalyse macht.

## TONALITÄT

- **Knackig & direkt** (keine langen Texte)
- **Aufmerksamkeitsstark** (triggert Neugier)
- **Ehrlich** (zeigt echten Mehrwert, kein Clickbait)

## OUTPUT-FORMAT

Antworte AUSSCHLIESSLICH in folgendem Format:

GESAMT: [Zahl]

WARNSIGNAL 1: [Titel]
WAS DA STEHT: [Original-Zitat]
WAS ES BEDEUTET: [Erklärung]
RISIKO: [SEHR HOCH/HOCH/MITTEL/NIEDRIG]

WARNSIGNAL 2: [Titel]
WAS DA STEHT: [Original-Zitat]
WAS ES BEDEUTET: [Erklärung]
RISIKO: [SEHR HOCH/HOCH/MITTEL/NIEDRIG]

WARNSIGNAL 3: [Titel]
WAS DA STEHT: [Original-Zitat]
WAS ES BEDEUTET: [Erklärung]
RISIKO: [SEHR HOCH/HOCH/MITTEL/NIEDRIG]

TEASER: [1-2 Sätze für Upsell]

---

JETZT ANALYSIERE DIESE STELLENBESCHREIBUNG:`;

// Hilfsfunktion: Response parsen
function parseClaudeResponse(response: string): AnalysisResult {
  const lines = response.split('\n').filter(line => line.trim());
  
  // Extrahiere Gesamt-Anzahl
  const gesamtLine = lines.find(line => line.startsWith('GESAMT:'));
  const totalRedFlags = gesamtLine 
    ? parseInt(gesamtLine.replace('GESAMT:', '').trim()) 
    : 4; // Fallback

  const redFlags: RedFlag[] = [];
  let currentFlag: Partial<RedFlag> | null = null;

  // Parse Warnsignale
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith('WARNSIGNAL')) {
      // Speichere vorherige Flag, falls vorhanden
      if (currentFlag && currentFlag.title && currentFlag.originalText && currentFlag.meaning && currentFlag.risk) {
        redFlags.push(currentFlag as RedFlag);
      }
      
      // Neue Flag starten
      const title = line.replace(/WARNSIGNAL \d+:\s*/i, '').trim();
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

// Main API Handler (für Express.js / Next.js API Routes)
export async function analyzeTeaser(jobText: string): Promise<AnalysisResult> {
  if (!jobText || jobText.trim().length < 50) {
    throw new Error('Job-Beschreibung zu kurz. Bitte füge mindestens 50 Zeichen ein.');
  }

  // Claude API initialisieren
  const anthropic = new Anthropic({
    apiKey: process.env.CLAUDE_API_KEY || process.env.ANTHROPIC_API_KEY || '',
  });

  if (!anthropic.apiKey) {
    throw new Error('Claude API Key nicht konfiguriert');
  }

  // Claude API Call
  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 2000,
    messages: [{
      role: 'user',
      content: `${MODUL_0_PROMPT}\n\n${jobText}`
    }]
  });

  // Extrahiere Text-Content
  const responseText = message.content
    .filter((block: any) => block.type === 'text')
    .map((block: any) => block.text)
    .join('\n');

  // Parse Response
  const result = parseClaudeResponse(responseText);

  return result;
}

// Beispiel für Express.js Route:
/*
import express from 'express';
import { analyzeTeaser } from './analyzeTeaser';

const router = express.Router();

router.post('/api/analyze-teaser', async (req, res) => {
  try {
    const { jobText } = req.body;
    const result = await analyzeTeaser(jobText);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});
*/





