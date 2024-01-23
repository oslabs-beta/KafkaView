import React from 'react';
import { useLocation } from 'react-router-dom';

function ConsumerMetrics() {
  const location = useLocation();
  // location.state.id sent from navigate hook
  console.log(location.state.id);
  
  // pull unique charts from location.state.id

  return (
    <div>
      <h1>Consumer Metrics</h1>
    </div>
  )
}

export default ConsumerMetrics;