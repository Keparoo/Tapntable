import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Container,
  InputAdornment
} from '@mui/material';
// import  TextField from '@mui/material/TextField';

const DeclaredTipsForm = ({ save }) => {
  console.debug('DeclaredTipsForm');

  const [ form, setForm ] = useState({ declaredTips: 0 });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  // Handle submit: call parent function save
  function handleSubmit(e) {
    console.debug('DeclaredTipsForm handleSubmit');
    e.preventDefault();
    save({ ...form });
  }

  return (
    <Container>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' }
        }}
        noValidate
        align="center"
        autoComplete="off"
      >
        <TextField
          type="number"
          id="declaredTips"
          name="declaredTips"
          label="Declared Tips"
          variant="outlined"
          placeholder="0.00"
          autoFocus={true}
          required={true}
          helperText="Enter any declared cash tips"
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>
          }}
          onSubmit={handleSubmit}
          value={form.declaredTips}
          onChange={handleChange}
        />

        <Button onClick={handleSubmit} variant="contained">
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default DeclaredTipsForm;
