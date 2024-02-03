import React, { useEffect } from "react";
import ClusterContainer from "../ClusterContainer";
import ProducerContainer from "../ProducerContainer";
import ConsumerContainer from "../ConsumerContainer";
import { ArcherContainer, ArcherElement } from "react-archer";

function Information() {

  return (
    <div>
      <h1>Kafka Ecosystem</h1>
      <div id="appDescription">
        Here is what a Kafka ecosystem looks like. Information on each part of a Kafka system is given below.
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
      <div id="producerInfo">
      <p>Producers</p>
        <p>
          An Apache Kafka Producer is a client application that publishes (writes) events to a Kafka cluster. A producer partitioner maps each message to a topic partition, and the producer sends a produce request to the leader of that partition. The partitioners shipped with Kafka guarantee that all messages with the same non-empty key will be sent to the same partition.
        </p>
        <a href="https://docs.confluent.io/platform/current/clients/producer.html">Producer Info</a>
      </div>
      <div id="brokerInfo">
      <p>Brokers</p>
        <p>
          A single Kafka server is called a Kafka Broker. That Kafka broker is a program that runs on the Java Virtual Machine (Java version 11+) and usually a server that is meant to be a Kafka broker will solely run the necessary program and nothing else.
        </p>
        <a href="https://www.conduktor.io/kafka/kafka-brokers/">Broker Info</a>
      </div>
      <div id="consumerInfo">
      <p>Consumers</p>
        <p>
          The Kafka consumer works by issuing “fetch” requests to the brokers leading the partitions it wants to consume. The consumer offset is specified in the log with each request. The consumer receives back a chunk of log beginning from the offset position. The consumer has significant control over this position and can rewind it to re-consume data if desired.
        </p>
        <a href="https://docs.confluent.io/platform/current/clients/consumer.html">Consumer Info</a>
      </div>
      <div id="eventsInfo">
        <p>Events</p>
        <p>
          An event records the fact that "something happened" in the world or in your business. It is also called record or message in the documentation. When you read or write data to Kafka, you do this in the form of events. Conceptually, an event has a key, value, timestamp, and optional metadata headers.
        </p>
        <a href="https://kafka.apache.org/documentation/">Events Info</a>
      </div>
    </div>
  );
}

export default Information;
