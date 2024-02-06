const { Kafka } = require('kafkajs');
const { Partitioners } = require('kafkajs');

const demoController = {};

demoController.initializeKafka = async (req, res, next) => {
  const kafkaConsumer = new Kafka({
    clientId: 'demo-consumer',
    brokers: ['localhost:9092'],
  });
  const kafkaProducer = new Kafka({
    clientId: 'demo-producer',
    brokers: ['localhost:9092'],
  });

  const producer1 = kafkaProducer.producer({
    createPartitioner: Partitioners.DefaultPartitioner,
    allowAutoTopicCreation: false,
    transactionTimeout: 30000,
    isIdempotent: true,
  });

  const producer2 = kafkaProducer.producer({
    createPartitioner: Partitioners.DefaultPartitioner,
    allowAutoTopicCreation: false,
    transactionTimeout: 30000,
    isIdempotent: true,
  });

  const consumer1 = kafkaConsumer.consumer({ groupId: 'test-group1' });
  const consumer2 = kafkaConsumer.consumer({ groupId: 'test-group2' });
  const consumer3 = kafkaConsumer.consumer({ groupId: 'test-group3' });
  const consumer4 = kafkaConsumer.consumer({ groupId: 'test-group4' });
  const consumer5 = kafkaConsumer.consumer({ groupId: 'test-group5' });

  const consumerArr = [consumer1, consumer2, consumer3, consumer4, consumer5];
  const producerArr = [producer1, producer2];
  const topicArr = [
    'testTopic1',
    'testTopic2',
    'testTopic3',
    'testTopic4',
    'testTopic5',
    'testTopic6',
    'testTopic7',
    'testTopic8',
    'testTopic9',
  ];

  const consumerSetup = async (consumer) => {
    const randomTopics = [];
    let randomLength;
    let randomIndex;

    for (let i = 0; i < consumer.length; i++) {
      randomLength = Math.floor(Math.random() * 10) + 1;

      for (let j = 0; j < randomLength; j++) {
        randomIndex = Math.floor(Math.random() * 10);
        if (!randomTopics.includes(topicArr[randomIndex])) {
          randomTopics.push(topicArr[randomIndex]);
        }
      }

      console.log(`random topics: ${randomTopics}`);

      await consumerArr[i].connect();

      if (i === 5) {
        await consumerArr[i].subscribe({
          topics: topicArr,
          fromBeginning: true,
        });
      } else {
        await consumerArr[i].subscribe({
          topics: randomTopics,
          fromBeginning: true,
        });
      }

      await consumerArr[i].run({
        eachMessage: async ({ topic, partition, message }) => {
          console.log({
            value: message.value.toString(),
          });
        },
      });
    }
  };

  consumerSetup(consumerArr).catch(() => {
    console.log('error with consumer');
  });

  const getRandomTopic = () =>
    topicArr[Math.floor(Math.random() * topicArr.length)];

  const messageSender = async () => {
    try {
      const randomProd = Math.floor(Math.random() * 2);
      await producerArr[randomProd].send({
        topic: await getRandomTopic(),
        messages: [
          { value: `Random Message ${Math.floor(Math.random() * 1000)}` },
        ],
      });
      // console.log('producer:', producer)
      // console.log('producer.clientId:', producer.clientId)
    } catch (error) {
      console.log(`error: ${error} in messageSender`);
      await producer1.disconnect();
      await producer2.disconnect();
    }
  };

  await producer1.connect();
  await producer2.connect();

  const sendInterval = setInterval(messageSender, 1000);
  // sendInterval;

  console.log('this is the end of initializeKafka in demoController');
  return next();
};

module.exports = demoController;
