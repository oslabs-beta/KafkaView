const { Kafka } = require('kafkajs');
const express = require('express');
const PORT = 3000;
const app = express();

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092'],
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'test-group' });

const consumerSetup = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'test-topic', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        value: message.value.toString(),
      });
    },
  });
};

consumerSetup().catch(() => {
  console.log('error with consumer');
});

app.get('/', async (req, res) => {
  res.send('Hello, Kafka!');
  await producer.connect();
  await producer.send({
    topic: 'test-topic',
    messages: [{ value: 'Hello KafkaJS user!' }],
  });
  await producer.disconnect();
});

app.listen(PORT, () => {
  console.log(` listening on port: ${PORT}`);
});
