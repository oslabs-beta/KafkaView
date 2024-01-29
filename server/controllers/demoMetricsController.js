const demoMetricsController = {};

// producer variables
const producerList = ["Producer: 1", "Producer: 2"];
const requestRate = [0, 0, 0, 0, 0, 0, 1, 1, 1, 2, 2, 3];
let requestRateNum;
let responseRate;
let requestLatencyAvg;

// consumer variables
const consumerList = [
  "Consumer: 1",
  "Consumer: 2",
  "Consumer: 3",
  "Consumer: 4",
  "Consumer: 5",
];
const recordsConsumedRate = [0, 0, 0, 0, 1, 1, 2, 2, 3, 5, 6, 7, 8, 9, 10];
let recordsConsumedRateNum;
let recordsLag;
let bytesConsumedRate;

// broker variables
const brokerList = ["Broker: 1", "Broker: 2", "Broker: 3"];
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
      producers: ["Producer: 1", "Producer: 2"],
      consumers: [
        "Consumer: 1",
        "Consumer: 2",
        "Consumer: 3",
        "Consumer: 4",
        "Consumer: 5",
      ],
      brokers: ["Broker: 1", "Broker: 2", "Broker: 3"],
    };
  } catch (error) {
    console.log("error: " + error + " in getVisualizerMetrics demo");
  }
  next();
};

// gets producer metrics
demoMetricsController.getProducerMetrics = async (req, res, next) => {
  res.locals.producerMetrics = {
    responseRate: [],
    requestLatencyAvg: [],
    requestRate: [],
  };

  const addNewProducerMetrics = () => {
    requestRateNum = requestRate[Math.floor(Math.random() * 12)];
    if (requestRateNum !== 0) {
      responseRate = 1;
      requestLatencyAvg = Math.random() / 10;
    } else {
      responseRate = 0;
      requestLatencyAvg = 0;
    }
  };

  for (let i = 0; i < producerList.length; i++) {
    addNewProducerMetrics();
    res.locals.producerMetrics.responseRate.push(responseRate);
    res.locals.producerMetrics.requestRate.push(requestRateNum);
    res.locals.producerMetrics.requestLatencyAvg.push(requestLatencyAvg);
  }

  next();
};

// gets consumer metrics
demoMetricsController.getConsumerMetrics = async (req, res, next) => {
  res.locals.consumerMetrics = {
    recordsLag: [],
    recordsConsumedRate: [],
    bytesConsumedRate: [],
  };

  const addNewConsumerMetrics = () => {
    recordsConsumedRateNum =
      recordsConsumedRate[Math.floor(Math.random() * 15)];
    if (recordsConsumedRateNum !== 0) {
      recordsLag = Math.random() / 5;
      bytesConsumedRate = Math.floor(Math.random() * 25) + 50;
    } else {
      recordsLag = 0;
      bytesConsumedRate = 0;
    }
  };

  for (let i = 0; i < consumerList.length; i++) {
    addNewConsumerMetrics();
    res.locals.consumerMetrics.recordsLag.push(recordsLag);
    res.locals.consumerMetrics.recordsConsumedRate.push(recordsConsumedRateNum);
    res.locals.consumerMetrics.bytesConsumedRate.push(bytesConsumedRate);
  }

  next();
};

// gets cluster metrics
demoMetricsController.getClusterMetrics = async (req, res, next) => {
  res.locals.clusterMetrics = {
    activeControllerCount: [],
    underRepPartitions: [],
    diskUsage: [],
  };

  const addNewClusterMetrics = () => {
    activeControllerCountNum =
      activeControllerCount[Math.floor(Math.random() * 15)];

    randomChance1 = Math.floor(Math.random() * 3);
    randomChance2 = Math.floor(Math.random() * 25);

    if (randomChance1 === 2) diskUsage = diskUsage + Math.random() / 10;

    if (randomChance2 === 10)
      underRepPartitions += Math.floor(Math.random() * 5);
    else underRepPartitions = 0;
  };

  for (let i = 0; i < brokerList.length; i++) {
    addNewClusterMetrics();
    res.locals.clusterMetrics.activeControllerCount.push(
      activeControllerCountNum
    );
    res.locals.clusterMetrics.underRepPartitions.push(underRepPartitions);
    res.locals.clusterMetrics.diskUsage.push(diskUsage);
  }

  next();
};

module.exports = demoMetricsController;
