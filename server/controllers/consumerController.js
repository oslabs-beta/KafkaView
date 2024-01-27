const consumerController = {};

// gets recordsLag
consumerController.getRecordsLag = async (req, res, next) => {
  try {
    res.locals.recordsLag = .5;

  } catch (error) {
    console.log("error: " + error + " in getRecordsLag");
  }
  next();
};

// gets bytes consumed rate
consumerController.getBytesConsumedRate = async (req, res, next) => {
  try {
    res.locals.bytesConsumedRate = 50;

  } catch (error) {
    console.log("error: " + error + " in getBytesConsumedRate");
  }
  next();
};

// gets records consumed rate
consumerController.getRecordsConsumedRate = async (req, res, next) => {
  try {
    res.locals.recordsConsumedRate = 1;

  } catch (error) {
    console.log("error: " + error + " in getRecordsConsumedRate");
  }
  next();
};

module.exports = consumerController;
