const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

// Database connection
const db = require('./database/db-connector');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Set up EJS as the view engine
app.set('view engine', 'ejs');

// Routes
app.use('/players', require('./players.js'));

// Start the server
app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}/players`);
});