import React from "react";
import { useLocation, Link } from "react-router-dom";
import icon from "../assets/KafkaViewLogo.png";
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

  // checks if user is on and page besides home
  if (pathname === `/cluster` || pathname === `/producer` || pathname === `/consumer` || pathname === `/information`) {
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
          <li id="dropdown">
            <Link
              id="navbarLink"
              to="/cluster"
              key="clustAll"
              state={{ id: "all" }}
            >
              Cluster Metrics
            </Link>
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
          </li>

          <li>
            <Link id="navbarLink" to="/information">
              Kafka Information
            </Link>
          </li>
        </ul>
      </nav>
    );
  }

  // return (
  //   <nav>
  //     <div id="home">
  //       <Link id="navbarLink" to="/">
  //         Kafka View
  //       </Link>
  //       <Link id="navbarLink" className="home" to="/">
  //         <img id="icon" src={icon} />
  //       </Link>
  //     </div>
  //   </nav>
  // );
}

export default Navbar;
