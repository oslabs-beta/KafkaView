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

function ConsumerMetrics() {
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
  const navigate = useNavigate();

  const ip = Cookies.get('promIP');
  const topicList = Cookies.get('topics').split(',');

  useEffect(() => {
    // check if promIP cookie exists
    if (ip === undefined) {
      navigate('/');
    }

    const interval = setInterval(async () => {
      const getConsumerMetrics = async () => {
        try {
          const response = await fetch(
            'http://localhost:3000/kafka/consumerMetrics',
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
          console.log(`${error}: error fetching consumerMetrics`);
        }
      };

      getConsumerMetrics();
    }, 1000);

    return () => clearInterval(interval);
  }, [ip, navigate]);

  // records-consumed-rate - An average number of records consumed per
  // second for a specific topic or across all topics.
  const chartData1 = {
    labels: data.map((section) => section.time),
    datasets: topicList.map((topic, i) => ({
      label: topic,
      data: data.map((section) => section.consumerRequests[i]),
      fill: false,
      backgroundColor: colors[i % 9],
      borderColor: colors[i % 9],
    })),
  };

  // failed-consumer-requests
  const chartData2 = {
    labels: data.map((section) => section.time),
    datasets: [
      {
        label: 'Across All Topics',
        data: data.map((section) => section.failedConsumerRequests[0]),
        fill: false,
        backgroundColor: colors[0],
        borderColor: colors[0],
      },
    ],
  };

  return (
    <div id="metricsOverallDiv">
      <h1>Consumer Metrics</h1>

      <div>
        <h2 id="metricTitle">Records Consumed Rate: (/s)</h2>
        <div id="chartDiv">
          <Line data={chartData1} options={lineOptions} />
        </div>
        <p id="metricParagraph">
          Records Consumed Rate measures the rate (average records consumed/sec
          in the last minute) at which records are successfully consumed by
          Kafka consumers. It provides a real-time view of consumers pulling
          messages from brokers.
        </p>
      </div>

      <div>
        <h2 id="metricTitle">Failed Consumer Requests:</h2>
        <div id="chartDiv">
          <Line data={chartData2} options={lineOptions} />
        </div>
        <p id="metricParagraph">
          Failed Consumer Requests tracks instances where consumer requests to
          Kafka brokers have failed, highlighting potential issues such as
          network connectivity issues, misconfigurations, or resource
          constraints. This metric should always be 0.
        </p>
      </div>
    </div>
  );
}

export default ConsumerMetrics;
