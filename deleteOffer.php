<?php
header("Access-Control-Allow-Origin: *");
$pretendent = '';
$motuser = '';
$status = '';
$type = '';
$motoid = '';

if (isset($_POST['pretendent']) && isset($_POST['motuser']) && isset($_POST['status']) && isset($_POST['type']) && isset($_POST['motoid'])) {
    $pretendent = $_POST['pretendent'];
    $motuser = $_POST['motuser'];
    $status = $_POST['status'];
    $type = $_POST['type'];
    $motoid = $_POST['motoid'];

    $connection = mysqli_connect('localhost', 'alexandro', '12345', 'motobase', '3306');
    if (!$connection) {
        die("Connection failed: " . mysqli_connect_error());
    }
    $db_table_myoffers = "myoffers";

    $a = mysqli_query($connection, "SELECT COUNT(1) FROM $db_table_myoffers");
    $b = mysqli_fetch_array($a);
    $num = $b[0]; // выведет число строк

    $id = $num + 1;
    $sql_find_offer = "SELECT id FROM $db_table_myoffers WHERE moto_id='$motoid' AND motuser_id='$motuser' AND pretendent='$pretendent'";
    $result_offer = mysqli_query($connection, $sql_find_offer);
    $row = mysqli_fetch_array($result_offer, MYSQLI_ASSOC);
    if($row == null){
        echo "denied";
    } else {
        $id_offer = $row['id'];

        $sql_delete = "DELETE FROM $db_table_myoffers WHERE id='$id_offer'";
        $res_deleting = mysqli_query($connection, $sql_delete);
        if ($res_deleting) {
            echo 'success';
        } else {
            echo 'error in deleting';
        }
    }
} else {
    echo 'error in isset';
}
?>
