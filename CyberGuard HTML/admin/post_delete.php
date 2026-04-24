<?php

declare(strict_types=1);

require __DIR__ . '/auth.php';
require dirname(__DIR__) . '/includes/blog_store.php';

itcs_require_admin();

$id = (int) ($_GET['id'] ?? 0);
if ($id <= 0 || !itcs_csrf_validate($_GET['csrf'] ?? null)) {
    header('Location: dashboard.php', true, 302);
    exit;
}

$data = itcs_blog_load();
$posts = [];
foreach ($data['posts'] ?? [] as $p) {
    if (is_array($p) && (int) ($p['id'] ?? 0) === $id) {
        continue;
    }
    $posts[] = $p;
}
$data['posts'] = $posts;
itcs_blog_save($data);

header('Location: dashboard.php', true, 302);
exit;
