<?php
header("Access-Control-Allow-Origin: *");
$idmoto ='';
$user='';
if(isset($_POST['id']) && isset($_POST['user'])){
    $idmoto = $_POST['id'];
    $user = $_POST['user'];
}
$connection = mysqli_connect('localhost','alexandro','12345','motobase','3306');
if(!$connection){
    die("Connection failed: " . mysqli_connect_error());
}
$db_table_wishlist = "wishlist";
$sql_wishlist = "DELETE FROM $db_table_wishlist WHERE userid='$user' AND moto='$idmoto'";
$res = mysqli_query($connection, $sql_wishlist);
if($res) {
    echo "success";
} else {
    echo "error";
}
mysqli_close($connection);

?>
