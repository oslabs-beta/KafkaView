const producerController = {};

// gets responseRate
producerController.getResponseRate = async (req, res, next) => {
  try {
    res.locals.responseRate = 1;

  } catch (error) {
    console.log("error: " + error + " in getResponseRate");
  }
  next();
};

// gets requestRate
producerController.getRequestRate = async (req, res, next) => {
  try {
    res.locals.requestRate = 1;

  } catch (error) {
    console.log("error: " + error + " in getRequestRate");
  }
  next();
};

// gets requestLatencyAvg
producerController.getRequestLatencyAvg = async (req, res, next) => {
  try {
    res.locals.requestLatencyAvg = .2;

  } catch (error) {
    console.log("error: " + error + " in getRequestLatencyAvg");
  }
  next();
};

module.exports = producerController;
