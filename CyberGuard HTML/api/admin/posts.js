import { getStore, setStore } from '../../lib/store.js';
import { getAdminFromRequest } from '../../lib/auth.js';
import { readJson } from '../lib/read-json.js';
import {
  sanitizeBody,
  slugify,
  normalizeSlug,
  uniqueSlug,
  nextId,
} from '../../lib/blog-logic.js';

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  const admin = await getAdminFromRequest(req);
  if (!admin) {
    res.status(401).json({ ok: false, error: 'No autorizado' });
    return;
  }

  try {
    if (req.method === 'GET') {
      const data = await getStore();
      res.status(200).json({ posts: data.posts || [] });
      return;
    }

    if (req.method === 'POST') {
      const body = await readJson(req);
      const post = body.post;
      if (!post || typeof post !== 'object') {
        res.status(400).json({ ok: false, error: 'Falta post' });
        return;
      }

      const title = String(post.title || '').trim();
      const excerpt = String(post.excerpt || '').trim();
      let bodyHtml = sanitizeBody(String(post.body || ''));
      const slugIn = String(post.slug || '').trim();
      const category = String(post.category || '').trim();
      const readMinutes = Math.min(120, Math.max(1, parseInt(String(post.read_minutes), 10) || 5));
      let gradient = String(post.gradient || 'a');
      if (!['a', 'b', 'c'].includes(gradient)) gradient = 'a';
      const ctaLabel = String(post.cta_label || 'Contacto').trim();
      const ctaUrl = String(post.cta_url || 'contact.html').trim();
      const published = Boolean(post.published);
      const id = parseInt(String(post.id), 10) || 0;

      if (!title || !excerpt || !bodyHtml) {
        res.status(400).json({ ok: false, error: 'Título, resumen y cuerpo son obligatorios' });
        return;
      }

      const data = await getStore();
      const posts = Array.isArray(data.posts) ? [...data.posts] : [];
      const now = new Date().toISOString();

      const baseSlug = slugIn ? normalizeSlug(slugIn) : slugify(title);
      const slug = uniqueSlug(posts, baseSlug, id > 0 ? id : null);

      if (id > 0) {
        const idx = posts.findIndex((p) => Number(p.id) === id);
        if (idx === -1) {
          res.status(404).json({ ok: false, error: 'Entrada no encontrada' });
          return;
        }
        const created = posts[idx].created_at || now;
        posts[idx] = {
          id,
          title,
          slug,
          category,
          read_minutes: readMinutes,
          excerpt,
          body: bodyHtml,
          gradient,
          cta_label: ctaLabel,
          cta_url: ctaUrl,
          created_at: created,
          published,
        };
      } else {
        const newId = nextId(posts);
        posts.push({
          id: newId,
          title,
          slug,
          category,
          read_minutes: readMinutes,
          excerpt,
          body: bodyHtml,
          gradient,
          cta_label: ctaLabel,
          cta_url: ctaUrl,
          created_at: now,
          published,
        });
      }

      await setStore({ posts });
      res.status(200).json({ ok: true });
      return;
    }

    if (req.method === 'DELETE') {
      const id = parseInt(String(req.query?.id || ''), 10);
      if (!id) {
        res.status(400).json({ ok: false, error: 'Falta id' });
        return;
      }
      const data = await getStore();
      const posts = (data.posts || []).filter((p) => Number(p.id) !== id);
      await setStore({ posts });
      res.status(200).json({ ok: true });
      return;
    }

    res.status(405).json({ ok: false, error: 'Method not allowed' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: String(e.message || e) });
  }
}
