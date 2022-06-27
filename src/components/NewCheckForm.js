import { Paper, Container, TextField, Button, Tooltip } from '@mui/material';
import React, { useState } from 'react';
// import './NewCheckForm.css';

/* Render NewCheckForm

    Call the parent (POST) or cancel click
*/

const NewCheckForm = ({
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
          helperText="Please enter the table number"
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
        <Tooltip
          title={`Confirm new check creattion and open new check to add items`}
        >
          <Button type="submit" onClick={handleSubmit} variant="contained">
            Create New Check
          </Button>
        </Tooltip>
        <Tooltip title="Cancel new check creation and return to open checks view">
          <Button onClick={cancel} color="secondary">
            Cancel
          </Button>
        </Tooltip>
      </Paper>
    </Container>
  );
};

export default NewCheckForm;
