import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Visualizer from "./components/pages/Visualizer";
import Home from "./components/pages/Home";
import ProducerMetrics from "./components/pages/ProducerMetrics";
import ClusterMetrics from "./components/pages/ClusterMetrics";
import ConsumerMetrics from "./components/pages/ConsumerMetrics";
import "./styles/styles.css";

function App() {

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/visualizer" element={<Visualizer />} />
        <Route path="/cluster" element={<ClusterMetrics />} />
        <Route path="/producer" element={<ProducerMetrics />} />
        <Route path="/consumer" element={<ConsumerMetrics />} />
      </Routes>
    </div>
  );
}

export default App;
