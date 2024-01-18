const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;
const cookieParser = require('cookie-parser');

// Require routers
const kafkaRouter = require('./routers/kafkaRouter');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', kafkaRouter);

// 404 error handler
app.use('*', (req, res) => {
    res.status(404).send("Page not Found");
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Server error detected" });
});

app.listen(PORT, () => {
  console.log(` listening on port: ${PORT}`);
});
