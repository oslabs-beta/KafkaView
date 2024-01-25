import React from "react";
import { useLocation } from "react-router-dom";
import ClusterContainer from "../ClusterContainer";
import ProducerContainer from "../ProducerContainer";
import ConsumerContainer from "../ConsumerContainer";
import { ArcherContainer, ArcherElement } from 'react-archer';

const rootStyle = { display: 'flex', justifyContent: 'center' };
const rowStyle = { margin: '200px 0', display: 'flex', justifyContent: 'space-between' };
const boxStyle = { padding: '10px', border: '1px solid black' };

function Visualizer() {
const location = useLocation();
  return (
    <div>
    <h1>Kafka Ecosystem</h1>
    <div id="appDescription">
      write something cool here
    </div>
    <div id="bigContainer">
      <ArcherContainer>
        <div style={rowStyle}>
          <ArcherElement
            id="element2"
            relations={[
              {
                targetId: 'element3',
                targetAnchor: 'left',
                sourceAnchor: 'right',
                style: { strokeColor: 'purple', strokeWidth: 2 }
              },
            ]}
          >
            <div><ProducerContainer /></div>
          </ArcherElement>

          <ArcherElement id="element3">
            <div><ClusterContainer /></div>
          </ArcherElement>

          <ArcherElement
            id="element4"
            relations={[
              {
                targetId: 'element3',
                targetAnchor: 'right',
                sourceAnchor: 'left',
                style: { strokeColor: 'purple', strokeWidth: 2 }
              },
            ]}
          >
            <div><ConsumerContainer /></div>
          </ArcherElement>
        </div>
      </ArcherContainer>
    </div>
        {/* <div id="detailsContainer">
        <h2>Description:</h2>
        <div>xxxxxxx</div>
        <br></br>
        <h2>Definitions:</h2>
        <div>xxxxxxx</div>
      </div> */}
    </div>
  );
}

export default Visualizer;
