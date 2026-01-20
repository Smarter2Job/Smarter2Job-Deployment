import type { Handler } from '@netlify/functions';
import { getPublicUrls, sendMail } from './_mailer';
import type { SubscriberTag } from './_subscribersStore';
import { isValidEmail, normalizeEmail, createSignedToken } from './_tokens';

const allowedTags: SubscriberTag[] = ['checkliste', 'webinar_next'];

function json(statusCode: number, body: unknown) {
  return {
    statusCode,
    headers: { 'content-type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  };
}

function getClientIp(headers: Record<string, string | undefined>) {
  // best-effort (Netlify sets x-nf-client-connection-ip sometimes)
  return (
    headers['x-nf-client-connection-ip'] ||
    headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    headers['client-ip'] ||
    null
  );
}

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') return json(405, { ok: false, error: 'Method not allowed' });
  if (!event.body) return json(400, { ok: false, error: 'Missing body' });

  let parsed: any;
  try {
    parsed = JSON.parse(event.body);
  } catch {
    return json(400, { ok: false, error: 'Invalid JSON' });
  }

  const emailRaw = String(parsed.email || '');
  const tag = String(parsed.tag || '');
  const source = String(parsed.source || '');

  const email = normalizeEmail(emailRaw);
  if (!isValidEmail(email)) return json(400, { ok: false, error: 'Bitte gib eine gültige E-Mail-Adresse ein.' });
  if (!allowedTags.includes(tag as SubscriberTag)) return json(400, { ok: false, error: 'Ungültiger Tag.' });
  if (!source) return json(400, { ok: false, error: 'Missing source' });

  // Light rate limiting (in-memory, per function instance)
  const ip = getClientIp(event.headers as any);
  const key = `${ip || 'noip'}:${email}`;
  const nowMs = Date.now();
  const rl = (globalThis as any).__LM_RL || new Map<string, number>();
  (globalThis as any).__LM_RL = rl;
  const last = rl.get(key);
  if (last && nowMs - last < 30_000) {
    return json(429, { ok: false, error: 'Bitte warte kurz und versuche es dann erneut.' });
  }
  rl.set(key, nowMs);

  // Create stateless signed token (no store needed)
  const expiresAtMs = Date.now() + 24 * 60 * 60 * 1000; // 24h
  const confirmToken = createSignedToken(email, tag, expiresAtMs);

  const { baseUrl, privacyUrl } = getPublicUrls();
  const confirmUrl = `${baseUrl}/confirm?token=${encodeURIComponent(confirmToken)}`;

  const subject = 'Bitte bestätige kurz deine E-Mail';
  const text =
    `Hi!\n\n` +
    `Bitte bestätige kurz deine E-Mail, damit ich dir die Checkliste/Webinar-Info schicken darf:\n` +
    `${confirmUrl}\n\n` +
    `Abmelden jederzeit. Datenschutz: ${privacyUrl}\n`;

  const html =
    `<p>Hi!</p>` +
    `<p>Bitte bestätige kurz deine E-Mail, damit ich dir die Checkliste/Webinar-Info schicken darf.</p>` +
    `<p><a href="${confirmUrl}">E-Mail bestätigen</a></p>` +
    `<p style="font-size:12px;color:#6b7280">Abmelden jederzeit. <a href="${privacyUrl}">Datenschutz</a>.</p>`;

  try {
    await sendMail({ to: email, subject, text, html });
  } catch (e) {
    console.error('SMTP error:', e);
    return json(500, { ok: false, error: 'Mailversand fehlgeschlagen. Bitte versuche es später erneut.' });
  }

  return json(200, { ok: true, message: 'Bitte bestätige deine E-Mail in deinem Postfach.' });
};

