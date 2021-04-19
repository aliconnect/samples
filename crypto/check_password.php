<?php
$password_encoded = $_COOKIE['password_encoded'];
$password = $_POST['password'];
$password_ok = password_verify ( $password, $password_encoded );
echo $password_ok ? "Password OK" : "Password Fault";
