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

$sql_moto = "SELECT *  FROM $db_table_moto WHERE user='$userId'";
$res = mysqli_query($connection, $sql_moto);

$quantity = mysqli_num_rows($res);

for ($i = 0 ; $i < $quantity ; ++$i)
{
    $row = mysqli_fetch_array($res,MYSQLI_ASSOC);

    $moto_country = $row['country'];
    $moto_type = $row['type'];
    $moto_mark = $row['mark'];

    $sql_country = "SELECT countryname FROM $db_table_country WHERE id='$moto_country'";
    $sql_type = "SELECT value FROM $db_table_type WHERE id='$moto_type'";
    $sql_mark = "SELECT value FROM $db_table_mark WHERE id='$moto_mark'";

    $res_country = mysqli_query($connection, $sql_country);
    $res_type = mysqli_query($connection, $sql_type);
    $res_mark = mysqli_query($connection, $sql_mark);

    $value_country = mysqli_fetch_array($res_country,MYSQLI_NUM);
    $value_mark = mysqli_fetch_array($res_mark,MYSQLI_NUM);
    $value_type = mysqli_fetch_array($res_type,MYSQLI_NUM);

    $row['country'] = $value_country[0];
    $row['mark'] = $value_mark[0];
    $row['type'] = $value_type[0];
    array_push($myArray,$row);
}

echo json_encode($myArray);

mysqli_close($connection);
?>
