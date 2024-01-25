const demoMetricsController = {};

// producer variables
const requestRate = [0, 0, 0, 0, 0, 0, 1, 1, 1, 2, 2, 3];
let requestRateNum;
let responseRate;
let requestLatencyAvg;

// consumer variables
const recordsConsumedRate = [0, 0, 0, 0, 1, 1, 2, 2, 3, 5, 6, 7, 8, 9, 10];
let recordsConsumedRateNum;
let recordsLag;
let bytesConsumedRate;

// gets list of producers
demoMetricsController.getProducers = async (req, res, next) => {
  try {
    res.locals.producers = ['Producer: 1', 'Producer: 2'];
  } catch (error) {
    console.log("error: " + error + " in getProducers");
  }
  console.log("this is the end of getProducers in demoMetricsController");
  next();
};

// gets producer metrics
demoMetricsController.getProducerMetrics = async (req, res, next) => {
  try {
    requestRateNum = requestRate[Math.floor(Math.random() * 12)]
    if (requestRateNum !== 0){
      responseRate = 1;
      requestLatencyAvg = Math.random() / 10;
    } else {
      responseRate = 0;
      requestLatencyAvg = 0;
    }

    res.locals.producerMetrics = {
      producerList: ['Producer: 1', 'Producer: 2'],
      responseRate: responseRate,
      requestRate: requestRateNum,
      requestLatencyAvg: requestLatencyAvg,
    }
  } catch (error) {
    console.log("error: " + error + " in getProducerMetrics");
  }
  next();
};


// gets list of consumers
demoMetricsController.getConsumers = async (req, res, next) => {
  try {
    res.locals.consumers = ['Consumer: 1', 'Consumer: 2', 'Consumer: 3', 'Consumer: 4', 'Consumer: 5'];
  } catch (error) {
    console.log("error: " + error + " in getConsumers");
  }
  console.log("this is the end of getConsumers in demoMetricsController");
  next();
};

// gets consumer metrics
demoMetricsController.getConsumerMetrics = async (req, res, next) => {
  try {
    recordsConsumedRateNum = recordsConsumedRate[Math.floor(Math.random() * 15)]
    if (recordsConsumedRateNum !== 0){
      recordsLag = Math.random() / 5;
      bytesConsumedRate = Math.floor(Math.random() * 25) + 50;
    } else {
      recordsLag = 0;
      bytesConsumedRate = 0;
    }

    res.locals.consumerMetrics = {
      consumerList: ['Consumer: 1', 'Consumer: 2', 'Consumer: 3', 'Consumer: 4', 'Consumer: 5'],
      recordsLag: recordsLag,
      recordsConsumedRate: recordsConsumedRateNum,
      bytesConsumedRate: bytesConsumedRate,
    }
    res.locals.consumers = ['Consumer: 1', 'Consumer: 2', 'Consumer: 3', 'Consumer: 4', 'Consumer: 5'];
  } catch (error) {
    console.log("error: " + error + " in getConsumers");
  }
  next();
};



// gets list of brokers
demoMetricsController.getBrokers = async (req, res, next) => {
  try {
    res.locals.brokers = ['Broker: 1', 'Broker: 2', 'Broker: 3'];
  } catch (error) {
    console.log("error: " + error + " in getBrokers");
  }
  console.log("this is the end of getBrokers in demoMetricsController");
  next();
};

module.exports = demoMetricsController;
