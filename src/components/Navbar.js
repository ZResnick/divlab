import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <div id="navbar">
    <nav>
      <Link className="navlink" to="/home">
        Home
      </Link>
      <Link className="navlink" to="/divlab">
        {'<divlab />'}
      </Link>
    </nav>
  </div>
);

/**
 * CONTAINER
 */

export default Navbar;

/**
 * PROP TYPES
 */
