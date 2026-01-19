import type { Handler } from '@netlify/functions';
import { subscribersStore, type SubscriberRecord } from './_subscribersStore';
import { normalizeEmail, sha256Hex } from './_tokens';

function json(statusCode: number, body: unknown) {
  return {
    statusCode,
    headers: { 'content-type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  };
}

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'GET') return json(405, { ok: false, error: 'Method not allowed' });

  const emailRaw = event.queryStringParameters?.email || '';
  const token = event.queryStringParameters?.token || '';
  const email = normalizeEmail(String(emailRaw));
  if (!email || !token) return json(400, { ok: false, error: 'Missing email/token' });

  const store = subscribersStore();
  const record = (await store.get(email, { type: 'json' }).catch(() => null)) as SubscriberRecord | null;
  if (!record) return json(404, { ok: false, error: 'Link ungültig.' });

  const tokenHash = sha256Hex(String(token));
  if (!record.unsubscribeTokenHash || record.unsubscribeTokenHash !== tokenHash) {
    return json(400, { ok: false, error: 'Link ungültig.' });
  }

  const nowIso = new Date().toISOString();
  await store.set(email, { ...record, status: 'unsubscribed', updatedAt: nowIso });
  return json(200, { ok: true, message: 'Du bist abgemeldet.' });
};

