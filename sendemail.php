<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width">
	<title>Matrimony HTML Template</title>
	<link rel="stylesheet" href="css/normalize.css">
	<link rel="stylesheet" href="css/foundation.min.css">
	<script src="js/vendor/modernizr.js"></script>
	<script src="js/vendor/jquery-1.11.1.min.js"></script>
</head>

<?php

/*--------------------------------------------------------------
RSVP FORM
--------------------------------------------------------------*/
if( isset($_POST['rsvp_submit']) ){

	$name = filter_var($_POST['attendee_name'], FILTER_SANITIZE_STRING);
	$email = filter_var($_POST['attendee_email'], FILTER_SANITIZE_EMAIL);
	$guests = filter_var($_POST['guests'], FILTER_SANITIZE_STRING);
	$attending = filter_var($_POST['attending'], FILTER_SANITIZE_STRING);

	// recipients
	$to  = 'your@email.com';

	// subject
	$subject = 'Wedding RSVP';

	// message
	$message = '
	<html>
	<head>
	  <title>Wedding RSVP</title>
	</head>
	<body>
	  <h2>Wedding RSVP</h2>
	  <p>
	  	<strong>Name:</strong> '.$name.'<br>
	  	<strong>Attending?</strong> '.$attending.'<br>
	  	<strong>Number of Guests:</strong> '.$guests.'
	  </p>
	</body>
	</html>
	';

	// To send HTML mail, the Content-type header must be set
	$headers  = 'MIME-Version: 1.0' . "\r\n";
	$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

	// Additional headers
	$headers .= 'From: '.$name.' <'.$email.'>' . "\r\n";
	// $headers .= 'Cc: info@infinitylabs.ca' . "\r\n";
	// $headers .= 'Bcc: info@infinitylabs.ca' . "\r\n";

	// Mail it
	if(mail($to, $subject, $message, $headers)){
		echo '<div data-alert class="alert-box success">Your email was sent successfully!</div>';
	} else{
		echo '<div data-alert class="alert-box alert">An error occured. Please try resending the email.</div>';
	}

}

/*--------------------------------------------------------------
CONTACT FORM
--------------------------------------------------------------*/
if( isset($_POST['contact_submit']) ){

	$name = filter_var($_POST['your_name'], FILTER_SANITIZE_STRING);
	$email = filter_var($_POST['your_email'], FILTER_SANITIZE_EMAIL);
	$comments = nl2br( filter_var($_POST['comments'], FILTER_SANITIZE_STRING) );

	// recipients
	$to  = 'your@email.com';

	// subject
	$subject = 'Contact Form Submission';

	// message
	$message = '
	<html>
	<head>
	  <title>Contact Form Submission</title>
	</head>
	<body>
	  <h2>Contact Form Submission</h2>
	  <p>
	  	<strong>Message:</strong><br>'.$comments.'
	  </p>
	</body>
	</html>
	';

	// To send HTML mail, the Content-type header must be set
	$headers  = 'MIME-Version: 1.0' . "\r\n";
	$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

	// Additional headers
	$headers .= 'From: '.$name.' <'.$email.'>' . "\r\n";
	// $headers .= 'Cc: info@infinitylabs.ca' . "\r\n";
	// $headers .= 'Bcc: info@infinitylabs.ca' . "\r\n";

	// Mail it
	if(mail($to, $subject, $message, $headers)){
		echo '<div data-alert class="alert-box success">Your email was sent successfully!</div>';
	} else{
		echo '<div data-alert class="alert-box alert">An error occured. Please try resending the email.</div>';
	}
}

?>

	<script src="js/foundation.min.js"></script>
	<script>
		jQuery(document).foundation();
	</script>
</body>
</html>