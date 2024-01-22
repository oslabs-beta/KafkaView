import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/pages/home';
import ProducerMetrics from './components/pages/producerMetrics';
import ClusterMetrics from './components/pages/clusterMetrics';
import ConsumerMetrics from './components/pages/consumerMetrics';
import './styles/styles.css';

function App() {
    return (
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/producer" element={<ProducerMetrics />} />
          <Route path="/cluster" element={<ClusterMetrics />} />
          <Route path="/consumer" element={<ConsumerMetrics />} />
        </Routes>
      </div>
    );
}

export default App;