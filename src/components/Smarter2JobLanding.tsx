import { useState } from 'react';
import { Target, Zap, FileText, Linkedin, CheckCircle, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import RedFlagTeaser from './RedFlagTeaser';

export default function Smarter2JobLanding() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [checklistSubmitted, setChecklistSubmitted] = useState(false);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleChecklistSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as any).toString()
      });
      
      setChecklistSubmitted(true);
      
      // Trigger Download
      window.location.href = '/downloads/CV_Basics_Checkliste.pdf';
      
      // Redirect nach 2 Sekunden
      setTimeout(() => {
        window.location.href = '/danke';
      }, 2000);
      
    } catch (error) {
      alert('Fehler beim Absenden. Bitte versuche es erneut.');
    }
  };

  const faqs = [
    {
      question: "Was ist ein ATS und warum ist das wichtig für meine Bewerbung?",
      answer: "ATS steht für Applicant Tracking System – auf Deutsch: Bewerbungsroboter. Das ist eine Software, die Lebensläufe automatisch nach bestimmten Schlüsselwörtern durchsucht und bewertet, BEVOR ein Mensch sie sieht. Wenn du dich unvorbereitet bewirbst – ohne zu wissen, welche Keywords wichtig sind oder wie du dich richtig positionierst – sortiert der ATS dich aus. Das ist die Folge fehlender Strategie, nicht der Hauptgegner. Smarter2Job hilft dir, strategisch vorzugehen: Du verstehst die Stelle, triffst eine bewusste Entscheidung und übersetzt dann deine Qualifikationen für Mensch und Maschine."
    },
    {
      question: "Was ist ein FIT-Score?",
      answer: "Ein FIT-Score ist die Bewertung deiner Passgenauigkeit aus deinen Skills in Bezug auf die Anforderungen der Stelle, auf die du dich bewerben möchtest."
    },
    {
      question: "Wie funktioniert die KI-Analyse?",
      answer: "Unsere KI analysiert Stellenbeschreibungen auf über 50 Indikatoren: Formulierungsmuster, versteckte Anforderungen, Kultur-Signale und Warnzeichen (Red Flags). Gleichzeitig optimieren wir deinen Lebenslauf (CV) so, dass er ATS - den Bewerbungsroboter - passiert und perfekt auf die Stelle matcht."
    },
    {
      question: "Sind meine Daten sicher?",
      answer: "Absolut. Alle Daten werden verschlüsselt übertragen und gespeichert. Wir verkaufen keine Daten an Dritte. Du kannst deine Daten jederzeit vollständig löschen."
    },
    {
      question: "Kann ich jederzeit kündigen?",
      answer: "Ja, monatlich kündbar ohne Mindestlaufzeit. Bei Unzufriedenheit in den ersten 7 Tagen: volle Rückerstattung, keine Fragen."
    },
    {
      question: "Funktioniert das für alle Branchen?",
      answer: "Ja. Unsere KI ist auf Tech, Finance, Consulting, Healthcare, Marketing und viele weitere Branchen trainiert. Egal ob Startup oder Konzern."
    },
    {
      question: "Was unterscheidet euch von anderen Services?",
      answer: "Wir sind kein Tool für mehr Bewerbungen, sondern ein strategisches System. Wir führen dich Schritt für Schritt durch eine bewusste, messbare und skalierbare Bewerbungsstrategie. Strategie kommt vor Optimierung. Du verstehst zuerst, welche Jobs wirklich zu dir passen, triffst dann bewusste Entscheidungen und optimierst erst danach für Mensch und Maschine."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <a href="#" className="flex items-center">
              <img 
                src="/logo.png" 
                alt="Smarter2Job Logo" 
                className="h-10 w-auto"
                onError={(e) => {
                  // Fallback zu Text, falls Logo nicht gefunden wird
                  e.currentTarget.style.display = 'none';
                  const parent = e.currentTarget.parentElement;
                  if (parent && !parent.querySelector('.logo-fallback')) {
                    const fallback = document.createElement('div');
                    fallback.className = 'logo-fallback text-2xl font-bold text-[#0a4f5c]';
                    fallback.textContent = 'Smarter2Job';
                    parent.appendChild(fallback);
                  }
                }}
              />
            </a>
            <div className="hidden md:flex gap-8">
              <a href="#karten" className="text-gray-600 hover:text-[#0a4f5c] transition">Module</a>
              <a href="#pricing" className="text-gray-600 hover:text-[#0a4f5c] transition">Preise</a>
              <a href="#faq" className="text-gray-600 hover:text-[#0a4f5c] transition">FAQ</a>
              <a href="#checkliste" className="text-gray-600 hover:text-[#0a4f5c] transition font-semibold">
                🎁 Gratis Checkliste
              </a>
            </div>
            <button 
              onClick={() => {
                document.getElementById('red-flag-teaser')?.scrollIntoView({ 
                  behavior: 'smooth',
                  block: 'start'
                });
              }}
              style={{ 
                backgroundColor: '#0a4f5c', 
                color: 'white', 
                padding: '8px 24px', 
                borderRadius: '8px', 
                fontWeight: '500', 
                border: 'none', 
                cursor: 'pointer',
                transition: 'background-color 0.2s',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#083d47')}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#0a4f5c')}
            >
              Strategisch starten
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section - TYP A */}
      <section className="section-hero">
        <div className="container-narrow">
          <div className="text-center">
            <h1 style={{ 
              color: 'var(--text)', 
              marginBottom: '24px',
              fontSize: 'clamp(40px, 5vw, 60px)',
              lineHeight: '1.1'
            }}>
              Bewirb dich <span className="wavy-underline">strategisch</span><br />
              – nicht blind<br />
              <span className="wavy-underline">Gezielter</span> zum <span className="wavy-underline">passenden Job</span>.
            </h1>
            
            <p style={{ 
              fontSize: 'clamp(22px, 2.8vw, 28px)', 
              color: 'var(--text)', 
              marginBottom: '16px',
              fontWeight: 'var(--font-weight-semibold)'
            }}>
              Nicht nur Geschwindigkeit entscheidet.<br />
              Sondern deine Strategie und Passung.
            </p>
            
            <p style={{ 
              fontSize: 'clamp(18px, 2vw, 20px)', 
              color: 'var(--text-muted)', 
              marginBottom: '40px',
              maxWidth: '65ch',
              marginLeft: 'auto',
              marginRight: 'auto',
              lineHeight: '1.6'
            }}>
              Smarter2Job hilft dir, deine Bewerbungen gezielt vorzubereiten<br />
              und klar auf deine Ziele auszurichten.
            </p>
            
            <button 
              onClick={() => {
                document.getElementById('red-flag-teaser')?.scrollIntoView({ 
                  behavior: 'smooth',
                  block: 'start'
                });
              }}
              style={{ 
                backgroundColor: '#ff6b35',
                color: 'white',
                padding: '16px 32px',
                borderRadius: '8px',
                fontSize: '18px',
                fontWeight: '600',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#e55a2b';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.2)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#ff6b35';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Starte deine Bewerbungsstrategie
            </button>
            
            <p style={{ 
              fontSize: '14px',
              color: 'var(--text-muted)',
              marginTop: '16px',
              textAlign: 'center',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}>
              Kein Abo • Keine Logins erforderlich
            </p>
          </div>
        </div>
      </section>

      {/* Problem Section - Frust - TYP B */}
      <section style={{ 
        paddingTop: '80px', 
        paddingBottom: '80px', 
        backgroundColor: '#0f172a'
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
          
          <h2 style={{ 
            fontSize: 'clamp(36px, 4vw, 42px)', 
            fontWeight: 'bold', 
            color: '#ffffff',
            marginBottom: '48px',
            textAlign: 'center'
          }}>
            Warum dein Frust so groß ist
          </h2>

          <div style={{ 
            maxWidth: '800px', 
            margin: '0 auto',
            fontSize: '20px',
            lineHeight: '1.8',
            color: '#e2e8f0'
          }}>
            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '24px' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <span style={{ color: '#10B981', fontSize: '24px', fontWeight: 'bold' }}>+</span>
                <span>Du bewirbst dich</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <span style={{ color: '#10B981', fontSize: '24px', fontWeight: 'bold' }}>+</span>
                <span>Du investierst Zeit</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <span style={{ color: '#10B981', fontSize: '24px', fontWeight: 'bold' }}>+</span>
                <span>Du bleibst dran</span>
              </li>
            </ul>

            <p style={{ marginBottom: '16px', fontSize: '22px', fontWeight: '600' }}>
              Und trotzdem:
            </p>

            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '24px' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <span style={{ color: '#EF4444', fontSize: '24px', fontWeight: 'bold' }}>−</span>
                <span>Absagen</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <span style={{ color: '#EF4444', fontSize: '24px', fontWeight: 'bold' }}>−</span>
                <span>Funkstille</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <span style={{ color: '#EF4444', fontSize: '24px', fontWeight: 'bold' }}>−</span>
                <span>Das Gefühl, im Wettbewerb unterzugehen</span>
              </li>
            </ul>

            <p style={{ 
              marginBottom: '24px',
              paddingLeft: '24px',
              borderLeft: '4px solid #ef4444'
            }}>
              Der Frust entsteht nicht, weil du zu wenig tust.<br />
              Sondern weil das, was du tust, nicht strategisch geplant ist.
            </p>

            <p style={{ marginBottom: '24px' }}>
              Bewerbungen werden schnell abgeschickt –<br />
              ohne klare Passung, ohne Positionierung, ohne System.
            </p>

            <p style={{ 
              fontSize: '22px',
              fontWeight: '600',
              color: '#ffffff',
              marginTop: '32px'
            }}>
              Das Ergebnis ist vorhersehbar:<br />
              Du bekommst mehr Wettbewerb<br />
              und logischerweise viel mehr Absagen.
            </p>
          </div>
        </div>
      </section>

      {/* Portal-Logik + Dating-Analogie */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Portal-Logik Block */}
          <div className="max-w-4xl mx-auto mb-20">
            <div className="text-center mb-12">
              <p style={{ 
                fontSize: 'clamp(24px, 3vw, 28px)',
                fontWeight: 'bold',
                color: '#0a4f5c',
                fontStyle: 'italic',
                marginBottom: '24px'
              }}>
                Ein Klick ist schnell gemacht.<br />
                Eine gute Positionierung nicht.
              </p>
            </div>

            <div style={{ fontSize: '18px', lineHeight: '1.7' }}>
              <p className="text-gray-700 leading-relaxed mb-6">
                Fluch und Segen für dich, gleichzeitig:<br />
                Bewerbungsportale machen es extrem leicht, viele Bewerbungen zu verschicken.<br />
                Was sie fördern, ist Masse – nicht Klasse.
              </p>

              <p className="text-gray-700 leading-relaxed mb-4">
                Sie erhöhen vor allem zwei Dinge:
              </p>
              <ul style={{ listStyle: 'none', padding: 0, marginBottom: '24px' }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '8px' }}>
                  <span style={{ color: '#0a4f5c', fontSize: '18px', marginTop: '4px' }}>•</span>
                  <span className="text-gray-700">den Wettbewerb</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '8px' }}>
                  <span style={{ color: '#0a4f5c', fontSize: '18px', marginTop: '4px' }}>•</span>
                  <span className="text-gray-700">die Anzahl der Absagen</span>
                </li>
              </ul>

              <div className="bg-gray-50 p-6 rounded-lg border-l-4" style={{ borderLeftColor: '#ff6b35', margin: '32px 0' }}>
                <p className="text-gray-800 font-semibold mb-3">
                  Viele Bewerbungen vermitteln Aktivität.
                </p>
                <p className="text-gray-700">
                  In Wahrheit ist es oft wie mit einer Schrotflinte im Nebel:<br />
                  viel Bewegung, wenig Wirkung – und kaum Kontrolle.
                </p>
                <p className="text-gray-700 mt-3">
                  Dein Aufwand ist dennoch hoch –<br />
                  die Trefferquote bleibt niedrig.
                </p>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
                Nicht viele Bewerbungen sind das Problem.<br />
                Schlechte Trefferquoten sind es.
              </h3>

              <p className="text-gray-700 leading-relaxed">
                Wenn der Match von Anfang an gering ist, führt jede zusätzliche Bewerbung vor allem zu einer weiteren Absage.<br />
                Was fehlt, ist nicht Motivation – sondern Strategie vor dem Absenden.
              </p>
            </div>
          </div>

          {/* Dating-Analogie */}
          <div className="max-w-4xl mx-auto">
            <div className="p-10 rounded-xl text-white shadow-xl" style={{
              background: 'linear-gradient(135deg, #0a4f5c 0%, #083d47 100%)'
            }}>
              <h3 className="text-3xl font-bold mb-6" style={{ color: '#ffffff' }}>
                Beim Dating würdest du auch <span className="wavy-underline">nicht unvorbereitet</span> starten.
              </h3>
              
              <p className="text-lg leading-relaxed mb-6" style={{ color: '#e5e7eb' }}>
                Du würdest kein beliebiges Foto wählen, kein austauschbares Profil nutzen und nicht unvorbereitet zu einem wichtigen Date gehen –
              </p>

              <p className="text-lg leading-relaxed mb-6" style={{ color: '#e5e7eb' }}>
                nicht um etwas vorzutäuschen, sondern um <strong>passend wahrgenommen</strong> zu werden.
              </p>

              <div className="border-t pt-6 mt-6" style={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}>
                <p className="text-xl font-semibold mb-3">
                  Genau so funktionieren Bewerbungen.
                </p>
                <p style={{ 
                  color: '#e5e7eb',
                  fontSize: '20px',
                  fontWeight: 600,
                  lineHeight: '1.6'
                }}>
                  <span style={{ fontWeight: 700 }}>Smarter2Job</span> erstellt keine Fake-Profile.<br />
                  Wir helfen dir dabei, dass deine Bewerbungen und dein Profil klar, glaubwürdig und passend zu deinen Wunschstellen ausgerichtet und feinjustiert wird.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Problem Section - Story Cards (behalten, aber kürzen) */}
      <section style={{ 
        backgroundColor: '#2D3748',
        paddingTop: 'var(--section-pad-y)',
        paddingBottom: 'var(--section-pad-y)',
        position: 'relative'
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
          
          {/* Überschrift "Real Stories" */}
          <h2 style={{ 
            color: 'var(--text-on-dark)',
            fontSize: 'clamp(36px, 4vw, 44px)',
            fontWeight: 'var(--font-weight-extrabold)',
            textAlign: 'left',
            marginBottom: '48px',
            lineHeight: '1.1'
          }}>
            Real Stories
          </h2>

          {/* Story Cards - Neu gerahmt */}
          <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            gap: '32px',
            marginBottom: '56px'
          }}>
            
            {/* Sabrina's Story */}
            <div className="card" style={{ 
              backgroundColor: '#ffffff', 
              padding: '32px', 
              borderRadius: 'var(--radius)', 
              borderLeft: '4px solid var(--coral)',
              boxShadow: 'var(--shadow-md)',
              border: '1px solid rgba(255, 107, 74, 0.2)'
            }}>
              <div style={{ marginBottom: '16px' }}>
                <div style={{ 
                  display: 'inline-block',
                  backgroundColor: 'rgba(255, 107, 74, 0.15)',
                  color: 'var(--coral)',
                  padding: '6px 16px',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: 'var(--font-weight-bold)',
                  marginBottom: '12px',
                  letterSpacing: '0.05em',
                  border: '1px solid rgba(255, 107, 74, 0.3)'
                }}>
                  REAL STORY
                </div>
                <h3 style={{ 
                  fontSize: '24px', 
                  fontWeight: 'bold', 
                  color: '#1a1a1a',
                  marginBottom: '16px'
                }}>
                  Sabrina: 400 Bewerbungen. 3 Gespräche. 0 Jobangebote.
                </h3>
              </div>
              <blockquote style={{ 
                borderLeft: '3px solid #0a4f5c',
                paddingLeft: '20px',
                marginBottom: '16px',
                fontStyle: 'italic',
                color: '#4b5563',
                fontSize: '17px',
                lineHeight: '1.7'
              }}>
                "Master mit 1,4. Werkstudentenjobs bei namhaften Unternehmen. Drei Sprachen. Digital-Schwerpunkt. Aber keine 10 Jahre Berufserfahrung mit Tools, die es erst seit 2 gibt? Game Over."
              </blockquote>
              <p style={{ 
                color: '#6b7280', 
                fontSize: '16px',
                lineHeight: '1.6'
              }}>
                Von 400+ Bewerbungen wurde sie von der Hälfte geghostet. Der Rest? Copy-Paste-Absagen. <strong style={{ color: '#1a1a1a' }}>Die Erkenntnis: Sie wusste nicht, welche Jobs wirklich zu ihr passen – und wie sie sich richtig präsentiert.</strong>
              </p>
            </div>

            {/* Marta's Story */}
            <div className="card" style={{ 
              backgroundColor: '#ffffff', 
              padding: '32px', 
              borderRadius: 'var(--radius)', 
              borderLeft: '4px solid var(--coral)',
              boxShadow: 'var(--shadow-md)',
              border: '1px solid rgba(255, 107, 74, 0.2)'
            }}>
              <div style={{ marginBottom: '16px' }}>
                <div style={{ 
                  display: 'inline-block',
                  backgroundColor: 'rgba(255, 107, 74, 0.15)',
                  color: 'var(--coral)',
                  padding: '6px 16px',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: 'var(--font-weight-bold)',
                  marginBottom: '12px',
                  letterSpacing: '0.05em',
                  border: '1px solid rgba(255, 107, 74, 0.3)'
                }}>
                  REAL STORY
                </div>
                <h3 style={{ 
                  fontSize: '24px', 
                  fontWeight: 'bold', 
                  color: '#1a1a1a',
                  marginBottom: '16px'
                }}>
                  Marta: Musste viral gehen, um überhaupt gesehen zu werden.
                </h3>
              </div>
              <p style={{ 
                color: '#4b5563', 
                fontSize: '17px',
                lineHeight: '1.7',
                marginBottom: '16px'
              }}>
                Eine 29-jährige Marketing Managerin aus Madrid. Nach ihrer Entlassung: Dutzende Bewerbungen. Nur automatisierte Ablehnungen. Sie war qualifiziert, motiviert – aber <strong style={{ color: '#1a1a1a' }}>unsichtbar für das System</strong>.
              </p>
              <p style={{ 
                color: '#6b7280', 
                fontSize: '16px',
                lineHeight: '1.6'
              }}>
                Erst als sie ein virales LinkedIn-Video erstellte und 300 Jobangebote bekam, meldeten sich plötzlich die Recruiter, die sie zuvor abgelehnt hatten. <strong style={{ color: '#1a1a1a' }}>Warum? Weil ihr Lebenslauf (CV) am ATS - dem Bewerbungsroboter - gescheitert war, nicht an ihrer Qualifikation.</strong>
              </p>
            </div>

            {/* Die Wahrheit Cards - kompakt - Neu gerahmt */}
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px'
            }}>
              <div className="card" style={{ 
                backgroundColor: '#ffffff', 
                padding: '24px', 
                borderRadius: 'var(--radius)', 
                borderLeft: '4px solid var(--coral)',
                border: '1px solid rgba(255, 107, 74, 0.2)',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <h4 style={{ 
                  fontSize: '18px', 
                  fontWeight: 'var(--font-weight-semibold)', 
                  color: 'var(--text)',
                  marginBottom: '10px'
                }}>
                  10 Jahre Erfahrung in 2-Jahre-alten Tools
                </h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: '1.5' }}>
                  Unrealistische Anforderungen, die nicht immer klar kommuniziert werden – wir helfen dir, sie zu erkennen, bevor du dich bewirbst.
                </p>
              </div>

              <div className="card" style={{ 
                backgroundColor: '#ffffff', 
                padding: '24px', 
                borderRadius: 'var(--radius)', 
                borderLeft: '4px solid var(--coral)',
                border: '1px solid rgba(255, 107, 74, 0.2)',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <h4 style={{ 
                  fontSize: '18px', 
                  fontWeight: 'var(--font-weight-semibold)', 
                  color: 'var(--text)',
                  marginBottom: '10px'
                }}>
                  50% Ghosting-Rate
                </h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: '1.5' }}>
                  Viele Bewerbungen bleiben unbeantwortet. Oft liegt es an fehlender Strategie – wir helfen dir, gezielter zu bewerben.
                </p>
              </div>
            </div>

          </div>

          {/* Der Pivot - Klarheit statt Alarm */}
          <div className="card" style={{
            textAlign: 'center',
            padding: '40px 32px',
            backgroundColor: '#ffffff',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid rgba(255, 107, 74, 0.2)',
            maxWidth: '700px',
            margin: '0 auto',
            boxShadow: 'var(--shadow-md)'
          }}>
            <p style={{
              fontSize: 'clamp(24px, 3vw, 32px)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--text)',
              marginBottom: '16px',
              lineHeight: '1.2'
            }}>
              Stellenanzeigen sind verschleiert.<br/>
              Aber es gibt Methoden, sie zu durchschauen.
            </p>
            <p style={{
              fontSize: '18px',
              color: 'var(--text-muted)',
              marginBottom: '24px'
            }}>
              Du musst nicht viral gehen oder 400 Bewerbungen schreiben, um gesehen zu werden.
            </p>
            <span className="statement-coral-subtle" style={{ 
              color: 'var(--coral)', 
              display: 'block',
              fontSize: '20px'
            }}>
              Du musst nur wissen, wie du strategisch vorgehst – und was wirklich dahinter steckt.
            </span>
          </div>

        </div>
      </section>

      {/* Lösung/Differenzierung + Vorbereitung */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <h2 className="text-4xl font-bold text-center mb-6">
            Was Smarter2Job anders macht
          </h2>

          {/* Kernbotschaft als Zitat */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="card-callout">
              <p className="text-lg text-gray-800 font-semibold mb-1">
                Wir helfen dir dabei, dass deine Bewerbungen und dein Profil klar, glaubwürdig und passend zu deinen Wunschstellen ausgerichtet und feinjustiert werden.
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Genau darum geht es bei Smarter2Job – Strategie vor dem Absenden, statt blinder Masse.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto mb-16">
            
            {/* Card 1: Differenzierung */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold mb-4" style={{ color: '#0a4f5c' }}>
                Bewusst kein One-Click-System
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Wir helfen dir nicht, schneller zu klicken – sondern besser zu entscheiden:
              </p>
              <ul className="space-y-2" style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <span style={{ color: '#ff6b35', fontSize: '18px', marginTop: '4px' }}>•</span>
                  <span className="text-gray-700">Worauf du dich bewirbst</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <span style={{ color: '#ff6b35', fontSize: '18px', marginTop: '4px' }}>•</span>
                  <span className="text-gray-700">Warum es Sinn ergibt</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <span style={{ color: '#ff6b35', fontSize: '18px', marginTop: '4px' }}>•</span>
                  <span className="text-gray-700">Wie du dich positionierst</span>
                </li>
              </ul>
              <p className="text-gray-700 mt-6 font-semibold">
                Damit du nicht vom System aussortiert wirst,<br />
                sondern selbst steuerst, wo dein Aufwand eingesetzt wird.
              </p>
            </div>

            {/* Card 2: Vorbereitung */}
            <div className="bg-white p-8 rounded-xl shadow-lg border-2" style={{ borderColor: '#ff6b35' }}>
              <h3 className="text-2xl font-bold mb-4" style={{ color: '#0a4f5c' }}>
                Warum Vorbereitung im Mittelpunkt steht
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Bevor du dich bewirbst, investieren wir bewusst Zeit in die gemeinsame Vorbereitung.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Denn gezielte Bewerbungen entstehen nicht durch Zufall, sondern durch Klarheit.
              </p>
              <p className="text-gray-700 mt-6 font-semibold" style={{ fontSize: '18px', lineHeight: '1.6' }}>
                Genau die Punkte, bei denen du im Nachhinein oft denkst:<br />
                „Hätte ich das vorher gewusst, hätte ich mich gar nicht beworben."
              </p>
            </div>
          </div>

          {/* Vorbereitung Details */}
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-6 text-center">
              Gemeinsam schauen wir uns an:
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: '#ff6b35' }} />
                <span className="text-gray-700">wer du bist und was dich ausmacht</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: '#ff6b35' }} />
                <span className="text-gray-700">was du wirklich möchtest – und was nicht</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: '#ff6b35' }} />
                <span className="text-gray-700">welche Rollen und Branchen realistisch zu dir passen</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: '#ff6b35' }} />
                <span className="text-gray-700">welches Gehaltsniveau sinnvoll und erreichbar ist</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: '#ff6b35' }} />
                <span className="text-gray-700">wo deine persönlichen Dealbreaker liegen</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: '#ff6b35' }} />
                <span className="text-gray-700">zwischen den Zeilen lesen lernen</span>
              </div>
            </div>

            <p className="text-center text-lg font-semibold mt-12" style={{ color: '#0a4f5c', textAlign: 'center' }}>
              So filterst du nicht erst nach der Absage –<br />
              sondern vor dem Absenden.
            </p>
          </div>

        </div>
      </section>

      {/* Testimonial Section - Hell und ruhig */}
      <section className="section-shell-a">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">
            Was Teilnehmer sagen
          </h2>
          <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
            Echtes Feedback aus dem ersten Webinar
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            
            {/* Testimonial 1 - Screenshot */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition overflow-hidden">
              <img 
                src="/testimonials/Testimonial 1.png" 
                alt="Testimonial 1 - Webinar Feedback"
                className="w-full h-auto object-contain"
                onError={(e) => {
                  // Fallback falls Screenshot nicht gefunden wird
                  e.currentTarget.style.display = 'none';
                  const parent = e.currentTarget.parentElement;
                  if (parent && !parent.querySelector('.testimonial-fallback')) {
                    const fallback = document.createElement('div');
                    fallback.className = 'testimonial-fallback p-8 text-gray-700 italic';
                    fallback.textContent = 'Screenshot wird geladen...';
                    parent.appendChild(fallback);
                  }
                }}
              />
            </div>

            {/* Testimonial 2 - Screenshot */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition overflow-hidden">
              <img 
                src="/testimonials/Testimonial 2.png" 
                alt="Testimonial 2 - Webinar Feedback"
                className="w-full h-auto object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const parent = e.currentTarget.parentElement;
                  if (parent && !parent.querySelector('.testimonial-fallback')) {
                    const fallback = document.createElement('div');
                    fallback.className = 'testimonial-fallback p-8 text-gray-700 italic';
                    fallback.textContent = 'Screenshot wird geladen...';
                    parent.appendChild(fallback);
                  }
                }}
              />
            </div>

            {/* Testimonial 3 - Screenshot */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition overflow-hidden">
              <img 
                src="/testimonials/Testimonial 3.png" 
                alt="Testimonial 3 - Cathrin Kröll Feedback"
                className="w-full h-auto object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const parent = e.currentTarget.parentElement;
                  if (parent && !parent.querySelector('.testimonial-fallback')) {
                    const fallback = document.createElement('div');
                    fallback.className = 'testimonial-fallback p-8 text-gray-700 italic';
                    fallback.textContent = 'Screenshot wird geladen...';
                    parent.appendChild(fallback);
                  }
                }}
              />
            </div>

          </div>
        </div>
      </section>

      {/* Module Section - Timeline Style */}
      <section id="karten" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-4">
            Deine <span className="wavy-underline">Entwicklungsreise</span> – Schritt für Schritt
          </h2>
          <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
            Die Module sind keine Einzelschritte – sie bilden eine zusammenhängende Entwicklungsreise.
          </p>

          <div className="max-w-5xl mx-auto space-y-12">
            
            {/* Etappe 1 */}
            <div className="relative pl-8 border-l-4" style={{ borderLeftColor: '#0a4f5c' }}>
              <div className="absolute -left-3 top-0 w-6 h-6 rounded-full" style={{ backgroundColor: '#0a4f5c' }}></div>
              <h3 className="text-2xl font-bold mb-2" style={{ color: '#0a4f5c' }}>
                <span className="wavy-underline">Verstehen</span>, bevor du dich bewirbst
              </h3>
              <p className="text-gray-600 mb-4">
                Klarheit über Ziele, Ausschlusskriterien und erste Einordnung von Stellen
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="inline-block bg-white px-4 py-2 rounded-lg text-sm border border-gray-200">
                  🎯 Modul 1 & 2
                </span>
              </div>
            </div>

            {/* Etappe 2 */}
            <div className="relative pl-8 border-l-4" style={{ borderLeftColor: '#0a4f5c' }}>
              <div className="absolute -left-3 top-0 w-6 h-6 rounded-full" style={{ backgroundColor: '#0a4f5c' }}></div>
              <h3 className="text-2xl font-bold mb-2" style={{ color: '#0a4f5c' }}>
                <span className="wavy-underline">Bewerten</span>, ob sich eine Bewerbung lohnt
              </h3>
              <p className="text-gray-600 mb-4">
                Passung, Chancen und Risiken erkennen – vor dem Absenden
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="inline-block bg-white px-4 py-2 rounded-lg text-sm border border-gray-200">
                  ✅ Modul 3 & 4
                </span>
              </div>
            </div>

            {/* Etappe 3 */}
            <div className="relative pl-8 border-l-4" style={{ borderLeftColor: '#0a4f5c' }}>
              <div className="absolute -left-3 top-0 w-6 h-6 rounded-full" style={{ backgroundColor: '#0a4f5c' }}></div>
              <h3 className="text-2xl font-bold mb-2" style={{ color: '#0a4f5c' }}>
                <span className="wavy-underline">Übersetzen</span>, was du kannst – für Mensch und ATS
              </h3>
              <p className="text-gray-600 mb-4">
                Profil verständlich, relevant und anschlussfähig aufbereiten
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="inline-block bg-white px-4 py-2 rounded-lg text-sm border border-gray-200">
                  💰 Modul 5 & ✏️ Modul 6
                </span>
              </div>
            </div>

            {/* Etappe 4 */}
            <div className="relative pl-8 border-l-4" style={{ borderLeftColor: '#ff6b35' }}>
              <div className="absolute -left-3 top-0 w-6 h-6 rounded-full" style={{ backgroundColor: '#ff6b35' }}></div>
              <h3 className="text-2xl font-bold mb-2" style={{ color: '#ff6b35' }}>
                <span className="wavy-underline">Positionieren</span> statt ständig anpassen
              </h3>
              <p className="text-gray-600 mb-4">
                Stärken bewusst gewichten, klar differenzieren – ohne dich zu verbiegen
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="inline-block bg-white px-4 py-2 rounded-lg text-sm border border-gray-200">
                  🔗 Modul 7
                </span>
              </div>
            </div>

            {/* Etappe 5 */}
            <div className="relative pl-8 border-l-4 border-gray-300">
              <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-gray-400"></div>
              <h3 className="text-2xl font-bold mb-2 text-gray-700">
                Deine Motivation überzeugend <span className="wavy-underline">erklären</span>
              </h3>
              <p className="text-gray-600 mb-4">
                Argumentation statt Textproduktion – dort, wo es Sinn ergibt
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="inline-block bg-white px-4 py-2 rounded-lg text-sm border border-gray-200">
                  💌 Modul 8 (Add-on)
                </span>
              </div>
            </div>

          </div>

          <div className="text-center mt-16">
            <a 
              href="#pricing"
              className="inline-block border-2 px-8 py-3 rounded-lg font-semibold transition" 
              style={{ 
                borderColor: '#0a4f5c',
                color: '#0a4f5c'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#0a4f5c';
                e.currentTarget.style.color = 'white';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#0a4f5c';
              }}
            >
              Zu den Paketen
            </a>
          </div>
        </div>
      </section>

      {/* Warnzeichen-Schnellcheck Section */}
      <section id="red-flag-teaser" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RedFlagTeaser />
        </div>
      </section>

      {/* Module Details Section - Hell und strukturiert */}
      <section 
        id="karten-details" 
        className="section-shell-a"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">
            Deine <span className="wavy-underline">Entwicklungsreise</span> im Detail
          </h2>
          <p className="text-xl text-center mb-16 max-w-3xl mx-auto text-gray-600">
            Jede Etappe baut auf der vorherigen auf. Du entwickelst Klarheit, triffst bessere Entscheidungen und skalierst deine Strategie.
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Modul 1: Warnzeichen-Schnellcheck */}
            <div className="card-feature">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-5xl">🆓</span>
                <div>
                  <h3 className="text-2xl font-semibold">Modul 1 – Warnzeichen-Schnellcheck</h3>
                  <p className="text-gray-600 italic">"Die ersten 3 Warnzeichen erkennen"</p>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">3-5 Top Warnzeichen (Red Flags) sofort erkannt</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Per E-Mail binnen 1-2 Minuten</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Keine Anmeldung nötig</span>
                </li>
              </ul>

              <div className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-lg font-semibold text-sm">
                🆓 GRATIS
              </div>
            </div>

            {/* Modul 2: Objektive Stellenanalyse */}
            <div className="card-feature">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-5xl">🔍</span>
                <div>
                  <h3 className="text-2xl font-semibold">Modul 2 – Objektive Stellenanalyse</h3>
                  <p className="text-gray-600 italic">"Zwischen den Zeilen lesen"</p>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">10-15 detaillierte Warnzeichen (Red Flags) identifiziert</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Kultur-Score (0-100) mit Begründung</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Gesamtbewertung: Für wen geeignet?</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Realistischer Anforderungs-Check</span>
                </li>
              </ul>

              <div className="inline-block bg-[#0a4f5c] bg-opacity-10 text-[#0a4f5c] px-4 py-2 rounded-lg font-semibold text-sm">
                AB STARTER
              </div>
            </div>

            {/* Modul 3: Persönliche Red Flags */}
            <div className="card-feature">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-5xl">🎯</span>
                <div>
                  <h3 className="text-2xl font-semibold">Modul 3 – Persönliche Warnzeichen (Red Flags)</h3>
                  <p className="text-gray-600 italic">"Passt die Stelle zu deinen Prioritäten?"</p>
                </div>
              </div>

              <ul className="space-y-3 mb-4">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Präferenz-Match-Score (0-100%)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Deal-Breaker-Check (deine No-Gos)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Empfehlung: Passt / Passt nicht</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Kritische Fragen fürs Interview</span>
                </li>
              </ul>

              <p className="text-sm text-gray-500 italic mb-4">
                Benötigt: Karriere-Navi + Lebenslauf (CV)
              </p>

              <div className="inline-block bg-[#0a4f5c] bg-opacity-10 text-[#0a4f5c] px-4 py-2 rounded-lg font-semibold text-sm">
                AB STARTER
              </div>
            </div>

            {/* Modul 4: Fit-Score */}
            <div className="card-feature">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-5xl">✅</span>
                <div>
                  <h3 className="text-2xl font-semibold">Modul 4 – Fit-Score (Passgenauigkeit)</h3>
                  <p className="text-gray-600 italic">"Solltest du dich bewerben?"</p>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Fit-Score (0-100%) mit Visualisierung</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Skill-Match-Analyse (Fähigkeiten-Abgleich) - Was passt? Was fehlt?</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Lückenanalyse (Gap-Analyse) - Kritisch vs. Nice-to-have</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Klare Empfehlung: BEWIRB DICH oder LASS ES</span>
                </li>
              </ul>

              <div className="inline-block bg-[#0a4f5c] bg-opacity-10 text-[#0a4f5c] px-4 py-2 rounded-lg font-semibold text-sm">
                AB STARTER
              </div>
            </div>

            {/* Modul 5: ATS Keyword Research */}
            <div className="card-feature">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-5xl">🔑</span>
                <div>
                  <h3 className="text-2xl font-semibold">Modul 5 – ATS Keyword Research (für den Bewerbungsroboter)</h3>
                  <p className="text-gray-600 italic">"Welche Keywords (Schlüsselwörter) brauchst du?"</p>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Must-have-Keywords (unverzichtbare Schlüsselwörter) aus der Stellenbeschreibung</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Fehlende Keywords in deinem Lebenslauf (CV)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Platzierungs-Tipps (wo ergänzen?)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Keyword-Stuffing-Warnung</span>
                </li>
              </ul>

              <div className="inline-block bg-[#0a4f5c] bg-opacity-10 text-[#0a4f5c] px-4 py-2 rounded-lg font-semibold text-sm">
                AB STARTER
              </div>
            </div>

            {/* Modul 6: Gehaltsband-Indikationen */}
            <div className="card-feature">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-5xl">💰</span>
                <div>
                  <h3 className="text-2xl font-semibold">Modul 6 – Gehaltsband-Indikationen</h3>
                  <p className="text-gray-600 italic">"Was kannst du erwarten?"</p>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Geschätzte Gehaltsspanne (z.B. 58.000-72.000€)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Marktvergleich (Branche, Rolle, Region)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Verhandlungstipps</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Warnung bei fehlenden Gehaltsangaben</span>
                </li>
              </ul>

              <div className="inline-block bg-[#083d47] bg-opacity-10 text-[#083d47] px-4 py-2 rounded-lg font-semibold text-sm">
                AB PROFESSIONAL
              </div>
            </div>

            {/* Modul 7: CV-Umformulierung */}
            <div className="card-feature">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-5xl">✍️</span>
                <div>
                  <h3 className="text-2xl font-semibold">Modul 7 – Lebenslauf-Umformulierung (CV)</h3>
                  <p className="text-gray-600 italic">"ATS-optimiert (für den Bewerbungsroboter) &amp; überzeugend"</p>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Professional Summary neu formuliert</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Alle Job-Stationen achievement-basiert</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Skills-Section strukturiert</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Copy-paste-fertige Texte</span>
                </li>
              </ul>

              <div className="inline-block bg-[#083d47] bg-opacity-10 text-[#083d47] px-4 py-2 rounded-lg font-semibold text-sm">
                AB PROFESSIONAL
              </div>
            </div>

            {/* Modul 8: LinkedIn-Optimierung */}
            <div className="card-feature">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-5xl">📈</span>
                <div>
                  <h3 className="text-2xl font-semibold">Modul 8 – LinkedIn-Optimierung</h3>
                  <p className="text-gray-600 italic">"Werde von Recruitern gefunden"</p>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Keyword-optimierte LinkedIn-Headline (Profil-Überschrift, 220 Zeichen)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">About-Section komplett neu (Über-mich-Bereich, 3-4 Absätze)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Experience-Bullets (Berufserfahrung) pro Station optimiert</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Recruiter-Search-Match-Check (Wie gut finden dich Personaler?)</span>
                </li>
              </ul>

              <div className="inline-block bg-orange-100 text-orange-700 px-4 py-2 rounded-lg font-semibold text-sm">
                NUR EXECUTIVE
              </div>
            </div>

            {/* Modul 9: Anschreiben-Service */}
            <div className="card-feature">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-5xl">🃏</span>
                <div>
                  <h3 className="text-2xl font-semibold">Modul 9 – Anschreiben-Service</h3>
                  <p className="text-gray-600 italic">"Individuell pro Stelle"</p>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Stellenspezifisches Anschreiben (3-4 Absätze)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Adressiert Warnzeichen (Red Flags) proaktiv</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Betont Top-Matches aus Fit-Score (Passgenauigkeit)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">ATS-optimiert (für den Bewerbungsroboter) mit Keywords (Schlüsselwörtern)</span>
                </li>
              </ul>

              <div className="inline-block bg-orange-100 text-orange-700 px-4 py-2 rounded-lg font-semibold text-sm">
                ADD-ON (ab 49€)
              </div>
            </div>
          </div>

          {/* CTA nach den Modulen - Bewusst reduziert */}
          <div className="text-center mt-16">
            <a 
              href="#pricing"
              className="inline-block bg-[#ff6b35] text-white px-10 py-4 rounded-lg font-semibold text-lg hover:bg-[#e55a2b] transition shadow-sm hover:shadow-md"
            >
              Zu den Paketen
            </a>
          </div>
        </div>
      </section>

      {/* Outcomes Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <h2 className="text-4xl font-bold text-center mb-4">
            Was sich für dich konkret verändert
          </h2>
          <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
            Outcomes, keine Versprechen
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            
            {/* Outcome 1 */}
            <div className="bg-gray-50 p-8 rounded-xl border-l-4 transition-all duration-300" style={{ 
              borderLeftColor: '#0a4f5c',
              transform: 'scale(1)',
              boxShadow: '0 6px 18px rgba(15, 23, 42, 0.06)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(255, 107, 74, 0.3), 0 0 30px rgba(255, 107, 74, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 6px 18px rgba(15, 23, 42, 0.06)';
            }}>
              <h3 className="text-xl font-bold mb-4">
                Du erkennst vor dem Absenden, ob sich eine Bewerbung lohnt
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>• wo dein Profil realistisch anschlussfähig ist</li>
                <li>• wo der Match zu gering ist</li>
                <li>• wo dein Einsatz echte Chancen hat</li>
              </ul>
              <p className="text-sm text-gray-600 italic mt-4">
                Du bewirbst dich nicht weniger – sondern gezielter.
              </p>
            </div>

            {/* Outcome 2 */}
            <div className="bg-gray-50 p-8 rounded-xl border-l-4 transition-all duration-300" style={{ 
              borderLeftColor: '#0a4f5c',
              transform: 'scale(1)',
              boxShadow: '0 6px 18px rgba(15, 23, 42, 0.06)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(255, 107, 74, 0.3), 0 0 30px rgba(255, 107, 74, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 6px 18px rgba(15, 23, 42, 0.06)';
            }}>
              <h3 className="text-xl font-bold mb-4">
                Du berücksichtigst Branchen- und Marktlogiken
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>• nicht jede Branche funktioniert gleich (offen vs konservativ)</li>
                <li>• du bewirbst dich dort, wo dein Profil ernsthaft in Betracht gezogen wird</li>
              </ul>
            </div>

            {/* Outcome 3 */}
            <div className="bg-gray-50 p-8 rounded-xl border-l-4 transition-all duration-300" style={{ 
              borderLeftColor: '#0a4f5c',
              transform: 'scale(1)',
              boxShadow: '0 6px 18px rgba(15, 23, 42, 0.06)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(255, 107, 74, 0.3), 0 0 30px rgba(255, 107, 74, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 6px 18px rgba(15, 23, 42, 0.06)';
            }}>
              <h3 className="text-xl font-bold mb-4">
                Du positionierst dich klar statt generisch
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>• bewusst auf Rolle, Kontext und Anforderungen ausgerichtet</li>
                <li>• Ergebnis: Relevanz statt Standardbewerbung</li>
              </ul>
            </div>

            {/* Outcome 4 */}
            <div className="bg-gray-50 p-8 rounded-xl border-l-4 transition-all duration-300" style={{ 
              borderLeftColor: '#ff6b35',
              transform: 'scale(1)',
              boxShadow: '0 6px 18px rgba(15, 23, 42, 0.06)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(255, 107, 74, 0.3), 0 0 30px rgba(255, 107, 74, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 6px 18px rgba(15, 23, 42, 0.06)';
            }}>
              <h3 className="text-xl font-bold mb-4">
                Deine Trefferquote steigt
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>• mehr Rückmeldungen</li>
                <li>• gezieltere Gespräche</li>
                <li>• Zugang zu echten Prozessen</li>
              </ul>
              <p className="text-sm text-gray-600 italic mt-4">
                Ohne Garantien; durch Passung, Vorbereitung, Klarheit.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Features Section - Technische Details */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">Dein strategischer Fortschritt</h2>
          <p className="text-xl text-center mb-16 max-w-3xl mx-auto text-gray-600">
            Mit jedem Schritt entwickelst du mehr Klarheit, triffst bessere Entscheidungen und reduzierst Blindbewerbungen.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            <div className="bg-white p-10 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition">
              <Target className="w-12 h-12 mb-6" style={{ color: '#0a4f5c' }} />
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Warnzeichen-Detektor (Red-Flag-Analyse)</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Erkenne versteckte Warnzeichen (Red Flags), bevor du Zeit verschwendest. Unsere KI analysiert Formulierungen, die auf Probleme hindeuten.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  Unterbesetzungs-Indikatoren
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  Unrealistische Anforderungen
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  Kultur-Warnsignale
                </li>
              </ul>
            </div>

            <div className="bg-white p-10 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition">
              <Zap className="w-12 h-12 mb-6" style={{ color: '#0a4f5c' }} />
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Fit-Score (Passgenauigkeit) & Handlungsempfehlung</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Objektive Bewertung: Solltest du dich bewerben oder nicht? Keine Bauchgefühle mehr – klare Daten.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  Skill-Match-Prozentsatz (Fähigkeiten-Übereinstimmung)
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  Lückenanalyse (Gap-Analyse) - Was fehlt dir?
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  Bewirb dich / Lass es
                </li>
              </ul>
            </div>

            <div className="bg-white p-10 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition">
              <FileText className="w-12 h-12 mb-6" style={{ color: '#0a4f5c' }} />
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">ATS-Optimierung (für den Bewerbungsroboter)</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Dein Lebenslauf (CV) kommt durch den Bewerbungsroboter (ATS) zum Menschen. Wir optimieren Keywords (Schlüsselwörter), Format und Struktur für maximale ATS-Kompatibilität (Roboter-Freundlichkeit).
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  Keyword-Matching (Schlüsselwort-Abgleich)
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  Format-Check
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  ATS-Score (Bewerbungsroboter-Bewertung)
                </li>
              </ul>
            </div>

            <div className="bg-white p-10 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition">
              <Linkedin className="w-12 h-12 mb-6" style={{ color: '#0a4f5c' }} />
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">LinkedIn-Profil-Optimierung</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Matche mit Recruiter-Suchen und werde gefunden. Optimierung von Header, About-Section (Über mich) und Experience (Berufserfahrung) für maximale Sichtbarkeit.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  Keyword-optimierte LinkedIn-Headline (Profil-Überschrift)
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  About-Section komplett neu (Über-mich-Bereich)
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  Recruiter-Search-Match (Personaler-Sichtbarkeit)
                </li>
              </ul>
            </div>

            <div className="bg-white p-10 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition">
              <span className="text-5xl mb-6 block">💰</span>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Gehaltsband-Indikationen</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Erfahre, was du finanziell erwarten kannst. Marktgerechte Einschätzung basierend auf Branche, Rolle und Standort.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  Geschätzte Gehaltsspanne
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  Marktvergleich
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  Verhandlungstipps
                </li>
              </ul>
            </div>

            <div className="bg-white p-10 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition">
              <FileText className="w-12 h-12 mb-6" style={{ color: '#0a4f5c' }} />
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Lebenslauf-Optimierung</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Dein Lebenslauf (CV) wird ATS-optimiert und für Menschen überzeugend aufbereitet – pro Stelle individuell angepasst.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  Professional Summary neu formuliert
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  Achievement-basierte Job-Stationen
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  Copy-paste-fertige Texte
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-16">
            <p className="text-2xl font-semibold mb-4 text-gray-900">
              Steigender Fit-Score. Bessere Entscheidungen. Mehr Kontrolle.
            </p>
            <p className="text-lg text-gray-600" style={{ textAlign: 'center' }}>10 strategische Bewerbungen statt 100 Blindflüge – weniger Frust, mehr Klarheit.</p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20" style={{ backgroundColor: '#0a4f5c', background: 'linear-gradient(135deg, #0a4f5c 0%, #083d47 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <h2 className="text-4xl font-bold text-center mb-4" style={{ color: '#ffffff' }}>
            Wähle dein Paket passend zu deiner Bewerbungsphase
          </h2>
          <p className="text-xl text-center mb-6 max-w-3xl mx-auto" style={{ color: '#e5e7eb' }}>
            Du kannst jederzeit auf die nächste Stufe erweitern, wenn du skalieren willst.
          </p>
          <div className="mb-16" style={{ textAlign: 'center' }}>
            <button className="px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300" style={{ 
              backgroundColor: 'rgba(255, 107, 74, 0.15)',
              color: '#ffffff',
              border: '2px solid rgba(255, 107, 74, 0.5)',
              textAlign: 'center'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 107, 74, 0.25)';
              e.currentTarget.style.borderColor = '#ff6b35';
              e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 107, 74, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 107, 74, 0.15)';
              e.currentTarget.style.borderColor = 'rgba(255, 107, 74, 0.5)';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              Fair upgraden: Wenn du dein Paket erweiterst, wird deine bisherige Investition anteilig berücksichtigt (mit Upgrade-Gutschrift).
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Starter */}
            <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col transition-all duration-300" style={{ 
              height: '100%',
              transform: 'scale(1)',
              boxShadow: '0 12px 30px rgba(15, 23, 42, 0.12)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.06)';
              e.currentTarget.style.boxShadow = '0 24px 60px rgba(255, 107, 74, 0.45), 0 0 40px rgba(255, 107, 74, 0.35)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 12px 30px rgba(15, 23, 42, 0.12)';
            }}>
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ 
                  fontSize: '24px', 
                  fontWeight: 'var(--font-weight-bold)', 
                  color: 'var(--text)',
                  marginBottom: '8px',
                  lineHeight: '1.2'
                }}>
                  Einstieg & Orientierung
                </h3>
                <p style={{ 
                  fontSize: '16px', 
                  color: 'var(--text-muted)',
                  lineHeight: '1.6'
                }}>
                  Für Bewerber, die aus ungezielten Bewerbungen eine klare Strategie machen wollen.
                </p>
              </div>
              <div style={{ marginBottom: '24px' }}>
                <span style={{ 
                  fontSize: '52px', 
                  fontWeight: 'var(--font-weight-extrabold)', 
                  color: 'var(--text)',
                  lineHeight: '1'
                }}>
                  49€
                </span>
                <span style={{ 
                  fontSize: '16px', 
                  color: 'var(--text-muted)',
                  marginLeft: '4px'
                }}>
                  einmalig
                </span>
              </div>
              <ul className="space-y-2 text-gray-700" style={{ marginBottom: '32px', flexGrow: '1' }}>
                <li>• 3 Job-Analysen</li>
                <li>• Warnzeichen-Analyse (Red-Flag-Analyse)</li>
                <li>• Fit-Score (Passgenauigkeit) & Handlungsempfehlung</li>
                <li>• ATS Keyword Research (für den Bewerbungsroboter)</li>
              </ul>
              <a
                href="mailto:post@martinbeyer.de?subject=Ich%20m%C3%B6chte%20gerne%20das%20Starter%20Paket%20f%C3%BCr%2049%20Euro%20buchen.&body=Hallo,%0A%0Aich%20m%C3%B6chte%20gerne%20das%20Starter%20Paket%20buchen.%0A%0AVorname:%0ANachname:%0AAdresse:%0A%0AViele%20Gr%C3%BC%C3%9Fe"
                className="w-full mt-auto text-center py-3 px-6 rounded-lg font-semibold transition"
                style={{
                  backgroundColor: 'transparent',
                  color: '#0a4f5c',
                  border: '2px solid #0a4f5c'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#0a4f5c';
                  e.currentTarget.style.color = 'white';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#0a4f5c';
                }}
              >
                Jetzt starten
              </a>
            </div>

            {/* Professional - Featured */}
            <div className="bg-white p-8 rounded-xl shadow-xl flex flex-col relative border-2 transition-all duration-300" style={{ 
              borderColor: '#0a4f5c',
              height: '100%',
              transform: 'scale(1)',
              boxShadow: '0 14px 34px rgba(15, 23, 42, 0.14)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.07)';
              e.currentTarget.style.boxShadow = '0 28px 70px rgba(255, 107, 74, 0.5), 0 0 45px rgba(255, 107, 74, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 14px 34px rgba(15, 23, 42, 0.14)';
            }}>
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-white" style={{ backgroundColor: '#0a4f5c' }}>
                Beliebteste
              </div>
              <div style={{ marginBottom: '24px', marginTop: '8px' }}>
                <h3 style={{ 
                  fontSize: '24px', 
                  fontWeight: 'var(--font-weight-bold)', 
                  color: 'var(--text)',
                  marginBottom: '8px',
                  lineHeight: '1.2'
                }}>
                  Aktive Bewerbungsphase
                </h3>
                <p style={{ 
                  fontSize: '16px', 
                  color: 'var(--text-muted)',
                  lineHeight: '1.6'
                }}>
                  Für Bewerber, die mehrere passende Zielstellen strategisch begleiten und konsistent gute Entscheidungen treffen möchten.
                </p>
              </div>
              <div style={{ marginBottom: '24px' }}>
                <span style={{ 
                  fontSize: '52px', 
                  fontWeight: 'var(--font-weight-extrabold)', 
                  color: 'var(--text)',
                  lineHeight: '1'
                }}>
                  129€
                </span>
                <span style={{ 
                  fontSize: '16px', 
                  color: 'var(--text-muted)',
                  marginLeft: '4px'
                }}>
                  einmalig
                </span>
              </div>
              <ul className="space-y-2 text-gray-700" style={{ marginBottom: '32px', flexGrow: '1' }}>
                <li>• 7 Job-Analysen</li>
                <li>• Lebenslauf-Optimierung (CV) - pro Stelle ATS-optimiert</li>
                <li>• Erweiterte Warnzeichen-Analyse (Red-Flag-Analyse)</li>
                <li>• Gehaltsband-Indikationen</li>
                <li>• ATS Keyword Research (für den Bewerbungsroboter)</li>
              </ul>
              <a
                href="mailto:post@martinbeyer.de?subject=Ich%20m%C3%B6chte%20gerne%20das%20Professional%20Paket%20f%C3%BCr%20129%20Euro%20buchen.&body=Hallo,%0A%0Aich%20m%C3%B6chte%20gerne%20das%20Professional%20Paket%20buchen.%0A%0AVorname:%0ANachname:%0AAdresse:%0A%0AViele%20Gr%C3%BC%C3%9Fe"
                className="w-full mt-auto text-center py-3 px-6 rounded-lg font-semibold text-white transition"
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
                Jetzt starten
              </a>
            </div>

            {/* Executive */}
            <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col transition-all duration-300" style={{ 
              height: '100%',
              transform: 'scale(1)',
              boxShadow: '0 12px 30px rgba(15, 23, 42, 0.12)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.06)';
              e.currentTarget.style.boxShadow = '0 24px 60px rgba(255, 107, 74, 0.45), 0 0 40px rgba(255, 107, 74, 0.35)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 12px 30px rgba(15, 23, 42, 0.12)';
            }}>
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ 
                  fontSize: '24px', 
                  fontWeight: 'var(--font-weight-bold)', 
                  color: 'var(--text)',
                  marginBottom: '8px',
                  lineHeight: '1.2'
                }}>
                  Beschleunigung & Fokus
                </h3>
                <p style={{ 
                  fontSize: '16px', 
                  color: 'var(--text-muted)',
                  lineHeight: '1.6'
                }}>
                  Für Bewerber, die mehrere Optionen parallel prüfen und Momentum aufbauen wollen – ohne Zufall.
                </p>
              </div>
              <div style={{ marginBottom: '24px' }}>
                <span style={{ 
                  fontSize: '52px', 
                  fontWeight: 'var(--font-weight-extrabold)', 
                  color: 'var(--text)',
                  lineHeight: '1'
                }}>
                  249€
                </span>
                <span style={{ 
                  fontSize: '16px', 
                  color: 'var(--text-muted)',
                  marginLeft: '4px'
                }}>
                  einmalig
                </span>
              </div>
              <ul className="space-y-2 text-gray-700" style={{ marginBottom: '32px', flexGrow: '1' }}>
                <li>• 10 Job-Analysen</li>
                <li>• Lebenslauf-Optimierung (CV) - pro Stelle</li>
                <li>• LinkedIn-Optimierung (1-2x)</li>
                <li>• Erweiterte Warnzeichen-Analyse (Red-Flag-Analyse)</li>
                <li>• Gehaltsband-Indikationen</li>
                <li>• Priorisierte Verarbeitung (24h)</li>
              </ul>
              <a
                href="mailto:post@martinbeyer.de?subject=Ich%20m%C3%B6chte%20gerne%20das%20Executive%20Paket%20f%C3%BCr%20249%20Euro%20buchen.&body=Hallo,%0A%0Aich%20m%C3%B6chte%20gerne%20das%20Executive%20Paket%20buchen.%0A%0AVorname:%0ANachname:%0AAdresse:%0A%0AViele%20Gr%C3%BC%C3%9Fe"
                className="w-full mt-auto text-center py-3 px-6 rounded-lg font-semibold transition"
                style={{
                  backgroundColor: 'transparent',
                  color: '#0a4f5c',
                  border: '2px solid #0a4f5c'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#0a4f5c';
                  e.currentTarget.style.color = 'white';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#0a4f5c';
                }}
              >
                Jetzt starten
              </a>
            </div>
          </div>

          {/* Add-ons Section */}
          <div className="mt-20">
            <h3 className="text-3xl font-bold text-center mb-8" style={{ color: '#ffffff' }}>
              Du willst noch mehr? Du willst skalieren?
            </h3>
            <p className="text-center mb-12 max-w-3xl mx-auto" style={{ color: '#e5e7eb' }}>
              Zusätzliche Analysen helfen dir, deine Strategie auf weitere Zielstellen anzuwenden.<br />
              Der Anschreiben-Service hilft dir, deine Positionierung klar zu argumentieren – dort, wo ein Anschreiben wirklich relevant ist.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm transition-all duration-300" 
                style={{ 
                  transform: 'scale(1)',
                  boxShadow: '0 6px 18px rgba(15, 23, 42, 0.06)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(255, 107, 74, 0.3), 0 0 30px rgba(255, 107, 74, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 6px 18px rgba(15, 23, 42, 0.06)';
                }}>
                <h4 className="text-xl font-semibold mb-3">
                  <span className="wavy-underline">Zusatzanalysen</span>
                </h4>
                <ul className="space-y-2 mb-4" style={{ listStyle: 'none', padding: 0 }}>
                  <li className="text-gray-700"><span style={{ color: '#ff6b35', fontWeight: 'bold' }}>+</span>3 Analysen</li>
                  <li className="text-gray-700"><span style={{ color: '#ff6b35', fontWeight: 'bold' }}>+</span>5 Analysen</li>
                  <li className="text-gray-700"><span style={{ color: '#ff6b35', fontWeight: 'bold' }}>+</span>10 Analysen</li>
                </ul>
                <p className="text-gray-600">Wenn du mehr Wunschstellen parallel prüfen möchtest, kannst du deine Strategie gezielt skalieren.</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm transition-all duration-300"
                style={{ 
                  transform: 'scale(1)',
                  boxShadow: '0 6px 18px rgba(15, 23, 42, 0.06)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(255, 107, 74, 0.3), 0 0 30px rgba(255, 107, 74, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 6px 18px rgba(15, 23, 42, 0.06)';
                }}>
                <h4 className="text-xl font-semibold mb-3">
                  <span className="wavy-underline">Anschreiben-Service</span>
                </h4>
                <ul className="space-y-2 mb-4" style={{ listStyle: 'none', padding: 0 }}>
                  <li className="text-gray-700"><span style={{ color: '#ff6b35', fontWeight: 'bold' }}>+</span>3 Anschreiben</li>
                  <li className="text-gray-700"><span style={{ color: '#ff6b35', fontWeight: 'bold' }}>+</span>5 Anschreiben</li>
                  <li className="text-gray-700"><span style={{ color: '#ff6b35', fontWeight: 'bold' }}>+</span>10 Anschreiben</li>
                </ul>
                <p className="text-gray-700 mb-2 font-medium">Argumentieren und Positionieren:</p>
                <p className="text-gray-600">Wir übersetzen deine Positionierung in klare, überzeugende Anschreiben.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16">Häufige Fragen</h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-5 flex justify-between items-center text-left hover:bg-gray-50 transition rounded-lg"
                >
                  <span className="text-lg font-semibold text-gray-900">{faq.question}</span>
                  <ChevronDown 
                    className={`w-5 h-5 text-gray-500 transition-transform ${
                      openFaq === index ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-5">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ 
        paddingTop: '80px', 
        paddingBottom: '80px',
        backgroundColor: '#0a4f5c'
      }}>
        <div style={{ 
          maxWidth: '1024px', 
          margin: '0 auto', 
          textAlign: 'center',
          padding: '0 24px'
        }}>
          <h2 style={{ 
            fontSize: 'clamp(36px, 5vw, 48px)',
            fontWeight: 'bold',
            marginBottom: '24px',
            color: '#ffffff',
            lineHeight: '1.2'
          }}>
            Bewirb dich smarter, nicht häufiger
          </h2>
          <p style={{ 
            fontSize: '20px',
            marginBottom: '32px',
            color: '#e5e7eb'
          }}>
            Starte deine Bewerbungsstrategie – mit Klarheit, Passung und Fokus.
          </p>
          <button 
            onClick={() => {
              document.getElementById('red-flag-teaser')?.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
              });
            }}
            style={{ 
              backgroundColor: '#ff6b35',
              color: '#ffffff',
              padding: '16px 40px',
              borderRadius: '8px',
              fontSize: '18px',
              fontWeight: '600',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#e55a2b';
              e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.25)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#ff6b35';
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Ab jetzt strategisch bewerben
          </button>
          <p style={{ 
            fontSize: '14px',
            marginTop: '16px',
            color: '#d1d5db',
            textAlign: 'center',
            marginLeft: 'auto',
            marginRight: 'auto',
            maxWidth: 'none'
          }}>
            7 Tage Geld-zurück-Garantie
          </p>
        </div>
      </section>

      {/* Lead-Magnet Section: CV-Basics-Checkliste */}
      <section id="checkliste" className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Icon/Badge */}
          <div className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold text-sm mb-6">
            🎁 GRATIS CHECKLISTE
          </div>

          {/* Headline */}
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Lebenslauf-Basics-Checkliste: ATS-optimiert (für den Bewerbungsroboter)
          </h2>

          {/* Subheadline */}
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            70% aller Lebensläufe (CVs) scheitern am ATS - dem Bewerbungsroboter - und landen im digitalen Papierkorb, bevor ein Recruiter sie überhaupt in die Hand bekommt.<br/>
            Mit dieser Checkliste gehörst du zu den 30%, die durchkommen.
          </p>

          {/* Value Bullets */}
          <div className="grid md:grid-cols-3 gap-6 mb-10 max-w-3xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl mb-3">✅</div>
              <h3 className="font-semibold mb-2">10 Checkpunkte</h3>
              <p className="text-sm text-gray-600">Von Format bis Keywords (Schlüsselwörter) – alles abgedeckt</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl mb-3">📊</div>
              <h3 className="font-semibold mb-2">Vorher/Nachher</h3>
              <p className="text-sm text-gray-600">Konkrete Beispiele zeigen den Unterschied</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl mb-3">🚀</div>
              <h3 className="font-semibold mb-2">Sofort umsetzbar</h3>
              <p className="text-sm text-gray-600">Keine Theorie, nur Praxis</p>
            </div>
          </div>

          {/* Email Opt-in Form */}
          {checklistSubmitted ? (
            <div className="bg-green-50 p-6 rounded-lg border-2 border-green-500 max-w-lg mx-auto">
              <h3 className="text-xl font-semibold text-green-700 mb-2">
                🎉 Fast geschafft!
              </h3>
              <p className="text-green-600 mb-2">
                Der Download startet automatisch. Falls nicht, klicke{' '}
                <a href="/downloads/CV_Basics_Checkliste.pdf" className="underline font-semibold" download>
                  hier
                </a>.
              </p>
              <p className="text-sm text-gray-600 mt-4">
                Prüfe dein Postfach für die Workshop-Einladung!
              </p>
            </div>
          ) : (
            <div className="bg-white p-8 rounded-xl shadow-lg max-w-lg mx-auto">
              <form 
                name="cv-checklist" 
                method="POST" 
                data-netlify="true"
                onSubmit={handleChecklistSubmit}
                className="space-y-4"
              >
                <input type="hidden" name="form-name" value="cv-checklist" />
                <input
                  type="email"
                  name="email"
                  placeholder="Deine E-Mail-Adresse"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent"
                />
                <button
                  type="submit"
                  style={{
                    backgroundColor: '#ff6b35',
                    color: 'white',
                    padding: '16px 32px',
                    borderRadius: '8px',
                    fontSize: '18px',
                    fontWeight: '600',
                    width: '100%',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(255, 107, 53, 0.3)'
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#e55a2b')}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#ff6b35')}
                >
                  Checkliste GRATIS herunterladen
                </button>
              </form>
              <p className="text-xs text-gray-500 mt-4">
                Kein Spam. Du erhältst die Checkliste sofort per E-Mail + Einladung zum kostenlosen Workshop.
              </p>
            </div>
          )}

          {/* Social Proof */}
          <p className="text-sm text-gray-600 mt-8">
            ✅ Bereits <strong>500+</strong> Downloads
          </p>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-2xl font-bold text-white mb-4">Smarter2Job</div>
              <p className="text-sm">Stellenanzeigen sind verschleiert. Wir verschaffen dir Durchblick, damit du dich einfacher, strategisch besser bewerben kannst.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Produkt</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#karten" className="hover:text-white transition">Module</a></li>
                <li><a href="#karten-details" className="hover:text-white transition">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition">Preise</a></li>
                <li><a href="#faq" className="hover:text-white transition">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/impressum" className="hover:text-white transition">Impressum</Link></li>
                <li><Link to="/datenschutz" className="hover:text-white transition">Datenschutz</Link></li>
                <li><Link to="/agb" className="hover:text-white transition">AGB</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            <p>&copy; 2025 Martin Beyer / Smarter2Job. Alle Rechte vorbehalten.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

