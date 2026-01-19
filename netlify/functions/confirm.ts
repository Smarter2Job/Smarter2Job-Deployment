import type { Handler } from '@netlify/functions';
import { getPublicUrls, sendMail } from './_mailer';
import { subscribersStore, type SubscriberRecord } from './_subscribersStore';
import { normalizeEmail, randomToken, sha256Hex } from './_tokens';

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
  if (!record) return json(404, { ok: false, error: 'Link ungültig oder abgelaufen.' });

  const tokenHash = sha256Hex(String(token));
  if (!record.confirmTokenHash || record.confirmTokenHash !== tokenHash) {
    return json(400, { ok: false, error: 'Link ungültig oder abgelaufen.' });
  }
  if (record.confirmExpiresAt && Date.parse(record.confirmExpiresAt) < Date.now()) {
    return json(400, { ok: false, error: 'Link abgelaufen. Bitte fordere die Bestätigung erneut an.' });
  }

  const nowIso = new Date().toISOString();
  // For 1-click unsubscribe links in outgoing mails we mint a fresh token and store only its hash.
  const unsubscribeToken = randomToken(32);
  const unsubscribeTokenHash = sha256Hex(unsubscribeToken);

  const updated: SubscriberRecord = {
    ...record,
    status: 'active',
    confirmTokenHash: null,
    confirmExpiresAt: null,
    unsubscribeTokenHash,
    updatedAt: nowIso,
  };
  await store.set(email, updated);

  const { checklistUrl, privacyUrl, baseUrl } = getPublicUrls();

  // Send follow-up mail(s) depending on tags
  try {
    if (updated.tags.includes('checkliste')) {
      const subject = 'Deine Bewerbungs-Checkliste';
      const unsubscribeUrl = `${baseUrl}/unsubscribe?email=${encodeURIComponent(email)}&token=${encodeURIComponent(unsubscribeToken)}`;
      const text =
        `Hi!\n\n` +
        `Hier ist deine Bewerbungs-Checkliste:\n${checklistUrl}\n\n` +
        `Wenn du willst, teste vorher noch schnell die Warnsignale in einer konkreten Stelle.\n\n` +
        `Abmelden: ${unsubscribeUrl}\nDatenschutz: ${privacyUrl}\n`;
      const html =
        `<p>Hi!</p>` +
        `<p>Hier ist deine Bewerbungs-Checkliste:</p>` +
        `<p><a href="${checklistUrl}">Checkliste öffnen</a></p>` +
        `<p>Wenn du willst, teste vorher noch schnell die Warnsignale in einer konkreten Stelle.</p>` +
        `<p style="font-size:12px;color:#6b7280"><a href="${unsubscribeUrl}">Abmelden</a> · <a href="${privacyUrl}">Datenschutz</a>.</p>`;

      await sendMail({
        to: email,
        subject,
        text,
        html,
      });
    }

    if (updated.tags.includes('webinar_next')) {
      const subject = 'Du bist fürs nächste Webinar eingetragen';
      const unsubscribeUrl = `${baseUrl}/unsubscribe?email=${encodeURIComponent(email)}&token=${encodeURIComponent(unsubscribeToken)}`;
      const text =
        `Hi!\n\n` +
        `Du bist fürs nächste Webinar eingetragen.\n` +
        `Sobald Termin & Link feststehen, bekommst du die Einladung per E-Mail.\n\n` +
        `Abmelden: ${unsubscribeUrl}\nDatenschutz: ${privacyUrl}\n`;
      const html =
        `<p>Hi!</p>` +
        `<p>Du bist fürs nächste Webinar eingetragen.</p>` +
        `<p>Sobald Termin & Link feststehen, bekommst du die Einladung per E-Mail.</p>` +
        `<p style="font-size:12px;color:#6b7280"><a href="${unsubscribeUrl}">Abmelden</a> · <a href="${privacyUrl}">Datenschutz</a>.</p>`;
      await sendMail({ to: email, subject, text, html });
    }
  } catch (e) {
    console.error('SMTP error:', e);
    // Confirmation succeeded; mail failure is secondary
  }

  return json(200, {
    ok: true,
    message: 'Erledigt – schau in dein Postfach.',
    tags: updated.tags,
    source: updated.source,
  });
};

