const clusterController = {};

// gets under replicated partitions
clusterController.getUnderReplicatedPartitions = async (req, res, next) => {
  try {
    res.locals.underReplicatedPartitions = 0;

  } catch (error) {
    console.log("error: " + error + " in getUnderReplicatedPartitions");
  }
  next();
};

// gets active controller count
clusterController.getActiveControllerCount = async (req, res, next) => {
  try {
    res.locals.activeControllerCount = 1;

  } catch (error) {
    console.log("error: " + error + " in getActiveControllerCount");
  }
  next();
};

// gets disk usage
clusterController.getDiskUsage = async (req, res, next) => {
  try {
    res.locals.diskUsage = 50;

  } catch (error) {
    console.log("error: " + error + " in getDiskUsage");
  }
  next();
};

module.exports = clusterController;
