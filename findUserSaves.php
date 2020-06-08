<?php
header("Access-Control-Allow-Origin: *");
$userId ='';
if(isset($_POST['iduser'])){
    $userId = $_POST['iduser'];
}
$connection = mysqli_connect('localhost','alexandro','12345','motobase','3306');
if(!$connection){
    die("Connection failed: " . mysqli_connect_error());
}
$myArray = array();
$db_table_moto = "motocycle";
$db_table_country ="country";
$db_table_type ="type";
$db_table_mark = "mark";
$db_table_user = "user";
$db_table_city ="city";

$db_table_wishlist = "wishlist";

$sql_wishlist = "SELECT * FROM $db_table_wishlist WHERE userid='$userId'";
$res = mysqli_query($connection, $sql_wishlist);

$quantity = mysqli_num_rows($res);

for ($i = 0 ; $i < $quantity ; ++$i) {

    $row = mysqli_fetch_array($res,MYSQLI_ASSOC);
    $moto = $row['moto'];

    $sql_moto = "SELECT *  FROM $db_table_moto WHERE motoid='$moto'";
    $res_moto = mysqli_query($connection, $sql_moto);
    $row_moto = mysqli_fetch_array($res_moto, MYSQLI_ASSOC);

    $moto_country = $row_moto['country'];
    $moto_type = $row_moto['type'];
    $moto_mark = $row_moto['mark'];
    $user_id = $row_moto['user'];

    $sql_user = "SELECT fio,email,telephone,city_id FROM $db_table_user WHERE id='$user_id'";
    $sql_country = "SELECT countryname FROM $db_table_country WHERE id='$moto_country'";
    $sql_type = "SELECT value FROM $db_table_type WHERE id='$moto_type'";
    $sql_mark = "SELECT value FROM $db_table_mark WHERE id='$moto_mark'";

    $res_country = mysqli_query($connection, $sql_country);
    $res_type = mysqli_query($connection, $sql_type);
    $res_mark = mysqli_query($connection, $sql_mark);

    $res_user = mysqli_query($connection,$sql_user);
    $values_user = mysqli_fetch_array($res_user,MYSQLI_ASSOC);

    $city_id = $values_user['city_id'];
    $sql_city = "SELECT cityname FROM $db_table_city WHERE id='$city_id'";
    $res_city = mysqli_query($connection,$sql_city);
    $values_city = mysqli_fetch_array($res_city,MYSQLI_ASSOC);

    $value_country = mysqli_fetch_array($res_country,MYSQLI_NUM);
    $value_mark = mysqli_fetch_array($res_mark,MYSQLI_NUM);
    $value_type = mysqli_fetch_array($res_type,MYSQLI_NUM);

    array_push($row_moto,$values_user['fio']);
    array_push($row_moto,$values_user['email']);
    array_push($row_moto,$values_user['telephone']);
    array_push($row_moto,$values_city['cityname']);

    $row_moto['country'] = $value_country[0];
    $row_moto['mark'] = $value_mark[0];
    $row_moto['type'] = $value_type[0];

    array_push($myArray,$row_moto);
}

echo json_encode($myArray);

mysqli_close($connection);
?>
