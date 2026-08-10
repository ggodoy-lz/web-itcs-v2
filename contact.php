<?php
$to = 'info@itcs.com.py';

// Sanitizar: sin saltos de linea en campos que van a headers (anti header-injection)
function clean_header($v) {
    return trim(str_replace(array("\r", "\n", "%0a", "%0d"), '', $v));
}

$name    = isset($_POST['name'])    ? clean_header($_POST['name'])  : '';
$company = isset($_POST['company']) ? trim($_POST['company'])       : '';
$email   = isset($_POST['email'])   ? clean_header($_POST['email']) : '';
$phone   = isset($_POST['phone'])   ? trim($_POST['phone'])         : '';
$topic   = isset($_POST['topic'])   ? trim($_POST['topic'])         : '';
$msg     = isset($_POST['message']) ? trim($_POST['message'])       : '';

// Honeypot: campo oculto que sólo completan los bots
if (!empty($_POST['website'])) {
    echo 'sent'; // respuesta silenciosa, no se envía nada
    exit;
}

// Validacion server-side: sin esto los bots envian mails en blanco
if ($name === '' || $email === '' || $phone === '' || $msg === '') {
    echo 'failed';
    exit;
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo 'failed';
    exit;
}
if (mb_strlen($name) < 2 || mb_strlen($msg) < 10) {
    echo 'failed';
    exit;
}

// Verificacion de reCAPTCHA contra Google.
// La clave secreta se lee del entorno; si no esta definida, se omite la
// verificacion para no romper el formulario (el honeypot sigue activo).
$recaptcha_secret = getenv('RECAPTCHA_SECRET');
if ($recaptcha_secret) {
    $token = isset($_POST['g-recaptcha-response']) ? $_POST['g-recaptcha-response'] : '';
    if ($token === '') {
        echo 'failed';
        exit;
    }

    $verify = @file_get_contents(
        'https://www.google.com/recaptcha/api/siteverify?' . http_build_query(array(
            'secret'   => $recaptcha_secret,
            'response' => $token,
            'remoteip' => isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : ''
        ))
    );

    $result = $verify ? json_decode($verify, true) : null;
    if (empty($result['success'])) {
        echo 'failed';
        exit;
    }
}

// Asunto en UTF-8 codificado MIME (evita "â€“" y similares)
$subject_txt = 'Contacto web — ITCS S.A.' . ($topic !== '' ? ' — ' . $topic : '');
$subject = '=?UTF-8?B?' . base64_encode($subject_txt) . '?=';

// From debe ser del propio dominio (SPF); el visitante va en Reply-To
$name_enc = '=?UTF-8?B?' . base64_encode($name) . '?=';
$headers  = "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "Content-Transfer-Encoding: 8bit\r\n";
$headers .= "From: ITCS Web <info@itcs.com.py>\r\n";
if ($email !== '') {
    $headers .= "Reply-To: " . $name_enc . " <" . $email . ">\r\n";
}

$message  = 'Nombre : ' . $name . "\n";
$message .= 'Empresa : ' . $company . "\n";
$message .= 'Email : ' . $email . "\n";
$message .= 'Teléfono : ' . $phone . "\n";
$message .= 'Asunto : ' . $topic . "\n";
$message .= 'Mensaje : ' . $msg;

if (@mail($to, $subject, $message, $headers))
{
	// Transfer the value 'sent' to ajax function for showing success message.
	echo 'sent';
}
else
{
	// Transfer the value 'failed' to ajax function for showing error message.
	echo 'failed';
}
?>
