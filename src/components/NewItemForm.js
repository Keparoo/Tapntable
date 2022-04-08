import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

// import { useDispatch, useSelector } from 'react-redux';
// import { fetchItemsFromAPI } from '../actions/items';

import {
  Button,
  Container,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField
} from '@mui/material';
import { Box } from '@mui/system';

/**
 * Form to input the data for a new item
 */

const validationSchema = Yup.object({
  name: Yup.string('Enter item name').required('Item name is required'),
  description: Yup.string('Enter a description or ingredient list'),
  price: Yup.number('Enter the price').min(0, 'Price cannot be negative'),
  categoryId: Yup.number().required('Category is required'),
  destinationId: Yup.number().required('Destination is required')
});

const NewItemForm = () => {
  console.debug('NewItemForm');

  // const [ inputs, setInputs ] = useState({});

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      price: '',
      categoryId: '',
      destinationId: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    }
  });

  // const handleChange = (event) => {
  //   const name = event.target.name;
  //   const value = event.target.value;
  //   setInputs((values) => ({ ...values, [name]: value }));
  // };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   console.debug(inputs);

  //   alert(
  //     `${inputs.name} ${inputs.description} ${inputs.price} ${inputs.categoryId} ${inputs.destinationId}`
  //   );
  // };

  const categories = [
    { id: 1, name: 'Appetizer' },
    { id: 2, name: 'Soup' },
    { id: 3, name: 'Salad' }
  ];

  const destinations = [
    { id: 1, name: 'Kitchen-Hot' },
    { id: 2, name: 'Kitchen-Cold' },
    { id: 3, name: 'Bar' },
    { id: 4, name: 'No-Send' }
  ];

  return (
    <Container>
      <Paper elevation={3} sx={{ width: '800px', marginTop: '24px' }}>
        <Box
          component="form"
          width="800px"
          noValidate
          autoComplete="off"
          onSubmit={(e) => {
            e.preventDefault();
            formik.handleSubmit(e);
          }}
        >
          <TextField
            id="name"
            name="name"
            label="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <div>{formik.errors.name}</div>
          ) : null}

          <TextField
            type="number"
            id="price"
            name="price"
            label="Price"
            value={formik.values.price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.price && Boolean(formik.errors.price)}
            helperText={formik.touched.price && formik.errors.price}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              )
            }}
          />
          {formik.touched.price && formik.errors.price ? (
            <div>{formik.errors.price}</div>
          ) : null}

          <TextField
            id="description"
            name="description"
            label="Description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
          />
          {formik.touched.description && formik.errors.description ? (
            <div>{formik.errors.description}</div>
          ) : null}

          <InputLabel>Category</InputLabel>
          <Select
            id="categoryId"
            name="categoryId"
            label="Category"
            value={formik.values.categoryId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.categoryId && Boolean(formik.errors.categoryId)
            }
            helpertext={formik.touched.categoryId && formik.errors.categoryId}
          >
            {categories.map((c) => (
              <MenuItem key={c.id} value={c.id}>
                {c.name}
              </MenuItem>
            ))}
          </Select>
          {formik.touched.categoryId && formik.errors.categoryId ? (
            <div>{formik.errors.categoryId}</div>
          ) : null}

          <Select
            id="destinationId"
            name="destinationId"
            label="Destination"
            value={formik.values.destinationId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.destinationId &&
              Boolean(formik.errors.destinationId)
            }
            helperText={
              formik.touched.destinationId && formik.errors.destinationId
            }
          >
            {destinations.map((d) => (
              <MenuItem key={d.id} value={d.id}>
                {d.name}
              </MenuItem>
            ))}
          </Select>
          {formik.touched.destinationId && formik.errors.destinationId ? (
            <div>{formik.errors.destinationId}</div>
          ) : null}

          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default NewItemForm;
