import React from 'react';
import './App.css';
import CssBaseline from '@mui/material/CssBaseline';

import Routes from './routes/Routes';

function App() {
	return (
		<div className="App">
			<CssBaseline />
			<h1>Tapntable App</h1>
			<Routes />
		</div>
	);
}

export default App;
