import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
// import  TextField from '@mui/material/TextField';

const DeclaredTipsForm = ({ save }) => {
  console.debug('DeclaredTipsForm');

  const [ form, setForm ] = useState({ declaredTips: '' });

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
        id="declaredTips"
        name="declaredTips"
        label="Declared Tips"
        variant="outlined"
        value={form.tip}
        onChange={handleChange}
      />

      <Button onClick={handleSubmit} variant="contained">
        Add Declared Cash Tips for Shift
      </Button>
    </Box>
  );
};

export default DeclaredTipsForm;
