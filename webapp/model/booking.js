const connection = require('./connection.js');

exports.get_all_bookings = function(callback){
	connection.query(`SELECT * from bookings`,subject_id,  
		function(error, results, fields){
			if (error) throw error;
			return callback(results); 
		});	
}

exports.get_booking_by_user = function(callback){
	connection.query(`SELECT * from bookings`,subject_id,  
		function(error, results, fields){
			if (error) throw error;
			return callback(results); 
		});	
}

exports.get_booking_by_id = function(clientid, callback){
	connection.query(`SELECT bookid, subjectid, status FROM bookings
	 inner join schedules on schedules.scheduleid = bookings.scheduleid
	  WHERE clientid=?`,clientid,  
		function(error, results, fields){
			if (error) throw error;
			return callback(results); 
		});	
}

exports.add_new_booking = function(scheduleid, uid, callback){
	connection.query(`Insert into bookings (scheduleid, clientid)
		values(?,?)`,[scheduleid, uid],  
		function(error, result){
			if (error) throw error;
			return callback(result.insertId); 
		});	
}

exports.cancel_booking = function(bookid, callback){
	connection.query(`UPDATE bookings SET status = 'cancelled' 
		WHERE bookings.bookid = ?`,[bookid],  
		function(error, result){
			if (error) throw error;
			return callback(result); 
		});	
}