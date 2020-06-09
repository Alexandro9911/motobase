<?php
header("Access-Control-Allow-Origin: *");
$offerid ='';
$stat ='';
$motoid = '';
if(isset($_POST['offerid']) && isset($_POST['newstat']) && isset($_POST['motoid'])){
    $offerid = $_POST['offerid'];
    $stat = $_POST['newstat'];
    $motoid = $_POST['motoid'];
}

$connection = mysqli_connect('localhost','alexandro','12345','motobase','3306');
if(!$connection){
    die("Connection failed: " . mysqli_connect_error());
}

$db_table_moto = "motocycle";
$db_table_offers = "myoffers";
$db_table_wishlist = "wishlist";

$sql_del_store = "DELETE FROM $db_table_wishlist WHERE moto='$motoid'";
$res_del = mysqli_query($connection,$sql_del_store);
if($res_del){
    $sql_update_moto = "UPDATE $db_table_moto SET status = '$stat' WHERE motoid='$motoid'";
    $res_update_moto = mysqli_query($connection, $sql_update_moto);
    if($res_update_moto){
        $sql_update_offer = "UPDATE $db_table_offers SET status = '$stat' WHERE id='$offerid'";
        $res_update_offer = mysqli_query($connection, $sql_update_offer);
        if($res_update_offer){
            $sql_clean_offers = "DELETE FROM $db_table_offers WHERE moto_id='$motoid' AND status='1'";
            $res_clean = mysqli_query($connection, $sql_clean_offers);
            if($res_clean){
                echo 'success';
            } else {
                echo 'error clean';
            }
        } else {
            echo 'error update offer';
        }
    } else {
        echo 'error update moto';
    }
} else {
    echo 'error in deleting';
}
mysqli_close($connection);
?>

