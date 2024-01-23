import React from 'react';
import ClusterContainer from '../ClusterContainer';
import ProducerContainer from '../ProducerContainer';
import ConsumerContainer from '../ConsumerContainer';

function Visualizer() {

  return (
    <div>
      <h1>Kafka Ecosystem</h1>
      <ProducerContainer />
      <ClusterContainer />
      <ConsumerContainer />

      <h2>Description:</h2>
      <div>xxxxxxx</div>

      <h2>Definitions:</h2>
      <div>xxxxxxx</div>

    </div>
  )
}

export default Visualizer;