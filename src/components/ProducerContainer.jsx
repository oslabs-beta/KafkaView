import React from 'react';
import { useState, useEffect } from 'react';
import ProducerBtn from './ProducerBtn';

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
        <ProducerBtn name={producer} key={index}/>
      ))}
      </div>
    </div>
  );
}

export default ProducerContainer;