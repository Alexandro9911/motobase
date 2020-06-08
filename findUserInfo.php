<?php
header("Access-Control-Allow-Origin: *");
$email = $_POST['email'];

$connection = mysqli_connect('localhost','alexandro','12345','motobase','3306');
if(!$connection){
    die("Connection failed: " . mysqli_connect_error());
}

$db_table_user = "user";

$sql_user = "SELECT id,fio,email,telephone  FROM $db_table_user WHERE email = '$email'";
$res = mysqli_query($connection, $sql_user);
$row = mysqli_fetch_array($res);
// вычислить город и страну
if ($res) {
    if($row == null){
        echo "Err";
    } else {
//        this.state.fio = dataArr[0];
//        this.state.email = dataArr[1];
//        this.state.id = dataArr[2];
//        this.state.teleph = dataArr[3];
//        this.state.city = dataArr[4];
//        this.state.country = dataArr[5];
        echo "" .$row[1]. "#" .$row[2]. "#" .$row[0]. "#" .$row[3];
    }
} else {
    echo "Err" . $sql. "<br>" . mysqli_error($connection);
}
mysqli_close($connection);
?>
