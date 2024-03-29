const topicsController = {};

topicsController.getTopics = async (req, res, next) => {
  try {
    const { ip } = req.body;
    let requestRateTopics = await fetch(
      `http://${ip}/api/v1/query?query=kafka_cluster_partition_atminisr{partition="0"}`,
    );
    requestRateTopics = await requestRateTopics.json();
    res.locals.kafkaTopics = [];
    if (requestRateTopics.data.result.length < 0) {
      res.locals.kafkaTopics = ['error'];
    } else {
      for (let i = 1; i < requestRateTopics.data.result.length; i++) {
        const topicLabel = requestRateTopics.data.result[i].metric.topic;
        res.locals.kafkaTopics.push(topicLabel);
      }
    }

    return next();
  } catch {
    return res.status(200).send([]);
  }
};

module.exports = topicsController;
