const express = require("express");
const router = express.Router();
const db = require("./database/db-connector");

// Middleware for parsing form data
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));

// READ: Display teams
router.get("/", (req, res) => {
  db.query("SELECT * FROM Teams", (err, teams) => {
    if (err) throw err;
    db.query("SELECT * FROM Conferences", (err, conference) => {
      if (err) throw err;
      res.render("teams", { teams });
    });
  });
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
    "SELECT * FROM teams WHERE teamID = ?",
    [teamID],
    (err, results) => {
      if (err) throw err;
      const team = results[0];
      if (team) {
        // Fetch additional details if needed (e.g., teams, positions)
        res.render("teams_edit", { team, teams, positions });
      } else {
        res.redirect("/teams"); // Redirect if team not found
      }
    }
  );
});

module.exports = router;
