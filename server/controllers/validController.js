const validController = {};

validController.isValid = async (req, res, next) => {
  try {
    const { ip } = req.body;
    await fetch(
      `http://${ip}/api/v1/query?query=kafka_server_brokertopicmetrics_totalproducerequests_total`
    );

    return next();
  } catch {
    return res.status(200).send('false');
  }
};

module.exports = validController;
