import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  Filler
);

//Global options for the chartJS elements
const lineOptions = {
  scales: {
    y: { ticks: { color: "#black" } },
    x: { ticks: { color: "#black" } },
  },
  tension: .2,
  animation: { duration: 5 },
  maintainAspectRatio: false,
  elements: {
    point: {
      radius: 0,
    },
  }
};

const response = await fetch('http://localhost:3000/demo/visualizerMetrics');
const data = await response.json();
const brokerList = data.brokers;


function ClusterMetrics() {
  const [data, setData] = useState([]);
  let time = 0;
  const colors = ["black", "purple", "green", "red", "yellow", "blue", "grey", "pink"];

  useEffect(() => {
    const interval = setInterval(async () => {
      const getClusterMetrics = async () => {
        try {
          const response = await fetch(
            "http://localhost:3000/demo/clusterMetrics"
          );
          const data = await response.json();
          console.log(data);
          time++;
          data.time = time;

          setData((current) => {
            if (current.length < 6) return [...current, data];
            else {
              current.shift();
              return [...current, data];
            }
          });
        } catch (error) {
          console.log(error + ": error fetching clusterMetrics");
        }
      };

      getClusterMetrics();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // UnderReplicatedPartitions	The number of under-replicated partitions across all topics on the broker. Under-replicated partition metrics are a leading indicator of one or more brokers being unavailable.
  const chartData1 = {
    labels: data.map((section) => section.time),
    datasets: brokerList.map((broker, i) => ({
      label: broker,
      data: data.map((section) => section.underRepPartitions[i]),
      fill: false,
      backgroundColor: colors[i % 9],
      borderColor: colors[i % 9],
    }))
  };

  // ActiveControllerCount	Indicates whether the broker is active and should always be equal to 1 since there is only one broker at the same time that acts as a controller.
  const chartData2 = {
    labels: data.map((section) => section.time),
    datasets: brokerList.map((broker, i) => ({
        label: broker,
        data: data.map((section) => section.activeControllerCount[i]),
        fill: false,
        backgroundColor: colors[i % 9],
        borderColor: colors[i % 9],
      }))
  };

  // Disk usage	The amount of used and available disk space.
  const chartData3 = {
    labels: data.map((section) => section.time),
    datasets: brokerList.map((broker, i) => ({
        label: broker,
        data: data.map((section) => section.diskUsage[i]),
        fill: false,
        backgroundColor: colors[i % 9],
        borderColor: colors[i % 9],
      }))
  };
  
  // charts to add:
  // IsrShrinksPerSec/IsrExpandsPerSec	If a broker goes down, in-sync replica ISRs for some of the partitions shrink. When that broker is up again, ISRs are expanded once the replicas are fully caught up.
  // OfflinePartitionsCount	The number of partitions that don’t have an active leader and are hence not writable or readable. A non-zero value indicates that brokers are not available.
  // LeaderElectionRateAndTimeMs	A partition leader election happens when ZooKeeper is not able to connect with the leader. This metric may indicate a broker is unavailable.
  // UncleanLeaderElectionsPerSec	A leader may be chosen from out-of-sync replicas if the broker which is the leader of the partition is unavailable and a new leader needs to be elected. This metric can indicate potential message loss.
  // TotalTimeMs	The time is taken to process the message.
  // PurgatorySize	The size of purgatory requests. Can help identify the main causes of the delay.
  // BytesInPerSec/BytesOutPerSec	The number of data brokers received from producers and the number that consumers read from brokers. This is an indicator of the overall throughput or workload in the Kafka cluster.
  // RequestsPerSecond	Frequency of requests from producers, consumers, and subscribers.

  // Page cache reads ratio	The ratio of the number of reads from the cache pages and the number of reads from the disk.
  // CPU usage	The CPU is rarely the source of performance issues. However, if you see spikes in CPU usage, this metric should be investigated.
  // Network bytes sent/received	The amount of incoming and outgoing network traffic.

  return (
    <div id="metricsOverallDiv">
      <h1>Cluster Metrics</h1>
      <div>
        <h2 id="metricTitle">Under Replicated Partitions:</h2>
        <div id="chartDiv">
          <Line data={chartData1} options={lineOptions} />
        </div>
        <p id="metricParagraph">
          Number of unreplicated partitions. In a healthy cluster, the number of
          in sync replicas (ISRs) should be exactly equal to the total number of
          replicas. If a broker becomes unavailable, the value of
          UnderReplicatedPartitions will increase sharply. Since Kafka’s
          high-availability guarantees cannot be met without replication,
          investigation is certainly warranted should this metric value exceed
          zero for extended time periods.
        </p>
      </div>

      <div>
        <h2 id="metricTitle">Active Controller Count:</h2>
        <div id="chartDiv">
          <Line data={chartData2} options={lineOptions} />
        </div>
        <p id="metricParagraph">
          Number of active controllers in cluster. The first node to boot in a
          Kafka cluster automatically becomes the controller, and there can be
          only one. The controller in a Kafka cluster is responsible for
          maintaining the list of partition leaders, and coordinating leadership
          transitions (in the event a partition leader becomes unavailable). If
          it becomes necessary to replace the controller, ZooKeeper chooses a
          new controller randomly from the pool of brokers. The sum of
          ActiveControllerCount across all of your brokers should always equal
          one, and you should alert on any other value that lasts for longer
          than one second.
        </p>
      </div>

      <div>
        <h2 id="metricTitle">Disk Usage:</h2>
        <div id="chartDiv">
          <Line data={chartData3} options={lineOptions} />
        </div>
        <p id="metricParagraph">
          Disk space currently consumed, versus what is still available on the
          broker. Because Kafka persists all data to disk, it is necessary to
          monitor the amount of free disk space available to Kafka. Kafka will
          fail should its disk become full, so it’s very important that you keep
          track of disk growth over time, and set alerts to inform
          administrators at an appropriate amount of time before disk space is
          all but used up.
        </p>
      </div>
    </div>
  );
}

export default ClusterMetrics;
