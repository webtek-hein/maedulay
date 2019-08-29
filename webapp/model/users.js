const connection = require('./connection.js');

exports.get_all_users = function(callback){
	connection.query('SELECT * from users',  function(error, results, fields){
		if (error) throw error;
		return callback(results); 
	});	
}

exports.find_user = function(username, callback){
	connection.query('SELECT * from users where username=?',username,  function(error, results, fields){
		if (error) throw error;
		return callback(results[0]);
	});	
}

exports.end = function() {
	connection.end(function(err) {
		if (err) throw err;
		console.log('Disconnected.')
	});
}




