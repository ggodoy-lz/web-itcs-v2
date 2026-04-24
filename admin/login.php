<?php

declare(strict_types=1);

require __DIR__ . '/auth.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: index.php', true, 302);
    exit;
}

if (!itcs_csrf_validate($_POST['csrf'] ?? null)) {
    header('Location: index.php?err=csrf', true, 302);
    exit;
}

$pw = (string) ($_POST['password'] ?? '');
$cfg = itcs_admin_config();
$hash = (string) ($cfg['password_hash'] ?? '');

if ($hash === '' || !password_verify($pw, $hash)) {
    header('Location: index.php?err=1', true, 302);
    exit;
}

session_regenerate_id(true);
$_SESSION['itcs_admin_ok'] = true;
header('Location: dashboard.php', true, 302);
exit;
