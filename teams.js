const express = require("express");
const router = express.Router();
const db = require("./database/db-connector");

// Middleware for parsing form data
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));

// READ: Display teams
router.get("/", (req, res) => {
  db.query(
    `SELECT Teams.name, Teams.teamID, Conferences.name as conferenceName
    FROM Teams
    LEFT JOIN Conferences ON Teams.conferenceID = Conferences.conferenceID`,
    (err, teams) => {
      if (err) throw err;
      res.render("teams", { teams });
    }
  );
});

// NEW: Form to add a new team
router.get("/add", (req, res) => {
  db.query("SELECT * FROM Conferences", (err, conferences) => {
    if (err) throw err;
    res.render("teams_add", { conferences });
  });
});

// CREATE: Add a new team
router.post("/add", (req, res) => {
  const { name } = req.body;
  const query = "INSERT INTO Teams (name) VALUES (?)";
  db.query(query, [name], (err) => {
    if (err) throw err;
    res.redirect("/teams");
  });
});

// GET: Display edit form for a specific team
router.get("/edit/:teamID", (req, res) => {
  const teamID = req.params.teamID;
  db.query(
    `SELECT Teams.name, Teams.teamID, Conferences.conferenceID as conferenceID
    FROM Teams
    LEFT JOIN Conferences ON Teams.conferenceID = Conferences.conferenceID
    WHERE Teams.teamID = ?
    LIMIT 1`,
    [teamID],
    (err, results) => {
      if (err) throw err;
      const team = results[0];

      if (team) {
        db.query("SELECT * FROM Conferences", (err, conferences) => {
          if (err) throw err;

          res.render("teams_edit", { team, conferences });
        });
      } else {
        res.redirect("/teams"); // Redirect if team not found
      }
    }
  );
});

// UPDATE: Update a player
router.post("/update", (req, res) => {
  const { teamID, name, conferenceID } = req.body;
  const query = "UPDATE Teams SET name = ?, conferenceID = ? WHERE teamID = ?";
  db.query(query, [name, conferenceID, teamID], (err) => {
    if (err) throw err;
    res.redirect("/teams");
  });
});

// DELETE: Delete a team
router.post("/delete", (req, res) => {
  const { teamID } = req.body;
  const query = "DELETE FROM Teams WHERE teamID = ?";
  db.query(query, [teamID], (err) => {
    if (err) throw err;
    res.redirect("/teams");
  });
});


module.exports = router;
