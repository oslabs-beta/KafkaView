import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  Filler
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

async function ProducerMetrics() {
  const [data, setData] = useState([]);
  let time = 0;
  const colors = ["black", "purple", "green", "red", "yellow", "blue", "grey", "pink"];
  const navigate = useNavigate();
  
  const response = await fetch('http://localhost:3000/kafka/getTopics');
  const topicList = await response.json();
  // const topicList = ['topic1', 'topic2'];

  useEffect(() => {
    //check if promIP cookie exists
    if (Cookies.get('promIP') === undefined) {
      navigate('/')
    }

    const interval = setInterval(async () => {

      const getProducerMetrics = async () => {
        try {
          const response = await fetch('http://localhost:3000/kafka/producerMetrics');
          const data = await response.json();
          console.log(data)
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
          console.log(error + ": error fetching producerMetrics");
        }
      };
  
      getProducerMetrics();

    }, 1000);

    return () => clearInterval(interval);

  }, []);

  // request-rate	An average number of responses sent per producer.
  const chartData1 = {
    labels: data.map((section) => section.time),
    datasets: topicList.map((topic, i) => ({
        label: topic,
        data: data.map((section) => section.requestRate[i]),
        fill: false,
        backgroundColor: colors[i % 9],
        borderColor: colors[i % 9],
      }))
  };

  // request-latency-avg	Average request latency in milliseconds.
  const chartData2 = {
    labels: data.map((section) => section.time),
    datasets: topicList.map((topic, i) => ({
      label: topic,
      data: data.map((section) => section.requestLatencyAvg[i]),
      fill: false,
      backgroundColor: colors[i % 9],
      borderColor: colors[i % 9],
    }))
  };

  // failed-producer-requests
  const chartData3 = {
    labels: data.map((section) => section.time),
    datasets: [
      {
        label: 'Total',
        data: data.map((section) => section.failedProducerRequest[0]),
        fill: false,
        backgroundColor: colors[0],
        borderColor: colors[0],
      },
    ],
  };

  // total-messages-in	
  const chartData4 = {
    labels: data.map((section) => section.time),
    datasets: topicList.map((topic, i) => ({
      label: topic,
      data: data.map((section) => section.totalMessagesIn[i]),
      fill: false,
      backgroundColor: colors[i % 9],
      borderColor: colors[i % 9],
    }))
  };

  // pull unique charts from location.state.id
  //charts to add:
  // outgoing-byte-rate	An average number of outgoing bytes per second.
  // io-wait-time-ns-avg 	The average length of time the I/O thread spent waiting for a socket (in ns).
  // batch-size-avg	The average number of bytes sent per partition per request.

  return (
    <div id="metricsOverallDiv">
      <h1>Producer Metrics</h1>

      <div>
        <h2 id="metricTitle">Request Rate:</h2>
        <div id="chartDiv">
          <Line data={chartData1} options={lineOptions} />
        </div>
        <p id="metricParagraph">
          The request rate is the rate at which producers send data to brokers.
          Keeping an eye on peaks and drops is essential to ensure continuous
          service availability.
        </p>
      </div>

      <div>
        <h2 id="metricTitle">Request Latency Average:</h2>
        <div id="chartDiv">
          <Line data={chartData2} options={lineOptions} />
        </div>
        <p id="metricParagraph">
          The average request latency is a measure of the amount of time between
          when a message is sent to the broker from a producer, until the
          producer then receives a response from the broker.
        </p>
      </div>

      <div>
        <h2 id="metricTitle">Failed Producer Requests:</h2>
        <div id="chartDiv">
          <Line data={chartData3} options={lineOptions} />
        </div>
        <p id="metricParagraph">
          xxx
        </p>
      </div>

      <div>
        <h2 id="metricTitle">Total Messages In:</h2>
        <div id="chartDiv">
          <Line data={chartData4} options={lineOptions} />
        </div>
        <p id="metricParagraph">
          xxx
        </p>
      </div>
    </div>
  );
}

export default ProducerMetrics;
