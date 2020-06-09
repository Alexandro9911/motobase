<?php
header("Access-Control-Allow-Origin: *");
$motoId ='';
if(isset($_POST['moto'])){
    $motoId = $_POST['moto'];
}
$connection = mysqli_connect('localhost','alexandro','12345','motobase','3306');
if(!$connection){
    die("Connection failed: " . mysqli_connect_error());
}
$db_table_wishlist = "wishlist";

$sql_wishlist = "DELETE FROM $db_table_wishlist WHERE moto='$motoId'";
$res = mysqli_query($connection, $sql_wishlist);
if($res){
    echo 'success';
} else {
    echo "error with deleting from db";
}
mysqli_close($connection);
?>

