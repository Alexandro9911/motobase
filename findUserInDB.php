<?php
header("Access-Control-Allow-Origin: *");
$email = $_POST['email'];
$passw = $_POST['passw'];

$connection = mysqli_connect('localhost','alexandro','12345','motobase','3306');
if(!$connection){
    die("Connection failed: " . mysqli_connect_error());
}

$db_table_user = "user";

$sql = "SELECT email, passw FROM $db_table_user WHERE email = '$email'";
$res = mysqli_query($connection, $sql);
$row = mysqli_fetch_array($res);
if ($res) {
    if($row == null){
        echo "notExist";
    } else {
        if($email == $row[0] && $passw == $row[1]){
            echo "allCorrect";
        } else {
            echo "somethingWrong";
        }
    }
} else {
    echo "Error: " . $sql. "<br>" . mysqli_error($connection);
}
mysqli_close($connection);
?>
