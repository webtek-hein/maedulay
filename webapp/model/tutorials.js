const connection = require('./connection.js');

exports.get_all_subjects = function( callback){
	connection.query(`SELECT * FROM subjects `,  
		function(error, results, fields){
			if (error) throw error;
			return callback(results); 
	});	
}

exports.get_subject_details = function(subject_id, callback){
	connection.query(`SELECT scheduleid, CONCAT(firstname,' ',lastname) as teacher, 
		CONCAT(date,' ',time) as schedule FROM  schedules 
		inner join users on schedules.uid=users.uid
		  WHERE subjectid=?`,subject_id,  
		function(error, results, fields){
			if (error) throw error;
			return callback(results); 
		});	
}


exports.end = function() {
	connection.end(function(err) {
		if (err) throw err;
		console.log('Disconnected.')
	});
}




