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

/**
 * Get token signing secret from env (fallback for local dev)
 * Uses a consistent fallback to ensure tokens work across function instances.
 */
function getTokenSecret(): string {
  // Prefer explicit TOKEN_SECRET, then use a consistent fallback
  if (process.env.TOKEN_SECRET) {
    return process.env.TOKEN_SECRET;
  }
  // Use BASE_URL as a consistent identifier (should be same across all instances)
  if (process.env.BASE_URL) {
    // Use BASE_URL as part of the secret for consistency
    return `s2j-token-${process.env.BASE_URL}`;
  }
  // Last resort: consistent dev secret
  return 's2j-dev-secret-2026';
}

/**
 * Create a signed token containing email, tag, and expiry.
 * Format: base64url(email|tag|expiresAt|signature)
 */
export function createSignedToken(email: string, tag: string, expiresAtMs: number): string {
  const secret = getTokenSecret();
  const payload = `${email}|${tag}|${expiresAtMs}`;
  const hmac = crypto.createHmac('sha256', secret).update(payload).digest('base64url');
  const token = `${payload}|${hmac}`;
  return Buffer.from(token).toString('base64url');
}

/**
 * Verify and extract data from a signed token.
 * Returns { email, tag, expiresAtMs } if valid, null otherwise.
 */
export function verifySignedToken(token: string): { email: string; tag: string; expiresAtMs: number } | null {
  try {
    const secret = getTokenSecret();
    const decoded = Buffer.from(token, 'base64url').toString('utf-8');
    const parts = decoded.split('|');
    if (parts.length !== 4) {
      console.error('Token verification: invalid parts count', { partsCount: parts.length });
      return null;
    }

    const [email, tag, expiresAtStr, signature] = parts;
    const payload = `${email}|${tag}|${expiresAtStr}`;
    const expectedHmac = crypto.createHmac('sha256', secret).update(payload).digest('base64url');

    if (signature !== expectedHmac) {
      console.error('Token verification: signature mismatch', {
        email,
        tag,
        signatureLength: signature.length,
        expectedLength: expectedHmac.length,
      });
      return null; // Invalid signature
    }

    const expiresAtMs = Number.parseInt(expiresAtStr, 10);
    if (Number.isNaN(expiresAtMs)) {
      console.error('Token verification: invalid expiry', { expiresAtStr });
      return null;
    }
    if (expiresAtMs < Date.now()) {
      console.error('Token verification: expired', { expiresAtMs, now: Date.now() });
      return null; // Expired
    }

    return { email: normalizeEmail(email), tag, expiresAtMs };
  } catch (e) {
    console.error('Token verification: exception', { error: e instanceof Error ? e.message : String(e) });
    return null;
  }
}

