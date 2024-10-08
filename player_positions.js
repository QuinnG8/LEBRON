const express = require("express");
const router = express.Router();
const db = require("./database/db-connector");

// Middleware for parsing form data
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));

// READ: Display player_positions
router.get("/", (req, res) => {
  db.query(
    `SELECT PlayerPositions.playerPositionID, Players.name as player_name, Positions.name as position_name
            FROM PlayerPositions 
            LEFT JOIN Positions ON Positions.positionID = PlayerPositions.positionID
            LEFT JOIN Players ON Players.playerID = PlayerPositions.playerID`,
    (err, player_positions) => {
      if (err) throw err;
      res.render("player_positions", {
        player_positions,
      });
    }
  );
});

// NEW: Form to add a new player_position
router.get("/add", (req, res) => {
  db.query("SELECT * FROM Positions", (err, positions) => {
    if (err) throw err;
    db.query("SELECT * FROM Players", (err, players) => {
      if (err) throw err;
      res.render("player_positions_add", { players, positions });
    });
  });
});

// CREATE: Add a new player_position
router.post("/add", (req, res) => {
  const { positionID, playerID } = req.body;
  const query =
    "INSERT INTO PlayerPositions (positionID, playerID) VALUES (?, ?)";
  db.query(query, [positionID, playerID], (err) => {
    if (err) throw err;
    res.redirect("/player_positions");
  });
});

// DELETE: Delete a player_position
router.post("/delete", (req, res) => {
  const { playerPositionID } = req.body;
  const query = "DELETE FROM PlayerPositions WHERE playerPositionID = ?";
  db.query(query, [playerPositionID], (err) => {
    if (err) throw err;
    res.redirect("/player_positions");
  });
});

module.exports = router;

// GET: Display edit form for a specific player_position
router.get("/edit/:player_positionID", (req, res) => {
  const player_positionID = req.params.player_positionID;
  db.query(
    `SELECT PlayerPositions.playerPositionID, Players.name as playerName, 
        Players.playerID as playerID,    
        Positions.positionID as positionID, Positions.name as positionName
     FROM PlayerPositions 
     LEFT JOIN Positions ON Positions.positionID = PlayerPositions.positionID
     LEFT JOIN Players ON Players.playerID = PlayerPositions.playerID
     WHERE playerPositionID = ?
     LIMIT 1`,
    [player_positionID],
    (err, results) => {
      if (err) throw err;
      const player_position = results[0];
      if (player_position) {
        db.query("SELECT * FROM Players", (err, players) => {
          if (err) throw err;
          db.query("SELECT * FROM Positions", (err, positions) => {
            if (err) throw err;
            res.render("player_positions_edit", {
              player_position,
              players,
              positions,
            });
          });
        });
      } else {
        res.redirect("/player_positions"); // Redirect if player_position not found
      }
    }
  );
});

// UPDATE: Update a player_position
router.post("/update", (req, res) => {
  const { playerPositionID, playerID, positionID } = req.body;
  const query =
    "UPDATE PlayerPositions SET playerID = ?, positionID = ? WHERE playerPositionID = ?";
  db.query(query, [playerID, positionID, playerPositionID], (err) => {
    if (err) throw err;
    res.redirect("/player_positions");
  });
});
