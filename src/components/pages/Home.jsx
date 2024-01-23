import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [ip, setIP] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [error, setError] = useState(true); 
  const navigate = useNavigate();

  const routeChange = (el) => {
    //prevents default form submissions so page doesnt re-render after setErrorMsg updates
    el.preventDefault();

    // To be added: logic to handle valid ips
    if (ip.length > 5) navigate(`/visualizer`, { state: { ip: ip } });
    else {
      setError(false);
      setErrorMsg('Please enter valid IP');
    }
  };

  const routeChangeDemo = () => {
    navigate(`/visualizer`, { state: { ip: "demo" } });
  };

  return (
    <div>
      <div id="homeDescription">
        <h1>Welcome to KafkaView!</h1>
        <p>
          KafkaView is a KafkaJS visualizer and data monitoring tool aimed to
          demystify your KafkaJS project. Simply import your project's IP to
          begin monitoring your project's real-time data. Developers can have
          confidence in their project's upkeep with KafkaView.
        </p>
      </div>

      <div id="homeInput">
        <h2>Enter your cluster IP here:</h2>
        <form onSubmit={routeChange}>
          <input
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
        
        <h1>OR</h1>
        <br></br>

        <h2>Try our interactive Demo!</h2>
        <button id="homeBtn" onClick={routeChangeDemo}>
          Demo
        </button>
      </div>

      {/* to be added
      <div id='homeDemo'></div>
      <div id='homeContact'></div> */}
    </div>
  );
}

export default Home;
