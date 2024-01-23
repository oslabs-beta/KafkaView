import React from 'react';
import { useState, useEffect } from 'react';
import VisualizerBtn from './visualizerBtn';

function ProducerContainer () {
  const [producers, setProducers] = useState([]);

  useEffect(() => {
    const getProducers = async () => {
      try {
        const response = await fetch('http://localhost:3000/kafka/producers');
        const data = await response.json();
        setProducers(data);
      } catch (error) {
        console.log(error + ": error fetching producers");
      }
    };

    getProducers();
  }, []);

  return (
    <div id="container">
      <div id="buttonContainer">
      {producers.map((producer, index) => (
        <VisualizerBtn name={producer} key={index} type='producer'/>
      ))}
      </div>
    </div>
  );
}

export default ProducerContainer;