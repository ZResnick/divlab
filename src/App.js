import React from 'react';

import logo from './logo.svg';
import './App.css';
import Routes from './clients/routes';
import Navbar from './components/Navbar';

function App() {
	return (
		<div className="App">
			<Navbar />
			<Routes />
		</div>
	);
}

export default App;
