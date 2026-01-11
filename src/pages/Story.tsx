import { Link } from 'react-router-dom';
import { Calendar, Target, Lightbulb } from 'lucide-react';

export default function Story() {
  const milestones = [
    {
      year: 'Oktober 2025',
      title: 'Die Idee',
      description: 'Eigene Erfahrungen mit vielen Absagen trotz passender Qualifikation. Frage: Was steht wirklich in Stellenanzeigen?',
      icon: Lightbulb,
    },
    {
      year: 'November 2025',
      title: 'Erste Analysen',
      description: 'Erste Analysen mit Beta-Testern: Warnzeichen, Schlüsselbegriffe, Realismus-Check.',
      icon: Target,
    },
    {
      year: 'Dezember 2025',
      title: 'Smarter2Job entsteht',
      description: 'Automatisierung der Analyse mit KI – von der Idee zum ersten MVP.',
      icon: Calendar,
    },
  ];

  return (
    <div className="min-h-screen bg-white page-content">
      <div className="container-narrow">
        <div className="text-center mb-16">
          <h1 style={{ 
            color: 'var(--text)', 
            marginBottom: '24px',
            fontSize: 'clamp(40px, 5vw, 48px)',
            lineHeight: '1.1'
          }}>
            Unsere Story
          </h1>
          <p style={{ 
            fontSize: 'clamp(18px, 2vw, 20px)', 
            color: 'var(--text-muted)', 
            maxWidth: '70ch',
            marginLeft: 'auto',
            marginRight: 'auto',
            lineHeight: '1.6'
          }}>
            Warum Smarter2Job entstanden ist und was uns antreibt.
          </p>
        </div>

        {/* Gründerstory */}
        <div className="prose prose-lg max-w-none mb-16">
          <div className="bg-gray-50 rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text)' }}>
              Ich saß jahrelang auf der Arbeitgeberseite – und plötzlich auf der anderen.
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Nach vielen Jahren auf der Arbeitgeberseite sitze ich jetzt plötzlich auf der anderen Seite des Tisches.
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Mein Mandat bei Lumenhaus lief aus. Und zum ersten Mal seit Jahren musste ich mich selbst bewerben.
              Ich machte das, was viele machen: Stellen scannen, Anforderungen lesen, Eignung prüfen.
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Und dann fiel mir auf, wie oft sich Bewerben heute anfühlt wie ein Schnellklick.
              Du schickst Bewerbungen raus – und bekommst Absagen zurück.
              Viele Absagen. Und du weißt nicht, warum.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-4" style={{ color: 'var(--text)' }}>
              Der Moment, der alles ausgelöst hat:
            </h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Ich las zwei Beiträge auf LinkedIn, die ich nicht vergessen habe.
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Sabrina schrieb: „Master mit 1,4. 400+ Bewerbungen. 3 Gespräche. 0 Angebote."
              Und eine andere Bewerberin schrieb, sie habe abends um 21:00 Uhr ihre Bewerbung abgeschickt – voller Hoffnung – und morgens um 6:30 Uhr schon die Absage bekommen.
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Mein erster Gedanke war reflexartig:
              „Klar, du bist vom ATS rausgekickt worden. Das weiß man doch."
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Kurze Pause.
              Und dann kam der zweite Gedanke:
              Moment mal. Das weiß nicht jeder. Wahrscheinlich wissen es die wenigsten.
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              ATS bedeutet: Viele Bewerbungen werden zuerst von Systemen vorsortiert, bevor überhaupt ein Mensch sie sieht.
              Und wenn die Begriffe fehlen, die das System „erkennt", bist du raus – egal wie gut du bist.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-4" style={{ color: 'var(--text)' }}>
              Warum das so frustrierend ist:
            </h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Mehr Schnellbewerbungen lösen das Problem nicht.
              Sie erzeugen nur mehr Absagen – und damit mehr Zweifel.
              Nicht, weil du schlechter bist. Sondern weil du ohne Klarheit spielst.
            </p>

            <div className="card-callout my-6">
              <p className="text-gray-700 mb-3 leading-relaxed font-medium">
                Was wäre, wenn Bewerber vor dem Absenden wüssten, woran es wirklich hängt?
                Was wäre, wenn sie Stellenanzeigen „lesen" könnten – inklusive Warnsignalen, versteckten Anforderungen und den Begriffen, nach denen Systeme sortieren?
              </p>
              <p className="text-gray-700 mb-0 leading-relaxed font-medium">
                Denn Stellenanzeigen sind selten ehrlich: oft ist es Hochglanz-Kommunikation – nicht der echte Arbeitsalltag.
                Wie wäre es, wenn Bewerber hinter diese Kulissen schauen könnten?
                Und was wäre, wenn man dadurch früher entscheiden kann: passt das wirklich – oder kostet mich diese Bewerbung nur Zeit und Nerven?
              </p>
            </div>

            <h3 className="text-xl font-semibold mt-6 mb-4" style={{ color: 'var(--text)' }}>
              Wie Smarter2Job entstanden ist:
            </h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Auf einer Fahrt nach Düsseldorf (viel Zeit zum Denken) begann ich, mir mein eigenes System zu bauen.
              Erst nur für mich – damit ich schneller erkenne:
              Welche Stelle passt wirklich?
              Wo sind Warnsignale?
              Welche Begriffe sind entscheidend?
              Und wie muss ein Lebenslauf formuliert sein, damit er nicht aussortiert wird, bevor ihn ein Mensch sieht?
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Dann wurde mir klar:
              Dieses System hätte nicht nur mir geholfen.
              Es hätte auch diesen Bewerberinnen geholfen – bevor die nächste Absage kommt.
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Und genau daraus ist Smarter2Job entstanden.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-4" style={{ color: 'var(--text)' }}>
              Wofür Smarter2Job da ist:
            </h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Smarter2Job hilft Bewerbern, sich besser, gezielter und klarer vorzubereiten.
              Nicht mehr Bewerbungen. Sondern bessere.
              Bewerbungen, die zu dir passen – und die so formuliert sind, dass sie eine echte Chance bekommen.
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Bewerben ist kein Swipe. Es ist ein wichtiges Karrieredate – und Vorbereitung ist der Unterschied.
            </p>

            <p className="text-gray-600 text-sm italic mt-6">
              — Martin Beyer, Gründer von Smarter2Job
            </p>
          </div>
        </div>

        {/* Timeline / Meilensteine */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: 'var(--text)' }}>
            Meilensteine
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {milestones.map((milestone, index) => {
              const Icon = milestone.icon;
              return (
                <div key={index} className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#0a4f5c' }}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-500">{milestone.year}</div>
                      <h3 className="text-lg font-bold" style={{ color: 'var(--text)' }}>
                        {milestone.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gray-50 rounded-xl p-8 text-center">
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
