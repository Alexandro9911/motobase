<?php
header("Access-Control-Allow-Origin: *");
$motoid = '';

if (isset($_POST['moto'])) {
    $motoid = $_POST['moto'];
}
$connection = mysqli_connect('localhost', 'alexandro', '12345', 'motobase', '3306');
if (!$connection) {
    die("Connection failed: " . mysqli_connect_error());
}
$motocycles = array();
$db_table_moto = "motocycle";
$db_table_country = "country";
$db_table_city = "city";
$db_table_type = "type";
$db_table_mark = "mark";
$db_table_user = "user";

$sql_moto = "SELECT *  FROM $db_table_moto WHERE motoid='$motoid'";
$res = mysqli_query($connection, $sql_moto);


$row = mysqli_fetch_array($res, MYSQLI_ASSOC);

$moto_country = $row['country'];
$moto_type = $row['type'];
$moto_mark = $row['mark'];
$user_id = $row['user'];

$sql_user = "SELECT fio,email,telephone,city_id FROM $db_table_user WHERE id='$user_id'";
$sql_country = "SELECT countryname FROM $db_table_country WHERE id='$moto_country'";
$sql_type = "SELECT value FROM $db_table_type WHERE id='$moto_type'";
$sql_mark = "SELECT value FROM $db_table_mark WHERE id='$moto_mark'";

$res_country = mysqli_query($connection, $sql_country);
$res_type = mysqli_query($connection, $sql_type);
$res_mark = mysqli_query($connection, $sql_mark);

$res_user = mysqli_query($connection, $sql_user);
$values_user = mysqli_fetch_array($res_user, MYSQLI_ASSOC);

$city_id = $values_user['city_id'];
$sql_city = "SELECT cityname FROM $db_table_city WHERE id='$city_id'";
$res_city = mysqli_query($connection, $sql_city);
$values_city = mysqli_fetch_array($res_city, MYSQLI_ASSOC);

$value_country = mysqli_fetch_array($res_country, MYSQLI_NUM);
$value_mark = mysqli_fetch_array($res_mark, MYSQLI_NUM);
$value_type = mysqli_fetch_array($res_type, MYSQLI_NUM);

array_push($row, $values_user['fio']);
array_push($row, $values_user['email']);
array_push($row, $values_user['telephone']);
array_push($row, $values_city['cityname']);

$row['country'] = $value_country[0];
$row['mark'] = $value_mark[0];
$row['type'] = $value_type[0];
array_push($motocycles, $row);


echo json_encode($motocycles);

mysqli_close($connection);
?>

