import React, { useState } from 'react';
import { Typography, Box, TextField, Button } from '@mui/material';

const UserPinForm = ({ login }) => {
  console.debug('UserPinForm');

  const [ form, setForm ] = useState({ pin: '' });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  // Handle submit: call parent function save
  function handleSubmit(e) {
    console.debug('UserPinForm handleSubmit');
    e.preventDefault();
    login({ ...form });
  }

  const clear = () => {
    setForm({ pin: '' });
  };

  return (
    <div>
      <Typography variant="h3" align="center">
        Login Form
      </Typography>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
          justifyContent: 'center'
        }}
        noValidate
        autoComplete="off"
        justifyContent="center"
      >
        <TextField
          type="number"
          id="pin"
          name="pin"
          label="Pin"
          variant="outlined"
          value={form.pin}
          onChange={handleChange}
        />

        <Button onClick={handleSubmit} variant="contained">
          Enter Pin
        </Button>
        <Button onClick={clear} variant="contained">
          Clear
        </Button>
      </Box>
    </div>
  );
};

export default UserPinForm;
