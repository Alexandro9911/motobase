<?php
header("Access-Control-Allow-Origin: *");
$fio = $_POST['fio'];
$email = $_POST['email'];
$country = $_POST['country'];
$city = $_POST['city'];
$tel = $_POST['tel'];
$passw = $_POST['passw'];

$connection = mysqli_connect('localhost','alexandro','12345','motobase','3306');
if(!$connection){
    die("Connection failed: " . mysqli_connect_error());
}
$db_table_user = "user";
$a = mysqli_query($connection, "SELECT COUNT(1) FROM $db_table_user");
$b = mysqli_fetch_array($a);
$num = $b[0]; // выведет число строк

$id = $num + 1;

//$db_table_city = "city";
//$db_table_country = "country";
// проверяем на наличие уже такого пользователя
$sql_ifExist = "SELECT email,telephone FROM $db_table_user WHERE email = '$email' AND telephone='$tel'";

// вносим пользователя
$sql_user = "INSERT INTO ".$db_table_user." (id,fio,email,telephone,passw,city_id) VALUES ('$id','$fio','$email','$tel','$passw','1')";
//$sql_country = "INSERT INTO ".$db_table_country." (id,countryname) VALUES ('$id','$country')";
//$sql_city = "INSERT INTO ".$db_table_city." (id,cityname,country_id) VALUES ('1','$city','1')";

//mysqli_query($connection, $sql_country);
//mysqli_query($connection, $sql_city);

$res = mysqli_query($connection, $sql_ifExist);
$count = mysqli_num_rows($res);

if( $count > 0 ) {
  //  if($row['email'] == $email || $row['tel'] == $tel){
        echo "userExist";
  //  }
} else {
    $ins = mysqli_query($connection, $sql_user);
    if($ins){
        echo "success";
    } else {
        echo "error in" . $sql_user . mysqli_error($connection);
    }
}
mysqli_close($connection);

?>