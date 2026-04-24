<?php
$subject = 'Contacto web — iTCS S.A.';
$to = 'info@itcs.com.py';

$name = isset($_POST['name']) ? $_POST['name'] : '';
$company = isset($_POST['company']) ? $_POST['company'] : '';
$email = isset($_POST['email']) ? $_POST['email'] : '';
$phone = isset($_POST['phone']) ? $_POST['phone'] : '';
$topic = isset($_POST['topic']) ? $_POST['topic'] : '';
$msg = isset($_POST['message']) ? $_POST['message'] : '';

$email_from = $name.'<'.$email.'>';

$headers = "MIME-Version: 1.1";
$headers .= "Content-type: text/html; charset=iso-8859-1";
$headers .= "From: ".$name.'<'.$email.'>'."\r\n";
$headers .= "Return-Path:"."From:" . $email;

$message = '';
$message .= 'Nombre : ' . $name . "\n";
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