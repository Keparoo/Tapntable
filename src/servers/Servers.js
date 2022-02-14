import React, { useState, useEffect } from 'react';
import TapntableApi from '../api/api';
import CurrentChecks from '../common/CurrentChecks';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import './Servers.css';

const Servers = () => {
	console.debug('Servers');

	return (
		<div className="Servers">
			<Box>
				<h1>Servers</h1>
				<CurrentChecks />
				<div className="Servers-ActionArea">
					<Stack direction="row" spacing={2} sx={{ mx: 'auto', width: 600 }}>
						<Button variant="contained">New Check</Button>
						<Button variant="contained">Cash Out</Button>
						<Button variant="contained">Punch Out</Button>
					</Stack>
				</div>
			</Box>
		</div>
	);
};

export default Servers;
