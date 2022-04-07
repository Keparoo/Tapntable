import { TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItemsFromAPI } from '../actions/items';

/**
 * Form to input the data for a new item
 */

const NewItemForm = () => {
  console.debug('NewItemForm');

  const [ inputs, setInputs ] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(inputs);
  };

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' }
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="name"
        label="Name"
        value={inputs.name}
        onChange={handleChange}
      />
      <TextField
        id="description"
        label="Description"
        value={inputs.description}
        onChange={handleChange}
      />
      <TextField
        id="price"
        label="Description"
        value={inputs.price}
        onChange={handleChange}
      />
      <TextField
        id="categoryId"
        label="Category"
        value={inputs.categoryId}
        onChange={handleChange}
      />
      <TextField
        id="destinationId"
        label="Destination"
        value={inputs.destinationId}
        onChange={handleChange}
      />
    </Box>
  );
};

export default NewItemForm;
