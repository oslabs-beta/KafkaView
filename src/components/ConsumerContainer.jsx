import React from 'react';
import { useState, useEffect } from 'react';
import VisualizerBtn from './visualizerBtn';

function ConsumerContainer() {
  const [consumers, setConsumers] = useState([]);

  useEffect(() => {
    const getConsumers = async () => {
      try {
        const response = await fetch('http://localhost:3000/kafka/consumers');
        const data = await response.json();
        setConsumers(data);
      } catch (error) {
        console.log(error + ": error fetching consumers");
      }
    };

    getConsumers();
  }, []);

  return (
    <div id="container">
      <div id="buttonContainer">
      {consumers.map((consumer, index) => (
        <VisualizerBtn name={consumer} key={index} type='consumer'/>
      ))}
      </div>
    </div>
  );
}

export default ConsumerContainer;