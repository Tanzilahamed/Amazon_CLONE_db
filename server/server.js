const express = require("express");
const path = require("path");
const authRoutes = require("./authRoutes");
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../public")));
app.use("/", authRoutes);

app.get("/homepage", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/amazon.html"));
});

app.get('/edit-user', (req, res) => {
  res.sendFile(path.join(__dirname, "../public/edit-user.html"));
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
