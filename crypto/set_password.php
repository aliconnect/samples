<?php
$new_password = $_POST['new_password'];
$password_encoded = password_hash ( $new_password, PASSWORD_DEFAULT );
setcookie("password_encoded", $password_encoded, time()+3600);  /* expire in 1 hour */
echo "password_encoded = $password_encoded";
