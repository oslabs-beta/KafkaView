const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

app.use(express.json());

app.use((req, res) => {
    res.status(404).send("Page not Found");
  });
  
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: "Server error detected" });
  });

app.listen(PORT, () => {
    console.log(`Server is listening`);
  });