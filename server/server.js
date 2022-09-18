const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
    user : "root",
    host : "localhost",
    password : "root",
    database : "skyrim",
});

app.get("/locations", (req, res) => {
    db.query("SELECT * FROM locations order by RAND() LIMIT 5;", (error, result) => {
        if (error) {
            console.log(error);
        } else {
            res.send(result);
        }
        
    })
});

app.listen(8000, ()=>{console.log("server running on port 8000")});

