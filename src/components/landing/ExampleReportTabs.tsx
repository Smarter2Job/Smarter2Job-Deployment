import { useState } from 'react';
import { Lock } from 'lucide-react';

export default function ExampleReportTabs() {
  const [activeTab, setActiveTab] = useState<'warnsignale' | 'schluesselbegriffe' | 'realismus'>('warnsignale');

  const scrollToId = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.location.href = 'mailto:post@martinbeyer.de?subject=Stellencheck%20anfragen&body=Hallo,%0A%0Aich%20möchte%20den%20Stellencheck%20nutzen.%0A%0AStellenlink:%20%5Bbitte%20einfügen%5D%0A%0AVielen%20Dank!';
    }
  };

  const tabs = {
    warnsignale: {
      items: [
        "Unterbesetzung / 'selbstständig arbeiten'",
        "Widersprüche in Seniorität vs. Aufgaben",
        "Unklare Ziele / keine Erfolgskennzahlen",
        "Weitere Warnsignale anzeigen …"
      ]
    },
    schluesselbegriffe: {
      items: [
        "Must-have Begriffe aus der Anzeige (für die Vorauswahl)",
        "Fehlende Begriffe in deinem Profil (Gap)",
        "Wo du sie sinnvoll platzierst (ohne Keyword-Stuffing)",
        "Alle Schlüsselbegriffe im Stellencheck …"
      ]
    },
    realismus: {
      items: [
        "Was ist wirklich Kernaufgabe – was 'nice-to-have'?",
        "Welche Erwartungen sind messbar, welche nur Buzzwords?",
        "Wo ist die Lernkurve realistisch – wo nicht?",
        "Kompletten Report im Stellencheck …"
      ]
    }
  };

  const currentItems = tabs[activeTab].items;
  const visibleItems = currentItems.slice(0, 3);
  const lockedItem = currentItems[3];

  return (
    <section id="beispielreport" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--text)' }}>
            So sieht ein Ergebnis aus
          </h2>
          <p className="text-gray-600">
            Klick dich durch ein Beispiel. Kurz, klar, ohne Floskeln.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex justify-center gap-2 mb-8 flex-wrap">
            <button
              onClick={() => setActiveTab('warnsignale')}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                activeTab === 'warnsignale'
                  ? 'bg-[#ff6b35] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Warnsignale
            </button>
            <button
              onClick={() => setActiveTab('schluesselbegriffe')}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                activeTab === 'schluesselbegriffe'
                  ? 'bg-[#ff6b35] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Schlüsselbegriffe
            </button>
            <button
              onClick={() => setActiveTab('realismus')}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                activeTab === 'realismus'
                  ? 'bg-[#ff6b35] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Realismus-Check
            </button>
          </div>

          <div className="space-y-3">
            {visibleItems.map((item, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
            
            <button
              onClick={() => scrollToId('pakete')}
              className="w-full flex items-center gap-3 p-4 bg-gray-100 rounded-lg opacity-60 hover:opacity-80 transition cursor-pointer border-2 border-dashed border-gray-300"
            >
              <Lock className="w-5 h-5 text-gray-500 flex-shrink-0" />
              <span className="text-gray-600">{lockedItem}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
