const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = 3000;
const cookieParser = require('cookie-parser');

// Require routers
const kafkaRouter = require('./routers/kafkaRouter');
const demoRouter = require('./routers/demoRouter');

app.use(express.static(path.join(__dirname, '../dist')));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Home routing
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// router route handlers
app.use('/kafka', kafkaRouter);
app.use('/demo', demoRouter);

// 404 error handler
app.use('*', (req, res) => {
  res.status(404).send('Page not Found');
});

// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error: ' + err,
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  if (!res.headerSent) {
    return res.status(errorObj.status).json(errorObj.message);
  }
});

app.listen(PORT, () => {
  console.log(` listening on port: ${PORT}`);
});
