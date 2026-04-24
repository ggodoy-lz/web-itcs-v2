import { getAdminFromRequest } from '../../lib/auth.js';

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  if (req.method !== 'GET') {
    res.status(405).json({ ok: false });
    return;
  }
  const admin = await getAdminFromRequest(req);
  if (!admin) {
    res.status(401).json({ ok: false });
    return;
  }
  res.status(200).json({ ok: true });
}
