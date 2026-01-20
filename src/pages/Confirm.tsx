import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { trackEvent } from '../utils/analytics';

type ConfirmResponse =
  | { ok: true; message: string; tags?: string[]; source?: string }
  | { ok: false; error: string };

export default function Confirm() {
  const [params] = useSearchParams();
  const [state, setState] = useState<'loading' | 'ok' | 'error'>('loading');
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const token = params.get('token') || '';

    const run = async () => {
      if (!token) {
        setState('error');
        setMessage('Link ungültig oder abgelaufen.');
        return;
      }

      try {
        const res = await fetch(`/.netlify/functions/confirm?token=${encodeURIComponent(token)}`);
        const data: ConfirmResponse = await res.json().catch(() => ({ ok: false, error: 'Unbekannter Fehler' }));

        if (!res.ok || !data.ok) {
          setState('error');
          setMessage((data as any).error || 'Link ungültig oder abgelaufen.');
          return;
        }

        setState('ok');
        setMessage(data.message);

        const tags = data.tags || [];
        for (const tag of tags) {
          trackEvent('leadmagnet_confirmed', { tag, source: data.source || 'unknown' });
        }
      } catch {
        setState('error');
        setMessage('Link ungültig oder abgelaufen.');
      }
    };

    void run();
  }, [params]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-xl w-full text-center py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Bestätigung</h1>

        {state === 'loading' && <p className="text-gray-600">Wir prüfen deinen Link…</p>}

        {state === 'ok' && (
          <>
            <p className="text-gray-700">{message}</p>
            <div className="mt-8">
              <Link to="/" className="underline text-[#0a4f5c]">
                Zurück zur Startseite
              </Link>
            </div>
          </>
        )}

        {state === 'error' && (
          <>
            <p className="text-gray-700">{message}</p>
            <div className="mt-6 space-y-3">
              <Link to="/#checkliste" className="underline text-[#0a4f5c] block">
                Bestätigung erneut anfordern
              </Link>
              <Link to="/datenschutz" className="underline text-gray-600 block">
                Datenschutz
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

