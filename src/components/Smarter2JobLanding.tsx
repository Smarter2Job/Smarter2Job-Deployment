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
      answer: "ATS steht für Applicant Tracking System – auf Deutsch: Bewerbungsroboter. Das ist eine Software, die Lebensläufe automatisch nach bestimmten Schlüsselwörtern durchsucht und bewertet, BEVOR ein Mensch sie sieht. 70% aller Lebensläufe (CVs) scheitern am ATS - dem Bewerbungsroboter - und landen im digitalen Papierkorb, bevor ein Recruiter sie überhaupt in die Hand bekommt. Das liegt daran, dass wichtige Keywords fehlen oder das Format nicht passt. Smarter2Job zeigt dir genau, welche Schlüsselwörter du brauchst und optimiert deinen Lebenslauf (CV) für diese Systeme."
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
      answer: "Wir sind die Einzigen, die Warnzeichen-Dekodierung (Red-Flag-Analyse), ATS-Optimierung (für den Bewerbungsroboter) UND LinkedIn-Profil-Optimierung in einem Tool vereinen. Keine Beratung, kein Coaching – pure Analyse-Power."
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
                backgroundColor: '#ff6b35', 
                color: 'white', 
                padding: '8px 24px', 
                borderRadius: '8px', 
                fontWeight: '500', 
                border: 'none', 
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#e55a2b')}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#ff6b35')}
            >
              Jetzt starten
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        className="pt-32 pb-20 px-4 sm:px-6 lg:px-8"
        style={{ 
          background: 'linear-gradient(135deg, #0a4f5c 0%, #083d47 100%)'
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <p className="text-sm md:text-base font-medium text-[#ff6b35] mb-4 uppercase tracking-wide">
              Das Problem fast aller Bewerbungen:
            </p>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
              Dein Lebenslauf scheitert am Roboter. Die Stellenanzeige verschleiert die Wahrheit. Du bewirbst dich blind – und verlierst.
            </h1>
            
            <p className="text-lg md:text-xl mb-10 leading-relaxed" style={{ color: '#cbd5e1' }}>
              Smarter2Job durchleuchtet Stellenanzeigen, optimiert deinen Lebenslauf (CV) für Bewerbungs-Filter-Roboter (Application Tracking System – kurz ATS) und zeigt dir mögliche Stolpersteine auf, bevor du dich bewirbst. Strategisch statt verzweifelt.
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
                marginTop: '16px'
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#e55a2b')}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#ff6b35')}
            >
              🔍 Jetzt strategisch auf deine Bewerbung vorbereiten
            </button>
          </div>
        </div>
      </section>

      {/* Story Section - Date Metapher */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Du würdest nie in Jogginghose zum wichtigsten Date deines Lebens gehen.
          </h2>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-4">
            Aber bei Bewerbungen machst du genau das: Derselbe Lebenslauf für 100 Stellen. Keine Vorbereitung. Keine Strategie. Nur Copy-Paste – und Absagen.
          </p>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            Smarter2Job macht Schluss damit. Wir bereiten dich vor wie für dein perfektes Date: Du weißt, was dein Gegenüber erwartet, wie du dich präsentierst und welche Stolpersteine du meiden musst.
          </p>
        </div>
      </section>

      {/* Problem Section - STORYTELLING */}
      <section style={{ 
        paddingTop: '80px', 
        paddingBottom: '80px', 
        backgroundColor: '#0f172a'
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
          
          {/* Intro mit direkter Ansprache */}
          <div style={{ 
            textAlign: 'center', 
            marginBottom: '64px',
            maxWidth: '800px',
            margin: '0 auto 64px'
          }}>
            <h2 style={{ 
              fontSize: '42px', 
              fontWeight: 'bold', 
              color: '#ffffff',
              marginBottom: '24px',
              lineHeight: '1.2'
            }}>
              Kennst du das Gefühl?
            </h2>
            <p style={{ 
              fontSize: '22px', 
              color: '#cbd5e1',
              lineHeight: '1.6',
              marginBottom: '16px'
            }}>
              Du bewirbst dich, aber Stellenbeschreibungen sind nicht immer klar. Und während du hunderte Lebensläufe (CVs) verschickst, passiert... nichts.
            </p>
            <p style={{ 
              fontSize: '18px', 
              color: '#ef4444',
              fontWeight: '600'
            }}>
              Du bist nicht allein. Hier sind echte Geschichten – und wie wir gemeinsam besser werden können:
            </p>
          </div>

          {/* Story Cards */}
          <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            gap: '32px',
            marginBottom: '56px'
          }}>
            
            {/* Sabrina's Story */}
            <div style={{ 
              backgroundColor: '#1e293b', 
              padding: '32px', 
              borderRadius: '12px', 
              borderLeft: '4px solid #ef4444',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
            }}>
              <div style={{ marginBottom: '16px' }}>
                <div style={{ 
                  display: 'inline-block',
                  backgroundColor: 'rgba(239, 68, 68, 0.15)',
                  color: '#ef4444',
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
                  color: '#ffffff',
                  marginBottom: '16px'
                }}>
                  Sabrina: 400 Bewerbungen. 3 Gespräche. 0 Jobangebote.
                </h3>
              </div>
              <blockquote style={{ 
                borderLeft: '3px solid #ef4444',
                paddingLeft: '20px',
                marginBottom: '16px',
                fontStyle: 'italic',
                color: '#e2e8f0',
                fontSize: '17px',
                lineHeight: '1.7'
              }}>
                "Master mit 1,4. Werkstudentenjobs bei namhaften Unternehmen. Drei Sprachen. Digital-Schwerpunkt. Aber keine 10 Jahre Berufserfahrung mit Tools, die es erst seit 2 gibt? Game Over."
              </blockquote>
              <p style={{ 
                color: '#cbd5e1', 
                fontSize: '16px',
                lineHeight: '1.6'
              }}>
                Von 400+ Bewerbungen wurde sie von der Hälfte geghostet. Der Rest? Copy-Paste-Absagen. <strong style={{ color: '#ffffff' }}>Die Erkenntnis: Sie wusste nicht, welche Jobs wirklich zu ihr passen – und wie sie sich richtig präsentiert.</strong>
              </p>
            </div>

            {/* Marta's Story */}
            <div style={{ 
              backgroundColor: '#1e293b', 
              padding: '32px', 
              borderRadius: '12px', 
              borderLeft: '4px solid #ef4444',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
            }}>
              <div style={{ marginBottom: '16px' }}>
                <div style={{ 
                  display: 'inline-block',
                  backgroundColor: 'rgba(239, 68, 68, 0.15)',
                  color: '#ef4444',
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
                  color: '#ffffff',
                  marginBottom: '16px'
                }}>
                  Marta: Musste viral gehen, um überhaupt gesehen zu werden.
                </h3>
              </div>
              <p style={{ 
                color: '#e2e8f0', 
                fontSize: '17px',
                lineHeight: '1.7',
                marginBottom: '16px'
              }}>
                Eine 29-jährige Marketing Managerin aus Madrid. Nach ihrer Entlassung: Dutzende Bewerbungen. Nur automatisierte Ablehnungen. Sie war qualifiziert, motiviert – aber <strong style={{ color: '#ffffff' }}>unsichtbar für das System</strong>.
              </p>
              <p style={{ 
                color: '#cbd5e1', 
                fontSize: '16px',
                lineHeight: '1.6'
              }}>
                Erst als sie ein virales LinkedIn-Video erstellte und 300 Jobangebote bekam, meldeten sich plötzlich die Recruiter, die sie zuvor abgelehnt hatten. <strong style={{ color: '#ffffff' }}>Warum? Weil ihr Lebenslauf (CV) am ATS - dem Bewerbungsroboter - gescheitert war, nicht an ihrer Qualifikation.</strong>
              </p>
            </div>

            {/* Die Wahrheit Cards - kompakt */}
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px'
            }}>
              <div style={{ 
                backgroundColor: '#1e293b', 
                padding: '24px', 
                borderRadius: '12px', 
                borderLeft: '4px solid #ef4444'
              }}>
                <h4 style={{ 
                  fontSize: '18px', 
                  fontWeight: '600', 
                  color: '#f1f5f9',
                  marginBottom: '10px'
                }}>
                  10 Jahre Erfahrung in 2-Jahre-alten Tools
                </h4>
                <p style={{ color: '#cbd5e1', fontSize: '15px', lineHeight: '1.5' }}>
                  Unrealistische Anforderungen, die nicht immer klar kommuniziert werden – wir helfen dir, sie zu erkennen
                </p>
              </div>

              <div style={{ 
                backgroundColor: '#1e293b', 
                padding: '24px', 
                borderRadius: '12px', 
                borderLeft: '4px solid #ef4444'
              }}>
                <h4 style={{ 
                  fontSize: '18px', 
                  fontWeight: '600', 
                  color: '#f1f5f9',
                  marginBottom: '10px'
                }}>
                  50% Ghosting-Rate
                </h4>
                <p style={{ color: '#cbd5e1', fontSize: '15px', lineHeight: '1.5' }}>
                  Viele Bewerbungen bleiben unbeantwortet. Oft liegt es am ATS - dem Bewerbungsroboter - wir helfen dir, durchzukommen
                </p>
              </div>
            </div>

          </div>

          {/* Der Pivot - Nebel/Durchblick */}
          <div style={{
            textAlign: 'center',
            padding: '40px 32px',
            backgroundColor: '#1e293b',
            borderRadius: '12px',
            border: '2px solid #ef4444',
            maxWidth: '700px',
            margin: '0 auto'
          }}>
            <p style={{
              fontSize: '28px',
              fontWeight: 'bold',
              color: '#ffffff',
              marginBottom: '16px',
              lineHeight: '1.3'
            }}>
              Stellenanzeigen sind verschleiert.<br/>
              Aber es gibt Methoden, sie zu durchschauen.
            </p>
            <p style={{
              fontSize: '18px',
              color: '#cbd5e1',
              marginBottom: '24px'
            }}>
              Du musst nicht viral gehen oder 400 Bewerbungen schreiben, um gesehen zu werden.
            </p>
            <p style={{
              fontSize: '20px',
              color: '#ef4444',
              fontWeight: '600'
            }}>
              Du musst nur wissen, wie du den Nebel lichtest – und was wirklich dahinter steckt.
            </p>
          </div>

        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-4">So funktioniert Smarter2Job</h2>
          <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
            Drei simple Schritte zu strategischer Bewerbung
          </p>

          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            <div className="text-center">
              <div style={{ backgroundColor: '#0a4f5c', color: 'white', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 'bold', margin: '0 auto 24px' }}>
                1
              </div>
              <h3 className="text-2xl font-semibold mb-4">Stellen-URL & Lebenslauf (CV) hochladen</h3>
              <p className="text-gray-600 leading-relaxed">
                Stellenbeschreibung und deinen Lebenslauf (CV) eingeben. Unsere KI startet die Analyse.
              </p>
            </div>

            <div className="text-center">
              <div style={{ backgroundColor: '#0a4f5c', color: 'white', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 'bold', margin: '0 auto 24px' }}>
                2
              </div>
              <h3 className="text-2xl font-semibold mb-4">Zwischen-den-Zeilen-Report</h3>
              <p className="text-gray-600 leading-relaxed">
                Erhalte Warnzeichen (Red Flags), versteckte Anforderungen, Fit-Score (Passgenauigkeit) und klare Handlungsempfehlung.
              </p>
            </div>

            <div className="text-center">
              <div style={{ backgroundColor: '#0a4f5c', color: 'white', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 'bold', margin: '0 auto 24px' }}>
                3
              </div>
              <h3 className="text-2xl font-semibold mb-4">Lebenslauf (CV) & LinkedIn optimieren</h3>
              <p className="text-gray-600 leading-relaxed">
                ATS-proof (roboter-sicher) Lebenslauf (CV) und LinkedIn-Profil perfekt auf die Stelle zugeschnitten.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20" style={{ backgroundColor: '#1e293b' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-4 text-white">
            Was Teilnehmer sagen
          </h2>
          <p className="text-xl text-gray-300 text-center mb-16 max-w-3xl mx-auto">
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

      {/* Module Section */}
      <section id="karten" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-4">
            Dein Durchblick kommt in bis zu 9 Modulen
          </h2>
          <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
            Von der Analyse bis zur Optimierung – jedes Modul bringt dich näher ans Ziel. Je mehr Module du nutzt, desto strategischer wird deine Bewerbung.
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
                <tr>
                  <td className="px-6 py-4 text-2xl">🃏 9</td>
                  <td className="px-6 py-4 font-medium">Anschreiben-Service</td>
                  <td className="px-6 py-4 text-gray-600">Individuell pro Stelle</td>
                  <td className="px-6 py-4 text-[#ff6b35] font-medium">Add-on</td>
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
              className="inline-block bg-[#ff6b35] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#e55a2b] transition"
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

      {/* Module Details Section */}
      <section 
        id="karten-details" 
        className="py-20"
        style={{ backgroundColor: '#1e293b' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-4 text-white">
            Dein Durchblick kommt in bis zu 9 Modulen
          </h2>
          <p className="text-xl text-center mb-16 max-w-3xl mx-auto" style={{ color: '#cbd5e1' }}>
            Von der Analyse bis zur Optimierung – jedes Modul bringt dich näher ans Ziel. Je mehr Module du nutzt, desto strategischer wird deine Bewerbung.
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Modul 1: Warnzeichen-Schnellcheck */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition border-2 border-transparent hover:border-green-500 hover-lift">
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
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition border-2 border-transparent hover:border-[#0a4f5c] hover-lift">
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
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition border-2 border-transparent hover:border-[#0a4f5c] hover-lift">
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
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition border-2 border-transparent hover:border-[#0a4f5c] hover-lift">
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
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition border-2 border-transparent hover:border-[#0a4f5c] hover-lift">
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
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition border-2 border-transparent hover:border-[#083d47] hover-lift">
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
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition border-2 border-transparent hover:border-[#083d47] hover-lift">
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
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition border-2 border-transparent hover:border-orange-500 hover-lift">
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
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition border-2 border-transparent hover:border-orange-500 hover-lift">
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

          {/* CTA nach den Modulen */}
          <div className="text-center mt-16">
            <a 
              href="#pricing"
              className="inline-block bg-[#ff6b35] text-white px-10 py-4 rounded-lg font-semibold text-lg hover:bg-[#e55a2b] transition shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              🔍 Jetzt strategisch auf deine Bewerbung vorbereiten → Zu den Paketen
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16">Dein unfairer Vorteil</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            <div className="bg-white p-10 rounded-xl shadow-md hover:shadow-lg transition">
              <Target className="w-12 h-12 text-[#ff6b35] mb-6" />
              <h3 className="text-2xl font-semibold mb-4">Warnzeichen-Detektor (Red-Flag-Analyse)</h3>
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

            <div className="bg-white p-10 rounded-xl shadow-md hover:shadow-lg transition">
              <Zap className="w-12 h-12 text-[#ff6b35] mb-6" />
              <h3 className="text-2xl font-semibold mb-4">Fit-Score (Passgenauigkeit) & Handlungsempfehlung</h3>
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

            <div className="bg-white p-10 rounded-xl shadow-md hover:shadow-lg transition">
              <FileText className="w-12 h-12 text-[#ff6b35] mb-6" />
              <h3 className="text-2xl font-semibold mb-4">ATS-Optimierung (für den Bewerbungsroboter)</h3>
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

            <div className="bg-white p-10 rounded-xl shadow-md hover:shadow-lg transition">
              <Linkedin className="w-12 h-12 text-[#ff6b35] mb-6" />
              <h3 className="text-2xl font-semibold mb-4">LinkedIn-Profil-Optimierung</h3>
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

            <div className="bg-white p-10 rounded-xl shadow-md hover:shadow-lg transition">
              <span className="text-5xl mb-6 block">💰</span>
              <h3 className="text-2xl font-semibold mb-4">Gehaltsband-Indikationen</h3>
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
              10 strategische Bewerbungen statt 100 Blindflüge
            </p>
            <p className="text-lg text-gray-600">Mehr Erfolgsquote, weniger Frust</p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-4">Jetzt strategisch auf deine Bewerbung vorbereiten</h2>
          <p className="text-xl text-gray-600 text-center mb-16">
            7 Tage Geld-zurück-Garantie
          </p>

          <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto items-stretch justify-center">
            {/* Starter */}
            <div className="flex-1 bg-white rounded-xl shadow-lg p-8 border-2 border-gray-200 hover:border-[#0a4f5c] transition flex flex-col">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2 text-gray-900">Starter</h3>
                <p className="text-gray-600">Für erste Schritte</p>
              </div>
              <div className="mb-6">
                <span className="text-5xl font-bold text-gray-900">49€</span>
                <span className="text-gray-600">/Monat</span>
              </div>
              <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">3 Job-Analysen</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Warnzeichen-Analyse (Red-Flag-Analyse)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Fit-Score (Passgenauigkeit) &amp; Handlungsempfehlung</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">ATS Keyword Research (für den Bewerbungsroboter)</span>
                </li>
              </ul>
              <a
                href="mailto:post@martinbeyer.de?subject=Ich%20m%C3%B6chte%20gerne%20das%20Starter%20Paket%20f%C3%BCr%2049%20Euro%20buchen.&body=Hallo,%0A%0Aich%20m%C3%B6chte%20gerne%20das%20Starter%20Paket%20buchen.%0A%0AVorname:%0ANachname:%0AAdresse:%0A%0AViele%20Gr%C3%BC%C3%9Fe"
                className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition shadow-md hover:shadow-lg mt-auto text-center"
              >
                Jetzt starten
              </a>
            </div>

            {/* Professional - Featured */}
            <div className="flex-1 rounded-xl shadow-2xl p-8 border-4 relative flex flex-col" style={{ backgroundColor: '#0a4f5c', borderColor: '#ff6b35' }}>
              <div style={{ position: 'absolute', top: '-16px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#ff6b35', color: 'white', padding: '8px 24px', borderRadius: '9999px', fontSize: '14px', fontWeight: 'bold' }}>
                Beliebteste
              </div>
              <div className="mb-6 mt-4">
                <h3 className="text-2xl font-bold mb-2" style={{ color: 'white' }}>Professional</h3>
                <p style={{ color: '#d1d5db' }}>Für aktive Jobsuche</p>
              </div>
              <div className="mb-6">
                <span className="text-5xl font-bold" style={{ color: 'white' }}>129€</span>
                <span style={{ color: '#d1d5db' }}>/Monat</span>
              </div>
              <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#ff6b35' }} />
                  <span style={{ color: 'white' }}>7 Job-Analysen</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#ff6b35' }} />
                  <span style={{ color: 'white' }}>Lebenslauf-Optimierung (CV) - pro Stelle ATS-optimiert (für den Bewerbungsroboter)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#ff6b35' }} />
                  <span style={{ color: 'white' }}>Erweiterte Warnzeichen-Analyse (Red-Flag-Analyse)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#ff6b35' }} />
                  <span style={{ color: 'white' }}>Gehaltsband-Indikationen</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#ff6b35' }} />
                  <span style={{ color: 'white' }}>ATS Keyword Research (für den Bewerbungsroboter)</span>
                </li>
              </ul>
              <a
                href="mailto:post@martinbeyer.de?subject=Ich%20m%C3%B6chte%20gerne%20das%20Professional%20Paket%20f%C3%BCr%20129%20Euro%20buchen.&body=Hallo,%0A%0Aich%20m%C3%B6chte%20gerne%20das%20Professional%20Paket%20buchen.%0A%0AVorname:%0ANachname:%0AAdresse:%0A%0AViele%20Gr%C3%BC%C3%9Fe"
                className="w-full py-3 rounded-lg font-semibold transition shadow-lg hover:shadow-xl transform hover:scale-105 mt-auto text-center"
                style={{ backgroundColor: '#ff6b35', color: 'white', border: 'none', cursor: 'pointer' }}
              >
                Jetzt starten
              </a>
            </div>

            {/* Executive */}
            <div className="flex-1 bg-white rounded-xl shadow-lg p-8 border-2 border-gray-200 hover:border-[#0a4f5c] transition flex flex-col">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2 text-gray-900">Executive</h3>
                <p className="text-gray-600">Für Volloptimierung</p>
              </div>
              <div className="mb-6">
                <span className="text-5xl font-bold text-gray-900">249€</span>
                <span className="text-gray-600">/Monat</span>
              </div>
              <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">10 Job-Analysen</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Lebenslauf-Optimierung (CV) - pro Stelle</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">LinkedIn-Optimierung (1-2x)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Erweiterte Warnzeichen-Analyse (Red-Flag-Analyse)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Gehaltsband-Indikationen</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Priorisierte Verarbeitung (24h)</span>
                </li>
              </ul>
              <a
                href="mailto:post@martinbeyer.de?subject=Ich%20m%C3%B6chte%20gerne%20das%20Executive%20Paket%20f%C3%BCr%20249%20Euro%20buchen.&body=Hallo,%0A%0Aich%20m%C3%B6chte%20gerne%20das%20Executive%20Paket%20buchen.%0A%0AVorname:%0ANachname:%0AAdresse:%0A%0AViele%20Gr%C3%BC%C3%9Fe"
                className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition shadow-md hover:shadow-lg mt-auto text-center"
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
            fontSize: '48px',
            fontWeight: 'bold',
            marginBottom: '24px',
            color: '#ffffff',
            lineHeight: '1.2'
          }}>
            Bewirb dich smarter, nicht härter
          </h2>
          <p style={{ 
            fontSize: '20px',
            marginBottom: '32px',
            color: '#e5e7eb'
          }}>
            Nimm dir die Zeit am Desktop, die deine Karriere verdient.
          </p>
          <button 
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
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#e55a2b';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#ff6b35';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            Jetzt starten
          </button>
          <p style={{ 
            fontSize: '14px',
            marginTop: '16px',
            color: '#d1d5db'
          }}>
            7 Tage Geld-zurück-Garantie • Monatlich kündbar
          </p>
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

