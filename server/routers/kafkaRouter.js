const express = require('express');
const router = express.Router();

//require controllers
const producerController = require('../controllers/producerController');
const consumerController = require('../controllers/consumerController');
const clusterController = require('../controllers/clusterController');
const topicsController = require('../controllers/topicsController');

router.post('/getTopics', topicsController.getTopics, (req, res) => {
  res.status(200).send(res.locals.kafkaTopics);
});

router.post(
  '/producerMetrics',
  producerController.getRequestRate,
  producerController.getRequestLatency,
  producerController.getFailedProducerRequest,
  producerController.getTotalMessagesIn,
  (req, res) => {
    res.locals.producerMetrics = {
      requestRate: res.locals.requestRate,
      requestLatencyAvg: res.locals.requestLatency,
      failedProducerRequest: res.locals.failedProducerRequest,
      totalMessagesIn: res.locals.totalMessagesIn,
    };
    return res.status(200).send(res.locals.producerMetrics);
  }
);

router.post(
  '/consumerMetrics',
  consumerController.getConsumerRequests,
  consumerController.getFailedConsumerRequests,
  (req, res) => {
    res.locals.consumerMetrics = {
      consumerRequests: res.locals.consumerRequests,
      failedConsumerRequests: res.locals.failedConsumerRequests,
    };
    return res.status(200).send(res.locals.consumerMetrics);
  }
);

router.post(
  '/clusterMetrics',
  clusterController.getUnderReplicatedPartitions,
  clusterController.getActiveControllerCount,
  (req, res) => {
    res.locals.clusterMetrics = {
      underReplicatedPartitions: res.locals.underReplicatedPartitions,
      activeControllerCount: res.locals.activeControllerCount,
    };
    return res.status(200).send(res.locals.clusterMetrics);
  }
);

module.exports = router;
