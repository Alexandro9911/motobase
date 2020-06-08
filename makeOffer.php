<?php
header("Access-Control-Allow-Origin: *");
$pretend = '';
$motuser= '';
$status = '';
$type = '';
$moto = '';
$connection = mysqli_connect('localhost', 'alexandro', '12345', 'motobase', '3306');
if (isset($_POST['pretendent']) && isset($_POST['motuser']) && isset($_POST['status']) && isset($_POST['type']) && isset($_POST['motoid'])) {
    $pretend = $_POST['pretendent'];
    $motuser = $_POST['motuser'];
    $status = $_POST['status'];
    $type = $_POST['type'];
    $moto = $_POST['motoid'];
}
    if (!$connection) {
        die("Connection failed: " . mysqli_connect_error());
    }
    $db_table_myoffers = "myoffers";
    $sql_ifExist = "SELECT id FROM $db_table_myoffers WHERE (moto_id='$moto' AND motuser_id='$motuser' AND pretendent='$pretend')";
    $res = mysqli_query($connection, $sql_ifExist);
    if($res){
        if(mysqli_num_rows($res) > 0){
            echo "already there";
        } else {
            $a = mysqli_query($connection, "SELECT COUNT(1) FROM $db_table_myoffers");
            $b = mysqli_fetch_array($a);
            $num = $b[0]; // выведет число строк

            $id = $num + 1;

            $sql_add = "INSERT INTO ".$db_table_myoffers." (moto_id,motuser_id,pretendent,status,verification_code) VALUES ('$moto','$motuser','$pretend','1','0')";
            $res = mysqli_query($connection,$sql_add);

            if($res){
                echo 'success';
            } else {
                echo 'error in insertion' . $res;
            }
        }
    } else {
        echo "thats one error";
    }

    mysqli_close($connection);
?>
