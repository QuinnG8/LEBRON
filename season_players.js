const express = require("express");
const router = express.Router();
const db = require("./database/db-connector");

// Middleware for parsing form data
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));

// READ: Display season_players
router.get("/", (req, res) => {
  db.query(
    `SELECT SeasonTeamPlayers.seasonTeamPlayerID, Seasons.year, Teams.name as team_name, Players.name as player_name
            FROM SeasonTeamPlayers 
            LEFT JOIN Seasons ON Seasons.seasonID = SeasonTeamPlayers.seasonID
            LEFT JOIN Teams ON Teams.teamID = SeasonTeamPlayers.teamID
            LEFT JOIN Players ON Players.playerID = SeasonTeamPlayers.playerID`,
    (err, season_players) => {
      if (err) throw err;
      res.render("season_players", {
        season_players,
      });
    }
  );
});

// NEW: Form to add a new season_player
router.get("/add", (req, res) => {
  db.query("SELECT * FROM Teams", (err, teams) => {
    if (err) throw err;
    db.query("SELECT * FROM Players", (err, players) => {
      if (err) throw err;
      db.query("SELECT * FROM Seasons", (err, seasons) => {
        if (err) throw err;
        res.render("season_players_add", { teams, players, seasons });
      });
    });
  });
});

// CREATE: Add a new season_player
router.post("/add", (req, res) => {
  const { seasonID, teamID, playerID } = req.body;
  const query =
    "INSERT INTO SeasonTeamPlayers (seasonID, teamID, playerID) VALUES (?, ?, ?)";
  db.query(query, [seasonID, teamID, playerID], (err) => {
    if (err) throw err;
    res.redirect("/season_players");
  });
});

// EDIT: Form to edit a new season_player
router.get("/edit/:seasonTeamPlayerID", (req, res) => {
  const seasonTeamPlayerID = req.params.seasonTeamPlayerID;
  db.query(
    `SELECT SeasonTeamPlayers.seasonTeamPlayerID, Seasons.seasonID,  Seasons.year, Teams.teamID, Teams.name as teamName, Players.playerID, Players.name as playerName
    FROM SeasonTeamPlayers 
    LEFT JOIN Seasons ON Seasons.seasonID = SeasonTeamPlayers.seasonID
    LEFT JOIN Teams ON Teams.teamID = SeasonTeamPlayers.teamID
    LEFT JOIN Players ON Players.playerID = SeasonTeamPlayers.playerID
    WHERE SeasonTeamPlayers.seasonTeamPlayerID = ?
    LIMIT 1`,
    [seasonTeamPlayerID],
    (err, season_players) => {
      season_player = season_players[0];
      if (err) throw err;
      db.query("SELECT * FROM Players", (err, players) => {
        if (err) throw err;
        db.query("SELECT * FROM Seasons", (err, seasons) => {
          if (err) throw err;
          db.query("SELECT * FROM Teams", (err, teams) => {
            if (err) throw err;
            res.render("season_players_edit", {
              season_player,
              teams,
              players,
              seasons,
            });
          });
        });
      });
    }
  );
});

// UPDATE: Update a season_player
router.post("/update", (req, res) => {
  const { seasonTeamPlayerID, seasonID, teamID, playerID } = req.body;
  const query =
    "UPDATE SeasonTeamPlayers SET seasonID = ?, teamID = ?, playerID = ? WHERE seasonTeamPlayerID = ?";
  db.query(query, [seasonID, teamID, playerID, seasonTeamPlayerID], (err) => {
    if (err) throw err;
    res.redirect("/season_players");
  });
});

// DELETE: Delete a season_player
router.post("/delete", (req, res) => {
  const { season_playerID } = req.body;
  const query = "DELETE FROM SeasonTeamPlayers WHERE season_playerID = ?";
  db.query(query, [season_playerID], (err) => {
    if (err) throw err;
    res.redirect("/season_players");
  });
});

module.exports = router;

// GET: Display edit form for a specific season_player
router.get("/edit/:season_playerID", (req, res) => {
  const season_playerID = req.params.season_playerID;
  db.query(
    "SELECT * FROM SeasonTeamPlayers WHERE season_playerID = ?",
    [season_playerID],
    (err, results) => {
      if (err) throw err;
      const season_player = results[0];
      if (season_player) {
        // Fetch additional details if needed (e.g., teams, positions)
        db.query("SELECT * FROM Teams", (err, teams) => {
          if (err) throw err;
          db.query("SELECT * FROM Positions", (err, positions) => {
            if (err) throw err;
            res.render("season_players_edit", {
              season_player,
              teams,
              positions,
            });
          });
        });
      } else {
        res.redirect("/season_players"); // Redirect if season_player not found
      }
    }
  );
});
