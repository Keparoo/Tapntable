import React, { useState } from 'react';
import { Typography, Box, TextField, Button } from '@mui/material';

const UserPinForm = (save, cancel) => {
  console.debug('UserPinForm');

  const [ form, setForm ] = useState({ tip: '' });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  // Handle submit: call parent function save
  function handleSubmit(e) {
    console.debug('AddTipForm handleSubmit');
    e.preventDefault();
    save({ ...form });
  }

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
          id="tip"
          name="tip"
          label="Tip"
          variant="outlined"
          value={form.tip}
          onChange={handleChange}
        />

        <Button onClick={handleSubmit} variant="contained">
          Login
        </Button>
        <Button onClick={cancel} variant="contained">
          Cancel
        </Button>
      </Box>
    </div>
  );
};

export default UserPinForm;
