const mysql = require('mysql');

const con = mysql.createConnection({
  host: "127.0.0.1",
  database: 'tutorials',
  user: "root",
  password: ""
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = con

