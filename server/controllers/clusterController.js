const clusterController = {};

// gets under replicated partitions
clusterController.getUnderReplicatedPartitions = async (req, res, next) => {
  try {
    const { ip } = req.body;
    let underReplicatedPartitions = await fetch(
      `http://${ip}/api/v1/query?query=kafka_server_replicamanager_underreplicatedpartitions`
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
      message: { err: 'error: ' + error + ' getUnderReplicatedPartitions' },
    });
  }
};

// gets active controller count
clusterController.getActiveControllerCount = async (req, res, next) => {
  try {
    const { ip } = req.body;
    let activeControllerCount = await fetch(
      `http://${ip}/api/v1/query?query=kafka_controller_kafkacontroller_activecontrollercount`
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
      message: { err: 'error: ' + error + ' getActiveControllerCount' },
    });
  }
};

module.exports = clusterController;
