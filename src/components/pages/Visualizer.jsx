import React from "react";
import { useLocation } from "react-router-dom";
import ClusterContainer from "../ClusterContainer";
import ProducerContainer from "../ProducerContainer";
import ConsumerContainer from "../ConsumerContainer";

function Visualizer() {
  // location.state.id sent from navigate hook
  const location = useLocation();


  return (
    <div>
      <h1>Kafka Ecosystem</h1>
      <div id="containersContainer">
        <ProducerContainer />
        <ClusterContainer />
        <ConsumerContainer />
      </div>
      <div id="detailsContainer">
        <h2>Description:</h2>
        <div>xxxxxxx</div>
        <br></br>
        <h2>Definitions:</h2>
        <div>xxxxxxx</div>
      </div>
    </div>
  );
}

export default Visualizer;
