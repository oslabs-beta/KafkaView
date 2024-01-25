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

// broker variables
const activeControllerCount = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2];
let activeControllerCountNum;
let diskUsage = 20;
let underRepPartitions = 0;
let randomChance1;
let randomChance2;

// gets list of producers
demoMetricsController.getVisualizerMetrics = async (req, res, next) => {
  try {
    res.locals.visualizerMetrics = {
      producers: ['Producer: 1', 'Producer: 2'],
      consumers: ['Consumer: 1', 'Consumer: 2', 'Consumer: 3', 'Consumer: 4', 'Consumer: 5'],
      brokers: ['Broker: 1', 'Broker: 2', 'Broker: 3'],
    }
  } catch (error) {
    console.log("error: " + error + " in getVisualizerMetrics demo");
  }
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
    console.log("error: " + error + " in getProducerMetrics demo");
  }
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

  } catch (error) {
    console.log("error: " + error + " in getConsumerMetrics demo");
  }
  next();
};

// gets cluster metrics
demoMetricsController.getClusterMetrics = async (req, res, next) => {
  try {
    activeControllerCountNum = activeControllerCount[Math.floor(Math.random() * 15)];

    randomChance1 = Math.floor(Math.random() * 3);
    randomChance2 = Math.floor(Math.random() * 25);

    if (randomChance1 === 2) diskUsage = diskUsage + (Math.random() / 10);
    
    if (randomChance2 === 10) underRepPartitions += Math.floor(Math.random() * 5);
    else underRepPartitions = 0;
    
    res.locals.clusterMetrics = {
      consumerList: ['Consumer: 1', 'Consumer: 2', 'Consumer: 3', 'Consumer: 4', 'Consumer: 5'],
      activeControllerCount: activeControllerCountNum,
      underRepPartitions: underRepPartitions,
      diskUsage: diskUsage,
    }

  } catch (error) {
    console.log("error: " + error + " in getClusterMetrics demo");
  }
  next();
};


module.exports = demoMetricsController;
