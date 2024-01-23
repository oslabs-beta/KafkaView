const express = require('express');
const router = express.Router();

//require controllers
const demoController = require('../controllers/demoController');
const visualizerController = require('../controllers/visualizerController');

router.get(
  '/producers',
  visualizerController.getProducers,
  (req, res) => {
    return res.status(200).send(res.locals.producers)
  }
);

router.get(
  '/demo',
  demoController.initializeConsumer,
  demoController.initializeProducer,
  (req, res) => {
    res.send('Hello, Kafka!');
  }
);

module.exports = router;
