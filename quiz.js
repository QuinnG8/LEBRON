// quiz.js
const express = require("express");
const router = express.Router();
const db = require("./database/db-connector");

// Route to render the quiz page and select a random player
router.get("/", (req, res) => {
  const query = `
        SELECT p.name, p.age, p.jerseyNumber, t.name AS teamName, pos.name AS positionName, c.name AS conferenceName
        FROM Players p
        JOIN SeasonTeamPlayers stp ON p.playerID = stp.playerID
        JOIN Teams t ON stp.teamID = t.teamID
        JOIN PlayerPositions pp ON p.playerID = pp.playerID
        JOIN Positions pos ON pp.positionID = pos.positionID
        JOIN Conferences c ON t.conferenceID = c.conferenceID
        ORDER BY RAND()
        LIMIT 1;
    `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Database query error:", err);
      res.status(500).send("Database query error");
    } else if (results.length > 0) {
      console.log("Random player selected:", results[0]);
      const randomPlayer = results[0];
      res.render("quiz", { randomPlayer }); // Pass the random player to the quiz.ejs
    } else {
      res.status(404).send("No players found");
    }
  });
});

// Route to handle player guess
router.post("/guess", (req, res) => {
  const playerName = req.body["player-guess"];
  console.log(playerName);
  const query = `
        SELECT p.name, p.age, p.jerseyNumber, t.name AS teamName, pos.name AS positionName, c.name AS conferenceName
        FROM Players p
        JOIN SeasonTeamPlayers stp ON p.playerID = stp.playerID
        JOIN Teams t ON stp.teamID = t.teamID
        JOIN PlayerPositions pp ON p.playerID = pp.playerID
        JOIN Positions pos ON pp.positionID = pos.positionID
        JOIN Conferences c ON t.conferenceID = c.conferenceID
        WHERE p.name = ?;
    `;

  db.query(query, [playerName], (err, results) => {
    if (err) {
      console.error("Database query error:", err); // Debugging
      res.status(500).send("Database query error");
    } else if (results.length > 0) {
      console.log("Player found:", results[0]); // Debugging
      res.json(results[0]);
    } else {
      console.log("Player not found for name:", playerName); // Debugging
      res.status(404).send("Player not found");
    }
  });
});

module.exports = router;
