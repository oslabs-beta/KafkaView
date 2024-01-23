import React from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/navbar.css';

function Navbar() {
  const location = useLocation()

  // checks if user is on Home page
  // if on Home page, no Navbar is required
  if (location.pathname === `/`) {
    return null;
  }

  return (
      <div id="navbar">
        navbar
      </div>
    );
}

export default Navbar;