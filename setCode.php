<?php
header("Access-Control-Allow-Origin: *");
$offerid = '';
$vercode = '';
if (isset($_POST['offerid']) && isset($_POST['vercode'])) {
    $offerid = $_POST['offerid'];
    $vercode = $_POST['vercode'];
}

$connection = mysqli_connect('localhost', 'alexandro', '12345', 'motobase', '3306');
if (!$connection) {
    die("Connection failed: " . mysqli_connect_error());
}

$db_table_offers = "myoffers";

$sql_set_code = "UPDATE $db_table_offers SET verification_code='$vercode' WHERE id='$offerid'";
$res_set = mysqli_query($connection, $sql_set_code);
if($res_set){
    echo 'success';
} else {
    echo 'error modify';
}
mysqli_close($connection);
?>
