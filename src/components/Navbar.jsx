import React from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/navbar.css';

function Navbar() {
  const location = useLocation()

  if(location.pathname === `/`) {
    return null;
  }

  return (
      <div id="navbar">
        navbar
      </div>
    );
}

export default Navbar;