const express = require("express");
const router = express.Router();
const db = require("./database/db-connector");

// Middleware for parsing form data
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));

// READ: Display players
router.get("/", (req, res) => {
  const filters = {
    name: req.query.name,
    age: parseInt(req.query.age),
    team_id: parseInt(req.query.team_id),
    position_id: parseInt(req.query.position_id),
    conference_id: parseInt(req.query.conference_id),
  };

  let conditions = [];
  let conditionValues = [];

  if (filters.name && filters.name.length) {
    conditions = conditions.concat("(Players.name LIKE ?)");
    conditionValues = conditionValues.concat("%" + filters.name + "%");
  }
  if (filters.age) {
    conditions = conditions.concat("(Players.age = ?)");
    conditionValues = conditionValues.concat(filters.age);
  }
  if (filters.team_id) {
    conditions = conditions.concat("(SeasonTeamPlayers.teamID = ?)");
    conditionValues = conditionValues.concat(filters.team_id);
  }
  if (filters.position_id) {
    conditions = conditions.concat("(PlayerPositions.positionID = ?)");
    conditionValues = conditionValues.concat(filters.position_id);
  }
  if (filters.conference_id) {
    conditions = conditions.concat("(Teams.conferenceID = ?)");
    conditionValues = conditionValues.concat(filters.conference_id);
  }

  const wheres = conditions.length ? "WHERE " + conditions.join(" AND ") : "";

  db.query(
    `SELECT Players.playerID, 
      Players.name, 
      Players.age, 
      Players.jerseyNumber, 
      Positions.name as positionName, 
      Teams.name as teamName, 
      Seasons.year as year
    FROM Players 
    LEFT JOIN PlayerPositions ON PlayerPositions.playerID = Players.playerID
    LEFT JOIN Positions ON Positions.positionID = PlayerPositions.positionID
    INNER JOIN SeasonTeamPlayers ON SeasonTeamPlayers.playerID = Players.playerID
    LEFT JOIN Teams ON Teams.teamID = SeasonTeamPlayers.teamID
    LEFT JOIN Seasons ON Seasons.seasonID = SeasonTeamPlayers.seasonID
    ${wheres}`,
    conditionValues,
    (err, players) => {
      if (err) throw err;
      db.query("SELECT * FROM Teams", (err, teams) => {
        if (err) throw err;
        db.query("SELECT * FROM Positions", (err, positions) => {
          if (err) throw err;
          db.query("SELECT * FROM Conferences", (err, conferences) => {
            if (err) throw err;
            db.query("SELECT * FROM Seasons", (err, seasons) => {
              if (err) throw err;
              res.render("players", {
                players,
                teams,
                positions,
                conferences,
                seasons,
                filters,
              });
            });
          });
        });
      });
    }
  );
});

// NEW: Form to add a new player
router.get("/add", (req, res) => {
  db.query("SELECT * FROM Teams", (err, teams) => {
    if (err) throw err;
    db.query("SELECT * FROM Positions", (err, positions) => {
      if (err) throw err;
      db.query("SELECT * FROM Conferences", (err, conferences) => {
        if (err) throw err;
        db.query("SELECT * FROM Seasons", (err, seasons) => {
          if (err) throw err;
          res.render("players_add", {
            teams,
            positions,
            conferences,
            seasons,
          });
        });
      });
    });
  });
});

// CREATE: Add a new player
router.post("/add", (req, res) => {
  const { name, age, jerseyNumber, teamID, seasonID, positionID } = req.body;
  const playerQuery =
    "INSERT INTO Players (name, age, jerseyNumber) VALUES (?, ?, ?)";
  db.query(playerQuery, [name, age, jerseyNumber], (err, result) => {
    if (err) throw err;
    const playerID = result.insertId;
    const seasonTeamPlayerQuery =
      "INSERT INTO SeasonTeamPlayers (playerID, seasonID, teamID) VALUES (?, ?, ?)";
    db.query(seasonTeamPlayerQuery, [playerID, seasonID, teamID], (err) => {
      if (err) throw err;
      const playerPositionQuery =
        "INSERT INTO PlayerPositions (playerID, positionID) VALUES (?, ?)";
      db.query(playerPositionQuery, [playerID, positionID], (err) => {
        if (err) throw err;
        res.redirect("/players");
      });
    });
  });
});

// UPDATE: Update a player
router.post("/update", (req, res) => {
  const { playerID, name, age, jerseyNumber } = req.body;
  const query =
    "UPDATE Players SET name = ?, age = ?, jerseyNumber = ? WHERE playerID = ?";
  db.query(query, [name, age, jerseyNumber, playerID], (err) => {
    if (err) throw err;
    res.redirect("/players");
  });
});

// DELETE: Delete a player
router.post("/delete", (req, res) => {
  const { playerID } = req.body;
  const query = "DELETE FROM Players WHERE playerID = ?";
  db.query(query, [playerID], (err) => {
    if (err) throw err;
    res.redirect("/players");
  });
});

// GET: Display edit form for a specific player
router.get("/edit/:playerID", (req, res) => {
  const playerID = req.params.playerID;
  db.query(
    "SELECT * FROM Players WHERE playerID = ?",
    [playerID],
    (err, results) => {
      if (err) throw err;
      const player = results[0];
      if (player) {
        // Fetch additional details if needed (e.g., teams, positions)
        db.query("SELECT * FROM Teams", (err, teams) => {
          if (err) throw err;
          db.query("SELECT * FROM Positions", (err, positions) => {
            if (err) throw err;
            res.render("players_edit", { player, teams, positions });
          });
        });
      } else {
        res.redirect("/players"); // Redirect if player not found
      }
    }
  );
});

module.exports = router;
