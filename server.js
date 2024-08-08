require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;

// Database connection
const db = require("./database/db-connector");

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Set up EJS as the view engine
app.set("views", "./views");
app.set("view engine", "ejs");

// Routes
app.use("/", require("./index.js"));
app.use("/players", require("./players.js"));
app.use("/conferences", require("./conferences.js"));
app.use("/teams", require("./teams.js"));
app.use("/positions", require("./positions.js"));
app.use("/seasons", require("./seasons.js"));
app.use("/season_players", require("./season_players.js"));
app.use("/player_positions", require("./player_positions.js"));
app.use("/quiz", require("./quiz.js")); 


// Start the server
app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}/players`);
});
