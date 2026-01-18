import { useState } from 'react';
import { Mail } from 'lucide-react';
import type { PackageId } from '../lib/packages';

interface BuyButtonProps {
  packageId: PackageId;
  buttonText: string;
  highlight?: boolean;
  className?: string;
}

export default function BuyButton({ packageId, buttonText, highlight = false, className = '' }: BuyButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePayment = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/.netlify/functions/mollie-create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          packageId,
        }),
      });

      // Check if response is ok and has content
      if (!response.ok) {
        const text = await response.text();
        let errorMessage = 'Zahlung konnte nicht gestartet werden';
        try {
          const data = JSON.parse(text);
          errorMessage = data.error || errorMessage;
        } catch {
          errorMessage = text || `Server-Fehler (${response.status})`;
        }
        throw new Error(errorMessage);
      }

      const text = await response.text();
      if (!text) {
        throw new Error('Leere Antwort vom Server. Bitte stelle sicher, dass Netlify Functions laufen (netlify dev).');
      }

      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        throw new Error(`Ungültige Antwort vom Server: ${text.substring(0, 100)}`);
      }
      
      // Weiterleitung zur Mollie Checkout-Seite
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        throw new Error('Keine Checkout-URL erhalten');
      }
    } catch (err: any) {
      console.error('Payment error:', err);
      setError(err.message || 'Ein Fehler ist aufgetreten');
      setLoading(false);
    }
  };

  if (error) {
    return (
      <div className="w-full mt-auto">
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-3">
          <p className="text-red-800 text-sm">{error}</p>
        </div>
        <button
          onClick={handlePayment}
          className={`w-full text-center py-3 px-6 rounded-lg font-semibold transition flex items-center justify-center gap-2 ${
            highlight ? 'text-white' : 'border-2'
          } ${className}`}
          style={{
            backgroundColor: highlight ? '#ff6b35' : 'transparent',
            color: highlight ? 'white' : '#0a4f5c',
            borderColor: highlight ? 'transparent' : '#0a4f5c',
          }}
        >
          Erneut versuchen
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className={`w-full mt-auto text-center py-3 px-6 rounded-lg font-semibold transition flex items-center justify-center gap-2 ${
        highlight ? 'text-white' : 'border-2'
      } ${className}`}
      style={{
        backgroundColor: highlight ? '#ff6b35' : 'transparent',
        color: highlight ? 'white' : '#0a4f5c',
        borderColor: highlight ? 'transparent' : '#0a4f5c',
        opacity: loading ? 0.7 : 1,
        cursor: loading ? 'wait' : 'pointer',
      }}
      onMouseOver={(e) => {
        if (!loading && !highlight) {
          e.currentTarget.style.backgroundColor = '#0a4f5c';
          e.currentTarget.style.color = 'white';
        } else if (!loading && highlight) {
          e.currentTarget.style.backgroundColor = '#e55a2b';
        }
      }}
      onMouseOut={(e) => {
        if (!loading && !highlight) {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = '#0a4f5c';
        } else if (!loading && highlight) {
          e.currentTarget.style.backgroundColor = '#ff6b35';
        }
      }}
    >
      {loading ? (
        <>
          <span className="inline-block animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-current mr-2"></span>
          Wird geladen...
        </>
      ) : (
        <>
          <Mail className="w-4 h-4" />
          {buttonText}
        </>
      )}
    </button>
  );
}
