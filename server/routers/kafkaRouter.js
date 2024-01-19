const express = require('express');
const router = express.Router();

//require controllers
const demoController = require('../controllers/demoController');

router.get(
  '/demo',
  demoController.initializeConsumer,
  demoController.initializeProducer,
  (req, res) => {
    res.send('Hello, Kafka!');
  }
);

module.exports = router;
