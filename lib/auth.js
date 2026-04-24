import { jwtVerify, SignJWT } from 'jose';
import { parse as parseCookie } from 'cookie';

const COOKIE = 'itcs_admin';

export function parseCookies(header) {
  return header ? parseCookie(header) : {};
}

export async function signAdminToken() {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error('JWT_SECRET debe tener al menos 16 caracteres (configurá en Vercel → Environment Variables).');
  }
  const key = new TextEncoder().encode(secret);
  return new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(key);
}

export async function verifyAdminToken(token) {
  if (!token) return null;
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) return null;
    const key = new TextEncoder().encode(secret);
    const { payload } = await jwtVerify(token, key);
    return payload;
  } catch {
    return null;
  }
}

export async function getAdminFromRequest(req) {
  const cookies = parseCookies(req.headers.cookie || '');
  return verifyAdminToken(cookies[COOKIE]);
}

export function setSessionCookieHeader(token) {
  const secure = process.env.VERCEL === '1' || process.env.NODE_ENV === 'production';
  const maxAge = 60 * 60 * 24 * 7;
  const flags = [`${COOKIE}=${token}`, 'Path=/', 'HttpOnly', `Max-Age=${maxAge}`, 'SameSite=Lax'];
  if (secure) flags.push('Secure');
  return flags.join('; ');
}

export function clearSessionCookieHeader() {
  const secure = process.env.VERCEL === '1' || process.env.NODE_ENV === 'production';
  const flags = [`${COOKIE}=`, 'Path=/', 'HttpOnly', 'Max-Age=0', 'SameSite=Lax'];
  if (secure) flags.push('Secure');
  return flags.join('; ');
}

export { COOKIE };
