<?php 

require 'config.php';

$uid = 1;
$subjectid = $_POST['subjectid'];
$row = array();


$sql = "SELECT bookid,CONCAT(firstname,' ',lastname) as student, date, time, status FROM schedules inner join bookings on schedules.scheduleid = bookings.scheduleid inner join users on bookings.clientid = users.uid where subjectid = $subjectid and schedules.uid = $uid and status in ('pending','booked')";

if($result = mysqli_query($db, $sql)){
	if(mysqli_num_rows($result) > 0){
		$row = mysqli_fetch_all($result);
	}

} else{
	echo "ERROR: Could not able to execute $sql. " . mysqli_error($link);
}

mysqli_close($db);

echo json_encode($row);

