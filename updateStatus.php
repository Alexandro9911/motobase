<?php
header("Access-Control-Allow-Origin: *");
$vin ='';
$stat ='';
$motoid = '';
if(isset($_POST['vin']) && isset($_POST['stat']) && isset($_POST['motoid'])){
    $vin = $_POST['vin'];
    $stat = $_POST['stat'];
    $motoid = $_POST['motoid'];
}

$connection = mysqli_connect('localhost','alexandro','12345','motobase','3306');
if(!$connection){
    die("Connection failed: " . mysqli_connect_error());
}

$db_table_moto = "motocycle";
$db_table_offers = "myoffers";
if($stat == "1"){
    $sql_moto = "UPDATE $db_table_moto SET status = '$stat' WHERE vin='$vin'";
    $res = mysqli_query($connection, $sql_moto);
    $sql_offers = "SELECT id FROM $db_table_offers WHERE moto_id='$motoid'";
    $result = mysqli_query($connection, $sql_offers);
    $count = mysqli_num_rows($result);
    if($res){
        $sql_offers = "SELECT id FROM $db_table_offers WHERE moto_id='$motoid'";
        $result = mysqli_query($connection, $sql_offers);
        $count = mysqli_num_rows($result);
        for ($i = 0 ; $i < $count ; ++$i){
            $curr_offer = mysqli_fetch_array($result, MYSQLI_ASSOC);
            $curr_id = $curr_offer['id'];
            $sql_delete = "DELETE FROM $db_table_offers WHERE id='$curr_id'";
            $res_del = mysqli_query($connection, $sql_delete);

        }
        echo 'success';
    } else {
        echo 'err ' . $res;
    }
} else {
    $sql_moto = "UPDATE $db_table_moto SET status = '$stat' WHERE vin = '$vin'";
    $res = mysqli_query($connection, $sql_moto);
    if($res){
        echo 'success';
    } else {
        echo 'err ' . $res;
    }
}
mysqli_close($connection);
?>
