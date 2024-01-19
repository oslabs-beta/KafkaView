import React from 'react';
import Producer from './components/producer.jsx';
import Broker from './components/broker.jsx';
import Consumer from './components/consumer.jsx';
import './styles.css';

function App() {
  return (
    <div>
      <h1>Welcome to KafkaView</h1>
      <Producer />
      <Broker />
      <Consumer />
    </div>
  );
}

export default App;