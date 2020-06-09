<?php
header("Access-Control-Allow-Origin: *");
$vin;
$user;
$connection = mysqli_connect('localhost','alexandro','12345','motobase','3306');
if(isset($_POST['motocycle']) && isset($_POST['user'])){
    $vin = $_POST['motocycle'];
    $user = $_POST['user'];
    if(!$connection){
        die("Connection failed: " . mysqli_connect_error());
    }
    $db_table_wishlist = "wishlist";
    $db_table_moto = "motocycle";

    $sql_moto = "SELECT motoid FROM $db_table_moto WHERE vin = '$vin'";
    $res_moto = mysqli_query($connection, $sql_moto);
    $motrow = mysqli_fetch_array($res_moto, MYSQLI_ASSOC);
    $id = $motrow['motoid'];

    $sql_ifExist = "SELECT userid,moto FROM $db_table_wishlist WHERE userid='$user' AND moto='$id'";
    $result = mysqli_query($connection, $sql_ifExist);
    $count = mysqli_num_rows($result);
    if($count > 0){
        echo 'already there';
    } else {
        if ($res_moto) {
            $sql_wishlist = "INSERT INTO $db_table_wishlist (userid,moto) VALUES ('$user','$id')";
            $res = mysqli_query($connection, $sql_wishlist);
            if ($res) {
                echo "success";
            } else {
                echo 'error wish';
            }
        } else {
            echo 'error moto';
        }
    }
} else {
    echo 'error isset';
}
mysqli_close($connection);
?>
