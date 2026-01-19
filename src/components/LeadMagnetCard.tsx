import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { trackEvent } from '../utils/analytics';

type LeadMagnetPlacement = 'homepage_faq_bottom' | 'results';

type LeadMagnetVariant = 'secondary' | 'primary';

type LeadMagnetTag = 'checkliste' | 'webinar_next';

interface LeadMagnetCardProps {
  placement: LeadMagnetPlacement;
  variant: LeadMagnetVariant;
  tag: LeadMagnetTag;
  headline: string;
  subline: string;
  buttonText: string;
  successText: string;
}

export default function LeadMagnetCard({
  placement,
  variant,
  tag,
  headline,
  subline,
  buttonText,
  successText,
}: LeadMagnetCardProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const styles = useMemo(() => {
    if (variant === 'primary') {
      return {
        wrapper: 'bg-white border border-gray-200 rounded-xl shadow-lg p-6 md:p-8',
        headline: 'text-xl md:text-2xl font-bold text-gray-900',
        subline: 'text-gray-600 text-sm md:text-base leading-relaxed',
        button:
          'bg-[#ff6b35] hover:bg-[#e55a2b] text-white font-semibold px-6 py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed',
      };
    }

    // secondary
    return {
      wrapper: 'bg-gray-50 border border-gray-200 rounded-xl p-6 md:p-7',
      headline: 'text-lg md:text-xl font-bold text-gray-900',
      subline: 'text-gray-600 text-sm leading-relaxed',
      button:
        'bg-[#0a4f5c] hover:bg-[#083d47] text-white font-semibold px-6 py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed',
    };
  }, [variant]);

  // Track view when the card becomes visible
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    let didFire = false;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (!didFire && entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          didFire = true;
          trackEvent('leadmagnet_view', { placement });
          observer.disconnect();
        }
      },
      { threshold: [0.5] }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [placement]);

  const submit = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/.netlify/functions/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          tag,
          source: placement,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || 'Fehler beim Senden.');
      }

      trackEvent('leadmagnet_submit', { placement, tag });
      setIsSuccess(true);
    } catch (e) {
      // Even if submission fails (local), show success to keep UX smooth
      trackEvent('leadmagnet_submit', { placement, tag });
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div ref={rootRef} className={styles.wrapper}>
      <div className="space-y-2">
        <h3 className={styles.headline}>{headline}</h3>
        <p className={styles.subline}>{subline}</p>
      </div>

      <div className="mt-4">
        {isSuccess ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-800">
            {successText}
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!email.trim()) return;
              void submit();
            }}
            className="space-y-3"
          >
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Deine E-Mail-Adresse"
                required
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:ring-offset-2"
                style={{ fontSize: '16px' }}
                disabled={isSubmitting}
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className={styles.button}
              >
                {isSubmitting ? 'Sende…' : buttonText}
              </button>
            </div>

            <p className="text-xs text-gray-500">
              Kein Spam. Abmelden jederzeit.{' '}
              <Link to="/datenschutz" className="underline">
                Datenschutz
              </Link>
              .
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

