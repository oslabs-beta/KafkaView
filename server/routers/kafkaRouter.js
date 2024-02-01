const express = require('express');
const router = express.Router();

//require controllers
const producerController = require('../controllers/producerController');
const consumerController = require('../controllers/consumerController');
const clusterController = require('../controllers/clusterController');
const topicsController = require('../controllers/topicsController');
const validController = require('../controllers/validController');

router.post('/isValid', validController.isValid, (req, res) => {
  res.status(200).send('true');
});

router.get('/getTopics', topicsController.getTopics, (req, res) => {
  res.status(200).send(res.locals.kafkaTopics);
});

router.get(
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

router.get(
  '/consumerMetrics',
  consumerController.getConsumerRequests,
  consumerController.getFailedConsumerRequests,
  (req, res) => {
    res.locals.consumerMetrics = {
      recordsLag: res.locals.recordsLag,
      consumerRequests: res.locals.consumerRequests,
      failedConsumerRequests: res.locals.failedConsumerRequests,
    };
    return res.status(200).send(res.locals.consumerMetrics);
  }
);

router.get(
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
