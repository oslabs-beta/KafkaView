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
  tension: 0.2,
  animation: { duration: 5 },
  maintainAspectRatio: false,
  elements: {
    point: {
      radius: 0,
    },
  },
};

function ProducerMetrics() {
  const [data, setData] = useState([]);
  let time = 0;
  const colors = [
    "black",
    "darkblue",
    "purple",
    "darkgreen",
    "darkred",
    "goldenrod",
    "pink",
    "grey",
    "wheat"
  ];
  const quantile = ["p50", "p75", "p95", "p98", "p99", "p99.9"];
  const navigate = useNavigate();

  const ip = Cookies.get("promIP");
  const topicList = Cookies.get("topics").split(",");

  useEffect(() => {
    //check if promIP cookie exists
    if (ip === undefined) {
      navigate("/");
    }

    const interval = setInterval(async () => {
      const getProducerMetrics = async () => {
        try {
          const response = await fetch(
            "http://localhost:3000/kafka/producerMetrics",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ ip: ip }),
            }
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
          console.log(error + ": error fetching producerMetrics");
        }
      };

      getProducerMetrics();
    }, 1000);

    return () => clearInterval(interval);
  }, [ip, navigate]);

  // request-rate	An average number of responses sent per producer.
  const chartData1 = {
    labels: data.map((section) => section.time),
    datasets: topicList.map((topic, i) => ({
      label: topic,
      data: data.map((section) => section.requestRate[i]),
      fill: false,
      backgroundColor: colors[i % 9],
      borderColor: colors[i % 9],
    })),
  };

  // request queue time
  const chartData2 = {
    labels: data.map((section) => section.time),
    datasets: quantile.map((quantile, i) => ({
      label: quantile,
      data: data.map((section) => section.requestQueueTime[i]),
      fill: false,
      backgroundColor: colors[i % 9],
      borderColor: colors[i % 9],
    })),
  };

  // response queue time
  const chartData3 = {
    labels: data.map((section) => section.time),
    datasets: quantile.map((quantile, i) => ({
      label: quantile,
      data: data.map((section) => section.responseQueueTime[i]),
      fill: false,
      backgroundColor: colors[i % 9],
      borderColor: colors[i % 9],
    })),
  };

  // failed-producer-requests
  const chartData4 = {
    labels: data.map((section) => section.time),
    datasets: [
      {
        label: "Across All Topics",
        data: data.map((section) => section.failedProducerRequest[0]),
        fill: false,
        backgroundColor: colors[0],
        borderColor: colors[0],
      },
    ],
  };

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
        <h2 id="metricTitle">Request Queue Time: (ms)</h2>
        <div id="chartDiv">
          <Line data={chartData2} options={lineOptions} />
        </div>
        <p id="metricParagraph">
          The request queue time, in percentile values, is the time passed
          between a load balancer receiving a request and the application code
          processing the request. A high value (usually for p99/p999) can imply
          there aren't enough IO threads or the CPU is a bottleneck, or the
          request queue isnt large enough. The request queue size should match
          the number of connections.
        </p>
      </div>

      <div>
        <h2 id="metricTitle">Response Queue Time: (ms)</h2>
        <div id="chartDiv">
          <Line data={chartData3} options={lineOptions} />
        </div>
        <p id="metricParagraph">
          The response queue time, in percentile values, is the time passed
          between application code sending a response and the load balancer
          recieving the response. Like request queue time, a high value (usually
          for p99/p999) indicated queue failure or connectivity issues.
        </p>
      </div>

      <div>
        <h2 id="metricTitle">Failed Producer Requests:</h2>
        <div id="chartDiv">
          <Line data={chartData4} options={lineOptions} />
        </div>
        <p id="metricParagraph">
          Failed Producer Requests tracks instances where producer requests to
          Kafka brokers have failed, highlighting potential issues such as
          network connectivity issues, misconfigurations, or resource
          constraints. This metric should always be 0.
        </p>
      </div>
    </div>
  );
}

export default ProducerMetrics;
