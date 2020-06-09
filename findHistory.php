<?php
header("Access-Control-Allow-Origin: *");
$motoid ='';
if(isset($_POST['motoid'])){
    $motoid = $_POST['motoid'];
}
$connection = mysqli_connect('localhost','alexandro','12345','motobase','3306');
if(!$connection){
    die("Connection failed: " . mysqli_connect_error());
}
$myArray = array();

$db_table_user = "user";
$db_table_history ="history";
$db_table_city ="city";

$sql_history = "SELECT * FROM $db_table_history WHERE motocycle_id='$motoid'";
$res = mysqli_query($connection, $sql_history);

$quantity = mysqli_num_rows($res);

for ($i = 0 ; $i < $quantity ; ++$i) {
    $final_row = array();
    $row = mysqli_fetch_array($res,MYSQLI_ASSOC);
    $user = $row['user_id'];
    $date_to = $row['date_to'];
    if($date_to == null){
        $row['date_to'] = 'today';
    }
    array_push($final_row,$row['date_to']);
    array_push($final_row,$row['date_from']);

    $sql_user = "SELECT fio,email,city_id FROM $db_table_user WHERE id='$user'";
    $res_user = mysqli_query($connection,$sql_user);
    $values_user = mysqli_fetch_array($res_user,MYSQLI_ASSOC);
    $user_city = $values_user['city_id'];
    $user_email = $values_user['email'];

    $sql_city= "SELECT cityname FROM $db_table_city WHERE id='$user_city'";
    $res_city = mysqli_query($connection,$sql_city);
    $values_city = mysqli_fetch_array($res_city,MYSQLI_ASSOC);


    array_push($final_row,$values_user['fio']);
    array_push($final_row,$values_city['cityname']);
    array_push($final_row,$user_email);

    array_push($myArray,$final_row);
}

echo json_encode($myArray);

mysqli_close($connection);
?>


