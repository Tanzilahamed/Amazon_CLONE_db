const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "amazon_clone",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL Database.");
});

module.exports = db;
