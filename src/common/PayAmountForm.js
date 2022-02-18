import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  scopedCssBaselineClasses
} from '@mui/material';
// import  TextField from '@mui/material/TextField';

const PayAmountForm = ({ payment = { amount: '', tip: 0 }, save, cancel }) => {
  console.debug('PayAmountForm');

  const [ form, setForm ] = useState({
    amount: payment.amount,
    tip: payment.tip
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  // Handle submit: call parent function save
  function handleSubmit(e) {
    console.debug('PaymentAmountForm handleSubmit');
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
        id="amount"
        name="amount"
        label="Amount"
        variant="outlined"
        value={form.amount}
        onChange={handleChange}
      />
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
        Submit
      </Button>
      <Button onClick={cancel} variant="contained">
        Cancel
      </Button>
    </Box>
  );
};

export default PayAmountForm;
