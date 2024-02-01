import React from 'react';
import { useState, useEffect } from 'react';
import VisualizerBtn from './visualizerBtn';
import '../styles/styles.css';

function ConsumerContainer( ) {
  const [consumers, setConsumers] = useState([]);

  useEffect(() => {
    const getConsumers = async () => {
      try {
        // id === demo -> route to /demo/visualizerMetrics
        // if not route to /kafka/visualizerMetrics sending ip in body
        const response = await fetch('http://localhost:3000/demo/visualizerMetrics');
        const data = await response.json();
        setConsumers(data.consumers);
      } catch (error) {
        console.log(error + ": error fetching consumers");
      }
    };

    getConsumers();
  }, []);

  return (
    <div id="consumerContainer">
      <div id="consumerButton">
      {consumers.map((consumer, index) => (
        <VisualizerBtn name={consumer} key={index} type='consumer'/>
      ))}
      </div>
    </div>
  );
}

export default ConsumerContainer;