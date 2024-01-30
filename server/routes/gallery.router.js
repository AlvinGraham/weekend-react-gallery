const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");
const multer = require("multer");
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  destination: (req, file, cb) => {
    cb(null, "./public/images/uploads");
  },
});
const upload = multer({ storage: storage });
const fs = require("fs");

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

router.post("/upload", upload.single("photoFile"), (req, res) => {
  //console.log("req obj", req);

  console.log("Upload File Data:", req.file);
  console.log("Upload req.body", req.body);

  // delay unitl file is found

  async function checkFileExist(path, timeout = 2000) {
    let totalTime = 0;
    let checkTime = timeout / 10;

    return await new Promise((resolve, reject) => {
      const timer = setInterval(function () {
        totalTime += checkTime;

        let fileExists = fs.existsSync(path);

        if (fileExists || totalTime >= timeout) {
          clearInterval(timer);

          resolve(fileExists);
        }
      }, checkTime);
    });
  }

  checkFileExist(req.file.path)
    .then((resolve) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error("File Not found:", err);
      res.sendStatus(500);
    });
});

// DELETE /gallery/:id
router.delete("/:id", (req, res) => {
  // create queryText and queryArgs
  const queryText = `DELETE FROM "gallery" WHERE id = $1;`;
  const queryArgs = [req.params.id];

  //conduct query
  pool
    .query(queryText, queryArgs)
    .then((result) => {
      console.log(`Successful DELETE DB query - ID:${req.params.id}`);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error("ERROR in DELETE DB Query:", err);
      res.sendStatus(500);
    });
});

module.exports = router;
