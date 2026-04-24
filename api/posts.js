import { getStore } from '../lib/store.js';
import { publishedSorted } from '../lib/blog-logic.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  try {
    const data = await getStore();
    const posts = publishedSorted(data.posts || []);
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
    res.status(200).json({ posts });
  } catch (e) {
    console.error(e);
    res.status(503).json({ error: String(e.message || e) });
  }
}
