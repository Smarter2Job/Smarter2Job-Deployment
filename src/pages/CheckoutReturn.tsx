import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';

type PaymentStatus = 'open' | 'pending' | 'paid' | 'failed' | 'canceled' | 'expired' | 'loading' | 'error';

export default function CheckoutReturn() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [status, setStatus] = useState<PaymentStatus>('loading');
  const [pollCount, setPollCount] = useState(0);
  const maxPolls = 15; // 30 Sekunden (15 * 2s)

  useEffect(() => {
    if (!orderId) {
      setStatus('error');
      return;
    }

    const pollStatus = async () => {
      try {
        const response = await fetch(`/.netlify/functions/mollie-status?orderId=${orderId}`);
        if (!response.ok) {
          throw new Error('Status check failed');
        }
        const data = await response.json();
        setStatus(data.status as PaymentStatus);

        // Wenn paid oder finaler Fehler, stoppe polling
        if (['paid', 'failed', 'canceled', 'expired'].includes(data.status)) {
          return;
        }

        // Weiter pollen wenn noch nicht final
        if (pollCount < maxPolls) {
          setTimeout(() => {
            setPollCount(prev => prev + 1);
          }, 2000);
        }
      } catch (error) {
        console.error('Error polling status:', error);
        if (pollCount >= maxPolls) {
          setStatus('error');
        } else {
          setTimeout(() => {
            setPollCount(prev => prev + 1);
          }, 2000);
        }
      }
    };

    // Ersten Check sofort, dann alle 2 Sekunden
    pollStatus();
    const interval = setInterval(pollStatus, 2000);

    return () => clearInterval(interval);
  }, [orderId, pollCount]);

  if (!orderId) {
    return (
      <div className="min-h-screen bg-white page-content">
        <div className="container-narrow text-center py-20">
          <h1 className="text-3xl font-bold mb-4">Fehler</h1>
          <p className="text-gray-600 mb-6">Keine Bestellnummer gefunden.</p>
          <Link
            to="/preise"
            className="btn btn-primary"
            style={{ backgroundColor: '#ff6b35', textDecoration: 'none' }}
          >
            Zurück zu den Preisen
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white page-content">
      <div className="container-narrow text-center py-20">
        {status === 'loading' || status === 'open' || status === 'pending' ? (
          <>
            <h1 className="text-3xl font-bold mb-4" style={{ color: 'var(--text)' }}>
              Danke! Wir prüfen deine Zahlung…
            </h1>
            <p className="text-gray-600 mb-6">
              Bitte warte einen Moment, während wir den Status deiner Zahlung prüfen.
            </p>
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0a4f5c]"></div>
          </>
        ) : status === 'paid' ? (
          <>
            <h1 className="text-3xl font-bold mb-4" style={{ color: 'var(--text)' }}>
              Zahlung erfolgreich!
            </h1>
            <p className="text-gray-600 mb-6">
              Deine Zahlung wurde erfolgreich verarbeitet. Wir werden uns in Kürze bei dir melden.
            </p>
            <Link
              to="/danke"
              className="btn btn-primary btn-lg"
              style={{ backgroundColor: '#ff6b35', textDecoration: 'none' }}
            >
              Weiter
            </Link>
          </>
        ) : status === 'failed' || status === 'canceled' || status === 'expired' ? (
          <>
            <h1 className="text-3xl font-bold mb-4" style={{ color: 'var(--text)' }}>
              Zahlung nicht erfolgreich
            </h1>
            <p className="text-gray-600 mb-6">
              {status === 'canceled' && 'Die Zahlung wurde abgebrochen.'}
              {status === 'expired' && 'Die Zahlung ist abgelaufen.'}
              {status === 'failed' && 'Die Zahlung konnte nicht verarbeitet werden.'}
            </p>
            <Link
              to="/preise"
              className="btn btn-primary"
              style={{ backgroundColor: '#ff6b35', textDecoration: 'none' }}
            >
              Erneut versuchen
            </Link>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-4" style={{ color: 'var(--text)' }}>
              Fehler
            </h1>
            <p className="text-gray-600 mb-6">
              Wir konnten den Status deiner Zahlung nicht ermitteln. Bitte kontaktiere uns.
            </p>
            <Link
              to="/preise"
              className="btn btn-primary"
              style={{ backgroundColor: '#ff6b35', textDecoration: 'none' }}
            >
              Zurück zu den Preisen
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
