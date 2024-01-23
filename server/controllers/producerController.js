const { producer } = require('../models/kafkaBlueprint');

const connectedProducers = {}; //obj to store info on connected producers
const producerController = {

  sendMessage: async (req, res, next) => {
    try{
      const messageData = req.body;

      await producer.connect();
      await producer.send({
        topic: 'test-topic',
        messages: [{value: JSON.stringify(messageData)}]
      });
      await producer.disconnect();

      //logic for storing info on connected producers
      const producerInfo = {
        clientId: producer.clientId,
        connectedAt: new Date(),
      };
      connectedProducers[producer.clientId] = producerInfo;

      console.log('Message sent to Kafka producer', messageData);
      next();
    } catch(error) {
      console.error('Error found at producerController.sendMessage middleware:', error);
      res.status(500).json({error: 'Internal server Error'});
    }
  },

  getProducers: () => {
    //may need more logic later once we start working with this in practice
    //what do we do with this info? save to a variable and apply it for monitoring tools
    return Object.values(connectedProducers);
  }
};

module.exports = { producerController }