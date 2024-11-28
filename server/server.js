const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const crypto = require("crypto");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/tiles", express.static("skyrim-images"));

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "root",
  database: "gameguess",
});

app.post("/signup", (req, res) => {
  const { username, password } = req.body;

  // Hash the password
  const hashedPassword = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");

  // Check if the username is already taken
  const checkUsernameQuery = `SELECT * FROM users WHERE username = '${username}'`;
  db.query(checkUsernameQuery, (error, results) => {
    if (error) {
      console.log("check username error");
      return;
    }
    if (results.length > 0) {
      // The username is already taken, so return an error
      console.log("username taken");
      res.json({ success: false, message: "Username already taken" });
    } else {
      // The username is available, so create the user
      const createUserQuery = `
        INSERT INTO users (id, username, password)
        VALUES (uuid(), '${username}', '${hashedPassword}')
      `;
      db.query(createUserQuery, (error, results) => {
        if (error) {
          // TODO: handle the error
          console.log("create user error");
          return;
        }
        console.log("success");
        res.json({ success: true });
      });
    }
  });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Hash the password
  const hashedPassword = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");

  // Check if the username and password are correct
  const query = `
  SELECT * FROM users
  WHERE username = '${username}' AND password = '${hashedPassword}'
`;
  db.query(query, [username, hashedPassword], (error, results) => {
    if (error) {
      console.log("error");
      return;
    }
    if (results.length > 0) {
      // The username and password are correct, so log the user in
      // req.session.user = results[0];
      console.log("success");

      res.json({ success: true, user: results[0] });
    } else {
      console.log("wrong username or password");
      // The username and password are incorrect, so return an error
      res.json({ success: false, message: "Incorrect username or password" });
    }
  });
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
    "SELECT * FROM locations ORDER BY RAND() LIMIT 5;",
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
  const creator = req.body.creator;
  const creator_id = req.body.creator_id;

  db.query(
    "INSERT INTO challenges (id, creator, name, description, creator_id, likes, game) VALUES (?, ?, ?, ?, ?, 0, 'Skyrim')",
    [uniqueID, creator, mapName, description, creator_id],
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        ids.forEach((id) => {
          db.query(
            "INSERT INTO challenge_locations (id, challenge_id, location_id) VALUES (uuid(), ?, ?)",
            [uniqueID, id],
            (error, result) => {
              if (error) {
                console.log(error);
              }
            }
          );
        });

        res.json({ success: true });
      }
    }
  );
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

app.get("/challengesbyuser/:id", (req, res) => {
  const id = req.params.id;

  // Get the limit and offset values from the query string
  const limit = Number(req.query.limit) || 2;
  const offset = Number(req.query.offset) || 0;

  // Create the SELECT statement
  const selectQuery = `SELECT c.*, l.url
  FROM challenges c
  JOIN (
    SELECT challenge_id, MIN(id) AS min_id
    FROM challenge_locations
    GROUP BY challenge_id
  ) cl ON cl.challenge_id = c.id
  JOIN challenge_locations cl2 ON cl2.challenge_id = cl.challenge_id AND cl2.id = cl.min_id
  JOIN locations l ON l.id = cl2.location_id
  WHERE c.creator_id = ? LIMIT ? OFFSET ?;`;

  // Create the count query
  const countQuery = `SELECT COUNT(*) as count
  FROM challenges c
  JOIN (
    SELECT challenge_id, MIN(id) AS min_id
    FROM challenge_locations
    GROUP BY challenge_id
  ) cl ON cl.challenge_id = c.id
  JOIN challenge_locations cl2 ON cl2.challenge_id = cl.challenge_id AND cl2.id = cl.min_id
  JOIN locations l ON l.id = cl2.location_id
  WHERE c.creator_id = ?`;

  // Execute the count query
  db.query(countQuery, [id], (error, countResult) => {
    if (error) {
      res.send(error);
    } else {
      // Calculate the total number of pages based on the total number of challenges and the limit value
      const totalPages = Math.ceil(countResult[0].count / limit);

      // Execute the SELECT statement
      db.query(selectQuery, [id, limit, offset], (error, selectResult) => {
        if (error) {
          res.send(error);
        } else {
          if (selectResult.length === 0) {
            console.log(
              "creator id not found or they haven't made any challenges"
            );
            res.send([]);
          } else {
            // Return the challenges and the total number of pages in the response
            res.send({ challenges: selectResult, totalPages });
          }
        }
      });
    }
  });
});

