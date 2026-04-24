<?php

declare(strict_types=1);

require __DIR__ . '/auth.php';

if (itcs_admin_logged_in()) {
    header('Location: dashboard.php', true, 302);
    exit;
}

$err = $_GET['err'] ?? '';

?><!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Admin — Blog iTCS</title>
    <link href="../css/bootstrap.min.css" rel="stylesheet">
    <link href="../css/itcs-theme.css" rel="stylesheet">
</head>
<body class="bg-light">
<div class="container py-5" style="max-width: 420px;">
    <h1 class="h4 mb-4">Administración del blog</h1>
    <?php if ($err === '1') { ?><div class="alert alert-danger">Contraseña incorrecta.</div><?php } ?>
    <?php if ($err === 'csrf') { ?><div class="alert alert-danger">Sesión expirada. Reintentá.</div><?php } ?>
    <form method="post" action="login.php" class="card card-body shadow-sm">
        <input type="hidden" name="csrf" value="<?= htmlspecialchars(itcs_csrf_token(), ENT_QUOTES, 'UTF-8') ?>">
        <div class="mb-3">
            <label class="form-label" for="pw">Contraseña</label>
            <input type="password" class="form-control" id="pw" name="password" required autocomplete="current-password">
        </div>
        <button type="submit" class="btn btn-primary w-100">Entrar</button>
    </form>
    <p class="small text-muted mt-3 mb-0">Ruta: <code>/admin/</code> · Cambiá la clave en <code>admin/config.php</code>.</p>
</div>
</body>
</html>
