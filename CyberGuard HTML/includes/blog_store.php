<?php

declare(strict_types=1);

function itcs_blog_data_path(): string
{
    return dirname(__DIR__) . '/data/blog_posts.json';
}

/** @return array{posts: list<array<string,mixed>>} */
function itcs_blog_load(): array
{
    $path = itcs_blog_data_path();
    if (!is_readable($path)) {
        return ['posts' => []];
    }
    $raw = file_get_contents($path);
    if ($raw === false) {
        return ['posts' => []];
    }
    $j = json_decode($raw, true);
    return is_array($j) && isset($j['posts']) && is_array($j['posts'])
        ? $j
        : ['posts' => []];
}

/** @param array{posts: list<array<string,mixed>>} $data */
function itcs_blog_save(array $data): bool
{
    $path = itcs_blog_data_path();
    $dir = dirname($path);
    if (!is_dir($dir) && !mkdir($dir, 0755, true) && !is_dir($dir)) {
        return false;
    }
    $json = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    if ($json === false) {
        return false;
    }
    return file_put_contents($path, $json, LOCK_EX) !== false;
}

function itcs_blog_slugify(string $title): string
{
    $s = @iconv('UTF-8', 'ASCII//TRANSLIT//IGNORE', $title) ?: $title;
    $s = strtolower((string) $s);
    $s = preg_replace('/[^a-z0-9]+/', '-', $s) ?? '';
    return trim($s, '-') ?: 'articulo';
}

/** Slug ya escrito a mano (solo minúsculas, números y guiones). */
function itcs_blog_normalize_slug(string $s): string
{
    $s = strtolower(trim($s));
    $s = preg_replace('/[^a-z0-9-]+/', '-', $s) ?? '';
    return trim($s, '-') ?: 'articulo';
}

/** @param list<array<string,mixed>> $posts */
function itcs_blog_next_id(array $posts): int
{
    $max = 0;
    foreach ($posts as $p) {
        $id = (int) ($p['id'] ?? 0);
        if ($id > $max) {
            $max = $id;
        }
    }
    return $max + 1;
}

/** @param list<array<string,mixed>> $posts */
function itcs_blog_slug_exists(array $posts, string $slug, ?int $exceptId = null): bool
{
    foreach ($posts as $p) {
        if ($exceptId !== null && (int) ($p['id'] ?? 0) === $exceptId) {
            continue;
        }
        if (($p['slug'] ?? '') === $slug) {
            return true;
        }
    }
    return false;
}

function itcs_blog_sanitize_body(string $html): string
{
    $html = preg_replace('#<(script|iframe|object|embed|form|style)\b[^>]*>.*?</\1>#is', '', $html) ?? $html;
    $html = preg_replace('#<(script|iframe|object|embed|form|style)\b[^>]*/>#is', '', $html) ?? $html;
    $html = preg_replace('#on\w+\s*=\s*(["\']).*?\1#i', '', $html) ?? $html;
    $html = preg_replace('#javascript\s*:#i', '', $html) ?? $html;
    return $html;
}

/** @return list<array<string,mixed>> */
function itcs_blog_published_sorted(array $data): array
{
    $posts = array_filter(
        $data['posts'] ?? [],
        static fn ($p) => is_array($p) && !empty($p['published'])
    );
    usort(
        $posts,
        static function ($a, $b) {
            return strcmp((string) ($b['created_at'] ?? ''), (string) ($a['created_at'] ?? ''));
        }
    );
    return array_values($posts);
}

/** @return array<string,mixed>|null */
function itcs_blog_find_by_slug(array $data, string $slug): ?array
{
    foreach ($data['posts'] ?? [] as $p) {
        if (!is_array($p) || empty($p['published'])) {
            continue;
        }
        if (($p['slug'] ?? '') === $slug) {
            return $p;
        }
    }
    return null;
}
