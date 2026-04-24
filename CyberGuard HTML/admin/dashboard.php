<?php

declare(strict_types=1);

require __DIR__ . '/auth.php';
require dirname(__DIR__) . '/includes/blog_store.php';

itcs_require_admin();

$data = itcs_blog_load();
$posts = $data['posts'] ?? [];
usort($posts, static function ($a, $b) {
    return strcmp((string) ($b['created_at'] ?? ''), (string) ($a['created_at'] ?? ''));
});

?><!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Entradas del blog — Admin</title>
    <link href="../css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">
<div class="container py-4">
    <div class="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4">
        <h1 class="h3 mb-0">Blog</h1>
        <div>
            <a href="post_edit.php" class="btn btn-primary btn-sm">Nueva entrada</a>
            <a href="../blog.html" class="btn btn-outline-secondary btn-sm" target="_blank" rel="noopener">Ver sitio</a>
            <a href="logout.php" class="btn btn-outline-danger btn-sm">Salir</a>
        </div>
    </div>
    <div class="table-responsive card shadow-sm">
        <table class="table table-hover mb-0">
            <thead class="table-light"><tr><th>Título</th><th>Slug</th><th>Categoría</th><th>Estado</th><th>Fecha</th><th></th></tr></thead>
            <tbody>
            <?php foreach ($posts as $p) {
                if (!is_array($p)) {
                    continue;
                }
                $id = (int) ($p['id'] ?? 0);
                $pub = !empty($p['published']);
                ?>
                <tr>
                    <td><?= htmlspecialchars((string) ($p['title'] ?? ''), ENT_QUOTES, 'UTF-8') ?></td>
                    <td><code class="small"><?= htmlspecialchars((string) ($p['slug'] ?? ''), ENT_QUOTES, 'UTF-8') ?></code></td>
                    <td><?= htmlspecialchars((string) ($p['category'] ?? ''), ENT_QUOTES, 'UTF-8') ?></td>
                    <td><?= $pub ? '<span class="text-success">Publicado</span>' : '<span class="text-secondary">Borrador</span>' ?></td>
                    <td class="small"><?= htmlspecialchars(substr((string) ($p['created_at'] ?? ''), 0, 10), ENT_QUOTES, 'UTF-8') ?></td>
                    <td class="text-nowrap">
                        <a href="post_edit.php?id=<?= $id ?>" class="btn btn-sm btn-outline-primary">Editar</a>
                        <a href="post_delete.php?id=<?= $id ?>&csrf=<?= urlencode(itcs_csrf_token()) ?>" class="btn btn-sm btn-outline-danger" onclick="return confirm('¿Eliminar esta entrada?');">Eliminar</a>
                    </td>
                </tr>
            <?php } ?>
            </tbody>
        </table>
    </div>
    <?php if (count($posts) === 0) { ?><p class="text-muted mt-3">No hay entradas. Creá la primera.</p><?php } ?>
</div>
</body>
</html>
