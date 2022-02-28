import { Paper, Container, TextField, Button } from '@mui/material';
import React, { useState } from 'react';
// import './NewCheckForm.css';

/* Render New Check form

    Call the parent (POST) or cancel click
*/

const CheckForm = ({
  check = { tableNum: '', numGuests: '' },
  save,
  cancel
}) => {
  console.debug('NewCheckForm');

  const [ form, setForm ] = useState({
    tableNum: check.tableNum,
    numGuests: check.numGuests
  });
  const [ tableNumFormError, setTableNumFormError ] = useState(false);
  const [ numGuestsFormError, setNumGuestsFormError ] = useState(false);

  // Handle changes in the form
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  // Handle submit: call parent function save
  function handleSubmit(e) {
    e.preventDefault();
    if (!form.tableNum) setTableNumFormError(true);
    if (!form.numGuests) setNumGuestsFormError(true);
    if (form.tableNum && form.numGuests) save({ ...form });
  }

  return (
    <Container maxWidth="sm" sx={{ marginTop: '12em' }}>
      <Paper
        sx={{
          '& > :not(style)': { m: 2, width: '25ch', mt: 4 }
        }}
        component="form"
        noValidate
        align="center"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          type="number"
          id="tableNum"
          name="tableNum"
          label="Table Number"
          variant="outlined"
          autoFocus={true}
          required={true}
          helperText="Please enter the table nubmer"
          value={form.tableNum}
          onChange={handleChange}
          error={tableNumFormError}
        />
        <TextField
          type="number"
          id="numGuests"
          name="numGuests"
          label="Number of Guests"
          variant="outlined"
          required={true}
          helperText="Please enter the number of guests"
          value={form.numGuests}
          onChange={handleChange}
          error={numGuestsFormError}
        />
        <Button onClick={handleSubmit} variant="contained">
          Create New Check
        </Button>
        <Button onClick={cancel} color="secondary">
          Cancel
        </Button>
      </Paper>
    </Container>
  );
};

export default CheckForm;
