const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'cs340_glennq',    // Update with your MySQL username
  password: '5121',// Update with your MySQL password
  database: 'cs340_glennq' // Update with your database name
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database');
});

module.exports = db;
