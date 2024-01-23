import React from 'react';

function ProducerBtn({ name }) {

  return (
    <div id="producerBtn">
        <button id="button">Producer: {name}</button>
    </div>
  );
}

export default ProducerBtn;