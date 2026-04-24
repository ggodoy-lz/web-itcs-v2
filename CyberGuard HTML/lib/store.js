import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import { Redis } from '@upstash/redis';

const KEY = 'itcs:blog:v1';
const DATA_FILE = join(process.cwd(), 'data', 'blog_posts.json');

function getRedis() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

function seedFromFile() {
  if (!existsSync(DATA_FILE)) {
    return { posts: [] };
  }
  return JSON.parse(readFileSync(DATA_FILE, 'utf8'));
}

/**
 * Producción en Vercel: integración Redis/Upstash (UPSTASH_REDIS_REST_URL + TOKEN).
 * Local sin Redis: lectura/escritura en data/blog_posts.json.
 */
export async function getStore() {
  const redis = getRedis();
  if (redis) {
    const data = await redis.get(KEY);
    if (data && typeof data === 'object' && Array.isArray(data.posts)) {
      return data;
    }
    const seed = seedFromFile();
    await redis.set(KEY, seed);
    return seed;
  }

  if (process.env.VERCEL === '1') {
    throw new Error(
      'Falta Redis: en Vercel → Storage → Redis (Upstash) e integrá el proyecto; se cargan UPSTASH_REDIS_REST_URL y UPSTASH_REDIS_REST_TOKEN.'
    );
  }

  if (!existsSync(DATA_FILE)) {
    return { posts: [] };
  }
  return JSON.parse(readFileSync(DATA_FILE, 'utf8'));
}

export async function setStore(data) {
  const redis = getRedis();
  if (redis) {
    await redis.set(KEY, data);
    return;
  }
  if (process.env.VERCEL === '1') {
    throw new Error('Redis no configurado; no se puede escribir en disco en Vercel.');
  }
  writeFileSync(DATA_FILE, JSON.stringify(data, null, 4), 'utf8');
}