app.get("/allchallenges", (req, res) => {
  // Get the limit and offset values from the query string
  const limit = Number(req.query.limit) || 2;
  const offset = Number(req.query.offset) || 0;

  // Create the SELECT statement
  const selectQuery = `SELECT c.*, l.url
  FROM challenges c
  JOIN (
    SELECT challenge_id, MIN(id) AS min_id
    FROM challenge_locations
    GROUP BY challenge_id
  ) cl ON cl.challenge_id = c.id
  JOIN challenge_locations cl2 ON cl2.challenge_id = cl.challenge_id AND cl2.id = cl.min_id
  JOIN locations l ON l.id = cl2.location_id
  LIMIT ? OFFSET ?;`;

  // Create the count query
  const countQuery = `SELECT COUNT(*) as count
  FROM challenges c
  JOIN (
    SELECT challenge_id, MIN(id) AS min_id
    FROM challenge_locations
    GROUP BY challenge_id
  ) cl ON cl.challenge_id = c.id
  JOIN challenge_locations cl2 ON cl2.challenge_id = cl.challenge_id AND cl2.id = cl.min_id
  JOIN locations l ON l.id = cl2.location_id`;

  // Execute the count query
  db.query(countQuery, (error, countResult) => {
    if (error) {
      res.send(error);
    } else {
      // Calculate the total number of pages based on the total number of challenges and the limit value
      const totalPages = Math.ceil(countResult[0].count / limit);

      // Execute the SELECT statement
      db.query(selectQuery, [limit, offset], (error, selectResult) => {
        if (error) {
          res.send(error);
        } else {
          if (selectResult.length === 0) {
            res.send([]);
          } else {
            // Return the challenges and the total number of pages in the response
            res.send({ challenges: selectResult, totalPages });
          }
        }
      });
    }
  });
});



app.get("/newchallenges", (req, res) => {
  // Get the limit and offset values from the query string
  const limit = Number(req.query.limit) || 2;
  const offset = Number(req.query.offset) || 0;

  // Create the SELECT statement
  const selectQuery = `SELECT c.*, l.url
  FROM challenges c
  JOIN (
    SELECT challenge_id, MIN(id) AS min_id
    FROM challenge_locations
    GROUP BY challenge_id
  ) cl ON cl.challenge_id = c.id
  JOIN challenge_locations cl2 ON cl2.challenge_id = cl.challenge_id AND cl2.id = cl.min_id
  JOIN locations l ON l.id = cl2.location_id
  ORDER BY create_time desc
  LIMIT ? OFFSET ?;`;

  // Create the count query
  const countQuery = `SELECT COUNT(*) as count
  FROM challenges c
  JOIN (
    SELECT challenge_id, MIN(id) AS min_id
    FROM challenge_locations
    GROUP BY challenge_id
  ) cl ON cl.challenge_id = c.id
  JOIN challenge_locations cl2 ON cl2.challenge_id = cl.challenge_id AND cl2.id = cl.min_id
  JOIN locations l ON l.id = cl2.location_id`;

  // Execute the count query
  db.query(countQuery, (error, countResult) => {
    if (error) {
      res.send(error);
    } else {
      // Calculate the total number of pages based on the total number of challenges and the limit value
      const totalPages = Math.ceil(countResult[0].count / limit);

      // Execute the SELECT statement
      db.query(selectQuery, [limit, offset], (error, selectResult) => {
        if (error) {
          res.send(error);
        } else {
          if (selectResult.length === 0) {
            res.send([]);
          } else {
            // Return the challenges and the total number of pages in the response
            res.send({ challenges: selectResult, totalPages });
          }
        }
      });
    }
  });
});

app.get("/topchallenges", (req, res) => {
  // Get the limit and offset values from the query string
  const limit = Number(req.query.limit) || 2;
  const offset = Number(req.query.offset) || 0;

  // Create the SELECT statement
  const selectQuery = `SELECT c.*, l.url
  FROM challenges c
  JOIN (
    SELECT challenge_id, MIN(id) AS min_id
    FROM challenge_locations
    GROUP BY challenge_id
  ) cl ON cl.challenge_id = c.id
  JOIN challenge_locations cl2 ON cl2.challenge_id = cl.challenge_id AND cl2.id = cl.min_id
  JOIN locations l ON l.id = cl2.location_id
  ORDER BY likes DESC
  LIMIT ? OFFSET ?;`;

  // Create the count query
  const countQuery = `SELECT COUNT(*) as count
  FROM challenges c
  JOIN (
    SELECT challenge_id, MIN(id) AS min_id
    FROM challenge_locations
    GROUP BY challenge_id
  ) cl ON cl.challenge_id = c.id
  JOIN challenge_locations cl2 ON cl2.challenge_id = cl.challenge_id AND cl2.id = cl.min_id
  JOIN locations l ON l.id = cl2.location_id`;

  // Execute the count query
  db.query(countQuery, (error, countResult) => {
    if (error) {
      res.send(error);
    } else {
      // Calculate the total number of pages based on the total number of challenges and the limit value
      const totalPages = Math.ceil(countResult[0].count / limit);

      // Execute the SELECT statement
      db.query(selectQuery, [limit, offset], (error, selectResult) => {
        if (error) {
          res.send(error);
        } else {
          if (selectResult.length === 0) {
            res.send([]);
          } else {
            // Return the challenges and the total number of pages in the response
            res.send({ challenges: selectResult, totalPages });
          }
        }
      });
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
