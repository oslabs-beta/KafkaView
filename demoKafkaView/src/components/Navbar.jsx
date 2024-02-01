import React from "react";
import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import icon from "../assets/KafkaViewLogo.png";
import github from "../assets/github-mark-white.png";
import "../styles/navbar.css";

function Navbar() {
  const { pathname } = useLocation();
  const producerMetrics = [
    "Response Rate",
    "Request Rate",
    "Request Latency Average",
  ];
  const clusterMetrics = [
    "Under Replicated Partitions",
    "Active Controller Count",
    "Disk Usage",
  ];
  const consumerMetrics = [
    "Records Lag",
    "Records Consumed Rate",
    "Bytes Consumed Rate",
  ];

  // checks if user is on Home page
  // if on Home page, no Navbar is required
  if (pathname === `/`) {
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
            <a id="navbarLink" href="#homeDemo">
              Demo
            </a>
          </li>
          <li>
            <a id="navbarLink" href="#homeContact">
              Contact
            </a>
          </li>
          <li>
            <a id="github" href="https://github.com/oslabs-beta/KafkaView">
              <img id="github" src={github} />
            </a>
          </li>
        </ul>
      </nav>
    );
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
          <Link
            id="navbarLink"
            to="/cluster"
            key="clustAll"
            state={{ id: "all" }}
          >
            Cluster Metrics
          </Link>
          <div id="dropdown-content1">
            {clusterMetrics.map((name) => (
              <Link
                id="navbarLink"
                to="/cluster"
                key={name}
                state={{ id: name }}
              >
                {name}
              </Link>
            ))}
          </div>
        </li>

        <li id="dropdown">
          <Link
            id="navbarLink"
            to="/producer"
            key="prodAll"
            state={{ id: "all" }}
          >
            Producer Metrics
          </Link>
          <div id="dropdown-content1">
            {producerMetrics.map((name) => (
              <Link
                id="navbarLink"
                to="/producer"
                key={name}
                state={{ id: name }}
              >
                {name}
              </Link>
            ))}
          </div>
        </li>

        <li id="dropdown">
          <Link
            id="navbarLink"
            to="/consumer"
            key="consAll"
            state={{ id: "all" }}
          >
            Consumer Metrics
          </Link>
          <div id="dropdown-content2">
            {consumerMetrics.map((name) => (
              <Link
                id="navbarLink"
                to="/consumer"
                key={name}
                state={{ id: name }}
              >
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
