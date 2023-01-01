const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const crypto = require("crypto");

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

app.post("/signup", (req, res) => {
  const { username, password } = req.body;

  // Sanitize the inputs
  const sanitizedUsername = mysql.escape(username);
  const sanitizedPassword = mysql.escape(password);

  // Hash the password
  const hashedPassword = crypto
    .createHash("sha256")
    .update(sanitizedPassword)
    .digest("hex");

  // Check if the username is already taken
  const checkUsernameQuery = `SELECT * FROM users WHERE username = ${sanitizedUsername}`;
  db.query(checkUsernameQuery, (error, results) => {
    if (error) {
      // TODO: handle the error
      return;
    }
    if (results.length > 0) {
      // The username is already taken, so return an error
      res.json({ success: false, message: "Username already taken" });
    } else {
      // The username is available, so create the user
      const createUserQuery = `
        INSERT INTO users (username, password)
        VALUES (${sanitizedUsername}, ${hashedPassword})
      `;
      db.query(createUserQuery, (error, results) => {
        if (error) {
          // TODO: handle the error
          return;
        }
        res.json({ success: true });
      });
    }
  });
});

app.post("/login", (req, res) => {
  const username = mysql.escape(req.body.username);
  const password = mysql.escape(req.body.password);

  // Hash the password
  const hashedPassword = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");

  // Check if the username and password are correct
  const query = `
  SELECT * FROM users
  WHERE username = ${username} AND password = ${password}
`;
  db.query(query, [username, hashedPassword], (error, results) => {
    if (error) {
      // TODO: handle the error
      return;
    }
    if (results.length > 0) {
      // The username and password are correct, so log the user in
      // req.session.user = results[0];
      console.log("success");
      res.json({ success: true });
    } else {
      // The username and password are incorrect, so return an error
      res.json({ success: false, message: "Incorrect username or password" });
    }
  });
});

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
