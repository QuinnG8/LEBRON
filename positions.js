const express = require("express");
const router = express.Router();
const db = require("./database/db-connector");

// Middleware for parsing form data
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));

// READ: Display positions
router.get("/", (req, res) => {
  db.query(
    `SELECT Positions.name as name,
      Positions.positionID AS positionID,
      (SELECT count(*) FROM PlayerPositions WHERE PlayerPositions.positionID = Positions.positionID) as playerCount
      FROM Positions
      `,
    (err, positions) => {
      res.render("positions", { positions });
    }
  );
});

// NEW: Form to add a new position
router.get("/add", (req, res) => {
  db.query("SELECT * FROM Conferences", (err, conferences) => {
    if (err) throw err;
    res.render("positions_add", { conferences });
  });
});

// CREATE: Add a new position
router.post("/add", (req, res) => {
  const { name } = req.body;
  const query = "INSERT INTO Positions (name) VALUES (?)";
  db.query(query, [name], (err) => {
    if (err) throw err;
    res.redirect("/positions");
  });
});

// GET: Display edit form for a specific position
router.get("/edit/:positionID", (req, res) => {
  const positionID = req.params.positionID;
  db.query(
    "SELECT * FROM Positions WHERE positionID = ?",
    [positionID],
    (err, results) => {
      if (err) throw err;
      const position = results[0];
      if (position) {
        // Fetch additional details if needed)
        res.render("positions_edit", { position });
      } else {
        res.redirect("/positions"); // Redirect if position not found
      }
    }
  );
});

// UPDATE: Update a position
router.post("/update", (req, res) => {
  const { name, positionID } = req.body;
  const query = "UPDATE Positions SET name = ? WHERE positionID = ?";
  db.query(query, [name, positionID], (err) => {
    if (err) throw err;
    res.redirect("/positions");
  });
});

// DELETE: Delete a position
router.post("/delete", (req, res) => {
  const { positionID } = req.body;
  const query = "DELETE FROM Positions WHERE positionID = ?";
  db.query(query, [positionID], (err) => {
    if (err) throw err;
    res.redirect("/positions");
  });
});

module.exports = router;
