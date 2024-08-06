const express = require("express");
const router = express.Router();
const db = require("./database/db-connector");

// Middleware for parsing form data
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));

// READ: Display seasons
router.get("/", (req, res) => {
  db.query("SELECT * FROM Seasons", (err, seasons) => {
    res.render("seasons", { seasons });
  });
});

// NEW: Form to add a new season
router.get("/add", (req, res) => {
  db.query("SELECT * FROM Conferences", (err, conferences) => {
    if (err) throw err;
    res.render("seasons_add", { conferences });
  });
});

// CREATE: Add a new season
router.post("/add", (req, res) => {
  const { year } = req.body;
  const query = "INSERT INTO Seasons (year) VALUES (?)";
  db.query(query, [year], (err) => {
    if (err) throw err;
    res.redirect("/seasons");
  });
});

// GET: Display edit form for a specific season
router.get("/edit/:seasonID", (req, res) => {
  const seasonID = req.params.seasonID;
  db.query(
    "SELECT * FROM Seasons WHERE seasonID = ?",
    [seasonID],
    (err, results) => {
      if (err) throw err;
      const season = results[0];
      if (season) {
        // Fetch additional details if needed)
        res.render("seasons_edit", { seasons });
      } else {
        res.redirect("/seasons"); // Redirect if season not found
      }
    }
  );
});

module.exports = router;
