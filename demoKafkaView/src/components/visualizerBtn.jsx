import React from 'react';
import { useNavigate } from 'react-router-dom';

function VisualizerBtn({ name, type }) {

  const navigate = useNavigate(); 
  const routeChange = () => { 
    navigate(`/${type}`, { state: { id: name } });
  }

  return (
    <div id="visualizerBtn">
      <button id="visualizedButton" onClick={routeChange}>{name}</button>
    </div>
  );
}

export default VisualizerBtn;