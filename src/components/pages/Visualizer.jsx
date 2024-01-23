import React from 'react';
import ClusterContainer from '../ClusterContainer';
import ProducerContainer from '../ProducerContainer';
import ConsumerContainer from '../ConsumerContainer';

function Visualizer() {
  return (
    <div>
      <h1>Welcome to KafkaView</h1>
      <ProducerContainer />
      <ClusterContainer />
      <ConsumerContainer />
    </div>
  )
}

export default Visualizer;