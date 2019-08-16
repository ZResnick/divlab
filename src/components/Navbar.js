import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
	<div>
		<nav>
			<Link to="/home">Home</Link>
			<Link to="/divlab">{'<divlab />'}</Link>
		</nav>
		<hr />
	</div>
);

/**
 * CONTAINER
 */

export default Navbar;

/**
 * PROP TYPES
 */
