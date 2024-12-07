const express = require("express");
const router = express.Router();
const db = require("./db");
const path = require("path");

// Sign-up route
router.post("/signup", (req, res) => {
  const { email, password } = req.body;
  const query = "INSERT INTO users (email, password) VALUES (?, ?)";
  db.query(query, [email, password], (err) => {
    if (err) return res.status(500).send("Error registering user.");
    res.redirect("/");
  });
});

// Login route
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const query = "SELECT * FROM users WHERE email = ? AND password = ?";
  db.query(query, [email, password], (err, results) => {
    if (err) return res.status(500).send("Error logging in.");
    if (results.length > 0) {
      res.redirect("/homepage");
    } else {
      res.status(401).send("Incorrect password. Please try again.");
    }
  });
});

// Route to get all registered users
router.get("/api/registered-users", (req, res) => {
  const query = "SELECT id, email FROM users"; // Adjust to get necessary info
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send("Error fetching users.");
    }
    res.json(results); // Return user list in JSON format
  });
});

// Route to get a specific user based on ID
router.get("/api/registered-users/:id", (req, res) => {
  const { id } = req.params;
  const query = "SELECT id, email, password FROM users WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).send("Error fetching user data.");
    }
    if (results.length === 0) {
      return res.status(404).send("User not found.");
    }
    res.json(results[0]); // Send back the first matching user
  });
});

// Route to serve the edit user page
router.get("/edit-user/:id", (req, res) => {
  const userId = req.params.id;
  // Serve the edit user HTML page
  res.sendFile(path.join(__dirname, "../public/edit-user.html"));
});

// Route to delete a user by ID
router.delete("/api/delete-user/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM users WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).send("Error deleting user.");
    }
    res.json({ message: "User deleted successfully" });
  });
});

router.put("/api/update-user/:id", (req, res) => {
  const { id } = req.params;
  const { email, password } = req.body; 


  // SQL query to update user
  const query = "UPDATE users SET email = ?, password = ? WHERE id = ?";
  db.query(query, [email, password, id], (err, result) => {
    if (err) {
      console.error("MySQL Error:", err);
      return res.status(500).json({ error: "Error updating user.", details: err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "User not found." });
    }
    res.json({ message: "User updated successfully" });
  });
});


module.exports = router;
