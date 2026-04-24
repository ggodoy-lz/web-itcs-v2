import { timingSafeEqual } from 'crypto';
import { signAdminToken, setSessionCookieHeader } from '../../lib/auth.js';
import { readJson } from '../lib/read-json.js';

function safeEqualStr(a, b) {
  const ba = Buffer.from(String(a), 'utf8');
  const bb = Buffer.from(String(b), 'utf8');
  if (ba.length !== bb.length) return false;
  return timingSafeEqual(ba, bb);
}

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'Method not allowed' });
    return;
  }
  const adminPass = process.env.ADMIN_PASSWORD;
  if (!adminPass) {
    res.status(500).json({ ok: false, error: 'ADMIN_PASSWORD no configurada en el proyecto.' });
    return;
  }
  try {
    const body = await readJson(req);
    const password = body.password;
    if (!safeEqualStr(password || '', adminPass)) {
      res.status(401).json({ ok: false, error: 'Contraseña incorrecta' });
      return;
    }
    const token = await signAdminToken();
    res.setHeader('Set-Cookie', setSessionCookieHeader(token));
    res.status(200).json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: String(e.message || e) });
  }
}
