const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

// PUT /gallery/like/:id
router.put("/like/:id", (req, res) => {
  // code here
});

// GET /gallery
router.get("/", (req, res) => {
  // Create queryText
  const queryText = `SELECT * FROM "gallery" ORDER BY id;`;

  // conduct query
  pool
    .query(queryText)
    .then((result) => {
      console.log("Successful GET DB Query");
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("ERROR in GET DB Query:", err);
      res.sendStatus(500);
    });
});

module.exports = router;
