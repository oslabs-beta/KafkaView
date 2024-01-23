import React from 'react';
import { useState, useEffect } from 'react';
import VisualizerBtn from './visualizerBtn';

function ClusterContainer() {
  const [brokers, setBrokers] = useState([]);

  useEffect(() => {
    const getBrokers = async () => {
      try {
        const response = await fetch('http://localhost:3000/kafka/brokers');
        const data = await response.json();
        setBrokers(data);
      } catch (error) {
        console.log(error + ": error fetching brokers");
      }
    };

    getBrokers();
  }, []);

  return (
    <div id="container">
      <div id="buttonContainer">
      {brokers.map((broker, index) => (
        <VisualizerBtn name={broker} key={index} type='cluster'/>
      ))}
      </div>
    </div>
  );
}

export default ClusterContainer;