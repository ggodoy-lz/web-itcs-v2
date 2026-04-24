<?php

declare(strict_types=1);

require __DIR__ . '/auth.php';
require dirname(__DIR__) . '/includes/blog_store.php';

itcs_require_admin();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: dashboard.php', true, 302);
    exit;
}

if (!itcs_csrf_validate($_POST['csrf'] ?? null)) {
    http_response_code(400);
    exit('CSRF');
}

$id = (int) ($_POST['id'] ?? 0);
$title = trim((string) ($_POST['title'] ?? ''));
$slugIn = trim((string) ($_POST['slug'] ?? ''));
$category = trim((string) ($_POST['category'] ?? ''));
$readMinutes = max(1, min(120, (int) ($_POST['read_minutes'] ?? 5)));
$excerpt = trim((string) ($_POST['excerpt'] ?? ''));
$body = itcs_blog_sanitize_body((string) ($_POST['body'] ?? ''));
$gradient = (string) ($_POST['gradient'] ?? 'a');
if (!in_array($gradient, ['a', 'b', 'c'], true)) {
    $gradient = 'a';
}
$ctaLabel = trim((string) ($_POST['cta_label'] ?? 'Contacto'));
$ctaUrl = trim((string) ($_POST['cta_url'] ?? 'contact.html'));
$published = !empty($_POST['published']);

if ($title === '' || $excerpt === '' || $body === '') {
    header('Location: post_edit.php?id=' . $id, true, 302);
    exit;
}

$data = itcs_blog_load();
$posts = $data['posts'] ?? [];

$slug = $slugIn !== '' ? itcs_blog_normalize_slug($slugIn) : itcs_blog_slugify($title);
$baseSlug = $slug;
$n = 2;
while (itcs_blog_slug_exists($posts, $slug, $id > 0 ? $id : null)) {
    $slug = $baseSlug . '-' . $n;
    $n++;
}

$now = date('c');

if ($id > 0) {
    $found = false;
    foreach ($posts as $i => $p) {
        if (!is_array($p) || (int) ($p['id'] ?? 0) !== $id) {
            continue;
        }
        $found = true;
        $created = (string) ($p['created_at'] ?? $now);
        $posts[$i] = [
            'id' => $id,
            'title' => $title,
            'slug' => $slug,
            'category' => $category,
            'read_minutes' => $readMinutes,
            'excerpt' => $excerpt,
            'body' => $body,
            'gradient' => $gradient,
            'cta_label' => $ctaLabel,
            'cta_url' => $ctaUrl,
            'created_at' => $created,
            'published' => $published,
        ];
        break;
    }
    if (!$found) {
        header('Location: dashboard.php', true, 302);
        exit;
    }
} else {
    $newId = itcs_blog_next_id($posts);
    $posts[] = [
        'id' => $newId,
        'title' => $title,
        'slug' => $slug,
        'category' => $category,
        'read_minutes' => $readMinutes,
        'excerpt' => $excerpt,
        'body' => $body,
        'gradient' => $gradient,
        'cta_label' => $ctaLabel,
        'cta_url' => $ctaUrl,
        'created_at' => $now,
        'published' => $published,
    ];
}

$data['posts'] = array_values($posts);
if (!itcs_blog_save($data)) {
    http_response_code(500);
    exit('No se pudo guardar. Revisá permisos de data/blog_posts.json');
}

header('Location: dashboard.php', true, 302);
exit;
