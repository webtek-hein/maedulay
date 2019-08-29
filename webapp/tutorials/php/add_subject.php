<?php

require 'config.php';


function add_schedule($db,$subjectid)
{
	$date = $_POST['date'];
	$time = $_POST['time'];
	$uid = 1;

	$sql = "INSERT INTO schedules(time, date, uid, subjectid) VALUES ('$time', '$date', '$uid', '$subjectid')";


	if (mysqli_query($db, $sql)) {
		$insertid = mysqli_insert_id($db);
	} else {
		echo "Error: " . $sql . "" . mysqli_error($db);
	}



}

function add_subject($db)
{
	$name = $_POST['name'];
	$description = $_POST['description'];
	$fee = $_POST['fee'];

	$sql = "INSERT INTO subjects(name, fee, description) VALUES ('$name', '$fee', '$description')";

	if (mysqli_query($db, $sql)) {
		$insertid = mysqli_insert_id($db);
	} else {
		echo "Error: " . $sql . "" . mysqli_error($db);
	}


	return $insertid;
}

$checkbox = $_POST['list'];


if (isset($checkbox)){
	$subjectid = add_subject($db);

}else{
	$subjectid = $_POST['subject'];

}

add_schedule($db, $subjectid);

mysqli_close($db);

header('Location: ../subjects.php');
