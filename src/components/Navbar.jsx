import React from "react";
import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import icon from "../assets/KafkaViewLogo.png";
import "../styles/navbar.css";

function Navbar() {
  const location = useLocation();
  const [producers, setProducers] = useState([]);
  const [consumers, setConsumers] = useState([]);

  

  useEffect(() => {
    const getProducers = async () => {
      try {
        const response = await fetch("http://localhost:3000/kafka/producers");
        const data = await response.json();
        setProducers(data);
      } catch (error) {
        console.log(error + ": error fetching producers");
      }
    };

    getProducers();
  }, []);

  useEffect(() => {
    const getConsumers = async () => {
      try {
        const response = await fetch('http://localhost:3000/kafka/consumers');
        const data = await response.json();
        setConsumers(data);
      } catch (error) {
        console.log(error + ": error fetching consumers");
      }
    };

    getConsumers();
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
        <li>
          <Link id="navbarLink" to="/cluster">
            Cluster Metrics
          </Link>
        </li>
        <li id="dropdown">
          <a id="navbarLink">Producer Metrics</a>
          <div id="dropdown-content1">
            {producers.map((name) => (
              <Link id="navbarLink" to="/producer" key={name} state={{id: name}}>
                {name}
              </Link>
            ))}
          </div>
        </li>
        <li id="dropdown">
          <a id="navbarLink">Consumer Metrics</a>
          <div id="dropdown-content2">
          {consumers.map((name) => (
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
