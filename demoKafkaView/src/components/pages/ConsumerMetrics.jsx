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
const consumerList = data.consumers;


function ConsumerMetrics() {
  const [data, setData] = useState([]);
  const [recordsLagMax, setRecordsLagMax] = useState(0);
  const [recordsLagMaxName, setRecordsLagMaxName] = useState('');
  let time = 0;
  const colors = ["black", "purple", "green", "red", "yellow", "blue", "grey", "pink"];


  useEffect(() => {
    const interval = setInterval(async () => {
      const getConsumerMetrics = async () => {
        try {
          const response = await fetch(
            "http://localhost:3000/demo/consumerMetrics"
          );
          const data = await response.json();
          console.log(data);
          time++;
          data.time = time;
          for (let i = 0; i < data.recordsLag.length; i++) {
            if (data.recordsLag[i] > recordsLagMax) {
              setRecordsLagMax(data.recordsLag[i].toFixed(4));
              setRecordsLagMaxName(consumerList[i]);
            }
          }
         

          setData((current) => {
            if (current.length < 6) return [...current, data];
            else {
              current.shift();
              return [...current, data];
            }
          });
        } catch (error) {
          console.log(error + ": error fetching consumerrMetrics");
        }
      };

      getConsumerMetrics();
    }, 1000);

    return () => clearInterval(interval);
  }, [recordsLagMax]);

  //  records-lag	The number of messages consumer is behind the producer on this partition.
  const chartData1 = {
    labels: data.map((section) => section.time),
    datasets: consumerList.map((consumer, i) => ({
      label: consumer,
      data: data.map((section) => section.recordsLag[i]),
      fill: false,
      backgroundColor: colors[i % 9],
      borderColor: colors[i % 9],
    }))
  };

  //  records-consumed-rate	An average number of records consumed per second for a specific topic or across all topics.
  const chartData2 = {
    labels: data.map((section) => section.time),
    datasets: consumerList.map((consumer, i) => ({
      label: consumer,
      data: data.map((section) => section.recordsConsumedRate[i]),
      fill: false,
      backgroundColor: colors[i % 9],
      borderColor: colors[i % 9],
    }))
  };
  //  bytes-consumed-rate	Average bytes consumed per second for each consumer for a specific topic or across all topics.
  const chartData3 = {
    labels: data.map((section) => section.time),
    datasets: consumerList.map((consumer, i) => ({
      label: consumer,
      data: data.map((section) => section.bytesConsumedRate[i]),
      fill: false,
      backgroundColor: colors[i % 9],
      borderColor: colors[i % 9],
    }))
  };

  // pull unique charts from location.state.id
  // charts to add:
  //  fetch-rate	The number of fetch requests per second from the consumer.

  return (
    <div id="metricsOverallDiv">
      <h1>Consumer Metrics</h1>
      <div>
        <h2 id="metricTitle">Records Lag:</h2>
        <div id="chartDiv">
          <Line data={chartData1} options={lineOptions} />
        </div>
        <h2>Records Lag Max: {recordsLagMax} from {recordsLagMaxName}</h2>
        <p id="metricParagraph">
        Number of messages consumer is behind producer on this partition. Records lag is the calculated difference between a consumer's current
          log offset and a producer's current log offset. Records lag max is the
          maximum observed value of records lag. The significance of these
          metrics' values depends completely upon what your consumers are doing.
          If you have consumers that back up old messages to long-term storage,
          you would expect records lag to be significant. However, if your
          consumers are processing real-time data, consistently high lag values
          could be a sign of overloaded consumers, in which case both
          provisioning more consumers and splitting topics across more
          partitions could help increase throughput and reduce lag.
        </p>
      </div>

      <div>
        <h2 id="metricTitle">Records Consumed Rate:</h2>
        <div id="chartDiv">
          <Line data={chartData2} options={lineOptions} />
        </div>
        <p id="metricParagraph">
        Average number of records consumed per second across all topics.
        </p>
      </div>

      <div>
        <h2 id="metricTitle">Bytes Consumed Rate:</h2>
        <div id="chartDiv">
          <Line data={chartData3} options={lineOptions} />
        </div>
        <p id="metricParagraph">
        Average number of bytes consumed per second across all topics.
        </p>
      </div>    
    </div>
  );
}

export default ConsumerMetrics;
