import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import icon from "../../assets/KafkaViewLogo.png";

function Home() {
  const [ip, setIP] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [error, setError] = useState(true);
  const navigate = useNavigate();
  Cookies.remove("promIP");
  Cookies.remove("topics");
  // Cookies.set("promIP", 'test', { expires: 1 });

  const routeChange = async (el) => {
    // prevents default form submissions so page doesnt re-render after setErrorMsg updates
    el.preventDefault();

    // returns true/false if prometheus ip is running and valid
    const response = await fetch("http://localhost:3000/kafka/getTopics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ip: ip }),
    });
    const data = await response.json();
   
    // if user enters valid ip, set cookie to ip address and redirect to metrics
    if (data.length > 1) {
      Cookies.set("promIP", ip, { expires: 1 });
      Cookies.set("topics", data, { expires: 1 });
      navigate(`/cluster`);
    } else {
      setError(false);
      setErrorMsg("Please enter a valid IP");
    }
  };

  return (
    <div id="homeDiv">
      {/* <h1>Welcome to Kafka View!</h1>
      <div id="homeDescription">
        <img id="icon1" src={icon}/>
        <p id="descriptionText">
          Kafka View is a Kafka visualizer and data monitoring tool aimed to
          demystify your Kafka project. Simply import your project's IP to begin
          monitoring your project's real-time data. Developers can have
          confidence in their project's upkeep with Kafka View.
        </p>
      </div> */}
      <div id="homeInput">
        <h2>Enter your Kafka IP:</h2>
        <form id="ipSubmission" onSubmit={routeChange}>
          <input
            id="ipInput"
            placeholder="Enter Valid IP"
            onChange={(el) => setIP(el.target.value)}
            value={ip}
          ></input>
          <button id="homeBtn" type="submit">
            Submit
          </button>
        </form>
        <div id="errorText">{errorMsg}</div>
        {error && <br />}
      </div>
    </div>
  );
}

export default Home;
