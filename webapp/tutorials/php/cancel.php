<?php 

require 'config.php';

$bookid = $_POST['bookid'];

$sql = "UPDATE bookings SET status='cancelled' WHERE bookid=$bookid";

if (mysqli_query($db, $sql)) {
	echo "Record updated successfully";
} else {
	echo "Error updating record: " . mysqli_error($db);
}