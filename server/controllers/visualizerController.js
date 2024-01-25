const visualizerController = {};

// gets list of producers
visualizerController.getProducers = async (req, res, next) => {
  try {
    res.locals.producers = ['Producer: 1', 'Producer: 2'];
  
  } catch (error) {
    console.log("error: " + error + " in getProducers");
  }

  console.log("this is the end of getProducers in visualizerController");

  next();
};

// gets list of consumers
visualizerController.getConsumers = async (req, res, next) => {
  try {
    res.locals.consumers = ['Consumer: 1', 'Consumer: 2', 'Consumer: 3', 'Consumer: 4', 'Consumer: 5'];
  
  } catch (error) {
    console.log("error: " + error + " in getConsumers");
  }

  console.log("this is the end of getConsumers in visualizerController");

  next();
};

// gets list of brokers
visualizerController.getBrokers = async (req, res, next) => {
  try {
    res.locals.brokers = ['Broker: 1', 'Broker: 2', 'Broker: 3'];

  } catch (error) {
    console.log("error: " + error + " in getBrokers");
  }

  console.log("this is the end of getBrokers in visualizerController");

  next();
};



module.exports = visualizerController;
