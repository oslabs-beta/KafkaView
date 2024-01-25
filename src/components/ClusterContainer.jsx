import React from 'react';
import { useState, useEffect } from 'react';
import VisualizerBtn from './visualizerBtn';
import '../styles/styles.css';

function ClusterContainer() {
  const [brokers, setBrokers] = useState([]);

  useEffect(() => {
    const getBrokers = async () => {
      try {
        const response = await fetch('http://localhost:3000/demo/visualizerMetrics');
        const data = await response.json();
        setBrokers(data.brokers);
      } catch (error) {
        console.log(error + ": error fetching brokers");
      }
    };

    getBrokers();
  }, []);

  return (
    <div id="clusterContainer">
      <div id="clusterButton">
      {brokers.map((broker, index) => (
        <VisualizerBtn name={broker} key={index} type='cluster'/>
      ))}
      </div>
    </div>
  );
}

export default ClusterContainer;