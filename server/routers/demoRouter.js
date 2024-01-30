const express = require('express');
const router = express.Router();

//require controllers
const demoMetricsController = require('../controllers/demoMetricsController');
// const kafkajsController = require('../controllers/kafkajsController');
const producerController = require('../controllers/producerController');
const consumerController = require('../controllers/consumerController');
const clusterController = require('../controllers/clusterController');
const demoController = require('../controllers/kafkajsController');

router.get(
  '/visualizerMetrics',
  demoMetricsController.getVisualizerMetrics,
  (req, res) => {
    return res.status(200).send(res.locals.visualizerMetrics);
  }
);

router.get(
  '/producerMetrics',
  demoMetricsController.getProducerMetrics,
  (req, res) => {
    return res.status(200).send(res.locals.producerMetrics);
  }
);

router.get(
  '/consumerMetrics',
  demoMetricsController.getConsumerMetrics,
  (req, res) => {
    return res.status(200).send(res.locals.consumerMetrics);
  }
);

router.get(
  '/clusterMetrics',
  demoMetricsController.getClusterMetrics,
  (req, res) => {
    return res.status(200).send(res.locals.clusterMetrics);
  }
);

router.get(
  '/kafkajs',
  demoController.initializeKafka,
  producerController.getRequestLatency,
  producerController.getFailedProducerRequest,
  (req, res) => {
    res.status(200).send('Kafka Metrics');
  }
);

module.exports = router;
