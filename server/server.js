const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

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
          console.log("challenge id not found");
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
