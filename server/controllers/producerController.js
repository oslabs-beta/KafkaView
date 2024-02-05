const producerController = {};

// gets requestRate
producerController.getRequestRate = async (req, res, next) => {
  try {
    const { ip } = req.body;
    //rate of producer request per second over a 1 minute block
    let requestRate = await fetch(
      `http://${ip}/api/v1/query?query=rate(kafka_server_brokertopicmetrics_totalproducerequests_total[1m])`
    );
    requestRate = await requestRate.json();
    res.locals.requestRate = [];
    if (requestRate.data.result.length < 1) {
      res.locals.requestRate = ['error'];
    } else {
      for (let i = 2; i < requestRate.data.result.length; i++) {
        res.locals.requestRate.push(requestRate.data.result[i].value[1]);
      }
    }

    return next();
  } catch (error) {
    return next({
      message: { err: 'error: ' + error + ' getRequestRate' },
    });
  }
};

// gets requestQueueTime
producerController.getRequestQueueTime = async (req, res, next) => {
  try {
    const { ip } = req.body;
    // the latency of requests not sure if this is correct
    let requestQueueTime = await fetch(
      `http://${ip}/api/v1/query?query=kafka_network_requestmetrics_requestqueuetimems{request="Produce",}`
    );

    requestQueueTime = await requestQueueTime.json();
    res.locals.requestQueueTime = [];

    if (requestQueueTime.data.result.length < 1) {
      res.locals.requestQueueTime = ['error'];
    } else {
      for (let i = 0; i < requestQueueTime.data.result.length; i++) {
        res.locals.requestQueueTime.push(requestQueueTime.data.result[i].value[1]);
      }
    }
    
    return next();
  } catch (error) {
    return next({
      message: { err: 'error: ' + error + ' getRequestQueueTime' },
    });
  }
};

producerController.getFailedProducerRequest = async (req, res, next) => {
  try {
    const { ip } = req.body;
    //rate of failed producer messages per second over a 1 minute block
    let failedProducerRequest = await fetch(
      `http://${ip}/api/v1/query?query=rate(kafka_server_brokertopicmetrics_failedproducerequests_total[1m])`
    );
    failedProducerRequest = await failedProducerRequest.json();

    if (failedProducerRequest.data.result.length < 1) {
      res.locals.failedProducerRequest = ['error'];
    } else {
      res.locals.failedProducerRequest = [
        failedProducerRequest.data.result[0].value[1],
      ];
    }

    return next();
  } catch (error) {
    return next({
      message: { err: 'error: ' + error + ' getFailedProducerRequest' },
    });
  }
};

producerController.getTotalMessagesIn = async (req, res, next) => {
  try {
    const { ip } = req.body;
    // rate of total produced messages in per second over a 1 minute block
    let totalMessagesIn = await fetch(
      `http://${ip}/api/v1/query?query=kafka_server_brokertopicmetrics_messagesin_total`
    );
    totalMessagesIn = await totalMessagesIn.json();
    res.locals.totalMessagesIn = [];

    if (totalMessagesIn.data.result.length < 1) {
      res.locals.totalMessagesIn = ['error'];
    } else {
      for (let i = 2; i < totalMessagesIn.data.result.length; i++) {
        res.locals.totalMessagesIn.push(totalMessagesIn.data.result[i].value[1]);
      }
    }
    return next();
  } catch (error) {
    return next({
      message: { err: 'error: ' + error + ' getTotalMessagesIn' },
    });
  }
};

module.exports = producerController;
