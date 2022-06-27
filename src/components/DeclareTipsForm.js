import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Container,
  InputAdornment,
  Tooltip
} from '@mui/material';
// import  TextField from '@mui/material/TextField';

const DeclaredTipsForm = ({ save, cancel }) => {
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
          '& > :not(style)': { m: 1, width: '30ch' }
        }}
        noValidate
        align="center"
        autoComplete="off"
        onSubmit={handleSubmit}
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
          value={form.declaredTips}
          onChange={handleChange}
        />
        <Tooltip title="Submit declared cash tips (or zero) to view clock out button">
          <Button type="submit" onClick={handleSubmit} variant="contained">
            Submit
          </Button>
        </Tooltip>

        <Tooltip title="Cancel declaring cash tips and return to open checks view">
          <Button onClick={cancel} variant="contained">
            Cancel
          </Button>
        </Tooltip>
      </Box>
    </Container>
  );
};

export default DeclaredTipsForm;
