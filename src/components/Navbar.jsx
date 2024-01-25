import React from "react";
import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import icon from "../assets/KafkaViewLogo.png";
import "../styles/navbar.css";

function Navbar() {
  const location = useLocation();
  const [visualizerMetrics, setVisualizerMetrics] = useState([]);
  const [destination, setDestination] = useState('http://localhost:3000');
  const [ip, setIp] = useState();

  useEffect(() => {
    const getVisualizerMetrics = async () => {
      try {
        const response = await fetch("http://localhost:3000/demo/visualizerMetrics");
        const data = await response.json();
        setVisualizerMetrics(data);
      } catch (error) {
        console.log(error + ": error fetching producers");
      }
    };

    getVisualizerMetrics();
  }, []);

  // checks if user is on Home page
  // if on Home page, no Navbar is required
  if (location.pathname === `/`) {
    return null;
  }

  return (
    <nav>
      <div id="home">
        <Link id="navbarLink" to="/">
          Kafka View
        </Link>
        <Link id="navbarLink" className="home" to="/">
          <img id="icon" src={icon} />
        </Link>
      </div>

      <ul>
        <li>
          <Link id="navbarLink" to="/visualizer">
            Visualizer
          </Link>
        </li>
        <li id="dropdown">
          <a id="navbarLink">Cluster Metrics</a>
          <div id="dropdown-content1">
            {visualizerMetrics.brokers.map((name) => (
              <Link id="navbarLink" to="/cluster" key={name} state={{id: name}}>
                {name}
              </Link>
            ))}
          </div>
        </li>
        <li id="dropdown">
          <a id="navbarLink">Producer Metrics</a>
          <div id="dropdown-content1">
            {visualizerMetrics.producers.map((name) => (
              <Link id="navbarLink" to="/producer" key={name} state={{id: name}}>
                {name}
              </Link>
            ))}
          </div>
        </li>
        <li id="dropdown">
          <a id="navbarLink">Consumer Metrics</a>
          <div id="dropdown-content2">
          {visualizerMetrics.consumers.map((name) => (
              <Link id="navbarLink" to="/consumer" key={name} state={{id: name}}>
                {name}
              </Link>
            ))}
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
