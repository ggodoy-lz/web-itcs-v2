<?php

declare(strict_types=1);

require __DIR__ . '/auth.php';
require dirname(__DIR__) . '/includes/blog_store.php';

itcs_require_admin();

$id = isset($_GET['id']) ? (int) $_GET['id'] : 0;
$data = itcs_blog_load();
$post = [
    'id' => 0,
    'title' => '',
    'slug' => '',
    'category' => '',
    'read_minutes' => 5,
    'excerpt' => '',
    'body' => '',
    'gradient' => 'a',
    'cta_label' => 'Contacto',
    'cta_url' => 'contact.html',
    'published' => true,
    'created_at' => date('c'),
];

if ($id > 0) {
    foreach ($data['posts'] ?? [] as $p) {
        if (is_array($p) && (int) ($p['id'] ?? 0) === $id) {
            $post = array_merge($post, $p);
            break;
        }
    }
}

$gradients = ['a' => 'Violeta / azul', 'b' => 'Verde', 'c' => 'Índigo / verde'];

?><!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?= $id ? 'Editar' : 'Nueva' ?> entrada — Admin</title>
    <link href="../css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">
<div class="container py-4" style="max-width: 800px;">
    <div class="mb-3"><a href="dashboard.php" class="btn btn-outline-secondary btn-sm">← Volver</a></div>
    <h1 class="h3 mb-4"><?= $id ? 'Editar entrada' : 'Nueva entrada' ?></h1>
    <form method="post" action="post_save.php" class="card card-body shadow-sm">
        <input type="hidden" name="csrf" value="<?= htmlspecialchars(itcs_csrf_token(), ENT_QUOTES, 'UTF-8') ?>">
        <input type="hidden" name="id" value="<?= (int) ($post['id'] ?? 0) ?>">
        <div class="mb-3">
            <label class="form-label" for="title">Título</label>
            <input type="text" class="form-control" id="title" name="title" required maxlength="200"
                   value="<?= htmlspecialchars((string) ($post['title'] ?? ''), ENT_QUOTES, 'UTF-8') ?>">
        </div>
        <div class="mb-3">
            <label class="form-label" for="slug">Slug (URL)</label>
            <input type="text" class="form-control" id="slug" name="slug" maxlength="120" placeholder="auto si vacío"
                   value="<?= htmlspecialchars((string) ($post['slug'] ?? ''), ENT_QUOTES, 'UTF-8') ?>">
            <div class="form-text">Solo letras minúsculas, números y guiones. Ej: <code>mi-articulo</code></div>
        </div>
        <div class="row g-3 mb-3">
            <div class="col-md-6">
                <label class="form-label" for="category">Categoría</label>
                <input type="text" class="form-control" id="category" name="category" maxlength="80"
                       value="<?= htmlspecialchars((string) ($post['category'] ?? ''), ENT_QUOTES, 'UTF-8') ?>">
            </div>
            <div class="col-md-3">
                <label class="form-label" for="read_minutes">Min. lectura</label>
                <input type="number" class="form-control" id="read_minutes" name="read_minutes" min="1" max="120"
                       value="<?= (int) ($post['read_minutes'] ?? 5) ?>">
            </div>
            <div class="col-md-3">
                <label class="form-label" for="gradient">Franja color</label>
                <select class="form-select" id="gradient" name="gradient">
                    <?php foreach ($gradients as $k => $label) { ?>
                        <option value="<?= htmlspecialchars($k, ENT_QUOTES, 'UTF-8') ?>" <?= (($post['gradient'] ?? 'a') === $k) ? 'selected' : '' ?>><?= htmlspecialchars($label, ENT_QUOTES, 'UTF-8') ?></option>
                    <?php } ?>
                </select>
            </div>
        </div>
        <div class="mb-3">
            <label class="form-label" for="excerpt">Resumen (listado)</label>
            <textarea class="form-control" id="excerpt" name="excerpt" rows="2" maxlength="500" required><?= htmlspecialchars((string) ($post['excerpt'] ?? ''), ENT_QUOTES, 'UTF-8') ?></textarea>
        </div>
        <div class="mb-3">
            <label class="form-label" for="body">Cuerpo (HTML permitido: p, br, strong, listas, enlaces, h2–h4)</label>
            <textarea class="form-control font-monospace small" id="body" name="body" rows="14" required><?= htmlspecialchars((string) ($post['body'] ?? ''), ENT_QUOTES, 'UTF-8') ?></textarea>
        </div>
        <div class="row g-3 mb-3">
            <div class="col-md-6">
                <label class="form-label" for="cta_label">Texto del botón</label>
                <input type="text" class="form-control" id="cta_label" name="cta_label" maxlength="80"
                       value="<?= htmlspecialchars((string) ($post['cta_label'] ?? ''), ENT_QUOTES, 'UTF-8') ?>">
            </div>
            <div class="col-md-6">
                <label class="form-label" for="cta_url">Enlace del botón</label>
                <input type="text" class="form-control" id="cta_url" name="cta_url" maxlength="200"
                       value="<?= htmlspecialchars((string) ($post['cta_url'] ?? ''), ENT_QUOTES, 'UTF-8') ?>">
            </div>
        </div>
        <div class="mb-3 form-check">
            <input type="checkbox" class="form-check-input" id="published" name="published" value="1" <?= !empty($post['published']) ? 'checked' : '' ?>>
            <label class="form-check-label" for="published">Publicado</label>
        </div>
        <button type="submit" class="btn btn-primary">Guardar</button>
    </form>
</div>
</body>
</html>
