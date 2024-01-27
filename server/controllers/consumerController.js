const consumerController = {};
const address = 'localhost:9090';
// gets recordsLag
consumerController.getRecordsLag = async (req, res, next) => {
  try {
    res.locals.recordsLag = 0.5;

    return next();
  } catch (error) {
    return next({
      message: { err: 'error: ' + error + ' getRecordsLag' },
    });
  }
};

// gets bytes consumed rate
consumerController.getBytesConsumedRate = async (req, res, next) => {
  try {
    res.locals.bytesConsumedRate = 50;

    return next();
  } catch (error) {
    return next({
      message: { err: 'error: ' + error + ' getBytesConsumedRate' },
    });
  }
};

// gets records consumed rate
consumerController.getRecordsConsumedRate = async (req, res, next) => {
  try {
    res.locals.recordsConsumedRate = 1;

    return next();
  } catch (error) {
    return next({
      message: { err: 'error: ' + error + ' getRecordsConsumedRate' },
    });
  }
};

module.exports = consumerController;
