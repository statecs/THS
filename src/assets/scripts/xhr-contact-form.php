<?php
/**
 * Script to submit the contents of the contact form via an XHR. Contents of the form are sent to this script by the
 * site javascript. This just processes the data and sends it to the specified email address.
 *
 * Created by PhpStorm.
 * User: Michael
 * Date: 17/11/13
 * Time: 11:49
 */

/*
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$fromEmail = $request->email;
$message = $request->message;

$subject = "An email from my personal website";
$headers = "From: $fromEmail\r\n";

if(mail("%%EMAIL_ADDRESS%%", $subject, $message, $headers)) {
	echo 1;
}
else {
	echo 0;
}
*/
require_once "Mail.php";

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
//$app->post('/',function() use($app){
    //$req =  $app->request()->getBody(); //get request pramans
    //$data = json_decode($req, true); //parse json string

    $jsonInput = file_get_contents('php://input');
    $data = json_decode($jsonInput, true);
    
    //Should be some validations before you proceed
    //Not in the scope of this tutorial.

    $captcha = $data['g-recaptcha-response']; //Captcha response send by client
        
        //Build post data to make request with fetch_file_contents
        $postdata = http_build_query(
          array(
            'secret' => '6Lf68iYTAAAAABNKU77u8Nl9HI6c8cVfnPliJEci', //secret KEy provided by google
            'response' => $captcha,                    // g-captcha-response string sent from client
            'remoteip' => $_SERVER['REMOTE_ADDR']
          )
        );

        //Build options for the post request
        $opts = array('http' =>
          array(
            'method'  => 'POST',
            'header'  => 'Content-type: application/x-www-form-urlencoded',
            'content' => $postdata
          )
        );

        //Create a stream this is required to make post request with fetch_file_contents
        $context  = stream_context_create($opts); 

    /* Send request to Googles siteVerify API */
    $response=file_get_contents("https://www.google.com/recaptcha/api/siteverify",false,$context);
    $response = json_decode($response, true);
    

    if($response["success"]===false) { //if user verification failed
        
        /* return error scenario to client */
        echo json_encode(array(
            "error" => 7,
            "message" => "Robots Not allowed (Captcha verification failed)",
            "captchaResult" => $response["success"],
            "captcahErrCodes" => $response["error-codes"]  //error codes sent buy google's siteVerify API
        ));
    } else {
    
    // Pear Mail Library



             //Should be some Datatbase insertion to sign up the user
             //before you return the success response
             //Not in the scope of this tutorial.

        /* return success scenario to client */
        echo json_encode(array(
        "error" => 0,
        "message" => "Email Successfully sent!",
        	"name" => $data['name'],
            "email" => $data['email'],
            "subject" => $data['subject_to'],
            "message" => $data['message'],
            "captchaResult" => $response["success"]
        ));

        $from = 'noreply@ths.kth.se'; //change this to your email address
		$to = $data['subject_to']; // change to address
		$reply_to =  $data['email'];
		$name =  $data['name'];
		$subject = "Email from Contact Form ths.kth.se"; // subject of mail
		$body = $data['message']."\r\n \r\n"; //content of mail
		$body .= "Name: " .$name."\r\n \r\n"; //content of mail
		$body .= "Email: " .$reply_to."\r\n \r\n"; //content of mail
		$body .= "Personal Number: " .$data['pnumber']."\r\n \r\n"; //content of mail


//$headers = 'From:' .$from. "\r\n" .
    //'Reply-To:' .$to. "\r\n" ;

 $headers = array(
    'From' => $from,
    'To' => $to,
    'Reply-To' => $reply_to,
    'Subject' => $subject
);

$smtp = Mail::factory('smtp', array(
        'host' => 'ssl://smtp.gmail.com',
        'port' => '465',
        'auth' => true,
        'username' => 'noreply@ths.kth.se', //your gmail account
        'password' => 'T_pk532!Nymble%' // your password
    ));

// Send the mail
$mail = $smtp->send($to, $headers, $body);

    }


?>
