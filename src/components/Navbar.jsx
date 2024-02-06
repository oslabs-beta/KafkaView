import React from "react";
import { useLocation, Link } from "react-router-dom";
import icon from "../assets/KafkaViewLogo.png";
import "../styles/navbar.css";

function Navbar() {
  const { pathname } = useLocation();

  // // checks if user is on and page besides home
  if (
    pathname === `/cluster` ||
    pathname === `/producer` ||
    pathname === `/consumer` ||
    pathname === `/information`
  ) {
    return (
      <nav>
        <div id="home">
          <Link id="navbarLink1" className="home" to="/">
            <img id="icon" src={icon} />
          </Link>
          <Link id="navbarLink1" to="/">
            Kafka View
          </Link>
        </div>

        <ul>
          <li id="dropdown">
            <Link
              id="navbarLink2"
              to="/cluster"
              key="clustAll"
              state={{ id: "all" }}
            >
              Cluster Metrics
            </Link>
          </li>

          <li id="dropdown">
            <Link
              id="navbarLink2"
              to="/producer"
              key="prodAll"
              state={{ id: "all" }}
            >
              Producer Metrics
            </Link>
          </li>

          <li id="dropdown">
            <Link
              id="navbarLink2"
              to="/consumer"
              key="consAll"
              state={{ id: "all" }}
            >
              Consumer Metrics
            </Link>
          </li>

          <li>
            <Link id="navbarLink2" to="/information">
              Kafka Information
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
