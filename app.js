require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());

app.get("/api/v1/welcome", (req, res) => {
  res.send("Welcome to E-Commerce API");
});
const PORT = process.env.port || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
