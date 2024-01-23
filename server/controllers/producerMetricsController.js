const { producer } = require('../models/kafkaBlueprint');
const { Kafka } = require("kafkajs");


const connectedProducers = {  //  1. obj to store info on connected producers
  producerSet: new Set([]),
  producerMap: new Map(),
}; 

const topics = [    //  mock topics
  "testTopic1",
  "testTopic2",
  "testTopic3",
  "testTopic4",
  "testTopic5",
];

const Producer = (producerName) => {  //  producer constructor for our set/map
  this.clientId = producerName;
  this.connectedAt = new Date();
};
const producerController = {

  initializeProducer: async(req, res, next) => {
    const { brokerIP, clientId } = req.body; //  get clientId/BrokerIP from req.body,
    const kafka = new Kafka({
      clientId: clientId,
      brokers: [brokerIP],
    });

    const producer = kafka.producer({
      createPartitioner: Partitioners.DefaultPartitioner,
      allowAutoTopicCreation: false,
      transactionTimeout: 30000,
      isIdempotent: true,
    });

    const { REQUEST } = producer.events; 
    const saveProducer = producer.on(REQUEST, event => {         //  event handler that invokes upon producer request
      let producerName = e.payload.clientId;
      console.log("saveProducer: producerName:", producerName);
      if(!connectedProducers.producerSet.has(producerName)) {    //  if set does not have producer
        connectedProducers.producerSet.add(producerName);        //  add producer name to set
        const newProducer = new Producer[producerName];          //  initialize new producer obj using producerName
        console.log("saveProducer: newProducer: ", newProducer)  
        connectedProducers.producerMap.set(producerName, newProducer); //  adds new Producer entry to our map
      }
    });

  },

  //  producer 1 gets clicked, spun up, controller will pull in the data and spin up a graph 
    //  user clicks producer button
    //  button is linked to producer name
    //  button sends a get request to server with producer name in the request (req.body)
    //  middleware gets invoked, searches for producer by name
    //  if producer found in set, return producer from map for metrics
  getProducer: async(req, res, next) => {
    try {
      const { producerName } = req.body;
      if(connectedProducers.producerSet.has(producerName)) {
        res.locals.currentProducer = connectedProducers.producerMap.get(producerName)
        console.log("Producer located:", res.locals.currentProducer);
        next();
      }
      else {
        console.log('No Producer was found at producerController.getProducer')
        res.status(402).send('No Producer was found at producerController.getProducer')
      }
    } catch(error) {
      console.error('Error found at producerController.findProducer middleware:', error);
      res.status(500).json({error: 'Internal server Error'});
    }
  },

  sendMessage: async (req, res, next) => {
    try{
      const messageData = req.body;
      await producer.connect();
      await producer.send({
        topic: 'test-topic',
        messages: [{value: messageData}]
      });
      await producer.disconnect();
      next();
    } catch(error) {
      console.error('Error found at producerController.sendMessage middleware:', error);
      next(error);
    }
  },

  getAllProducers: (res, next) => {
    try { 
      //  currently returning the set of producers. may have to change logic for handling producers
      //  connectedProducers.producerMap.forEach(producer) = {}
      res.locals.Producers = connectedProducers.producerSet;
      console.log("Middleware getAllProducers: res.locals.Producers:", res.locals.Producers)
      next();
    } 
    catch (error) {
      console.log("error: " + error + " in getAllProducers");
      next(error);
    }
  },



};

module.exports = { producerController }