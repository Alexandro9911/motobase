<?php
header("Access-Control-Allow-Origin: *");

$vin ='';
$name='';
$type ='';
$year ='';
$cubature = '';
$country = '';
$user = '';
$mark ='';
if(isset($_POST['vin']) && isset($_POST['name']) && isset( $_POST['type']) && isset($_POST['year']) && isset($_POST['cubature']) && isset($_POST['country'])
    && isset($_POST['user']) && isset($_POST['mark'])){
    $vin = $_POST['vin'];
    $name= $_POST['name'];
    $type = $_POST['type'];
    $year = $_POST['year'];
    $cubature = $_POST['cubature'];
    $country = $_POST['country'];
    $user = $_POST['user'];
    $mark = $_POST['mark'];
} else {
    echo "error in isset";
}

$connection = mysqli_connect('localhost','alexandro','12345','motobase','3306');
if(!$connection){
    die("Connection failed: " . mysqli_connect_error());
}
$db_table_moto = "motocycle";
$db_table_history = "history";


$sql_ifExist = "SELECT vin FROM $db_table_moto WHERE vin = '$vin'";

$res = mysqli_query($connection, $sql_ifExist);
$count = mysqli_num_rows($res);
$a = mysqli_query($connection, "SELECT COUNT(1) FROM $db_table_moto");
$b = mysqli_fetch_array($a);
$num = $b[0]; // выведет число строк

$id = $num + 1;
if( $count > 0 ) {
    echo "exist";
} else {
    $sql_moto = "INSERT INTO $db_table_moto (motoid,vin,mark,nameMoto,type,cubature,year,country,user,status,description) VALUES ('$id','$vin','$mark','$name','$type','$cubature','$year','$country','$user','1','---')";
    $ins = mysqli_query($connection, $sql_moto);
    if($ins){
        $sql_history = "INSERT INTO $db_table_history (motocycle_id,user_id,date_from,date_to,motocycle_vin) VALUES ('$id','$user',NOW(),'-','$vin')";
        $result = mysqli_query($connection,$sql_history);
        if($result){
            echo "success";
        } else {
           echo "error date";
        }
    } else {
        echo "error in" . $sql_moto . mysqli_error($connection);
    }
}
mysqli_close($connection);
?>
