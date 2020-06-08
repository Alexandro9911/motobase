<?php
header("Access-Control-Allow-Origin: *");
$offerid = '';
$vercode = '';
$vin ='';
if (isset($_POST['offerid']) && isset($_POST['enteredcode']) && isset($_POST['vin'])) {
    $offerid = $_POST['offerid'];
    $vercode = $_POST['enteredcode'];
    $vin = $_POST['vin'];
}

$connection = mysqli_connect('localhost', 'alexandro', '12345', 'motobase', '3306');
if (!$connection) {
    die("Connection failed: " . mysqli_connect_error());
}

$db_table_offers = "myoffers";
$db_table_moto = "motocycle";
$db_table_history = "history";

$sql_offer = "SELECT * FROM $db_table_offers WHERE id='$offerid'";
$res_offer = mysqli_query($connection, $sql_offer);
$row = mysqli_fetch_array($res_offer, MYSQLI_ASSOC);
$pret = $row['pretendent'];
$mot = $row['moto_id'];
$prev = $row['motuser_id'];
$true_code = $row['verification_code'];
if($vercode == $true_code){
$new_stat = 1;
$sql_by = "UPDATE $db_table_moto SET user ='$pret' WHERE motoid='$mot'";
$res = mysqli_query($connection,$sql_by);

$sql_modify_history = "UPDATE $db_table_history SET date_to=NOW() WHERE motocycle_id=$mot AND user_id=$prev AND date_to=''";
$sql_history = "INSERT INTO $db_table_history (motocycle_id,user_id,date_from,date_to,motocycle_vin) VALUES ('$mot','$pret',NOW(),'-','$vin')";
$res_mod = mysqli_query($connection,$sql_modify_history);
$res_new = mysqli_query($connection,$sql_history);

$sql_stat = "UPDATE $db_table_moto SET status ='$new_stat' WHERE motoid='$mot'";
$res2 = mysqli_query($connection,$sql_stat);
$sql_del = "DELETE FROM $db_table_offers WHERE id='$offerid'";
$res2 = mysqli_query($connection,$sql_del);
echo 'success';
} else {
        echo 'wrong code';
    }
mysqli_close($connection);
?>
