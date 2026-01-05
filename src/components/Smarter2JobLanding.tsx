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
              <a href="#pricing" className="text-gray-600 hover:text-[#0a4f5c] transition">Pricing</a>
              <a href="#checkliste" className="text-gray-600 hover:text-[#0a4f5c] transition font-semibold">
                🎁 Gratis Checkliste
              </a>
              <a href="#faq" className="text-gray-600 hover:text-[#0a4f5c] transition">FAQ</a>
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
            <h1 style={{ color: 'var(--text)', marginBottom: '24px' }}>
              Strategisch bewerben.<br/>
              Gezielter in die richtigen Jobs.
            </h1>
            
            <p style={{ 
              fontSize: '22px', 
              color: 'var(--text-muted)', 
              marginBottom: '16px',
              fontWeight: 'var(--font-weight-medium)'
            }}>
              Nicht nur Geschwindigkeit entscheidet –<br/>
              sondern Strategie und Passung.
            </p>
            
            <p style={{ 
              fontSize: '18px', 
              color: 'var(--text-muted)', 
              marginBottom: '40px',
              maxWidth: '65ch',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}>
              Smarter2Job hilft dir, deine Bewerbungen gezielt vorzubereiten<br/>
              und passend zu deinen Wunschjobs zu positionieren.
            </p>
            
            <button 
              onClick={() => {
                document.getElementById('red-flag-teaser')?.scrollIntoView({ 
                  behavior: 'smooth',
                  block: 'start'
                });
              }}
              className="btn btn-primary btn-lg"
            >
              Starte deine Bewerbungsstrategie
            </button>
          </div>
        </div>
      </section>

      {/* Problem Section - Frust - TYP B */}
      <section className="section-problem">
        <div className="container-narrow">
          <h2 style={{ marginBottom: '32px', textAlign: 'left' }}>
            Warum dein Frust so groß ist
          </h2>
          <div style={{ 
            fontSize: '18px', 
            lineHeight: '1.7',
            color: 'var(--text-on-dark)',
            textAlign: 'left'
          }}>
            <p style={{ marginBottom: '12px' }}>Du bewirbst dich.</p>
            <p style={{ marginBottom: '12px' }}>Du investierst Zeit.</p>
            <p style={{ marginBottom: '12px' }}>Du bleibst dran.</p>
            <p style={{ 
              fontSize: '20px', 
              fontWeight: 'var(--font-weight-semibold)', 
              marginTop: '24px',
              marginBottom: '16px',
              color: 'var(--text-on-dark)'
            }}>
              Und trotzdem:
            </p>
            <p style={{ marginBottom: '12px' }}>Absagen.</p>
            <p style={{ marginBottom: '12px' }}>Funkstille.</p>
            <p style={{ marginBottom: '24px' }}>Das Gefühl, im Wettbewerb unterzugehen.</p>
            <p style={{ 
              fontSize: '20px', 
              fontWeight: 'var(--font-weight-semibold)', 
              marginTop: '32px',
              marginBottom: '16px',
              color: 'var(--text-on-dark)'
            }}>
              Der Frust entsteht nicht, weil du zu wenig tust.
            </p>
            <p style={{ 
              fontSize: '20px', 
              fontWeight: 'var(--font-weight-semibold)', 
              marginBottom: '24px',
              color: 'var(--text-on-dark)'
            }}>
              Sondern weil das, was du tust, nicht strategisch geplant ist.
            </p>
            <p style={{ marginTop: '24px', marginBottom: '12px' }}>
              Bewerbungen werden schnell abgeschickt –<br/>
              ohne klare Passung, ohne Positionierung, ohne System.
            </p>
            <p style={{ 
              fontSize: '20px', 
              fontWeight: 'var(--font-weight-semibold)', 
              marginTop: '24px',
              marginBottom: '16px',
              color: 'var(--text-on-dark)'
            }}>
              Das Ergebnis ist vorhersehbar:
            </p>
            <p style={{ marginBottom: '0' }}>
              Du bekommst mehr Wettbewerb<br/>
              und logischerweise viel mehr Absagen.
            </p>
          </div>
        </div>
      </section>

      {/* Strukturelles Problem - Portal-Logik - TYP C */}
      <section className="section-structure">
        <div className="container-narrow">
          <h2 style={{ 
            color: 'var(--text)', 
            marginBottom: '24px',
            textAlign: 'left'
          }}>
            Ein Klick ist schnell gemacht.<br/>
            Eine gute Positionierung nicht.
          </h2>
          <p style={{ 
            fontSize: '18px', 
            color: 'var(--text)', 
            lineHeight: '1.7',
            marginBottom: '16px',
            textAlign: 'left'
          }}>
            Bewerbungsportale machen es extrem leicht, viele Bewerbungen zu verschicken.<br/>
            Was sie fördern, ist Masse – nicht Klasse.
          </p>
          <p style={{ 
            fontSize: '18px', 
            color: 'var(--text)', 
            lineHeight: '1.7',
            marginBottom: '32px',
            textAlign: 'left'
          }}>
            Bewerbungsportale fördern Masse.<br/>
            Aber Masse ersetzt keine Strategie.
          </p>
          <p style={{ 
            fontSize: '18px', 
            color: 'var(--text)', 
            lineHeight: '1.7',
            marginBottom: '48px',
            textAlign: 'left'
          }}>
            Sie erhöht vor allem zwei Dinge:<br/>
            <strong style={{ color: 'var(--text)' }}>den Wettbewerb</strong><br/>
            und <strong style={{ color: 'var(--text)' }}>die Anzahl der Absagen</strong>.
          </p>

          {/* Aktivitäts-Illusion */}
          <div className="card" style={{ marginBottom: '48px' }}>
            <p style={{ 
              fontSize: '18px', 
              color: 'var(--text)', 
              lineHeight: '1.7',
              marginBottom: '16px'
            }}>
              Viele Bewerbungen vermitteln Aktivität.<br/>
              In Wahrheit ist es oft wie mit einer Schrotflinte im Nebel:<br/>
              viel Bewegung, wenig Wirkung – und kaum Kontrolle.
            </p>
            <p style={{ 
              fontSize: '18px', 
              color: 'var(--text)', 
              lineHeight: '1.7',
              marginBottom: '0'
            }}>
              Dein Aufwand ist dennoch hoch –<br/>
              die Trefferquote bleibt niedrig.
            </p>
          </div>

          {/* Erkenntnis-Block */}
          <div style={{ marginBottom: '48px', textAlign: 'left' }}>
            <h3 style={{ 
              fontSize: '28px', 
              fontWeight: 'var(--font-weight-bold)', 
              color: 'var(--text)',
              marginBottom: '16px'
            }}>
              Nicht viele Bewerbungen sind das Problem.<br/>
              Schlechte Trefferquoten sind es.
            </h3>
            <p style={{ 
              fontSize: '18px', 
              color: 'var(--text)', 
              lineHeight: '1.7'
            }}>
              Wenn der Match von Anfang an gering ist, führt jede zusätzliche Bewerbung vor allem zu einer weiteren Absage.<br/>
              Was fehlt, ist nicht Motivation – sondern Strategie vor dem Absenden.
            </p>
          </div>

          {/* Dating-Analogie */}
          <div className="callout">
            <h3 style={{ 
              fontSize: '22px', 
              fontWeight: 'var(--font-weight-bold)', 
              color: 'var(--text)',
              marginBottom: '16px'
            }}>
              Beim Dating würdest du auch nicht unvorbereitet starten.
            </h3>
            <p style={{ 
              fontSize: '18px', 
              color: 'var(--text)', 
              lineHeight: '1.7',
              marginBottom: '16px'
            }}>
              Du würdest kein beliebiges Foto wählen, kein austauschbares Profil nutzen und nicht unvorbereitet zu einem wichtigen Date gehen –
              nicht um etwas vorzutäuschen, sondern um passend wahrgenommen zu werden.
            </p>
            <p style={{ 
              fontSize: '18px', 
              color: 'var(--text)', 
              lineHeight: '1.7',
              marginBottom: '0'
            }}>
              Genau so funktionieren Bewerbungen.<br/>
              Smarter2Job erstellt keine Fake-Profile.<br/>
              Wir sorgen dafür, dass dein Profil klar, glaubwürdig und passend zu deinen Wunschstellen ausgerichtet ist.
            </p>
          </div>
        </div>
      </section>

      {/* Problem Section - Story Cards (behalten, aber kürzen) */}
      <section style={{ 
        paddingTop: '60px', 
        paddingBottom: '60px', 
        backgroundColor: '#ffffff'
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>

          {/* Story Cards - Neu gerahmt */}
          <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            gap: '32px',
            marginBottom: '56px'
          }}>
            
            {/* Sabrina's Story */}
            <div style={{ 
              backgroundColor: '#ffffff', 
              padding: '32px', 
              borderRadius: '12px', 
              borderLeft: '4px solid #0a4f5c',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{ marginBottom: '16px' }}>
                <div style={{ 
                  display: 'inline-block',
                  backgroundColor: 'rgba(10, 79, 92, 0.1)',
                  color: '#0a4f5c',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: '600',
                  marginBottom: '12px'
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
            <div style={{ 
              backgroundColor: '#ffffff', 
              padding: '32px', 
              borderRadius: '12px', 
              borderLeft: '4px solid #0a4f5c',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{ marginBottom: '16px' }}>
                <div style={{ 
                  display: 'inline-block',
                  backgroundColor: 'rgba(10, 79, 92, 0.1)',
                  color: '#0a4f5c',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: '600',
                  marginBottom: '12px'
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
              <div style={{ 
                backgroundColor: '#f8f9fa', 
                padding: '24px', 
                borderRadius: '12px', 
                borderLeft: '4px solid #0a4f5c',
                border: '1px solid #e5e7eb'
              }}>
                <h4 style={{ 
                  fontSize: '18px', 
                  fontWeight: '600', 
                  color: '#0a4f5c',
                  marginBottom: '10px'
                }}>
                  10 Jahre Erfahrung in 2-Jahre-alten Tools
                </h4>
                <p style={{ color: '#6b7280', fontSize: '15px', lineHeight: '1.5' }}>
                  Unrealistische Anforderungen, die nicht immer klar kommuniziert werden – wir helfen dir, sie zu erkennen, bevor du dich bewirbst.
                </p>
              </div>

              <div style={{ 
                backgroundColor: '#f8f9fa', 
                padding: '24px', 
                borderRadius: '12px', 
                borderLeft: '4px solid #0a4f5c',
                border: '1px solid #e5e7eb'
              }}>
                <h4 style={{ 
                  fontSize: '18px', 
                  fontWeight: '600', 
                  color: '#0a4f5c',
                  marginBottom: '10px'
                }}>
                  50% Ghosting-Rate
                </h4>
                <p style={{ color: '#6b7280', fontSize: '15px', lineHeight: '1.5' }}>
                  Viele Bewerbungen bleiben unbeantwortet. Oft liegt es an fehlender Strategie – wir helfen dir, gezielter zu bewerben.
                </p>
              </div>
            </div>

          </div>

          {/* Der Pivot - Klarheit statt Alarm */}
          <div style={{
            textAlign: 'center',
            padding: '40px 32px',
            backgroundColor: '#f8f9fa',
            borderRadius: '12px',
            border: '1px solid #e5e7eb',
            maxWidth: '700px',
            margin: '0 auto'
          }}>
            <p style={{
              fontSize: '28px',
              fontWeight: 'bold',
              color: '#1a1a1a',
              marginBottom: '16px',
              lineHeight: '1.3'
            }}>
              Stellenanzeigen sind verschleiert.<br/>
              Aber es gibt Methoden, sie zu durchschauen.
            </p>
            <p style={{
              fontSize: '18px',
              color: '#4b5563',
              marginBottom: '24px'
            }}>
              Du musst nicht viral gehen oder 400 Bewerbungen schreiben, um gesehen zu werden.
            </p>
            <p style={{
              fontSize: '20px',
              color: '#0a4f5c',
              fontWeight: '600'
            }}>
              Du musst nur wissen, wie du strategisch vorgehst – und was wirklich dahinter steckt.
            </p>
          </div>

        </div>
      </section>

      {/* Solution Section - Differenzierung - TYP C */}
      <section className="section-structure">
        <div className="container-main">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Links: Headline + Copy */}
            <div>
              <h2 style={{ 
                color: 'var(--text)', 
                marginBottom: '16px',
                textAlign: 'left'
              }}>
                Was Smarter2Job anders macht
              </h2>
              <p style={{ 
                fontSize: '18px', 
                color: 'var(--text-muted)', 
                marginBottom: '32px',
                lineHeight: '1.7',
                textAlign: 'left'
              }}>
                Smarter2Job ist bewusst kein One-Click-System.<br/>
                Wir helfen dir nicht, schneller zu klicken – sondern besser zu entscheiden.
              </p>
            </div>

            {/* Rechts: Card mit Icon-Liste */}
            <div className="card">
              <ul className="icon-list">
                <li>
                  <span style={{ color: 'var(--text)' }}>Worauf du dich bewirbst</span>
                </li>
                <li>
                  <span style={{ color: 'var(--text)' }}>Warum es Sinn ergibt</span>
                </li>
                <li>
                  <span style={{ color: 'var(--text)' }}>Wie du dich positionierst</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Callout Card darunter */}
          <div className="callout" style={{ marginTop: '48px' }}>
            <p style={{ 
              fontSize: '18px', 
              color: 'var(--text)', 
              fontWeight: 'var(--font-weight-medium)',
              marginBottom: '0'
            }}>
              Damit du nicht vom System aussortiert wirst,<br/>
              sondern selbst steuerst, wo dein Aufwand eingesetzt wird.
            </p>
          </div>
        </div>
      </section>

      {/* Warum Vorbereitung im Mittelpunkt steht - TYP C */}
      <section className="section-structure">
        <div className="container-narrow">
          <h2 style={{ 
            color: 'var(--text)', 
            marginBottom: '32px',
            textAlign: 'left'
          }}>
            Warum Vorbereitung bei Smarter2Job im Mittelpunkt steht
          </h2>
          <p style={{ 
            fontSize: '18px', 
            color: 'var(--text)', 
            lineHeight: '1.7',
            marginBottom: '24px',
            textAlign: 'left'
          }}>
            Bevor du dich bewirbst, investieren wir bewusst Zeit in die gemeinsame Vorbereitung.<br/>
            Denn gezielte Bewerbungen entstehen nicht durch Zufall, sondern durch Klarheit.
          </p>
          <p style={{ 
            fontSize: '18px', 
            color: 'var(--text)', 
            fontWeight: 'var(--font-weight-semibold)',
            marginBottom: '24px',
            textAlign: 'left'
          }}>
            Gemeinsam schauen wir uns an:
          </p>
          <ul className="icon-list" style={{ marginBottom: '32px' }}>
            <li><span style={{ color: 'var(--text)' }}>wer du bist und was dich ausmacht</span></li>
            <li><span style={{ color: 'var(--text)' }}>was du wirklich möchtest – und was nicht</span></li>
            <li><span style={{ color: 'var(--text)' }}>welche Rollen und Branchen realistisch zu dir passen</span></li>
            <li><span style={{ color: 'var(--text)' }}>welches Gehaltsniveau für dich sinnvoll und erreichbar ist</span></li>
            <li><span style={{ color: 'var(--text)' }}>wo deine persönlichen Dealbreaker liegen</span></li>
          </ul>
          <div className="callout">
            <p style={{ 
              fontSize: '18px', 
              color: 'var(--text)', 
              fontStyle: 'italic',
              marginBottom: '16px'
            }}>
              Genau die Punkte, bei denen du im Nachhinein oft denkst:<br/>
              „Hätte ich das vorher gewusst, hätte ich mich gar nicht beworben."
            </p>
          </div>
          <p style={{ 
            fontSize: '18px', 
            color: 'var(--text)', 
            lineHeight: '1.7',
            marginBottom: '16px',
            textAlign: 'left'
          }}>
            Deshalb helfen wir dir, bei deinen Wunschjobs zwischen den Zeilen zu lesen<br/>
            und mögliche Ausschlussfaktoren frühzeitig zu erkennen.
          </p>
          <p style={{ 
            fontSize: '18px', 
            color: 'var(--text)', 
            fontWeight: 'var(--font-weight-semibold)',
            marginTop: '24px',
            textAlign: 'left'
          }}>
            So filterst du nicht erst nach der Absage –<br/>
            sondern vor dem Absenden.
          </p>
        </div>
      </section>

      {/* Testimonial Section - Hell und ruhig */}
      <section className="py-20 bg-gray-50">
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

      {/* Module Section - Als Entwicklungsreise gerahmt */}
      <section id="karten" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-4">
            Dein strategischer Bewerbungsprozess
          </h2>
          <p className="text-xl text-gray-600 text-center mb-8 max-w-3xl mx-auto">
            Smarter2Job begleitet dich Schritt für Schritt durch deine Bewerbungsphase.<br/>
            Jede Etappe baut auf der vorherigen auf – damit deine Bewerbungen gezielt wirken.
          </p>
          <p className="text-lg text-gray-700 text-center mb-16 max-w-3xl mx-auto font-medium">
            Die Module sind keine Einzelschritte – sie bilden eine zusammenhängende Entwicklungsreise.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full max-w-6xl mx-auto bg-white rounded-lg shadow-md">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Modul</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Was es macht</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Verfügbar in</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="bg-[#f0f9fa]">
                  <td colSpan={4} className="px-6 py-3 text-sm font-semibold text-[#0a4f5c]">
                    Module 1–2: Verstehen, bevor du dich bewirbst
                  </td>
                </tr>
                <tr className="bg-[#f0f9fa]">
                  <td colSpan={4} className="px-6 py-2 text-xs text-gray-600 italic">
                    Klarheit über Ziele, Ausschlusskriterien und erste Einordnung von Stellen.
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-2xl">🆓 1</td>
                  <td className="px-6 py-4 font-medium">Warnzeichen-Schnellcheck</td>
                  <td className="text-gray-600 px-6 py-4">3-5 Top Warnzeichen (Red Flags) kostenlos</td>
                  <td className="px-6 py-4 text-green-600 font-medium">Kostenlos</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-2xl">🔍 2</td>
                  <td className="px-6 py-4 font-medium">Objektive Stellenanalyse</td>
                  <td className="px-6 py-4 text-gray-600">10-15 Warnzeichen (Red Flags), Kultur-Score</td>
                  <td className="px-6 py-4">Alle Packages</td>
                </tr>
                <tr className="bg-[#f0f9fa]">
                  <td colSpan={4} className="px-6 py-3 text-sm font-semibold text-[#0a4f5c]">
                    Module 3–4: Bewerten, ob sich eine Bewerbung lohnt
                  </td>
                </tr>
                <tr className="bg-[#f0f9fa]">
                  <td colSpan={4} className="px-6 py-2 text-xs text-gray-600 italic">
                    Passung, Chancen und Risiken erkennen – vor dem Absenden.
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-2xl">🎯 3</td>
                  <td className="px-6 py-4 font-medium">Persönliche Warnzeichen (Red Flags)</td>
                  <td className="px-6 py-4 text-gray-600">Passt zu deinen Prioritäten?</td>
                  <td className="px-6 py-4">Alle Packages*</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-2xl">✅ 4</td>
                  <td className="px-6 py-4 font-medium">Fit-Score (Passgenauigkeit)</td>
                  <td className="px-6 py-4 text-gray-600">BEWIRB DICH oder LASS ES</td>
                  <td className="px-6 py-4">Alle Packages</td>
                </tr>
                <tr className="bg-[#f0f9fa]">
                  <td colSpan={4} className="px-6 py-3 text-sm font-semibold text-[#0a4f5c]">
                    Module 5–6: Übersetzen, was du kannst – für Mensch und ATS
                  </td>
                </tr>
                <tr className="bg-[#f0f9fa]">
                  <td colSpan={4} className="px-6 py-2 text-xs text-gray-600 italic">
                    Profil verständlich, relevant und anschlussfähig aufbereiten.
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-2xl">🔑 5</td>
                  <td className="px-6 py-4 font-medium">ATS Keyword Research (für den Bewerbungsroboter)</td>
                  <td className="px-6 py-4 text-gray-600">Welche Keywords (Schlüsselwörter) brauchst du?</td>
                  <td className="px-6 py-4">Alle Packages</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-2xl">💰 6</td>
                  <td className="px-6 py-4 font-medium">Gehaltsband-Indikationen</td>
                  <td className="px-6 py-4 text-gray-600">Was kannst du erwarten?</td>
                  <td className="px-6 py-4 text-[#0a4f5c] font-medium">Professional+</td>
                </tr>
                <tr className="bg-[#f0f9fa]">
                  <td colSpan={4} className="px-6 py-3 text-sm font-semibold text-[#0a4f5c]">
                    Modul 7: Positionieren statt ständig anpassen
                  </td>
                </tr>
                <tr className="bg-[#f0f9fa]">
                  <td colSpan={4} className="px-6 py-2 text-xs text-gray-600 italic">
                    Stärken bewusst gewichten, klar differenzieren – ohne dich zu verbiegen.
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-2xl">✍️ 7</td>
                  <td className="px-6 py-4 font-medium">Lebenslauf-Umformulierung (CV)</td>
                  <td className="px-6 py-4 text-gray-600">Pro Stelle ATS-optimiert (für den Bewerbungsroboter)</td>
                  <td className="px-6 py-4 text-[#0a4f5c] font-medium">Professional+</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-2xl">📈 8</td>
                  <td className="px-6 py-4 font-medium">LinkedIn-Optimierung</td>
                  <td className="px-6 py-4 text-gray-600">Recruiter-Search-Match (Personaler-Sichtbarkeit)</td>
                  <td className="px-6 py-4 text-[#0a4f5c] font-medium">Executive</td>
                </tr>
                <tr className="bg-[#f0f9fa]">
                  <td colSpan={4} className="px-6 py-3 text-sm font-semibold text-[#0a4f5c]">
                    Modul 8: Deine Motivation überzeugend erklären
                  </td>
                </tr>
                <tr className="bg-[#f0f9fa]">
                  <td colSpan={4} className="px-6 py-2 text-xs text-gray-600 italic">
                    Argumentation statt Textproduktion – dort, wo es Sinn ergibt.
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-2xl">🃏 9</td>
                  <td className="px-6 py-4 font-medium">Anschreiben-Service</td>
                  <td className="px-6 py-4 text-gray-600">Individuell pro Stelle – Skalierung einer funktionierenden Strategie</td>
                  <td className="px-6 py-4 text-[#ff6b35] font-medium">Add-on</td>
                </tr>
                <tr className="bg-[#f0f9fa]">
                  <td colSpan={4} className="px-6 py-3 text-sm font-semibold text-[#0a4f5c]">
                    Modul 9: Mehrere Bewerbungen strategisch steuern
                  </td>
                </tr>
                <tr className="bg-[#f0f9fa]">
                  <td colSpan={4} className="px-6 py-2 text-xs text-gray-600 italic">
                    Prozesse priorisieren, Optionen vergleichen, Kontrolle behalten.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-sm text-gray-500 mt-6 text-center">
            *Modul 3 braucht ABC-Listen (via Workshop oder Loom-Video)
          </p>

          <div className="text-center mt-12">
            <a 
              href="#pricing"
              className="inline-block border-2 border-[#0a4f5c] text-[#0a4f5c] px-8 py-3 rounded-lg font-semibold hover:bg-[#0a4f5c] hover:text-white transition"
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
        className="py-20 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">
            Deine Entwicklungsreise im Detail
          </h2>
          <p className="text-xl text-center mb-16 max-w-3xl mx-auto text-gray-600">
            Jede Etappe baut auf der vorherigen auf. Du entwickelst Klarheit, triffst bessere Entscheidungen und skalierst deine Strategie.
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Modul 1: Warnzeichen-Schnellcheck */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition border border-gray-200 hover:border-[#0a4f5c]">
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
                🆓 KOSTENLOS
              </div>
            </div>

            {/* Modul 2: Objektive Stellenanalyse */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition border border-gray-200 hover:border-[#0a4f5c]">
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
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition border border-gray-200 hover:border-[#0a4f5c]">
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
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition border border-gray-200 hover:border-[#0a4f5c]">
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
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition border border-gray-200 hover:border-[#0a4f5c]">
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
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition border border-gray-200 hover:border-[#0a4f5c]">
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
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition border border-gray-200 hover:border-[#0a4f5c]">
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
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition border border-gray-200 hover:border-[#0a4f5c]">
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
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition border border-gray-200 hover:border-[#0a4f5c]">
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

      {/* Was sich für dich verändert - TYP C */}
      <section id="features" className="section-structure">
        <div className="container-main">
          <h2 style={{ 
            color: 'var(--text)', 
            marginBottom: '48px',
            textAlign: 'left'
          }}>
            Was sich für dich konkret verändert
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Outcome 1 */}
            <div className="card">
              <h3 style={{ 
                fontSize: '22px', 
                fontWeight: 'var(--font-weight-semibold)', 
                color: 'var(--text)',
                marginBottom: '16px'
              }}>
                1. Du erkennst vor dem Absenden, ob sich eine Bewerbung lohnt
              </h3>
              <ul className="icon-list" style={{ marginBottom: '16px' }}>
                <li><span style={{ color: 'var(--text)' }}>wo dein Profil realistisch anschlussfähig ist</span></li>
                <li><span style={{ color: 'var(--text)' }}>wo der Match zu gering ist</span></li>
                <li><span style={{ color: 'var(--text)' }}>wo dein Einsatz echte Chancen hat</span></li>
              </ul>
              <p style={{ 
                fontSize: '16px', 
                color: 'var(--text)', 
                fontWeight: 'var(--font-weight-medium)',
                marginBottom: '0'
              }}>
                Du bewirbst dich nicht weniger – sondern gezielter.
              </p>
            </div>

            {/* Outcome 2 */}
            <div className="card">
              <h3 style={{ 
                fontSize: '22px', 
                fontWeight: 'var(--font-weight-semibold)', 
                color: 'var(--text)',
                marginBottom: '16px'
              }}>
                2. Du berücksichtigst Branchen- und Marktlogiken
              </h3>
              <ul className="icon-list">
                <li><span style={{ color: 'var(--text)' }}>nicht jede Branche funktioniert gleich (offen vs konservativ)</span></li>
                <li><span style={{ color: 'var(--text)' }}>du bewirbst dich dort, wo dein Profil ernsthaft in Betracht gezogen wird</span></li>
              </ul>
            </div>

            {/* Outcome 3 */}
            <div className="card">
              <h3 style={{ 
                fontSize: '22px', 
                fontWeight: 'var(--font-weight-semibold)', 
                color: 'var(--text)',
                marginBottom: '16px'
              }}>
                3. Du positionierst dich klar statt generisch
              </h3>
              <ul className="icon-list">
                <li><span style={{ color: 'var(--text)' }}>bewusst auf Rolle, Kontext und Anforderungen ausgerichtet</span></li>
                <li><span style={{ color: 'var(--text)' }}>Ergebnis: Relevanz statt Standardbewerbung</span></li>
              </ul>
            </div>

            {/* Outcome 4 */}
            <div className="card">
              <h3 style={{ 
                fontSize: '22px', 
                fontWeight: 'var(--font-weight-semibold)', 
                color: 'var(--text)',
                marginBottom: '16px'
              }}>
                4. Deine Trefferquote steigt
              </h3>
              <ul className="icon-list">
                <li><span style={{ color: 'var(--text)' }}>mehr Rückmeldungen, gezieltere Gespräche, Zugang zu echten Prozessen</span></li>
                <li><span style={{ color: 'var(--text)' }}>ohne Garantien; durch Passung, Vorbereitung, Klarheit</span></li>
              </ul>
            </div>
          </div>

          {/* Upgrade-Microcopy */}
          <div className="max-w-2xl mx-auto mt-12 p-6 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-center text-gray-700">
              <strong className="text-gray-900">Fair upgraden:</strong> Wenn du dein Paket erweiterst, wird deine bisherige Investition anteilig berücksichtigt (mit Upgrade-Gutschrift).
            </p>
          </div>

          {/* Add-ons Sektion */}
          <div className="max-w-4xl mx-auto mt-16">
            <h3 className="text-3xl font-bold text-center mb-6 text-gray-900">
              Add-ons als Skalierung – nicht als Nachbesserung
            </h3>
            <p className="text-lg text-gray-700 text-center mb-8 leading-relaxed">
              Zusätzliche Analysen helfen dir, deine Strategie auf weitere Zielstellen anzuwenden.<br/>
              Der Anschreiben-Service hilft dir, deine Positionierung klar zu argumentieren – dort, wo ein Anschreiben wirklich relevant ist.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="text-xl font-semibold text-gray-900 mb-3">Zusatzanalysen</h4>
                <p className="text-gray-700 mb-2">+3 / +5 / +10 Analysen:</p>
                <p className="text-gray-600">Wenn du mehr Wunschstellen parallel prüfen möchtest, kannst du deine Strategie gezielt skalieren.</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="text-xl font-semibold text-gray-900 mb-3">Anschreiben-Service</h4>
                <p className="text-gray-700 mb-2 font-medium">Argumentieren statt hoffen:</p>
                <p className="text-gray-600">Wir übersetzen deine Positionierung in klare, überzeugende Anschreiben.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Technische Details */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">Dein strategischer Fortschritt</h2>
          <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
            Mit jedem Schritt entwickelst du mehr Klarheit, triffst bessere Entscheidungen und reduzierst Blindbewerbungen.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            <div className="bg-white p-10 rounded-xl shadow-sm hover:shadow-md transition border border-gray-100">
              <Target className="w-12 h-12 text-[#0a4f5c] mb-6" />
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

            <div className="bg-white p-10 rounded-xl shadow-sm hover:shadow-md transition border border-gray-100">
              <Zap className="w-12 h-12 text-[#0a4f5c] mb-6" />
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

            <div className="bg-white p-10 rounded-xl shadow-sm hover:shadow-md transition border border-gray-100">
              <FileText className="w-12 h-12 text-[#0a4f5c] mb-6" />
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

            <div className="bg-white p-10 rounded-xl shadow-sm hover:shadow-md transition border border-gray-100">
              <Linkedin className="w-12 h-12 text-[#0a4f5c] mb-6" />
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

            <div className="bg-white p-10 rounded-xl shadow-sm hover:shadow-md transition border border-gray-100">
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
          </div>

          <div className="text-center mt-16">
            <p className="text-2xl font-semibold text-[#0a4f5c] mb-4">
              Steigender Fit-Score. Bessere Entscheidungen. Mehr Kontrolle.
            </p>
            <p className="text-lg text-gray-600">10 strategische Bewerbungen statt 100 Blindflüge – weniger Frust, mehr Klarheit.</p>
          </div>
        </div>
      </section>

      {/* Pricing Section - TYP C */}
      <section id="pricing" className="section-structure">
        <div className="container-main">
          <h2 style={{ 
            color: 'var(--text)', 
            marginBottom: '16px',
            textAlign: 'left'
          }}>
            Dein strategischer Fortschritt
          </h2>
          <p style={{ 
            fontSize: '18px', 
            color: 'var(--text-muted)', 
            marginBottom: '8px',
            textAlign: 'left'
          }}>
            Wähle das Paket passend zu deiner Bewerbungsphase.<br/>
            Du kannst jederzeit auf die nächste Stufe erweitern, wenn du skalieren willst.
          </p>
          <p style={{ 
            fontSize: '16px', 
            color: 'var(--text)', 
            fontWeight: 'var(--font-weight-medium)',
            marginBottom: '8px',
            textAlign: 'left'
          }}>
            Kein Abo. Kein Lock-in.
          </p>
          <p style={{ 
            fontSize: '14px', 
            color: 'var(--text-muted)', 
            marginBottom: '48px',
            textAlign: 'left'
          }}>
            7 Tage Geld-zurück-Garantie
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Starter */}
            <div className="card flex flex-col">
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ 
                  fontSize: '22px', 
                  fontWeight: 'var(--font-weight-bold)', 
                  color: 'var(--text)',
                  marginBottom: '8px'
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
                  fontSize: '48px', 
                  fontWeight: 'var(--font-weight-bold)', 
                  color: 'var(--text)'
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
              <ul className="icon-list" style={{ marginBottom: '32px', flexGrow: '1' }}>
                <li><span style={{ color: 'var(--text)' }}>3 Job-Analysen</span></li>
                <li><span style={{ color: 'var(--text)' }}>Warnzeichen-Analyse (Red-Flag-Analyse)</span></li>
                <li><span style={{ color: 'var(--text)' }}>Fit-Score (Passgenauigkeit) & Handlungsempfehlung</span></li>
                <li><span style={{ color: 'var(--text)' }}>ATS Keyword Research (für den Bewerbungsroboter)</span></li>
              </ul>
              <a
                href="mailto:post@martinbeyer.de?subject=Ich%20m%C3%B6chte%20gerne%20das%20Starter%20Paket%20f%C3%BCr%2049%20Euro%20buchen.&body=Hallo,%0A%0Aich%20m%C3%B6chte%20gerne%20das%20Starter%20Paket%20buchen.%0A%0AVorname:%0ANachname:%0AAdresse:%0A%0AViele%20Gr%C3%BC%C3%9Fe"
                className="btn btn-secondary w-full mt-auto"
              >
                Jetzt starten
              </a>
            </div>

            {/* Professional - Featured */}
            <div className="card flex flex-col relative" style={{ 
              backgroundColor: 'var(--petrol)', 
              borderColor: 'var(--coral)',
              borderWidth: '2px'
            }}>
              <div style={{ 
                position: 'absolute', 
                top: '-12px', 
                left: '50%', 
                transform: 'translateX(-50%)', 
                backgroundColor: 'var(--surface)', 
                color: 'var(--petrol)', 
                padding: '6px 16px', 
                borderRadius: '9999px', 
                fontSize: '12px', 
                fontWeight: 'var(--font-weight-semibold)',
                border: '1px solid var(--border-strong)'
              }}>
                Beliebteste
              </div>
              <div style={{ marginBottom: '24px', marginTop: '8px' }}>
                <h3 style={{ 
                  fontSize: '22px', 
                  fontWeight: 'var(--font-weight-bold)', 
                  color: 'var(--text-on-dark)',
                  marginBottom: '8px'
                }}>
                  Aktive Bewerbungsphase
                </h3>
                <p style={{ 
                  fontSize: '16px', 
                  color: 'var(--text-on-dark-muted)',
                  lineHeight: '1.6'
                }}>
                  Für Bewerber, die mehrere passende Zielstellen strategisch begleiten und konsistent gute Entscheidungen treffen möchten.
                </p>
              </div>
              <div style={{ marginBottom: '24px' }}>
                <span style={{ 
                  fontSize: '48px', 
                  fontWeight: 'var(--font-weight-bold)', 
                  color: 'var(--text-on-dark)'
                }}>
                  129€
                </span>
                <span style={{ 
                  fontSize: '16px', 
                  color: 'var(--text-on-dark-muted)',
                  marginLeft: '4px'
                }}>
                  einmalig
                </span>
              </div>
              <ul className="icon-list" style={{ marginBottom: '32px', flexGrow: '1' }}>
                <li><span style={{ color: 'var(--text-on-dark)' }}>7 Job-Analysen</span></li>
                <li><span style={{ color: 'var(--text-on-dark)' }}>Lebenslauf-Optimierung (CV) - pro Stelle ATS-optimiert</span></li>
                <li><span style={{ color: 'var(--text-on-dark)' }}>Erweiterte Warnzeichen-Analyse (Red-Flag-Analyse)</span></li>
                <li><span style={{ color: 'var(--text-on-dark)' }}>Gehaltsband-Indikationen</span></li>
                <li><span style={{ color: 'var(--text-on-dark)' }}>ATS Keyword Research (für den Bewerbungsroboter)</span></li>
              </ul>
              <a
                href="mailto:post@martinbeyer.de?subject=Ich%20m%C3%B6chte%20gerne%20das%20Professional%20Paket%20f%C3%BCr%20129%20Euro%20buchen.&body=Hallo,%0A%0Aich%20m%C3%B6chte%20gerne%20das%20Professional%20Paket%20buchen.%0A%0AVorname:%0ANachname:%0AAdresse:%0A%0AViele%20Gr%C3%BC%C3%9Fe"
                className="btn btn-primary w-full mt-auto"
              >
                Jetzt starten
              </a>
            </div>

            {/* Executive */}
            <div className="card flex flex-col">
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ 
                  fontSize: '22px', 
                  fontWeight: 'var(--font-weight-bold)', 
                  color: 'var(--text)',
                  marginBottom: '8px'
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
                  fontSize: '48px', 
                  fontWeight: 'var(--font-weight-bold)', 
                  color: 'var(--text)'
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
              <ul className="icon-list" style={{ marginBottom: '32px', flexGrow: '1' }}>
                <li><span style={{ color: 'var(--text)' }}>10 Job-Analysen</span></li>
                <li><span style={{ color: 'var(--text)' }}>Lebenslauf-Optimierung (CV) - pro Stelle</span></li>
                <li><span style={{ color: 'var(--text)' }}>LinkedIn-Optimierung (1-2x)</span></li>
                <li><span style={{ color: 'var(--text)' }}>Erweiterte Warnzeichen-Analyse (Red-Flag-Analyse)</span></li>
                <li><span style={{ color: 'var(--text)' }}>Gehaltsband-Indikationen</span></li>
                <li><span style={{ color: 'var(--text)' }}>Priorisierte Verarbeitung (24h)</span></li>
              </ul>
              <a
                href="mailto:post@martinbeyer.de?subject=Ich%20m%C3%B6chte%20gerne%20das%20Executive%20Paket%20f%C3%BCr%20249%20Euro%20buchen.&body=Hallo,%0A%0Aich%20m%C3%B6chte%20gerne%20das%20Executive%20Paket%20buchen.%0A%0AVorname:%0ANachname:%0AAdresse:%0A%0AViele%20Gr%C3%BC%C3%9Fe"
                className="btn btn-secondary w-full mt-auto"
              >
                Jetzt starten
              </a>
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

      {/* Final CTA - TYP D */}
      <section className="section-action">
        <div className="container-narrow">
          <div className="text-center">
            <h2 style={{ 
              fontSize: 'clamp(40px, 5vw, 52px)',
              fontWeight: 'var(--font-weight-extrabold)',
              marginBottom: '24px',
              color: 'var(--text)',
              lineHeight: '1.05'
            }}>
              Strategisch bewerben.<br/>
              Gezielter in die richtigen Jobs.
            </h2>
            <p style={{ 
              fontSize: '20px',
              marginBottom: '40px',
              color: 'var(--text-muted)',
              maxWidth: '65ch',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}>
              Nimm dir die Zeit, die deine Karriere verdient. Strategie kommt vor Optimierung.
            </p>
            <button 
              onClick={() => {
                document.getElementById('red-flag-teaser')?.scrollIntoView({ 
                  behavior: 'smooth',
                  block: 'start'
                });
              }}
              className="btn btn-primary btn-lg"
            >
              Strategisch vorbereiten
            </button>
            <p style={{ 
              fontSize: '14px',
              marginTop: '24px',
              color: 'var(--text-muted)'
            }}>
              7 Tage Geld-zurück-Garantie
            </p>
          </div>
        </div>
      </section>

      {/* Lead-Magnet Section: CV-Basics-Checkliste */}
      <section id="checkliste" className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Icon/Badge */}
          <div className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold text-sm mb-6">
            🎁 KOSTENLOS
          </div>

          {/* Headline */}
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            CV-Basics-Checkliste: ATS-optimiert (für den Bewerbungsroboter)
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
                  Checkliste kostenlos herunterladen
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
                <li><a href="#pricing" className="hover:text-white transition">Pricing</a></li>
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

