<?php
$subject = 'Nueva suscripción a Newsletter — iTCS S.A.';
$to = 'info@itcs.com.py';

$email = isset($_POST['newsletter_email']) ? $_POST['newsletter_email'] : '';

if (empty($email)) {
	echo 'failed';
	exit;
}

$headers = "MIME-Version: 1.1\r\n";
$headers .= "Content-type: text/html; charset=iso-8859-1\r\n";
$headers .= "From: Suscriptor Newsletter <".$email.">\r\n";
$headers .= "Return-Path: " . $email . "\r\n";

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
