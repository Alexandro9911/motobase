<?php
header("Access-Control-Allow-Origin: *");
$myid ='';

if(isset($_POST['myid'])){
    $myid = $_POST['myid'];
}
$connection = mysqli_connect('localhost','alexandro','12345','motobase','3306');
if(!$connection){
    die("Connection failed: " . mysqli_connect_error());
}
$motocycles = array();
$db_table_moto = "motocycle";
$db_table_country ="country";
$db_table_city ="city";
$db_table_type ="type";
$db_table_mark = "mark";
$db_table_user = "user";
$db_table_offers = "myoffers";


$sql_offers = "SELECT * FROM $db_table_offers WHERE pretendent='$myid' OR motuser_id ='$myid'";
$res = mysqli_query($connection, $sql_offers);

$quantity = mysqli_num_rows($res);

for ($i = 0 ; $i < $quantity ; ++$i)
{
    $row_offer = mysqli_fetch_array($res,MYSQLI_ASSOC);
    $motoid = $row_offer['moto_id'];

    $sql_moto = "SELECT * FROM $db_table_moto WHERE motoid='$motoid'";
    $res_moto = mysqli_query($connection, $sql_moto);
    $row = mysqli_fetch_array($res_moto,MYSQLI_ASSOC);

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

    $res_user = mysqli_query($connection,$sql_user);
    $values_user = mysqli_fetch_array($res_user,MYSQLI_ASSOC);

    $city_id = $values_user['city_id'];
    $sql_city = "SELECT cityname FROM $db_table_city WHERE id='$city_id'";
    $res_city = mysqli_query($connection,$sql_city);
    $values_city = mysqli_fetch_array($res_city,MYSQLI_ASSOC);

    $value_country = mysqli_fetch_array($res_country,MYSQLI_NUM);
    $value_mark = mysqli_fetch_array($res_mark,MYSQLI_NUM);
    $value_type = mysqli_fetch_array($res_type,MYSQLI_NUM);

    array_push($row,$values_user['fio']);
    array_push($row,$values_user['email']);
    array_push($row,$values_user['telephone']);
    array_push($row,$values_city['cityname']);

    array_push($row,$row_offer['id']);
    array_push($row,$row_offer['moto_id']);
    array_push($row,$row_offer['motuser_id']);
    array_push($row,$row_offer['pretendent']);
    array_push($row,$row_offer['status']);

    // получить значения покупателя - телефон емаил фио
    $pret = $row_offer['pretendent'];
    $sql_pretend = "SELECT fio,email,telephone FROM $db_table_user WHERE id='$pret'";
    $res_pret = mysqli_query($connection,$sql_pretend);
    $row_pret = mysqli_fetch_array($res_pret, MYSQLI_ASSOC);

    array_push($row,$row_pret['fio']);
    array_push($row,$row_pret['email']);
    array_push($row,$row_pret['telephone']);

    $row['country'] = $value_country[0];
    $row['mark'] = $value_mark[0];
    $row['type'] = $value_type[0];

    array_push($motocycles,$row);
}
echo json_encode($motocycles);

mysqli_close($connection);
?>
