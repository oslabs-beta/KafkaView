import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
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
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  Filler,
);

// Global options for the chartJS elements
const lineOptions = {
  scales: {
    y: { ticks: { color: '#black' } },
    x: { ticks: { color: '#black' } },
  },
  tension: 0.2,
  animation: { duration: 5 },
  maintainAspectRatio: false,
  elements: {
    point: {
      radius: 0,
    },
  },
};

function ClusterMetrics() {
  const [data, setData] = useState([]);
  let time = 0;
  const colors = [
    'black',
    'darkblue',
    'purple',
    'darkgreen',
    'darkred',
    'goldenrod',
    'pink',
    'grey',
    'wheat',
  ];
  const quantile = ['p50', 'p75', 'p95', 'p98', 'p99', 'p99.9'];
  const navigate = useNavigate();
  const ip = Cookies.get('promIP');
  const topicList = Cookies.get('topics').split(',');

  useEffect(() => {
    // check if promIP cookie exists
    if (ip === undefined) {
      navigate('/');
    }

    const interval = setInterval(async () => {
      const getClusterMetrics = async () => {
        try {
          const response = await fetch(
            'http://localhost:3000/kafka/clusterMetrics',
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ ip }),
            },
          );
          const data = await response.json();
          console.log(data);
          time++;
          data.time = time;

          setData((current) => {
            if (current.length < 6) return [...current, data];

            current.shift();
            return [...current, data];
          });
        } catch (error) {
          console.log(`${error}: error fetching clusterMetrics`);
        }
      };

      getClusterMetrics();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // UnderReplicatedPartitions - The number of under-replicated partitions across all topics on the
  // broker. Under-replicated partition metrics are a leading indicator of one or more
  // brokers being unavailable.
  const chartData1 = {
    labels: data.map((section) => section.time),
    datasets: [
      {
        label: 'Across All Topics',
        data: data.map((section) => section.underReplicatedPartitions[0]),
        fill: false,
        backgroundColor: colors[0],
        borderColor: colors[0],
      },
    ],
  };

  // ActiveControllerCount - Indicates whether the broker is active and should always be
  // equal to 1 since there is only one broker at the same time that acts as a controller.
  const chartData2 = {
    labels: data.map((section) => section.time),
    datasets: [
      {
        label: 'Across All Topics',
        data: data.map((section) => section.activeControllerCount[0]),
        fill: false,
        backgroundColor: colors[0],
        borderColor: colors[0],
      },
    ],
  };

  // ActiveControllerCount - Indicates whether the broker is active and should always
  // be equal to 1 since there is only one broker at the same time that acts as a controller.
  const chartData3 = {
    labels: data.map((section) => section.time),
    datasets: quantile.map((quantile, i) => ({
      label: quantile,
      data: data.map((section) => section.zookeeperRequestLatency[i]),
      fill: false,
      backgroundColor: colors[i % 9],
      borderColor: colors[i % 9],
    })),
  };

  // total-messages per topic
  const chartData4 = {
    labels: data.map((section) => section.time),
    datasets: topicList.map((topic, i) => ({
      label: topic,
      data: data.map((section) => section.totalMessages[i]),
      fill: false,
      backgroundColor: colors[i % 9],
      borderColor: colors[i % 9],
    })),
  };

  // topic size (bytes)
  const chartData5 = {
    labels: data.map((section) => section.time),
    datasets: topicList.map((topic, i) => ({
      label: topic,
      data: data.map((section) => section.topicSize[i]),
      fill: false,
      backgroundColor: colors[i % 9],
      borderColor: colors[i % 9],
    })),
  };

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
        <h2 id="metricTitle">Zookeeper Request Latency: (ms)</h2>
        <div id="chartDiv">
          <Line data={chartData3} options={lineOptions} />
        </div>
        <p id="metricParagraph">
          Average latency for ZooKeeper response from requests from broker.
          Dramatic spikes in latency indicate broker-zookeeper connectivity
          issues or downed brokers. Above average latency could indicate impoper
          zookeeper configuration.
        </p>
      </div>

      <div>
        <h2 id="metricTitle">Total Messages:</h2>
        <div id="chartDiv">
          <Line data={chartData4} options={lineOptions} />
        </div>
        <p id="metricParagraph">
          This metric measure the total number of messages in each topic across
          all brokers.
        </p>
      </div>

      <div>
        <h2 id="metricTitle">Topic Size: (bytes)</h2>
        <div id="chartDiv">
          <Line data={chartData5} options={lineOptions} />
        </div>
        <p id="metricParagraph">
          This metric measures the storage size, in bytes, per topic across all
          brokers. Be wary of topic size versus broker disc storage size. Steady
          increase in size across long periods of time could indicate a lack of
          message retention period. Make sure you are only persisting still
          relevant data.
        </p>
      </div>
    </div>
  );
}

export default ClusterMetrics;
