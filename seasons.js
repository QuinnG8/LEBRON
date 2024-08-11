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
    "SELECT * FROM Seasons WHERE seasonID = ? LIMIT 1",
    [seasonID],
    (err, results) => {
      if (err) throw err;
      const season = results[0];
      if (season) {
        // Fetch additional details if needed)
        res.render("seasons_edit", { season });
      } else {
        res.redirect("/seasons"); // Redirect if season not found
      }
    }
  );
});

// UPDATE: Update a season
router.post("/update", (req, res) => {
  const { year, seasonID } = req.body;
  console.log("Body: ", req.body);
  const query = "UPDATE Seasons SET year = ? WHERE seasonID = ?";
  db.query(query, [year, seasonID], (err) => {
    if (err) throw err;
    res.redirect("/seasons");
  });
});

// DELETE: Delete a season
router.post("/delete", (req, res) => {
  const { seasonID } = req.body;
  const query = "DELETE FROM seasons WHERE seasonID = ?";
  db.query(query, [seasonID], (err) => {
    if (err) throw err;
    res.redirect("/seasons");
  });
});

module.exports = router;
