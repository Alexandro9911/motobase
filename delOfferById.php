<?php
header("Access-Control-Allow-Origin: *");
$offerid = '';
$motoid = '';
if (isset($_POST['offerid']) && isset($_POST['motoid'])) {
    $offerid = $_POST['offerid'];
    $motoid = $_POST['motoid'];
}

$connection = mysqli_connect('localhost', 'alexandro', '12345', 'motobase', '3306');
if (!$connection) {
    die("Connection failed: " . mysqli_connect_error());
}

$db_table_offers = "myoffers";
$db_table_moto = "motocycle";
$sql_delete = "DELETE FROM $db_table_offers WHERE id='$offerid'";
$res_del = mysqli_query($connection, $sql_delete);

$sql_update_moto = "UPDATE $db_table_moto SET status = '0' WHERE motoid='$motoid'";
$res_update_moto = mysqli_query($connection, $sql_update_moto);
if($res_del){
    echo 'success';
} else {
    echo 'error deleting';
}
mysqli_close($connection);
?>

