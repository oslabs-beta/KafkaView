const express = require('express');
const router = express.Router();

//require controllers
const demoMetricsController = require('../controllers/demoMetricsController');
const kafkajsController = require('../controllers/kafkajsController');
const clusterController = require('../controllers/clusterController');

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
  kafkajsController.initializeConsumer,
  kafkajsController.initializeProducer,
  (req, res) => {
    res.redirect('/demo/metrics');
  }
);

router.get(
  '/metrics',
  clusterController.getUnderReplicatedPartitions,
  clusterController.getActiveControllerCount,
  (req, res) => {
    res.send('Hello, Kafka!');
  }
);

module.exports = router;
