const consumerController = {};

consumerController.getConsumerRequests = async (req, res, next) => {
  try {
    const { ip } = req.body;
    //total consumer requests per sec over a 1 minute block
    let consumerRequests = await fetch(
      `http://${ip}/api/v1/query?query=rate(kafka_server_brokertopicmetrics_totalfetchrequests_total[1m])`
    );
    consumerRequests = await consumerRequests.json();
    res.locals.consumerRequests = [];

    if (consumerRequests.data.result.length < 1) {
      res.locals.consumerRequests = ['error'];
    } else {
      for (let i = 0; i < consumerRequests.data.result.length; i++) {
        if (i === 1) continue;
        const topicLabel = consumerRequests.data.result[i].metric.topic;
        res.locals.consumerRequests.push(topicLabel);
      }
    }
    console.log(res.locals.consumerRequests + "this is consumerReq")

    return next();
  } catch (error) {
    return next({
      message: { err: 'error: ' + error + ' getConsumerRequests' },
    });
  }
};

consumerController.getFailedConsumerRequests = async (req, res, next) => {
  try {
    const { ip } = req.body;
    //total failed consumer requests per sec over a 1 minute block
    let failedConsumerRequests = await fetch(
      `http://${ip}/api/v1/query?query=rate(kafka_server_brokertopicmetrics_failedfetchrequests_total[1m])`
    );
    failedConsumerRequests = await failedConsumerRequests.json();

    if (failedConsumerRequests.data.result.length < 1) {
      res.locals.failedConsumerRequests = ['error'];
    } else {
      res.locals.failedConsumerRequests = [
        failedConsumerRequests.data.result[0].value[1],
      ];
    }

    return next();
  } catch (error) {
    return next({
      message: { err: 'error: ' + error + ' getFailedConsumerRequests' },
    });
  }
};

module.exports = consumerController;
