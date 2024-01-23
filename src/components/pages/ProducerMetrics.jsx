import React from 'react';
import { useLocation } from 'react-router-dom';

function ProducerMetrics() {
  let location = useLocation();
  // location.state.id sent from navigate hook
  console.log(location.state.id);
  
  // pull unique charts from location.state.id

  return (
    <div>
      <h1>Producer Metrics</h1>
    </div>
  )
}

export default ProducerMetrics;