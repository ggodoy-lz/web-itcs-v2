<?php
$to = 'info@itcs.com.py';

$email = isset($_POST['newsletter_email']) ? trim(str_replace(array("\r", "\n", "%0a", "%0d"), '', $_POST['newsletter_email'])) : '';

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
	echo 'failed';
	exit;
}

// Asunto en UTF-8 codificado MIME (evita "â€“" y similares)
$subject = '=?UTF-8?B?' . base64_encode('Nueva suscripción a Newsletter — iTCS S.A.') . '?=';

// From debe ser del propio dominio (SPF); el suscriptor va en Reply-To
$headers  = "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "Content-Transfer-Encoding: 8bit\r\n";
$headers .= "From: iTCS Web <info@itcs.com.py>\r\n";
$headers .= "Reply-To: " . $email . "\r\n";

$message = "Ha recibido una nueva suscripción al newsletter desde el sitio web.\n\n";
$message .= "Email del suscriptor: " . $email . "\n";

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
