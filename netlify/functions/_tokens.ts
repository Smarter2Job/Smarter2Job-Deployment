import crypto from 'node:crypto';

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function isValidEmail(email: string) {
  // pragmatic validation; keep it simple
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function randomToken(bytes = 32) {
  // URL-safe token
  return crypto.randomBytes(bytes).toString('base64url');
}

export function sha256Hex(input: string) {
  return crypto.createHash('sha256').update(input).digest('hex');
}

