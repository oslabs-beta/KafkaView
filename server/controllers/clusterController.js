const clusterController = {};
const address = 'localhost:9090';

// gets under replicated partitions
clusterController.getUnderReplicatedPartitions = async (req, res, next) => {
  try {
    let underReplicatedPartitions = await fetch(
      `http://${address}/api/v1/query?query=kafka_server_replicamanager_underreplicatedpartitions`
    );
    underReplicatedPartitions = await underReplicatedPartitions.json();

    res.locals.underReplicatedPartitions =
      underReplicatedPartitions.data.result[0].value[1];
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
    let activeControllerCount = await fetch(
      `http://${address}/api/v1/query?query=kafka_controller_kafkacontroller_activecontrollercount`
    );
    activeControllerCount = await activeControllerCount.json();

    res.locals.activeControllerCount =
      activeControllerCount.data.result[0].value[1];
    return next();
  } catch (error) {
    return next({
      message: { err: 'error: ' + error + ' getActiveControllerCount' },
    });
  }
};

// gets disk usage
// clusterController.getDiskUsage = async (req, res, next) => {
//   try {
//     res.locals.diskUsage = 50;
//     return next();
//   } catch (error) {
//     return next({
//       message: { err: 'error: ' + error + ' getDiskUsage' },
//     });
//   }
// };

module.exports = clusterController;
