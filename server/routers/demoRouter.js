const express = require('express');
const router = express.Router();

//require controllers
const kafkaJSController = require('../controllers/kafkajsController');

router.get(
  '/kafkajs',
  kafkaJSController.initializeKafka,
  (req, res) => {
    res.redirect('localhost:8080');
  }
);

module.exports = router;
