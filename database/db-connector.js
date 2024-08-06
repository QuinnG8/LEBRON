const mysql = require('mysql');

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER, // Update with your MySQL username
  password: process.env.DB_PASSWORD, // Update with your MySQL password
  database: process.env.DB_NAME, // Update with your database name
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database');
});

module.exports = db;
