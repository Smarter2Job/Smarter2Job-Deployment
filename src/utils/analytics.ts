type AnalyticsEventName =
  | 'leadmagnet_view'
  | 'leadmagnet_submit'
  | 'leadmagnet_confirmed'
  | 'calendly_click';

export function trackEvent(
  name: AnalyticsEventName,
  props?: Record<string, string | number | boolean | null | undefined>
) {
  if (typeof window === 'undefined') return;

  const payload = { event: name, ...(props ?? {}) };

  // Google Tag / gtag
  const gtag = (window as any).gtag;
  if (typeof gtag === 'function') {
    // gtag expects eventName separately; props are the params
    gtag('event', name, props ?? {});
    return;
  }

  // dataLayer fallback
  const dataLayer = (window as any).dataLayer;
  if (Array.isArray(dataLayer)) {
    dataLayer.push(payload);
  }
}

