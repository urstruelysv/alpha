export type AdminSessionPayload = {
  email: string;
  exp: number;
};

const DEFAULT_SESSION_TTL_MS = 1000 * 60 * 60 * 8; // 8 hours

function getEnvOrThrow(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function base64UrlEncodeFromString(input: string): string {
  const b64 = btoa(input);
  return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function base64UrlDecodeToString(input: string): string {
  let b64 = input.replace(/-/g, '+').replace(/_/g, '/');
  const pad = b64.length % 4;
  if (pad) {
    b64 += '='.repeat(4 - pad);
  }
  return atob(b64);
}

function base64UrlEncodeFromBytes(bytes: Uint8Array): string {
  let binary = '';
  for (let i = 0; i < bytes.length; i += 1) {
    binary += String.fromCharCode(bytes[i]);
  }
  return base64UrlEncodeFromString(binary);
}

async function hmacSha256Base64Url(secret: string, data: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );

  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(data));
  return base64UrlEncodeFromBytes(new Uint8Array(signature));
}

function timingSafeEqualString(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i += 1) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

export async function createAdminSession(email: string): Promise<string> {
  const secret = getEnvOrThrow('ADMIN_SECRET');
  const payload: AdminSessionPayload = {
    email,
    exp: Date.now() + DEFAULT_SESSION_TTL_MS,
  };

  const base = base64UrlEncodeFromString(JSON.stringify(payload));
  const sig = await hmacSha256Base64Url(secret, base);

  return `${base}.${sig}`;
}

export async function verifyAdminSession(
  token: string | undefined | null,
): Promise<AdminSessionPayload | null> {
  if (!token) {
    return null;
  }

  const secret = process.env.ADMIN_SECRET;
  if (!secret) {
    return null;
  }

  const parts = token.split('.');
  if (parts.length !== 2) {
    return null;
  }

  const [base, sig] = parts;
  const expectedSig = await hmacSha256Base64Url(secret, base);

  if (!timingSafeEqualString(sig, expectedSig)) {
    return null;
  }

  try {
    const json = base64UrlDecodeToString(base);
    const payload = JSON.parse(json) as AdminSessionPayload;
    if (typeof payload.exp !== 'number' || payload.exp < Date.now()) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}


