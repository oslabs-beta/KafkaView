import React from "react";
import VisualizerBtn from "../visualizerBtn";
import { ArcherContainer, ArcherElement } from "react-archer";

function Information() {
  const producers = ["Producer 1", "Producer 2", "Producer 3", "..."];
  const brokers = ["Broker 1", "Broker 2", "..."];
  const consumers = [
    "Consumer 1",
    "Consumer 2",
    "Consumer 3",
    "Consumer 4",
    "Consumer 5",
    "...",
  ];

  return (
    <div>
      <h1>Kafka Ecosystem</h1>
      {/* <div id="appDescription">
        Here is what a Kafka ecosystem looks like. Information on each part of a
        Kafka system is given below.
      </div> */}
      <div id="ecosystemContainer">
        <ArcherContainer>
          <div id="firstContainer">
            <ArcherElement
              id="element2"
              relations={[
                {
                  targetId: "element3",
                  targetAnchor: "left",
                  sourceAnchor: "right",
                  style: { strokeColor: "#000000ad", strokeWidth: 2 },
                },
              ]}
            >
              <div id="secondContainer">
                <div id="button">
                  {producers.map((producer, index) => (
                    <VisualizerBtn
                      name={producer}
                      key={index}
                      type="producer"
                    />
                  ))}
                </div>
              </div>
            </ArcherElement>

            <ArcherElement
              id="element3"
              relations={[
                {
                  targetId: "element4",
                  targetAnchor: "left",
                  sourceAnchor: "right",
                  style: { strokeColor: "#000000ad", strokeWidth: 2 },
                },
              ]}
            >
              <div id="clusterContainer">
                <div id="button">
                  {brokers.map((broker, index) => (
                    <VisualizerBtn name={broker} key={index} type="cluster" />
                  ))}
                </div>
              </div>
            </ArcherElement>
            <ArcherElement id="element4">
              <div id="secondContainer">
                <div id="consumerButton">
                  {consumers.map((consumer, index) => (
                    <VisualizerBtn
                      name={consumer}
                      key={index}
                      type="consumer"
                    />
                  ))}
                </div>
              </div>
            </ArcherElement>
          </div>
        </ArcherContainer>
      </div>

      <div id="infoDes">
        <div id="base">
          <div id="infoContainer">
            <h2>Producers</h2>
            <p>
              An Apache Kafka Producer is a client application that publishes
              (writes) events to a Kafka cluster. A producer partitioner maps
              each message to a topic partition, and the producer sends a
              produce request to the leader of that partition. The partitioners
              shipped with Kafka guarantee that all messages with the same
              non-empty key will be sent to the same partition.
            </p>
            <form action="https://docs.confluent.io/platform/current/clients/producer.html">
              <button id="infoButton">Producer Information</button>
            </form>
          </div>
          <div id="infoContainer">
            <h2>Brokers</h2>
            <p>
              A single Kafka server is called a Kafka Broker. That Kafka broker
              is a program that runs on the Java Virtual Machine (Java version
              11+) and usually a server that is meant to be a Kafka broker will
              solely run the necessary program and nothing else.
            </p>
            <form action="https://www.conduktor.io/kafka/kafka-brokers/">
              <button id="infoButton">Broker Information</button>
            </form>
          </div>
        </div>
        <div>
          <div id="infoContainer">
            <h2>Consumers</h2>
            <p>
              The Kafka consumer works by issuing “fetch” requests to the
              brokers leading the partitions it wants to consume. The consumer
              offset is specified in the log with each request. The consumer
              receives back a chunk of log beginning from the offset position.
              The consumer has significant control over this position and can
              rewind it to re-consume data if desired.
            </p>

            <form action="https://docs.confluent.io/platform/current/clients/consumer.html">
              <button id="infoButton">Consumer Information</button>
            </form>
          </div>
          <div id="infoContainer">
            <h2>Events</h2>
            <p>
              An event records the fact that "something happened" in the world
              or in your business. It is also called record or message in the
              documentation. When you read or write data to Kafka, you do this
              in the form of events. Conceptually, an event has a key, value,
              timestamp, and optional metadata headers.
            </p>


            <form action="https://kafka.apache.org/documentation/">
              <button id="infoButton">Events Information</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Information;
