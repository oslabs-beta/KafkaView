const { Kafka } = require("kafkajs");
const demoController = {};

//  1. obj to store info on connected producers
const connectedDemoProducers = {
  // length: 0, 
  producerSet: new Set([]),
  producerMap: new Map(), //  producerMap.get('demo-producer') // => Producer { clientId: 'demo-producer', connectedAt: '2024-01-23T01:56:49 }
}


demoController.initializeConsumer = async (req, res, next) => {
  const kafka = new Kafka({
    clientId: "demo-consumer",
    brokers: ["localhost:9092"],
  });

  const consumer = kafka.consumer({ groupId: "test-group" });

  const consumerSetup = async () => {
    await consumer.connect();
    await consumer.subscribe({
      topics: [
        "testTopic1",
        "testTopic2",
        "testTopic3",
        "testTopic4",
        "testTopic5",
      ],
      fromBeginning: true,
    });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log({
          value: message.value.toString(),
          producers: connectedDemoProducers.producerMap, //test line //producers logged here from the CONSUMER side
        });
      },
    });
  };

  consumerSetup().catch(() => {
    console.log("error with consumer");
  });

  console.log("this is the end of initializeConsumer in demoController");
  next();
};

//  2. initialize Producer

demoController.initializeProducer = async (req, res, next) => {
  const kafka = new Kafka({
    clientId: "demo-producer",
    brokers: ["localhost:9092"],
  });
  const { Partitioners } = require("kafkajs");
  const producer = kafka.producer({
    createPartitioner: Partitioners.DefaultPartitioner,
    allowAutoTopicCreation: false,
    transactionTimeout: 30000,
    isIdempotent: true,
  });
  
  // producer.clientId;
  // console.log("kafka.clientId at initializeProducerDemo:", kafka.clientId)
  // producer.clientId = kafka.clientId;
  // console.log("PRODUCER INFO:", producer);
  
  const topics = [
    "testTopic1",
    "testTopic2",
    "testTopic3",
    "testTopic4",
    "testTopic5",
  ];
  
  const getRandomTopic = () => {
    return topics[Math.floor(Math.random() * topics.length)];
  };
  
  
  const messageSender = async () => {
    try {
      await producer.send({
        topic: await getRandomTopic(),
        messages: [
          { value: `Random Message ${Math.floor(Math.random() * 1000)}` },
        ],
      });
      // console.log('producer:', producer) 
      // console.log('producer.clientId:', producer.clientId)
    } catch (error) {
      console.log("error: " + error + " in messageSender");
      await producer.disconnect();
    }
  };
  await producer.connect();
  // //logic for storing info on connected producers 
 function Producer (producerName) {
    this.clientId = producerName;
    this.connectedAt = new Date();
  };

  //  3. Event emitter to add producer to connectedProducers
  //instrumentation event using EventEmitter => on producer request event, console log the clientId
  const { REQUEST } = producer.events;           
  const logClientId = producer.on(REQUEST, e => console.log('logClientIdFunction attempting to log e.payload.clientId:', e.payload.clientId)); //"demo-producer"
  // const saveClientId = producer.on(REQUEST, e => 
  //   connectedDemoProducers[e.payload.clientId] 
  //   ? connectedDemoProducers[e.payload.clientId] 
  //   : connectedDemoProducers[e.payload.clientId]= true);

  const saveProducer = producer.on(REQUEST, e => {
   //add Producer to set and map if it does not exist in connectedDemoProducers.producerSet
   let producerName = e.payload.clientId;
   console.log("producerName:", producerName)   //  works
   if(!connectedDemoProducers.producerSet.has(producerName)) {
    connectedDemoProducers.producerSet.add(producerName);
    // const key = connectedDemoProducers.length;
    //  invoke Producer function, add length to connectedDemoProducers,
    //  and add the result to the producers arr/obj
    const newProducer = new Producer(producerName);
    console.log("newProducer: ", newProducer)
    // connectedDemoProducers.length++;
    // connectedDemoProducers.producers[key] = newProducer;
    connectedDemoProducers.producerMap.set(producerName, newProducer);
    console.log('connected demo producers:', connectedDemoProducers);
    console.log("connectedDemoProducers.producerMap:", connectedDemoProducers.producerMap)
    console.log("connectedDemoProducers.producerMap.size:", connectedDemoProducers.producerMap.size)
   }   
  })
  //  end

  const sendInterval = setInterval(messageSender, 3000);
  console.log('connected demo producers:', connectedDemoProducers);
  console.log("this is the end of initializeProducer in demoController");

  next();
};

// to be added if necessary (no routes to this currently)
demoController.stopProducer = async (req, res, next) => {

  // await producer.disconnect();
  console.log("this is the end of stopProducer in demoController");
  
  next();
};

module.exports = demoController;
