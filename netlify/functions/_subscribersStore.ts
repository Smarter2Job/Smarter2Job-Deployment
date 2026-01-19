import { getStore } from '@netlify/blobs';

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

const STORE_NAME = 'subscribers_v1';

export function subscribersStore() {
  return getStore(STORE_NAME);
}

