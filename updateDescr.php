<?php
header("Access-Control-Allow-Origin: *");
$vin ='';
$descr ='';
if(isset($_POST['vin']) && isset($_POST['descr'])){
    $vin = $_POST['vin'];
    $descr = $_POST['descr'];
}

$connection = mysqli_connect('localhost','alexandro','12345','motobase','3306');
if(!$connection){
    die("Connection failed: " . mysqli_connect_error());
}

$db_table_moto = "motocycle";

$sql_moto = "UPDATE $db_table_moto SET description = '$descr' WHERE vin = '$vin'";
$res = mysqli_query($connection, $sql_moto);
if($res){
    echo 'success';
} else {
    echo 'err ' . $res;
}
mysqli_close($connection);
?>