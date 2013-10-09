<?php
	$personal = $_POST['personal'];
	$email = $_POST['email'];
	$website = $_POST['website'];
	$message = $_POST['message'];
	
	
	if(!filter_var($email, FILTER_VALIDATE_EMAIL)) {
		echo 'Некорректный e-mail :(';
	}
	elseif($email == '' || $personal = '') {
		echo 'Заполните все обязательные поля.';
	}
	
	else {
		$personal = htmlspecialchars($personal);
		$email = htmlspecialchars($email);
		$website = htmlspecialchars($website);
		$message = htmlspecialchars($message);
	
		$headers .= 'From: '.$_POST['email'].' <'.$_POST['email'].'>'.PHP_EOL;
		$headers .= 'MIME-Version: 1.0'.PHP_EOL;
		$headers .= 'Content-type: text/html; charset=utf-8'.PHP_EOL; 
		$email_message = '<html> 
			<head> 
				<title>Сообщение с сайта yk-studio.net</title> 
			</head>
			<body>
				<p>Name: '.$_POST['personal'].'</p>
				<p>E-mail: '.$_POST['email'].'</p>
				<p>Website: '.$_POST['website'].'</p>
				<p>Message: '.$_POST['message'].'</p>
			</body>
		</html>';
	 
	 
		if(mail('timoha77@gmail.com', 'Сообщение с сайта yk-studio.net', $email_message, $headers)) { // you can here add your email
			echo 'Спасибо за сообщение :)';
		}
		else {
			echo 'Error :(';
		}
	
	}
?>