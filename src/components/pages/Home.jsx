/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function Home() {
  const [ip, setIP] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [error, setError] = useState(true);
  const navigate = useNavigate();
  Cookies.remove('promIP');
  Cookies.remove('topics');
  // Cookies.set("promIP", 'test', { expires: 1 });

  const routeChange = async (el) => {
    // prevents default form submissions so page doesnt re-render after setErrorMsg updates
    el.preventDefault();

    // returns true/false if prometheus ip is running and valid
    const response = await fetch('http://localhost:3000/kafka/getTopics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ip }),
    });
    const data = await response.json();

    // if user enters valid ip, set cookie to ip address and redirect to metrics
    if (data.length > 1) {
      Cookies.set('promIP', ip, { expires: 1 });
      Cookies.set('topics', data, { expires: 1 });
      navigate('/cluster');
    } else {
      setError(false);
      setErrorMsg('Please enter a valid IP');
    }
  };

  return (
    <div id="homeDiv">
      <div id="homeInput" className="box animate fadeInLeft">
        <h1 id="homeTitle">Welcome to Kafka View</h1>
        <form id="ipSubmission" onSubmit={routeChange}>
          <div className="form__group field">
            <input
              name="name"
              type="input"
              className="form__field"
              id="name"
              placeholder="name"
              onChange={(el) => setIP(el.target.value)}
              value={ip}
            />
            <label htmlFor="name" className="form__label">
              Prometheus IP
            </label>
          </div>
        </form>
        <div id="errorText">{errorMsg}</div>
        {error && <br />}
      </div>

    </div>
  );
}

export default Home;
