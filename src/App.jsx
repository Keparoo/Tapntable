import React from 'react';
import './App.css';
// import CssBaseline from '@mui/material/CssBaseline';
import { Typography, CssBaseline } from '@mui/material';

import Routes from './routes/Routes';

const App = () => {
	return (
    <>
		<div className="App">
			<CssBaseline />
			<Typography variant="h1">Tapntable App</Typography>
			<Routes />
		</div>
    </>
	);
};

export default App;
