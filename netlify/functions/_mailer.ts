import nodemailer from 'nodemailer';

function mustEnv(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing env var: ${name}`);
  return value;
}

function getBaseUrl() {
  return process.env.BASE_URL || process.env.URL || 'http://localhost:8888';
}

export function getPublicUrls() {
  const baseUrl = getBaseUrl().replace(/\/$/, '');
  return {
    baseUrl,
    checklistUrl: (process.env.CHECKLIST_URL || '/downloads/CV_Basics_Checkliste.pdf').startsWith('http')
      ? (process.env.CHECKLIST_URL as string)
      : `${baseUrl}${process.env.CHECKLIST_URL || '/downloads/CV_Basics_Checkliste.pdf'}`,
    privacyUrl: (process.env.PRIVACY_URL || '/datenschutz').startsWith('http')
      ? (process.env.PRIVACY_URL as string)
      : `${baseUrl}${process.env.PRIVACY_URL || '/datenschutz'}`,
    calendlyUrl: process.env.CALENDLY_URL || '',
  };
}

export function createTransport() {
  // If SMTP env is not configured, we will fallback to console logging (dev-friendly).
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !port || !user || !pass) return null;

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

export async function sendMail(args: {
  to: string;
  subject: string;
  html: string;
  text: string;
}) {
  const from = process.env.SMTP_FROM || 'Smarter2Job <hey@smarter2job.com>';
  const transport = createTransport();

  const message = {
    from,
    to: args.to,
    subject: args.subject,
    text: args.text,
    html: args.html,
  };

  if (!transport) {
    // local dev / no SMTP configured
    console.log('✉️ [DEV] Email would be sent:', message);
    return;
  }

  await transport.sendMail(message);
}

