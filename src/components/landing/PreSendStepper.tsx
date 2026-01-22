import { useState, useEffect, useRef } from 'react';

export default function PreSendStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];

  const scrollToId = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      // Fallback to pricing page if no element found
      window.location.href = '/preise';
    }
  };

  useEffect(() => {
    const observers = stepRefs.map((ref, index) => {
      if (!ref.current) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
              setActiveStep(index);
            }
          });
        },
        { threshold: 0.5 }
      );

      observer.observe(ref.current);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, []);

  const steps = [
    {
      title: 'Stelle verstehen',
      items: [
        'Warnsignale erkennen',
        'Realismus prüfen',
        'Schlüsselbegriffe sichtbar machen'
      ]
    },
    {
      title: 'Passung prüfen',
      items: [
        'Ab Paket 2: Passung auf Basis deines Lebenslaufs',
        'Dealbreaker berücksichtigen (optional)',
        'Empfehlung: bewerben / lassen (mit Begründung)'
      ]
    },
    {
      title: 'Bewerbung stimmig machen',
      items: [
        'Lebenslauf je Stelle passend ausrichten',
        'Profil/Positionierung schärfen (optional)',
        'Vor dem Absenden: stimmig, klar, sichtbar'
      ]
    }
  ];

  return (
    <section id="vor-dem-absenden" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--text)' }}>
            Dein Weg vor dem Absenden
          </h2>
          <p className="text-gray-600">
            Drei Schritte. Mehr Klarheit. Bessere Entscheidungen.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Sticky Stepper (Desktop) / Pills (Mobile) */}
          <div className="md:sticky md:top-24 md:h-fit">
            <div className="md:hidden flex gap-2 mb-8 flex-wrap justify-center">
              {steps.map((step, index) => (
                <button
                  key={index}
                  onClick={() => {
                    stepRefs[index].current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm transition ${
                    activeStep === index
                      ? 'bg-[#ff6b35] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {index + 1}. {step.title}
                </button>
              ))}
            </div>

            <div className="hidden md:block space-y-6">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg transition ${
                    activeStep === index
                      ? 'bg-[#ff6b35] text-white'
                      : 'bg-gray-50 text-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                        activeStep === index
                          ? 'bg-white text-[#ff6b35]'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {index + 1}
                    </div>
                    <h3 className="font-bold">{step.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Content Cards */}
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div
                key={index}
                ref={stepRefs[index]}
                className="bg-white rounded-xl shadow-md p-8 border border-gray-200"
              >
                <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--text)' }}>
                  {index + 1}. {step.title}
                </h3>
                <ul className="space-y-3">
                  {step.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-3">
                      <span className="text-[#ff6b35] mt-1">•</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button
            onClick={() => scrollToId('hero-demo')}
            className="text-white py-4 px-8 rounded-lg font-semibold text-lg transition"
            style={{
              backgroundColor: '#ff6b35',
              boxShadow: '0 10px 25px rgba(0,0,0,0.15)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#e55a2b';
              e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.2)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#ff6b35';
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
            }}
          >
            Stellencheck starten
          </button>
        </div>
      </div>
    </section>
  );
}
