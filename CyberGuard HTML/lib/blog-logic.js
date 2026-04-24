/**
 * Misma lógica que includes/blog_store.php (slugs, saneo, orden).
 */

export function slugify(title) {
  const s = String(title)
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return s || 'articulo';
}

export function normalizeSlug(input) {
  const s = String(input || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return s || 'articulo';
}

export function sanitizeBody(html) {
  let h = String(html);
  h = h.replace(/<(script|iframe|object|embed|form|style)\b[^>]*>[\s\S]*?<\/\1>/gi, '');
  h = h.replace(/<(script|iframe|object|embed|form|style)\b[^>]*\/>/gi, '');
  h = h.replace(/\s*on\w+\s*=\s*(["']).*?\1/gi, '');
  h = h.replace(/javascript:/gi, '');
  return h;
}

export function slugExists(posts, slug, exceptId) {
  return posts.some((p) => p.slug === slug && (exceptId == null || Number(p.id) !== Number(exceptId)));
}

export function nextId(posts) {
  let max = 0;
  for (const p of posts) {
    const id = Number(p.id) || 0;
    if (id > max) max = id;
  }
  return max + 1;
}

export function uniqueSlug(posts, base, exceptId) {
  let slug = base;
  let n = 2;
  while (slugExists(posts, slug, exceptId)) {
    slug = `${base}-${n}`;
    n += 1;
  }
  return slug;
}

export function publishedSorted(posts) {
  return posts
    .filter((p) => p && p.published)
    .sort((a, b) => String(b.created_at || '').localeCompare(String(a.created_at || '')));
}

export function findPublishedBySlug(posts, slug) {
  return posts.find((p) => p && p.published && p.slug === slug) || null;
}
