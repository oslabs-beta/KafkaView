const producerController = {};
const address = 'localhost:9090';

// gets requestRate
producerController.getRequestRate = async (req, res, next) => {
  try {
    const { promIP } = req.cookies;
    //rate of producer request per second over a 1 minute block
    let requestRate = await fetch(
      `http://${address}/api/v1/query?query=kafka_server_brokertopicmetrics_totalproducerequests_total`
    );
    requestRate = await requestRate.json();
    res.locals.requestRate = [];

    if (requestRate.data.result.length < 1) {
      res.locals.requestRate = ['error'];
    } else {
      for (let i = 0; i < requestRate.data.result.length; i++) {
        if (i === 1) continue;
        const value = requestRate.data.result[i].value[1];
        res.locals.requestRate.push(value);
      }
    }
    return next();
  } catch (error) {
    return next({
      message: { err: 'error: ' + error + ' getRequestRate' },
    });
  }
};

// gets requestLatencyAvg
producerController.getRequestLatency = async (req, res, next) => {
  try {
    const { promIP } = req.cookies;
    // the latency of requests not sure if this is correct
    let requestLatency = await fetch(
      `http://${address}/api/v1/query?query=requestLatency.data.result[0].value[1]`
    );

    requestLatency = await requestLatency.json();
    if (requestLatency.data.result.length < 1) {
      res.locals.requestLatencyAvg = ['error'];
    } else {
      res.locals.requestLatencyAvg = [requestLatency.data.result[0].value[1]];
    }
    return next();
  } catch (error) {
    return next({
      message: { err: 'error: ' + error + ' getRequestLatencyAvg' },
    });
  }
};

producerController.getFailedProducerRequest = async (req, res, next) => {
  try {
    const { promIP } = req.cookies;
    //rate of failed producer messages per second over a 1 minute block
    let failedProducerRequest = await fetch(
      `http://${address}/api/v1/query?query=rate(kafka_server_brokertopicmetrics_failedproducerequests_total[1m])`
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
    const { promIP } = req.cookies;
    // rate of total produced messages in per second over a 1 minute block
    let totalMessagesIn = await fetch(
      `http://${address}/api/v1/query?query=rate(kafka_server_brokertopicmetrics_messagesin_total[1m])`
    );
    totalMessagesIn = await totalMessagesIn.json();
    res.locals.totalMessagesIn = [];

    if (totalMessagesIn.data.result.length < 1) {
      res.locals.totalMessagesIn = ['error'];
    } else {
      for (let i = 0; i < totalMessagesIn.data.result.length; i++) {
        if (i === 1) continue;
        const topicLabel = totalMessagesIn.data.result[i].metric.topic;
        res.locals.totalMessagesIn.push(topicLabel);
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
