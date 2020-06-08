<?php
header("Access-Control-Allow-Origin: *");
$email = $_POST['email'];
$tel = $_POST['tel'];
var_dump($_POST);
$connection = mysqli_connect('localhost','alexandro','12345','motobase','3306');
if(!$connection){
    echo "connection error";
    die("Connection failed: " . mysqli_connect_error());
}

$db_table_user = "user";

$sql = "SELECT email, telephone FROM $db_table_user WHERE email = '$email'";
$res = mysqli_query($connection, $sql);
$row = mysqli_fetch_array($res);
if ($res) {
    if($row == null){
        echo "notExist";
    } else {
        if($email == $row[0] && $tel == $row[1]){
            echo "exist";
        } else {
            echo "notExist";
        }
    }
} else {
    echo "Error: " . $sql. "<br>" . mysqli_error($connection);
}
mysqli_close($connection);
?>