import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/pages/Home";
import ProducerMetrics from "./components/pages/ProducerMetrics";
import ClusterMetrics from "./components/pages/ClusterMetrics";
import ConsumerMetrics from "./components/pages/ConsumerMetrics";
import Information from "./components/pages/Information";
import "./styles/styles.css";

function App() {
  const location = useLocation().pathname;
  const isHomeOrInfo = location === "/information";
  const footerStyle = {
    backgroundColor: isHomeOrInfo ? "#090a0c4e" : "#434e59",
  };

  return (
    <div className="App" style={{ overflowY: 'auto' }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cluster" element={<ClusterMetrics />} />
        <Route path="/producer" element={<ProducerMetrics />} />
        <Route path="/consumer" element={<ConsumerMetrics />} />
        <Route path="/information" element={<Information />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <footer id="footer" style={footerStyle}><p id="footerText">© KafkaView 2024 | MIT License</p></footer>
    </div>
  );
}

export default App;
