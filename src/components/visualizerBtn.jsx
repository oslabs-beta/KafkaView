import React from 'react';
import { useNavigate } from 'react-router-dom';

function VisualizerBtn({ name, type }) {

  const navigate = useNavigate(); 
  const routeChange = () => { 
    navigate(`/${type}`);
  }

  return (
    <div id="visualizerBtn">
      <div id="visualizedButton">{name}</div>
    </div>
  );
}

export default VisualizerBtn;