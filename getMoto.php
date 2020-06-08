<?php
header("Access-Control-Allow-Origin: *");
$motoid = '';
$vercode = '';
if (isset($_POST['motoid'])) {
    $motoid = $_POST['motoid'];
}

$connection = mysqli_connect('localhost', 'alexandro', '12345', 'motobase', '3306');
if (!$connection) {
    die("Connection failed: " . mysqli_connect_error());
}

$db_table_moto = "motocycle";

$sql_moto = "SELECT * FROM $db_table_moto  WHERE motoid='$motoid'";
$res_moto = mysqli_query($connection, $sql_moto);
if($res_moto) {
    $row = mysqli_fetch_array($res_moto,MYSQLI_ASSOC);
    echo json_encode($row);
}
mysqli_close($connection);
?>

