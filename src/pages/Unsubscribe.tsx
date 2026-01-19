import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

type UnsubscribeResponse = { ok: true; message: string } | { ok: false; error: string };

export default function Unsubscribe() {
  const [params] = useSearchParams();
  const [state, setState] = useState<'loading' | 'ok' | 'error'>('loading');
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const email = params.get('email') || '';
    const token = params.get('token') || '';

    const run = async () => {
      try {
        const res = await fetch(
          `/.netlify/functions/unsubscribe?email=${encodeURIComponent(email)}&token=${encodeURIComponent(token)}`
        );
        const data: UnsubscribeResponse = await res.json().catch(() => ({ ok: false, error: 'Unbekannter Fehler' }));

        if (!res.ok || !data.ok) {
          setState('error');
          setMessage((data as any).error || 'Link ungültig.');
          return;
        }

        setState('ok');
        setMessage(data.message);
      } catch {
        setState('error');
        setMessage('Link ungültig.');
      }
    };

    void run();
  }, [params]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-xl w-full text-center py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Abmeldung</h1>

        {state === 'loading' && <p className="text-gray-600">Wir melden dich ab…</p>}

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
            <div className="mt-6">
              <Link to="/datenschutz" className="underline text-gray-600">
                Datenschutz
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

