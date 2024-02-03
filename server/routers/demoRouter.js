const express = require('express');
const router = express.Router();

//require controllers
const kafkaJSController = require('../controllers/kafkajsController');

router.get('/kafkajs', kafkaJSController.initializeKafka, (req, res) => {
  res.redirect('localhost:8080');
});

router.get('/kafkajs', kafkaController.initializeKafka, (req, res) => {
  return res.status(200).send('Kafka Demo');
});

module.exports = router;
