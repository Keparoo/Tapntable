import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
// import  TextField from '@mui/material/TextField';

const ItemNoteForm = ({ item, save, cancel }) => {
  console.debug('PayAmountForm', item);

  const [ form, setForm ] = useState({ note: '' });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  // Handle submit: call parent function save
  function handleSubmit(e) {
    console.debug('AddNoteForm handleSubmit');
    e.preventDefault();
    save({ item, ...form });
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
        type="text"
        id="note"
        name="note"
        label="Note"
        variant="outlined"
        value={form.note}
        onChange={handleChange}
      />

      <Button onClick={handleSubmit} variant="contained">
        Add Note
      </Button>
      <Button onClick={cancel} variant="contained">
        Cancel
      </Button>
    </Box>
  );
};

export default ItemNoteForm;
