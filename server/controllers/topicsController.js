const topicsController = {};
const address = 'localhost:9090';

topicsController.getTopics = async (req, res, next) => {
  try {
    const { ip } = req.body;
    let requestRateTopics = await fetch(
      `http://${ip}/api/v1/query?query=kafka_server_brokertopicmetrics_totalproducerequests_total`
    );
    requestRate = await requestRateTopics.json();
    res.locals.kafkaTopics = [];
    if (requestRate.data.result.length < 0) {
      res.locals.kafkaTopics = ['error'];
    } else {
      for (let i = 2; i < requestRate.data.result.length; i++) {
        const topicLabel = requestRate.data.result[i].metric.topic;
        res.locals.kafkaTopics.push(topicLabel);
      }
    }

    return next();
  } catch {
    return res.status(200).send([]);
  }
};

module.exports = topicsController;
