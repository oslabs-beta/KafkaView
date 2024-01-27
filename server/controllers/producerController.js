const producerController = {};
const address = 'localhost:9090';
// gets responseRate
// producerController.getResponseRate = async (req, res, next) => {
//   try {
//     //producer response rate
//     let responseRate = await fetch(
//       `http://${address}/api/v1/query?query=rate([1m])`
//     );
//     responseRate = responseRate.json();
//     res.locals.responseRate = responseRate;
//   } catch (error) {
//     console.log('error: ' + error + ' in getResponseRate');
//   }
//   next();
// };

// gets requestRate
producerController.getRequestRate = async (req, res, next) => {
  try {
    //rate of producer request per second over a 1 minute block
    let requestRate = await fetch(
      `http://${address}/api/v1/query?query=rate(kafka_server_brokertopicmetrics_totalproducerequests_total[1m])`
    );
    requestRate = requestRate.json();
    res.locals.requestRate = requestRate.data.result[0].value[1];
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
    //the latency of requests not sure if this is correct
    let requestLatency = await fetch(
      `http://${address}/api/v1/query?query=sum(rate(kafka_network_requestmetrics_totaltimems{}[1m]) - rate(kafka_network_requestmetrics_localtimems{}[1m]))`
    );
    requestLatency = await requestLatency.json();
    res.locals.requestLatencyAvg = requestLatency.data.result[0].value[1];
    return next();
  } catch (error) {
    return next({
      message: { err: 'error: ' + error + ' getRequestLatencyAvg' },
    });
  }
};

producerController.getFailedProducerRequest = async (req, res, next) => {
  try {
    //rate of failed producer messages per second over a 1 minute block
    let getFailedProducerRequest = await fetch(
      `http://${address}/api/v1/query?query=rate(kafka_server_brokertopicmetrics_failedproducerequests_total[1m])`
    );
    getFailedProducerRequest = await getFailedProducerRequest.json();

    res.locals.failedProducerRequest =
      getFailedProducerRequest.data.result[0].value[1];
    return next();
  } catch (error) {
    return next({
      message: { err: 'error: ' + error + ' getFailedProducerRequest' },
    });
  }
};

producerController.getTotalMessagesIn = async (req, res, next) => {
  try {
    // rate of total produced messages in per second over a 1 minute block
    let totalMessagesIn = await fetch(
      `http://${address}/api/v1/query?query=rate(kafka_server_brokertopicmetrics_messagesin_total[1m])`
    );
    totalMessagesIn = await totalMessagesIn.json();
    res.locals.totalMessagesIn = totalMessagesIn.data.result[0].value[1];
    return next();
  } catch (error) {
    return next({
      message: { err: 'error: ' + error + ' getTotalMessagesIn' },
    });
  }
};

module.exports = producerController;
