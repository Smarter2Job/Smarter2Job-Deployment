import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

export default function Faq() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "Ist das ein Abo?",
      answer: "Nein. Alle Pakete sind einmalig. Kein Abo, keine wiederkehrenden Kosten."
    },
    {
      question: "Wie schnell erhalte ich Ergebnisse?",
      answer: "Die Vorschau (bis zu 3 Warnzeichen) erhältst du in 30–60 Sekunden. Komplette Pakete werden innerhalb von 48 Stunden nach Einreichung bearbeitet."
    },
    {
      question: "Warum gibt es die Passungsprüfung erst ab Paket 2?",
      answer: "Weil wir dafür deinen Lebenslauf (und optional Dealbreaker) brauchen. Im Paket 1 analysieren wir nur die Stellenanzeige selbst – ohne dein Profil."
    },
    {
      question: "Versprecht ihr Einladungen?",
      answer: "Nein. Wir liefern Vorbereitung, Klarheit und Passung – keine Einladungsgarantie. Wir können dir helfen, gezielter zu bewerben und besser vorbereitet zu sein. Das Ergebnis liegt letztendlich beim Unternehmen."
    },
    {
      question: "Was bedeutet 'automatische Vorauswahl'?",
      answer: "Viele Unternehmen nutzen Bewerbungssoftware, die Bewerbungen vorab sortiert. Diese Systeme scannen nach bestimmten Schlüsselbegriffen und filtern Bewerbungen, bevor ein Mensch sie sieht. Schlüsselbegriffe und Aufbau deines Lebenslaufs beeinflussen, ob deine Bewerbung durchkommt."
    },
    {
      question: "Kann ich ein Paket später upgraden?",
      answer: "Ja. Wenn du später upgraden willst, rechnen wir deine bisherige Zahlung zu 100% an. Beispiel: Du hast Paket 1 (59€) gekauft und willst auf Paket 2 (149€) upgraden. Du zahlst dann nur noch 90€ (149€ - 59€)."
    },
    {
      question: "Wie funktioniert die Bestellung per E-Mail?",
      answer: "Aktuell läuft die Bestellung per E-Mail. Du schreibst uns eine E-Mail an post@martinbeyer.de mit deinem gewünschten Paket und kurzen Infos zu dir. Wir melden uns binnen 24h mit Bestätigung und weiteren Schritten. Stripe-Integration für direkte Online-Zahlung folgt in Kürze."
    },
    {
      question: "Was passiert mit meinen Daten?",
      answer: "Deine Daten werden vertraulich behandelt und nur für die Bearbeitung deiner Anfrage verwendet. Mehr Informationen findest du in unserer Datenschutzerklärung."
    },
    {
      question: "Kann ich mehrere Stellen gleichzeitig prüfen lassen?",
      answer: "Im Paket 1 (Stellencheck) kannst du 3 Stellenanzeigen prüfen lassen. Im Paket 3 (Bewerbungs-Sprint) kannst du 5 Stellenanzeigen innerhalb von 30 Tagen prüfen lassen. Für mehr Kontingente kannst du uns gerne kontaktieren."
    },
    {
      question: "Was ist, wenn ich mit dem Ergebnis nicht zufrieden bin?",
      answer: "Wir bemühen uns um hohe Qualität. Wenn du mit dem Ergebnis nicht zufrieden bist, melde dich gerne bei uns – wir finden gemeinsam eine Lösung."
    },
    {
      question: "Werden Lebensläufe automatisch generiert?",
      answer: "Nein. Ab Paket 2 erstellen wir einen zugeschnittenen Lebenslauf für die spezifische Stelle – basierend auf deinem bestehenden Lebenslauf. Das ist keine automatische Generierung, sondern eine gezielte Anpassung."
    },
    {
      question: "Kann ich ein Paket auch für eine andere Person bestellen?",
      answer: "Ja, das ist möglich. Gib in der E-Mail einfach an, für wen das Paket ist und ob wir direkt mit dieser Person kommunizieren sollen."
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
            Häufige Fragen
          </h1>
          <p style={{ 
            fontSize: 'clamp(18px, 2vw, 20px)', 
            color: 'var(--text-muted)', 
            maxWidth: '70ch',
            marginLeft: 'auto',
            marginRight: 'auto',
            lineHeight: '1.6'
          }}>
            Hier findest du Antworten auf die häufigsten Fragen zu Smarter2Job.
          </p>
        </div>

        <div className="space-y-4 mb-16">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition">
              <button
                onClick={() => toggleFaq(index)}
                className="w-full px-6 py-5 flex justify-between items-center text-left hover:bg-gray-50 transition rounded-lg"
              >
                <span className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</span>
                <ChevronDown 
                  className={`w-5 h-5 text-gray-500 transition-transform flex-shrink-0 ${
                    openFaq === index ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              {openFaq === index && (
                <div className="px-6 pb-5 text-gray-700 leading-relaxed border-t border-gray-200">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Weitere Hilfe */}
        <div className="bg-gray-50 rounded-xl p-8 text-center mb-16">
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text)' }}>
            Weitere Fragen?
          </h2>
          <p className="text-gray-600 mb-6">
            Schreib uns einfach eine E-Mail an post@martinbeyer.de – wir helfen gerne weiter.
          </p>
          <a
            href="mailto:post@martinbeyer.de?subject=Frage%20zu%20Smarter2Job"
            className="btn btn-primary inline-block"
            style={{ 
              backgroundColor: '#ff6b35',
              textDecoration: 'none'
            }}
          >
            E-Mail schreiben
          </a>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            Bereit zum Starten? Teste Smarter2Job kostenlos – ohne Anmeldung.
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
