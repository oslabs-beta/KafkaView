import React from 'react';
import Producer from '../Producer';
import Cluster from '../Cluster';
import Consumer from '../Consumer';

function Home() {
  return (
    <div>
      <h1>Welcome to KafkaView</h1>
      <Producer />
      <Cluster />
      <Consumer />
    </div>
  )
}

export default Home;