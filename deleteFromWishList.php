<?php
header("Access-Control-Allow-Origin: *");
$vin;
$user;
if(isset($_POST['motocycle']) && isset($_POST['user'])){
    $vin = $_POST['motocycle'];
    $user = $_POST['user'];

    $connection = mysqli_connect('localhost','alexandro','12345','motobase','3306');
    if(!$connection){
        die("Connection failed: " . mysqli_connect_error());
    }
    $db_table_wishlist = "wishlist";
    $db_table_moto = "motocycle";

    $sql_moto = "SELECT motoid FROM $db_table_moto WHERE vin = '$vin'";
    $res_moto = mysqli_query($connection,$sql_moto);
    if($res_moto){
        $motrow = mysqli_fetch_array($res_moto,MYSQLI_ASSOC);
        $id = $motrow['motoid'];

        $sql_wishlist = "DELETE FROM $db_table_wishlist WHERE userid='$user' AND moto='$id'";
        $res = mysqli_query($connection, $sql_wishlist);
        if($res) {
            echo "success";
        } else {
            echo "error";
        }
        mysqli_close($connection);
    } else {
        echo "error";
    }
} else {
    echo 'error';
}
?>
