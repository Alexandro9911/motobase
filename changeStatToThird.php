<?php
header("Access-Control-Allow-Origin: *");
$offerid = '';
$stat = '';
$motoid = '';
if (isset($_POST['offerid']) && isset($_POST['newStat']) && isset($_POST['motoid'])) {
    $offerid = $_POST['offerid'];
    $stat = $_POST['newStat'];
    $motoid = $_POST['motoid'];
}

$connection = mysqli_connect('localhost', 'alexandro', '12345', 'motobase', '3306');
if (!$connection) {
    die("Connection failed: " . mysqli_connect_error());
}

$db_table_moto = "motocycle";
$db_table_offers = "myoffers";

$sql_update_moto = "UPDATE $db_table_moto SET status = '0' WHERE motoid='$motoid'";
$res_update_moto = mysqli_query($connection, $sql_update_moto);
if ($res_update_moto) {
    $sql_update_offer = "UPDATE $db_table_offers SET status = '$stat' WHERE id='$offerid'";
    $res_update_offer = mysqli_query($connection, $sql_update_offer);
    if ($res_update_offer) {
            echo 'success';
    } else {
        echo 'error update offer';
    }
} else {
    echo 'error update moto';
}
mysqli_close($connection);
?>
