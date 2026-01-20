import type { Handler } from '@netlify/functions';
import { getPublicUrls, sendMail } from './_mailer';
import { verifySignedToken, randomToken, sha256Hex } from './_tokens';
import type { SubscriberTag } from './_subscribersStore';

function json(statusCode: number, body: unknown) {
  return {
    statusCode,
    headers: { 'content-type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  };
}

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'GET') return json(405, { ok: false, error: 'Method not allowed' });

  const token = event.queryStringParameters?.token || '';
  if (!token) return json(400, { ok: false, error: 'Missing token' });

  // Verify stateless token (no store lookup needed)
  const verified = verifySignedToken(token);
  if (!verified) {
    // Log for debugging (without exposing sensitive data)
    console.error('Token verification failed', {
      tokenLength: token.length,
      hasTokenSecret: !!process.env.TOKEN_SECRET,
      hasBaseUrl: !!process.env.BASE_URL,
    });
    return json(400, { ok: false, error: 'Link ungültig oder abgelaufen.' });
  }

  const { email, tag } = verified;
  const tags: SubscriberTag[] = [tag as SubscriberTag];

  // Generate unsubscribe token for follow-up mails
  const unsubscribeToken = randomToken(32);
  const unsubscribeTokenHash = sha256Hex(unsubscribeToken);

  const { checklistUrl, privacyUrl, baseUrl } = getPublicUrls();

  // Send follow-up mail(s) depending on tag
  try {
    if (tags.includes('checkliste')) {
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

    if (tags.includes('webinar_next')) {
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
    tags,
  });
};

