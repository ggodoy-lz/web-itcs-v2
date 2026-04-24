<?php

declare(strict_types=1);

if (session_status() !== PHP_SESSION_ACTIVE) {
    session_start();
}

/** @return array{password_hash: string} */
function itcs_admin_config(): array
{
    static $cfg;
    if ($cfg === null) {
        $path = __DIR__ . '/config.php';
        if (!is_readable($path)) {
            http_response_code(500);
            exit('Falta admin/config.php');
        }
        $cfg = require $path;
    }
    return $cfg;
}

function itcs_admin_logged_in(): bool
{
    return !empty($_SESSION['itcs_admin_ok']);
}

function itcs_require_admin(): void
{
    if (!itcs_admin_logged_in()) {
        header('Location: index.php', true, 302);
        exit;
    }
}

function itcs_csrf_token(): string
{
    if (empty($_SESSION['itcs_csrf'])) {
        $_SESSION['itcs_csrf'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['itcs_csrf'];
}

function itcs_csrf_validate(?string $token): bool
{
    return is_string($token)
        && isset($_SESSION['itcs_csrf'])
        && hash_equals($_SESSION['itcs_csrf'], $token);
}
