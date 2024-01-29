const express = require('express');
const router = express.Router();

//require controllers
const visualizerController = require('../controllers/visualizerController');
const producerController = require('../controllers/producerController');
const consumerController = require('../controllers/consumerController');
const clusterController = require('../controllers/clusterController');

router.get(
  '/visualizerMetrics',
  visualizerController.getProducers,
  visualizerController.getBrokers,
  visualizerController.getConsumers,
  (req, res) => {
    res.locals.visualizerMetrics = {
      producers: res.locals.producers,
      consumers: res.locals.consumers,
      brokers: res.locals.brokers,
    };
    return res.status(200).send(res.locals.visualizerMetrics);
  }
);

router.get(
  '/producerMetrics',
  visualizerController.getProducers,
  producerController.getRequestRate,
  producerController.getRequestLatency,
  producerController.getFailedProducerRequest,
  producerController.getTotalMessagesIn,
  (req, res) => {
    res.locals.producerMetrics = {
      producers: res.locals.producers,
      requestRate: res.locals.requestRate,
      requestLatencyAvg: res.locals.requestLatency,
      FailedProducerRequest: res.locals.failedProducerRequest,
      TotalMessagesIn: res.locals.totalMessagesIn,
    };
    return res.status(200).send(res.locals.producerMetrics);
  }
);

router.get(
  '/consumerMetrics',
  visualizerController.getConsumers,
  consumerController.getConsumerRequests,
  consumerController.getFailedConsumerRequests,
  (req, res) => {
    res.locals.consumerMetrics = {
      consumers: res.locals.consumers,
      recordsLag: res.locals.recordsLag,
      consumerRequests: res.locals.consumerRequests,
      failedConsumerRequests: res.locals.failedConsumerRequests,
    };
    return res.status(200).send(res.locals.consumerMetrics);
  }
);

router.get(
  '/clusterMetrics',
  visualizerController.getBrokers,
  clusterController.getUnderReplicatedPartitions,
  clusterController.getActiveControllerCount,
  (req, res) => {
    res.locals.clusterMetrics = {
      brokers: res.locals.brokers,
      underReplicatedPartitions: res.locals.underReplicatedPartitions,
      activeControllerCount: res.locals.activeControllerCount,
    };
    return res.status(200).send(res.locals.clusterMetrics);
  }
);

module.exports = router;
