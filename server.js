const express = require("express");
const mysql2 = require("mysql2");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());

const port = 5000;

const db = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "students",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed: " + err.message);
  } else {
    console.log("Connected to MySQL database.");
  }
});

app.post("/add_user", (req, res) => {
  const sql2 =
    "INSERT INTO students_details (firstname, lastname, rollnumber, gender) VALUES (?, ?, ?, ?)";

  const values = [
    req.body.firstname,
    req.body.lastname,
    req.body.rollnumber,
    req.body.gender,
  ];

  db.query(sql2, values, (err, result) => {
    if (err) {
      console.error("Error inserting data:", err);
      return res.json({
        message: "Something unexpected has occurred: " + err.message,
      });
    }
    return res.json({ success: "Student added successfully" });
  });
});

app.get("/students", (req, res) => {
  const sql2 = "SELECT * FROM students_details";
  db.query(sql2, (err, result) => {
    if (err) res.json({ message: "server error" });
    return res.json(result);
  });
});

app.get("/get_student/:id", (req, res) => {
  const id = req.params.id;
  const sql2 = "SELECT * FROM students_details WHERE id = ?";

  db.query(sql2, [id], (err, result) => {
    if (err) {
      return res.json({ message: "Server error", error: err.message });
    }
    return res.json(
      result.length ? result[0] : { message: "Student not found" }
    );
  });
});

app.delete("/delete_student/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM students_details WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Server error", error: err.message });
    }
    return res.json({ success: "Student deleted successfully" });
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
