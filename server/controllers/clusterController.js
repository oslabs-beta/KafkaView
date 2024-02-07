const clusterController = {};

// gets under replicated partitions
clusterController.getUnderReplicatedPartitions = async (req, res, next) => {
  try {
    const { ip } = req.body;
    let underReplicatedPartitions = await fetch(
      `http://${ip}/api/v1/query?query=kafka_server_replicamanager_underreplicatedpartitions`,
    );
    underReplicatedPartitions = await underReplicatedPartitions.json();

    if (underReplicatedPartitions.data.result.length < 1) {
      res.locals.underReplicatedPartitions = ['error'];
    } else {
      res.locals.underReplicatedPartitions = [
        underReplicatedPartitions.data.result[0].value[1],
      ];
    }

    return next();
  } catch (error) {
    return next({
      message: { err: `error: ${error} getUnderReplicatedPartitions` },
    });
  }
};

// gets active controller count
clusterController.getActiveControllerCount = async (req, res, next) => {
  try {
    const { ip } = req.body;
    let activeControllerCount = await fetch(
      `http://${ip}/api/v1/query?query=kafka_controller_kafkacontroller_activecontrollercount`,
    );
    activeControllerCount = await activeControllerCount.json();

    if (activeControllerCount.data.result.length < 1) {
      res.locals.activeControllerCount = ['error'];
    } else {
      res.locals.activeControllerCount = [
        activeControllerCount.data.result[0].value[1],
      ];
    }

    return next();
  } catch (error) {
    return next({
      message: { err: `error: ${error} getActiveControllerCount` },
    });
  }
};

// gets zookeeper request latency
clusterController.getZookeeperRequestLatency = async (req, res, next) => {
  try {
    const { ip } = req.body;
    let zookeeperRequestLatency = await fetch(
      `http://${ip}/api/v1/query?query=kafka_server_zookeeperclientmetrics_zookeeperrequestlatencyms`,
    );
    zookeeperRequestLatency = await zookeeperRequestLatency.json();
    res.locals.zookeeperRequestLatency = [];

    if (zookeeperRequestLatency.data.result.length < 1) {
      res.locals.zookeeperRequestLatency = ['error'];
    } else {
      for (let i = 0; i < zookeeperRequestLatency.data.result.length; i++) {
        res.locals.zookeeperRequestLatency.push(
          zookeeperRequestLatency.data.result[i].value[1],
        );
      }
    }

    return next();
  } catch (error) {
    return next({
      message: { err: `error: ${error} getZookeeperRequestLatency` },
    });
  }
};

// disk size per topic in bytes
clusterController.getTopicSize = async (req, res, next) => {
  try {
    const { ip } = req.body;
    let topicSize = await fetch(
      `http://${ip}/api/v1/query?query=kafka_log_log_size{partition="0"}`,
    );
    topicSize = await topicSize.json();
    res.locals.topicSize = [];

    if (topicSize.data.result.length < 1) {
      res.locals.topicSize = ['error'];
    } else {
      for (let i = 1; i < topicSize.data.result.length; i++) {
        res.locals.topicSize.push(topicSize.data.result[i].value[1]);
      }
    }

    return next();
  } catch (error) {
    return next({
      message: { err: `error: ${error} getTopicSize` },
    });
  }
};

// get total messages per topic
clusterController.getTotalMessages = async (req, res, next) => {
  try {
    const { ip } = req.body;

    let totalMessages = await fetch(
      `http://${ip}/api/v1/query?query=kafka_server_brokertopicmetrics_messagesin_total`,
    );
    totalMessages = await totalMessages.json();
    res.locals.totalMessages = [];

    if (totalMessages.data.result.length < 1) {
      res.locals.totalMessages = ['error'];
    } else {
      for (let i = 2; i < totalMessages.data.result.length; i++) {
        res.locals.totalMessages.push(totalMessages.data.result[i].value[1]);
      }
    }
    return next();
  } catch (error) {
    return next({
      message: { err: `error: ${error} getTotalMessagesIn` },
    });
  }
};

module.exports = clusterController;
