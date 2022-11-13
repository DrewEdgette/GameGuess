const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "root",
  database: "skyrim",
});

// // for testing the most recent locations
// app.get("/random", (req, res) => {
//     db.query("SELECT * FROM locations order by id desc limit 5", (error, result) => {
//         if (error) {
//             console.log(error);
//         } else {
//             res.send(result);
//         }

//     })
// });

app.get("/random", (req, res) => {
  db.query(
    "SELECT * FROM locations order by RAND() LIMIT 5;",
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/all", (req, res) => {
  db.query("SELECT * FROM locations", (error, result) => {
    if (error) {
      console.log(error);
    } else {
      res.send(result);
    }
  });
});

app.get("/challenges", (req, res) => {
  db.query("SELECT * FROM challenges", (error, result) => {
    if (error) {
      console.log(error);
    } else {
      res.send(result);
    }
  });
});

app.post("/create", (req, res) => {
  const uniqueID = req.body.uniqueID;
  const mapName = req.body.mapName;
  const description = req.body.description;
  const ids = req.body.ids;

  db.query(
    "INSERT INTO challenges (id, name, description) VALUES (?, ?, ?)",
    [uniqueID, mapName, description],
    (error, result) => {
      if (error) {
        console.log(error);
      }
    }
  );

  ids.forEach((id) => {
    db.query(
      "INSERT INTO challenge_locations (id, challenge_id, location_id) VALUES (uuid(), ?, ?)",
      [uniqueID, id]
    );
  });
});

app.get("/check/:id", (req, res) => {
  const id = req.params.id;

  db.query("SELECT * FROM challenges WHERE id = ?", [id], (error, result) => {
    if (error) {
      res.send(error);
    } else {
      if (result.length === 0) {
        console.log("challenge id not found");
        res.send([]);
      } else {
        res.send(result);
      }
    }
  });
});

app.get("/:id", (req, res) => {
  const id = req.params.id;

  db.query(
    "SELECT * FROM locations JOIN challenge_locations ON challenge_locations.location_id = locations.id WHERE challenge_locations.challenge_id = ?",
    [id],
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        if (result.length === 0) {
          //console.log("challenge id not found");
        } else {
          res.send(result);
        }
      }
    }
  );
});



app.listen(8000, () => {
  console.log("server running on port 8000");
});
