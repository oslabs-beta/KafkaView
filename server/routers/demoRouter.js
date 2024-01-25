const express = require('express');
const router = express.Router();

//require controllers
const demoMetricsController = require('../controllers/demoMetricsController');

router.get(
  '/producerMetrics',
  demoMetricsController.getProducerMetrics,
  (req, res) => {
    return res.status(200).send(res.locals.producerMetrics)
  }
);

router.get(
  '/consumerMetrics',
  demoMetricsController.getConsumerMetrics,
  (req, res) => {
    return res.status(200).send(res.locals.consumerMetrics)
  }
);

module.exports = router;
