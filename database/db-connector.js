const mysql = require('mysql');

console.log(process.env.DB_USER, process.env.DB_PASSWORD, process.env.DB_NAME);
const db = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USER, // Update with your MySQL username
  password: process.env.DB_PASSWORD, // Update with your MySQL password
  database: process.env.DB_NAME, // Update with your database name
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database');
});

module.exports = db;
