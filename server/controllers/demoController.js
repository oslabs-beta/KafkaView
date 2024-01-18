const { Kafka } = require("kafkajs");
const demoController = {};

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
  });

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
    } catch (error) {
      console.log("error: " + error + " in messageSender");
      await producer.disconnect();
    }
  };

  await producer.connect();
  const sendInterval = setInterval(messageSender, 2000);

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
