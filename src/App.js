import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';

import Routes from './routes/Routes';

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<h1>Tapntable App</h1>
				<Routes />
			</div>
		</BrowserRouter>
	);
}

export default App;
