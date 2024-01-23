const { Kafka } = require("kafkajs");
const visualizerController = {};

// gets list of producers
visualizerController.getProducers = async (req, res, next) => {
  try {
    res.locals.producers = ['one', 'two', 'three'];
  
  } catch (error) {
    console.log("error: " + error + " in getProducers");
  }

  console.log("this is the end of getProducers in visualizerController");

  next();
};

// gets list of consumers
visualizerController.getConsumers = async (req, res, next) => {
  try {
  
  } catch (error) {
    console.log("error: " + error + " in getConsumers");
  }

  console.log("this is the end of getConsumers in visualizerController");

  next();
};

// gets list of brokers
visualizerController.getBrokers = async (req, res, next) => {
  try {
  
  } catch (error) {
    console.log("error: " + error + " in getBrokers");
  }

  console.log("this is the end of getBrokers in visualizerController");

  next();
};



module.exports = visualizerController;
