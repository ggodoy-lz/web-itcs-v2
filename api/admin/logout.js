import { clearSessionCookieHeader } from '../../lib/auth.js';

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false });
    return;
  }
  res.setHeader('Set-Cookie', clearSessionCookieHeader());
  res.status(200).json({ ok: true });
}
