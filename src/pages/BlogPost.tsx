import { useParams, Link } from 'react-router-dom';
import { Calendar, Tag, ArrowLeft } from 'lucide-react';

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  content: string;
}

const blogPosts: Record<string, BlogPost> = {
  'warnzeichen-in-stellenanzeigen': {
    slug: 'warnzeichen-in-stellenanzeigen',
    title: 'Die 5 häufigsten Warnzeichen in Stellenanzeigen',
    date: '2024-12-15',
    summary: 'Welche Formulierungen sollten dich aufhorchen lassen? Wir zeigen die häufigsten Red Flags und was sie wirklich bedeuten.',
    tags: ['Warnzeichen', 'Tipps'],
    content: `
      Stellenanzeigen sind nicht immer so, wie sie scheinen. Viele enthalten versteckte Hinweise, die auf Probleme hindeuten können. Hier sind die 5 häufigsten Warnzeichen:

      ## 1. Unrealistische Anforderungen

      Wenn eine Stelle 10+ Jahre Erfahrung in einer Technologie verlangt, die erst 5 Jahre existiert, ist das ein klares Warnzeichen. Oft bedeutet das: Die Anforderungen sind nicht realistisch – oder die Stelle existiert so gar nicht.

      ## 2. Vage Formulierungen

      "Rockstar", "Ninja", "100% commitment" – diese Begriffe klingen cool, bedeuten aber oft: Überstunden, hoher Druck, wenig Work-Life-Balance.

      ## 3. "Familienatmosphäre"

      Klingt nett, kann aber bedeuten: Keine klaren Strukturen, alle machen alles, hohe Erwartungen an Engagement außerhalb der Arbeitszeit.

      ## 4. Sehr niedriges Gehaltsband

      Wenn das Gehaltsband deutlich unter dem Marktdurchschnitt liegt, ist das oft ein Zeichen dafür, dass das Unternehmen nicht bereit ist, angemessen zu bezahlen.

      ## 5. Keine klaren Informationen

      Wenn die Stellenanzeige vage bleibt, was genau die Tätigkeit ist, oder wichtige Informationen fehlen, ist das ebenfalls ein Warnzeichen.

      Fazit: Nicht jedes Warnzeichen bedeutet automatisch "Finger weg". Aber sie sollten dich aufhorchen lassen und dazu führen, dass du nachfragst oder die Stelle genauer prüfst.
    `,
  },
  'schluesselbegriffe-im-lebenslauf': {
    slug: 'schluesselbegriffe-im-lebenslauf',
    title: 'Schlüsselbegriffe im Lebenslauf: So platzierst du sie richtig',
    date: '2024-12-10',
    summary: 'Nicht nur die Begriffe zählen, sondern auch wo sie stehen. Strategische Platzierung für bessere Sichtbarkeit bei automatischer Vorauswahl.',
    tags: ['Lebenslauf', 'Schlüsselbegriffe'],
    content: `
      Viele Unternehmen nutzen Software zur automatischen Vorauswahl von Bewerbungen. Diese Systeme scannen nach bestimmten Schlüsselbegriffen. Aber nicht nur die Begriffe selbst zählen – auch wo sie stehen, ist wichtig.

      ## Must-Have Begriffe

      Diese Begriffe müssen im Lebenslauf stehen, sonst wird die Bewerbung oft automatisch aussortiert. Sie sollten prominent platziert werden – nicht nur am Ende.

      ## Strategische Platzierung

      - **Oben im Lebenslauf:** Die wichtigsten Begriffe sollten bereits im ersten Drittel des Lebenslaufs vorkommen.
      - **In der Zusammenfassung:** Wenn du eine Zusammenfassung hast, sollten die wichtigsten Begriffe dort stehen.
      - **Im Kontext:** Begriffe sollten in einem sinnvollen Kontext stehen, nicht nur als Liste.

      ## Nice-to-Have Begriffe

      Diese Begriffe erhöhen die Relevanz, sind aber nicht zwingend erforderlich. Sie können weiter unten im Lebenslauf stehen.

      Fazit: Die richtige Platzierung von Schlüsselbegriffen kann den Unterschied machen, ob deine Bewerbung gesehen wird oder nicht.
    `,
  },
  'realismus-check': {
    slug: 'realismus-check',
    title: 'Realismus-Check: Wann ist eine Stelle wirklich passend?',
    date: '2024-12-05',
    summary: 'Wie du einschätzt, ob die Anforderungen realistisch sind – oder ob die Stelle vielleicht nicht zu dir passt.',
    tags: ['Passung', 'Bewerbung'],
    content: `
      Nicht jede Stelle ist wirklich passend – auch wenn sie auf den ersten Blick gut klingt. Ein Realismus-Check hilft dir, das zu erkennen.

      ## Anforderungen prüfen

      Wenn eine Stelle deutlich mehr Erfahrung verlangt, als du hast, ist das nicht automatisch ein Grund, sich nicht zu bewerben. Aber es ist wichtig, realistisch einzuschätzen, ob die Erwartungen realistisch sind.

      ## Überqualifikation

      Manchmal bist du vielleicht auch überqualifiziert. Das kann genauso problematisch sein wie Unterqualifikation – besonders, wenn die Stelle deutlich unter deinem Niveau liegt.

      ## Passung prüfen

      Ein Realismus-Check hilft dir, die Passung zwischen dir und der Stelle einzuschätzen. Smarter2Job unterstützt dich dabei mit einer klaren Bewertung: A (gut passend), B (passend mit Einschränkungen), C (weniger passend).

      Fazit: Ein Realismus-Check hilft dir, gezielter zu bewerben und Zeit zu sparen.
    `,
  },
  'automatische-vorauswahl-verstehen': {
    slug: 'automatische-vorauswahl-verstehen',
    title: 'Automatische Vorauswahl verstehen: So funktioniert sie',
    date: '2024-11-28',
    summary: 'Viele Unternehmen nutzen Software zur Vorauswahl. Wir erklären, wie das funktioniert und was du beachten solltest.',
    tags: ['Vorauswahl', 'Bewerbungsprozess'],
    content: `
      Viele Unternehmen nutzen Software zur automatischen Vorauswahl von Bewerbungen. Wie funktioniert das und was bedeutet das für dich?

      ## Wie funktioniert automatische Vorauswahl?

      Software scannt Bewerbungen nach bestimmten Schlüsselbegriffen. Fehlen wichtige Begriffe, wird die Bewerbung oft automatisch aussortiert – bevor ein Mensch sie sieht.

      ## Was bedeutet das für dich?

      - Wichtige Begriffe müssen im Lebenslauf stehen
      - Die Platzierung der Begriffe ist wichtig
      - Nicht nur die Begriffe zählen, sondern auch der Kontext

      ## Wie hilft Smarter2Job?

      Wir identifizieren wichtige Schlüsselbegriffe in Stellenanzeigen und zeigen dir, welche in deinem Lebenslauf fehlen – und wo sie am besten platziert werden sollten.

      Fazit: Automatische Vorauswahl ist Realität. Mit der richtigen Vorbereitung kommst du durch.
    `,
  },
  'gezielt-bewerben': {
    slug: 'gezielt-bewerben',
    title: 'Gezielt bewerben statt breit streuen: Warum weniger mehr ist',
    date: '2024-11-20',
    summary: 'Masse statt Klasse funktioniert nicht. Warum gezielte Bewerbungen mit besserer Passung erfolgreicher sind.',
    tags: ['Bewerbungsstrategie', 'Tipps'],
    content: `
      Viele Bewerber senden Dutzende von Bewerbungen raus – in der Hoffnung, dass schon etwas dabei sein wird. Aber funktioniert das wirklich?

      ## Warum gezielte Bewerbungen besser sind

      - Bessere Passung = höhere Erfolgschance
      - Weniger Zeitverschwendung
      - Qualität statt Quantität
      - Fokussierte Vorbereitung

      ## Wie findest du die richtigen Stellen?

      - Prüfe die Passung im Vorfeld
      - Identifiziere Warnzeichen
      - Checke die Realität der Anforderungen
      - Nur bewerben, wenn es wirklich passt

      Fazit: Eine gezielte Bewerbung mit guter Passung ist erfolgreicher als 10 blinde Bewerbungen.
    `,
  },
  'dealbreaker-erkennen': {
    slug: 'dealbreaker-erkennen',
    title: 'Dealbreaker erkennen: Wann solltest du dich nicht bewerben?',
    date: '2024-11-15',
    summary: 'Nicht jede Stelle ist es wert. Wir zeigen, welche Anzeichen auf echte Dealbreaker hindeuten.',
    tags: ['Warnzeichen', 'Bewerbungsentscheidung'],
    content: `
      Nicht jede Stelle ist es wert, sich zu bewerben. Einige Anzeichen sind klare Dealbreaker – und du solltest sie erkennen.

      ## Was sind Dealbreaker?

      Dealbreaker sind Anforderungen oder Bedingungen, die für dich nicht akzeptabel sind. Beispiele:
      - Unrealistische Gehaltsvorstellungen
      - Fehlende Work-Life-Balance
      - Toxische Unternehmenskultur
      - Große Diskrepanz zwischen Anforderungen und Realität

      ## Wie erkennst du Dealbreaker?

      Warnzeichen in Stellenanzeigen können auf Dealbreaker hindeuten. Smarter2Job hilft dir, diese zu identifizieren.

      Fazit: Nicht jede Stelle ist es wert. Erkenne Dealbreaker frühzeitig und spare dir Zeit und Energie.
    `,
  },
  'lebenslauf-optimieren': {
    slug: 'lebenslauf-optimieren',
    title: 'Lebenslauf optimieren: 5 Tipps für bessere Passung',
    date: '2024-11-10',
    summary: 'Wie du deinen Lebenslauf auf eine spezifische Stelle zuschneidest – ohne zu lügen.',
    tags: ['Lebenslauf', 'Optimierung'],
    content: `
      Ein generischer Lebenslauf funktioniert nicht. Du musst ihn auf die spezifische Stelle zuschneiden – aber ohne zu lügen.

      ## 5 Tipps für bessere Passung

      1. **Wichtige Begriffe prominent platzieren** – Nicht nur am Ende, sondern bereits im ersten Drittel.
      2. **Relevante Erfahrungen hervorheben** – Was passt zur Stelle? Das sollte sichtbar sein.
      3. **Kontext geben** – Nicht nur Begriffe auflisten, sondern im Kontext erklären.
      4. **Reihenfolge anpassen** – Die relevanteste Erfahrung zuerst.
      5. **Anforderungen berücksichtigen** – Wenn eine Stelle bestimmte Skills verlangt, sollten diese sichtbar sein.

      Fazit: Ein zugeschnittener Lebenslauf zeigt, dass du dich wirklich für die Stelle interessierst.
    `,
  },
  'gehaltsband-indikation': {
    slug: 'gehaltsband-indikation',
    title: 'Gehaltsband-Indikation: So liest du Gehaltsangaben in Stellenanzeigen',
    date: '2024-11-05',
    summary: 'Gehaltsangaben in Stellenanzeigen richtig interpretieren und realistische Erwartungen setzen.',
    tags: ['Gehalt', 'Verhandlung'],
    content: `
      Gehaltsangaben in Stellenanzeigen sind oft nicht so eindeutig, wie sie scheinen. Wie liest du sie richtig?

      ## Was bedeuten Gehaltsbänder?

      - Das untere Ende ist meist das tatsächlich Zahlbare
      - Das obere Ende ist oft für Kandidaten mit perfektem Profil
      - Realistisch ist oft der mittlere Bereich

      ## Was bedeutet "nach Vereinbarung"?

      Oft bedeutet das: Das Budget ist niedrig, und sie hoffen, dass du weniger verlangst. Vorsicht ist geboten.

      ## Wie setzt du realistische Erwartungen?

      - Recherchiere Marktwerte
      - Berücksichtige deine Erfahrung
      - Prüfe, ob das Gehaltsband zur Stelle passt

      Fazit: Gehaltsangaben richtig lesen hilft dir, realistische Erwartungen zu setzen.
    `,
  },
};

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? blogPosts[slug] : null;

  if (!post) {
    return (
      <div className="min-h-screen bg-white page-content">
        <div className="container-narrow text-center">
          <h1 className="text-3xl font-bold mb-4">Post nicht gefunden</h1>
          <Link to="/blog" className="text-[#ff6b35] hover:underline">
            ← Zurück zum Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white page-content">
      <div className="container-narrow">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-[#ff6b35] mb-8 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Zurück zum Blog
        </Link>

        <article className="mb-16">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Calendar className="w-4 h-4" />
            <span>{new Date(post.date).toLocaleDateString('de-DE', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>

          <h1 className="text-4xl font-bold mb-6" style={{ color: 'var(--text)' }}>
            {post.title}
          </h1>

          <div className="flex flex-wrap gap-2 mb-8">
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

          <div className="text-gray-700 leading-relaxed whitespace-pre-line" style={{ maxWidth: '70ch' }}>
            {post.content.trim()}
          </div>
        </article>

        {/* CTA */}
        <div className="bg-gray-50 rounded-xl p-8 text-center mt-16">
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
