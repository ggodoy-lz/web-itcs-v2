import { getStore } from '../lib/store.js';
import { findPublishedBySlug } from '../lib/blog-logic.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  const slug = (req.query?.slug || '').trim();
  if (!slug) {
    res.status(400).json({ error: 'Falta slug' });
    return;
  }
  try {
    const data = await getStore();
    const post = findPublishedBySlug(data.posts || [], slug);
    if (!post) {
      res.status(404).json({ error: 'No encontrado' });
      return;
    }
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
    res.status(200).json({ post });
  } catch (e) {
    console.error(e);
    res.status(503).json({ error: String(e.message || e) });
  }
}
