import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ClusterContainer from "../ClusterContainer";
import ProducerContainer from "../ProducerContainer";
import ConsumerContainer from "../ConsumerContainer";
import { ArcherContainer, ArcherElement } from "react-archer";

function Visualizer() {

  return (
    <div>
      <h1>Kafka Ecosystem</h1>
      <div id="appDescription">
        Here is a list of the producers, consumers, and brokers in your Kafka
        Ecosystem. Click on the labels below to monitor individual metrics in
        real-time.
      </div>
      <div>
        <ArcherContainer>
          <div id="firstContainer">
            <ArcherElement
              id="element2"
              relations={[
                {
                  targetId: "element3",
                  targetAnchor: "left",
                  sourceAnchor: "right",
                  style: { strokeColor: "purple", strokeWidth: 2 },
                },
              ]}
            >
              <div>
                <ProducerContainer />
              </div>
            </ArcherElement>

            <ArcherElement id="element3">
              <div>
                <ClusterContainer />
              </div>
            </ArcherElement>
            <ArcherElement
              id="element4"
              relations={[
                {
                  targetId: "element3",
                  targetAnchor: "right",
                  sourceAnchor: "left",
                  style: { strokeColor: "purple", strokeWidth: 2 },
                },
              ]}
            >
              <div>
                <ConsumerContainer />
              </div>
            </ArcherElement>
          </div>
        </ArcherContainer>
      </div>
    </div>
  );
}

export default Visualizer;
