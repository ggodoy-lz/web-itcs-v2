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

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $email = '';
}

// Asunto en UTF-8 codificado MIME (evita "â€“" y similares)
$subject_txt = 'Contacto web — iTCS S.A.' . ($topic !== '' ? ' — ' . $topic : '');
$subject = '=?UTF-8?B?' . base64_encode($subject_txt) . '?=';

// From debe ser del propio dominio (SPF); el visitante va en Reply-To
$name_enc = '=?UTF-8?B?' . base64_encode($name) . '?=';
$headers  = "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "Content-Transfer-Encoding: 8bit\r\n";
$headers .= "From: iTCS Web <info@itcs.com.py>\r\n";
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
