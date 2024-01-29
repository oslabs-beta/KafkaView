const consumerController = {};
const address = 'localhost:9090';

consumerController.getConsumerRequests = async (req, res, next) => {
  try {
    //total consumer requests per sec over a 1 minute block
    let consumerRequests = await fetch(
      `http://${address}/api/v1/query?query=rate(kafka_server_brokertopicmetrics_totalfetchrequests_total[1m])`
    );
    consumerRequests = await consumerRequests.json();
    res.locals.consumerRequests = consumerRequests.data.result[0].value[1];

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
    res.locals.failedConsumerRequests =
      failedConsumerRequests.data.result[0].value[1];

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
