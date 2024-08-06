const express = require("express");
const router = express.Router();
const db = require("./database/db-connector");

// Middleware for parsing form data
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));

// Homepage
router.get("/", (req, res) => {
  res.render("index", {});
});

module.exports = router;
