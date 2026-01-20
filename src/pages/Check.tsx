import LeadMagnetCard from '../components/LeadMagnetCard';

export default function Check() {
  return (
    <div className="min-h-screen bg-white" style={{ paddingTop: 'clamp(100px, 12vh, 180px)' }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Gratis Bewerbungs-Checkliste 2026
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            In 5 Minuten prüfen: Schlüsselbegriffe, Aufbau, häufige Fehler – damit du nicht am ATS scheiterst.
          </p>
        </div>

        <div className="mb-8">
          <LeadMagnetCard
            placement="check_page"
            variant="primary"
            tag="checkliste"
            headline="Kostenlose Bewerbungs-Checkliste"
            subline="In 5 Minuten prüfen: Schlüsselbegriffe, Aufbau, häufige Fehler – damit du nicht am ATS scheiterst."
            buttonText="Checkliste per E-Mail erhalten"
            successText="Bitte bestätige deine E-Mail (schau in dein Postfach)."
          />
        </div>

        <div className="mt-12 space-y-6">
          <div className="text-center text-gray-600">
            <p className="text-sm mb-4">
              Kein Spam. Abmelden jederzeit.{' '}
              <a href="/datenschutz" className="underline">
                Datenschutz
              </a>
              .
            </p>
          </div>
          
          <div className="text-center">
            <p className="text-gray-700 mb-3">
              Regelmäßige Webinare. <a href="/#checkliste" className="text-[#0a4f5c] hover:underline font-medium">Melde dich jetzt schon an</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
