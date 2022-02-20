import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
// import  TextField from '@mui/material/TextField';

const PayAmountForm = ({ amount, save, cancel }) => {
  console.debug('PayAmountForm', amount);

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
        Add Tip & Close Payment
      </Button>
      <Button onClick={cancel} variant="contained">
        Cancel
      </Button>
    </Box>
  );
};

export default PayAmountForm;

// <TextField
// type="number"
// id="tip"
// name="tip"
// label="Tip"
// variant="outlined"
// value={form.tip}
// onChange={handleChange}
// />
