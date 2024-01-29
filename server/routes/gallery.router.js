const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

// PUT /gallery/like/:id
router.put("/like/:id", (req, res) => {
  // Create queryText and queryArgs
  const queryText = `UPDATE "gallery" SET likes = likes + 1 WHERE id = $1;`;
  const queryArgs = [req.params.id];

  // conduct query
  pool
    .query(queryText, queryArgs)
    .then((result) => {
      console.log("Successful PUT DB Query");
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error("ERROR in PUT DB Query:", err);
      res.sendStatus(500);
    });
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
      console.error("ERROR in GET DB Query:", err);
      res.sendStatus(500);
    });
});

// POST /gallery
router.post("/", (req, res) => {
  // Create queryText and queryArgs
  console.log(req.body);
  const queryText = `INSERT INTO "gallery" (url, title, description)
    VALUES ($1, $2, $3);`;
  const queryArgs = [req.body.url, req.body.title, req.body.description];

  // conduct query
  pool
    .query(queryText, queryArgs)
    .then((result) => {
      console.log("Successful POST DB query");
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error("ERROR in POST DB Query:", err);
      res.sendStatus(500);
    });
});

module.exports = router;
//https://cdn.cnn.com/cnn/interactive/2022/12/world/best-space-photos-2022/media/images/04-04-apr-PIA25015_orig.jpg
