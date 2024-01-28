import React from 'react';
import { useState, useEffect } from 'react';
import VisualizerBtn from './visualizerBtn';
import '../styles/styles.css';

function ProducerContainer() {
  const [producers, setProducers] = useState([]);

  useEffect(() => {
    const getProducers = async () => {
      try {
        const response = await fetch('http://localhost:3000/demo/visualizerMetrics');
        const data = await response.json();
        setProducers(data.producers);
      } catch (error) {
        console.log(error + ": error fetching producers");
      }
    };

    getProducers();
  }, []);

  return (
    <div id="producerContainer">
      <div id="producerButton">
      {producers.map((producer, index) => (
        <VisualizerBtn name={producer} key={index} type='producer'/>
      ))}
      </div>
    </div>
  );
}

export default ProducerContainer;