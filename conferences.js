const express = require("express");
const router = express.Router();
const db = require("./database/db-connector");

// Middleware for parsing form data
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));

// READ: Display conferences
router.get("/", (req, res) => {
  db.query("SELECT * FROM Conferences", (err, conferences) => {
    if (err) throw err;
    res.render("conferences", { conferences });
  });
});

// NEW: Form to add a new conference
router.get("/add", (req, res) => {
  res.render("conferences_add", {});
});

// CREATE: Add a new conference
router.post("/add", (req, res) => {
  const { name } = req.body;
  const query = "INSERT INTO conferences (name) VALUES (?)";
  db.query(query, [name], (err) => {
    if (err) throw err;
    res.redirect("/conferences");
  });
});

// GET: Display edit form for a specific conference
router.get("/edit/:conferenceID", (req, res) => {
  const conferenceID = req.params.conferenceID;
  db.query(
    "SELECT * FROM conferences WHERE conferenceID = ?",
    [conferenceID],
    (err, results) => {
      if (err) throw err;
      const conference = results[0];
      if (conference) {
        // Fetch additional details if needed (e.g., teams, positions)
        res.render("conferences_edit", { conference });
      } else {
        res.redirect("/conferences"); // Redirect if conference not found
      }
    }
  );
});

// UPDATE: Update a conference
router.post("/update", (req, res) => {
  const { conferenceID, name } = req.body;
  const query =
    "UPDATE Conferences SET name = ? WHERE Conferences.conferenceID = ?";
  db.query(query, [name, conferenceID], (err) => {
    if (err) throw err;
    res.redirect("/conferences");
  });
});

// DELETE: Delete a conference
router.post("/delete", (req, res) => {
  const { conferenceID } = req.body;
  const query = "DELETE FROM Conferences WHERE conferenceID = ?";
  db.query(query, [conferenceID], (err) => {
    if (err) throw err;
    res.redirect("/conferences");
  });
});

module.exports = router;
