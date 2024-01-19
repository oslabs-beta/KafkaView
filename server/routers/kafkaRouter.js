const express = require('express');
const router = express.Router();

//require controllers
const demoController = require('../controllers/demoController');

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist/index.html'));
});

router.get(
  '/demo',
  demoController.initializeConsumer,
  demoController.initializeProducer,
  (req, res) => {
    res.send('Hello, Kafka!');
  }
);

module.exports = router;
