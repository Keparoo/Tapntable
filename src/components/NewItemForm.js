import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchItemsFromAPI } from '../actions/items';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import {
  Alert,
  Button,
  Container,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { Box } from '@mui/system';
import TapntableApi from '../api/api';
import Spinner from './Spinner';
import ModalAlert from './ModalAlert';

/**
 * Form to input the data for a new item
 * 
 * This form calls the API to get a list of categories and destinations from items
 * 
 * name: string, min length: 1, max length 40, required, leading and trailing whitespace trimmed
 * price: number, min 0, max $999,999.99, required
 * categoryId: number, required
 * destinationId: number, required
 * 
 * .match(/^[0-9]*(\.[0-9]{0,2})?$/)
 */

const validationSchema = Yup.object({
  name: Yup.string('Enter item name')
    .trim()
    .min(1)
    .max(40, '40 characters maximum')
    .required('Item name is required'),
  description: Yup.string('Enter a description or ingredient list')
    .trim()
    .max(500, '500 character maximum'),
  price: Yup.number('Enter the price')
    .min(0, 'Price cannot be negative')
    .max(999999, 'Price limit: $999,999.99'),
  categoryId: Yup.number().required('Category is required'),
  destinationId: Yup.number().required('Destination is required')
});

const NewItemForm = () => {
  console.debug('NewItemForm');

  const [ categories, setCategories ] = useState([]);
  const [ destinations, setDestinations ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ dbError, setDbError ] = useState({ state: false, err: '' });
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      price: '',
      categoryId: '',
      destinationId: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      values.price = Math.floor(+values.price * 100) / 100;
      values.name = values.name.trim();
      values.description = values.description.trim();
      // alert(JSON.stringify(values, null, 2));
      const itemRes = await TapntableApi.createItem(
        values.name,
        values.price,
        values.categoryId,
        values.destinationId,
        values.description
      );
      console.log('createItem', itemRes);
      dispatch(fetchItemsFromAPI());
      resetForm({});
    }
  });

  useEffect(
    () => {
      console.debug('useEffect on mount: get categories & destinations');
      const fetchData = async () => {
        try {
          const categoriesRes = await TapntableApi.getCategories();
          setCategories(categoriesRes);
        } catch (err) {
          console.log('Error getting categories', err);
          setDbError({ state: true, err });
        }
        try {
          const destinationsRes = await TapntableApi.getDestinations();
          setDestinations(destinationsRes);
        } catch (err) {
          console.log('Error getting destinations', err);
          setDbError({ state: true, err });
        }

        setIsLoading(false);
      };
      if (isLoading) {
        fetchData();
      }
    },
    [ isLoading ]
  );

  if (dbError.state)
    return (
      <ModalAlert
        title="Cannot connect to database"
        message={dbError.err}
        agreeButton="ok"
      />
    );
  if (isLoading) return <Spinner />;

  return (
    <Container>
      <Paper elevation={3} sx={{ width: '800px', marginTop: '24px' }}>
        <Typography pt={2} variant="h4" align="center">
          Create new item
        </Typography>
        <Box
          component="form"
          width="766px"
          noValidate
          autoComplete="off"
          sx={{ marginRight: '24px', padding: '24px' }}
          onSubmit={(e) => {
            e.preventDefault();
            formik.handleSubmit(e);
          }}
        >
          <TextField
            id="name"
            name="name"
            label="Name"
            margin="normal"
            placeholder="Enter new item name"
            sx={{ width: '425px' }}
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            autoFocus={true}
            required
          />

          <TextField
            type="number"
            id="price"
            name="price"
            label="Price"
            margin="normal"
            sx={{ marginLeft: '64px', paddingBottom: '24px' }}
            value={formik.values.price}
            placeholder="0.00"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.price && Boolean(formik.errors.price)}
            helperText={formik.touched.price && formik.errors.price}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              )
            }}
          />

          {formik.touched.name && formik.errors.name ? (
            <Alert severity="error">{formik.errors.name}</Alert>
          ) : null}
          {formik.touched.price && formik.errors.price ? (
            <Alert severity="error">{formik.errors.price}</Alert>
          ) : null}
          <br />

          <TextField
            id="description"
            name="description"
            label="Description"
            placeholder="Optional description or ingredient list"
            margin="normal"
            multiline={true}
            rows={4}
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth={true}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
          />
          {formik.touched.description && formik.errors.description ? (
            <Alert severity="error">{formik.errors.description}</Alert>
          ) : null}
          <Stack direction="row" my={2}>
            <InputLabel sx={{ marginLeft: '4px', marginTop: '16px' }}>
              Category
            </InputLabel>
            <Select
              id="categoryId"
              name="categoryId"
              label="Category"
              labelId="Category"
              placeholder="Item category"
              value={formik.values.categoryId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              sx={{ width: '200px', marginLeft: '8px' }}
              required
              error={
                formik.touched.categoryId && Boolean(formik.errors.categoryId)
              }
            >
              {categories.map((c) => (
                <MenuItem key={c.id} value={c.id}>
                  {c.name}
                </MenuItem>
              ))}
            </Select>

            <InputLabel
              id="destination"
              sx={{ marginLeft: '16px', marginTop: '16px' }}
            >
              Destination
            </InputLabel>
            <Select
              id="destinationId"
              name="destinationId"
              label="Destination"
              labelId="destination"
              value={formik.values.destinationId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              sx={{ width: '200px', marginLeft: '8px' }}
              error={
                formik.touched.destinationId &&
                Boolean(formik.errors.destinationId)
              }
            >
              {destinations.map((d) => (
                <MenuItem key={d.id} value={d.id}>
                  {d.name}
                </MenuItem>
              ))}
            </Select>
            <Button
              variant="contained"
              type="submit"
              sx={{ marginLeft: '48px' }}
            >
              Submit
            </Button>
          </Stack>
          {formik.touched.categoryId && formik.errors.categoryId ? (
            <Alert severity="error">{formik.errors.categoryId}</Alert>
          ) : null}
          {formik.touched.destinationId && formik.errors.destinationId ? (
            <Alert severity="error">{formik.errors.destinationId}</Alert>
          ) : null}
        </Box>
      </Paper>
    </Container>
  );
};

export default NewItemForm;
