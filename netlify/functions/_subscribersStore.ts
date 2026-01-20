export type SubscriberStatus = 'pending' | 'active' | 'unsubscribed';
export type SubscriberTag = 'checkliste' | 'webinar_next';

export interface SubscriberRecord {
  id: string;
  email: string; // normalized lowercase
  status: SubscriberStatus;
  tags: SubscriberTag[];
  source: string; // e.g. homepage_faq_bottom, results
  consentAt: string; // ISO
  consentIp?: string | null;
  consentUserAgent?: string | null;
  confirmTokenHash?: string | null;
  confirmExpiresAt?: string | null; // ISO
  unsubscribeTokenHash: string;
  createdAt: string; // ISO
  updatedAt: string; // ISO
}

// Aktuell nutzen wir für das MVP nur einen einfachen In‑Memory‑Store.
// Das reicht für den Double‑Opt‑in‑Flow und vermeidet die Abhängigkeit
// von Netlify Blobs (die in deinem Account nicht aktiviert sind).

type StoreLike = {
  get: (key: string, options?: { type?: 'json' }) => Promise<unknown>;
  set: (key: string, value: unknown) => Promise<void>;
};

const memoryStore = new Map<string, unknown>();

export function subscribersStore(): StoreLike {
  return {
    async get(key: string) {
      return memoryStore.get(key) ?? null;
    },
    async set(key: string, value: unknown) {
      memoryStore.set(key, value);
    },
  };
}

