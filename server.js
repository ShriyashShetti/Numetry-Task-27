const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "shriyash27@",
  database: "random_user_db",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection error:", err);
  } else {
    console.log("Connected to MySQL database.");
  }
});

// Save user endpoint
app.post("/saveUser", (req, res) => {
  const { photo, fullName, email, phone, city, country, gender } = req.body;
  const sql = `INSERT INTO users (photo, full_name, email, phone, city, country, gender) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  db.query(sql, [photo, fullName, email, phone, city, country, gender], (err, result) => {
    if (err) {
      console.error("Error inserting user:", err);
      res.status(500).send("Failed to save user");
    } else {
      res.status(200).send("User saved successfully");
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
