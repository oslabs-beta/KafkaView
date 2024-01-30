const consumerController = {};
const address = 'localhost:9090';

consumerController.getConsumerRequests = async (req, res, next) => {
  try {
    //total consumer requests per sec over a 1 minute block
    let consumerRequests = await fetch(
      `http://${address}/api/v1/query?query=rate(kafka_server_brokertopicmetrics_totalfetchrequests_total[1m])`
    );
    consumerRequests = await consumerRequests.json();
    res.locals.consumerRequests = [
      {
        topic: 'consumerRequests',
        value: consumerRequests.data.result[0].value[1],
      },
    ];
    for (let i = 2; i < consumerRequests.data.result.length; i++) {
      const consumerRequests = {};
      consumerRequests.topic = consumerRequests.data.result[i].metric.topic;
      consumerRequests.value = consumerRequests.data.result[i].value[1];
      res.locals.consumerRequests.push(consumerRequests);
    }
    return next();
  } catch (error) {
    return next({
      message: { err: 'error: ' + error + ' getConsumerRequests' },
    });
  }
};

consumerController.getFailedConsumerRequests = async (req, res, next) => {
  try {
    //total failed consumer requests per sec over a 1 minute block
    let failedConsumerRequests = await fetch(
      `http://${address}/api/v1/query?query=rate(kafka_server_brokertopicmetrics_failedfetchrequests_total[1m])`
    );
    failedConsumerRequests = await failedConsumerRequests.json();
    console.log(`~~~~~~~~~~~~~~~~1`, failedConsumerRequests.data.result);

    res.locals.failedConsumerRequests = [
      failedConsumerRequests.data.result[0].value[1],
    ];

    return next();
  } catch (error) {
    return next({
      message: { err: 'error: ' + error + ' getFailedConsumerRequests' },
    });
  }
};

// gets records consumed rate
// consumerController.getRecordsConsumedRate = async (req, res, next) => {
//   try {
//     res.locals.recordsConsumedRate = 1;

//     return next();
//   } catch (error) {
//     return next({
//       message: { err: 'error: ' + error + ' getRecordsConsumedRate' },
//     });
//   }
// };

module.exports = consumerController;
