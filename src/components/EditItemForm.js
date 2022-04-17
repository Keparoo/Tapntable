import React, { useEffect, useState } from 'react';
import { fetchItemsFromAPI } from '../actions/items';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import {
  Alert,
  Button,
  Container,
  FormControlLabel,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Switch,
  TextField,
  Typography
} from '@mui/material';
import { Box } from '@mui/system';
import TapntableApi from '../api/api';
import Spinner from './Spinner';
import ModalAlert from './ModalAlert';
import { useDispatch, useSelector } from 'react-redux';

/**
 * Form to edit the data for an existing item
 * 
 * This form calls the API to get a list of categories and destinations from items
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
    .max(200, '200 character maximum'),
  price: Yup.number('Enter the price')
    .positive('Price cannot be negative')
    .max(999999, 'Price limit: $999,999.99'),
  categoryId: Yup.number().required('Category is required'),
  destinationId: Yup.number().required('Destination is required'),
  count: Yup.lazy(
    (value) => (value === '' ? Yup.string() : Yup.number().min(-1))
  ),
  isActive: Yup.boolean().required('isActive is required')
});

const NewItemForm = () => {
  console.debug('EditItemForm');

  // const [ inputs, setInputs ] = useState({});
  const [ categories, setCategories ] = useState([]);
  const [ destinations, setDestinations ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ dbError, setDbError ] = useState({ state: false, err: '' });
  const dispatch = useDispatch();
  const items = useSelector((st) => st.items);

  // const cat = categories.find((c) => c.name === items[1].category);
  // // setCategory(cat.id);
  // console.log('Category', cat);

  const formik = useFormik({
    initialValues: {
      id: items[1].id,
      name: items[1].name,
      description: items[1].description,
      price: items[1].price,
      categoryId: '',
      destinationId: '',
      count: items[1].count || -1,
      isActive: items[1].isActive
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.debug('Formik onSubmit', values);

      values.price = Math.floor(+values.price * 100) / 100;
      values.name = values.name.trim();
      values.description = values.description.trim();
      values.count = values.count === -1 ? null : values.count;
      // alert(JSON.stringify(values, null, 2));
      const itemRes = await TapntableApi.updateItem(
        values.id,
        values.name,
        values.price,
        values.description,
        values.categoryId,
        values.destinationId,
        values.count,
        values.isActive
      );
      console.log('updateItem', itemRes);
      dispatch(fetchItemsFromAPI());
    }
  });

  useEffect(
    () => {
      console.debug('useEffect on mount: get categories & destinations');
      const fetchData = async () => {
        try {
          const categoriesRes = await TapntableApi.getCategories();
          setCategories(categoriesRes);
          const cat = categories.find((c) => c.name === items[1].category);
          if (cat) formik.values.categoryId = cat.id;
        } catch (err) {
          console.log('Error getting categories', err);
          setDbError({ state: true, err });
        }
        try {
          const destinationsRes = await TapntableApi.getDestinations();
          setDestinations(destinationsRes);
          const dest = destinations.find(
            (d) => d.name === items[1].destination
          );
          if (dest) formik.values.destinationId = dest.id;
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
    [ isLoading, categories, formik.values, items, destinations ]
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
          Edit item
        </Typography>

        <Box
          component="form"
          width="766px"
          noValidate
          autoComplete="off"
          sx={{ marginRight: '24px', padding: '24px' }}
          onSubmit={(e) => {
            console.log('onSubmit');
            e.preventDefault();
            formik.handleSubmit(e);
          }}
        >
          <Typography variant="span">Item ID: {formik.values.id}</Typography>
          {formik.values.count !== null ? (
            <Typography variant="span">Count: {formik.values.count}</Typography>
          ) : (
            <Typography variant="span">No Count</Typography>
          )}
          <span style={{ float: 'right' }}>
            <FormControlLabel
              value={formik.values.isActive}
              onChange={formik.handleChange}
              control={<Switch color="primary" />}
              label="Active"
              labelPlacement="end"
              onBlur={formik.handleBlur}
              checked={formik.values.isActive}
            />
          </span>
          <br />
          <br />
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
              ),
              inputProps: { min: 0 }
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
          <Stack direction="row" my={2} spacing={2}>
            <InputLabel id="categoryId">Category</InputLabel>
            <Select
              id="categoryId"
              name="categoryId"
              label="Category"
              labelId="Category"
              placeholder="Item category"
              value={formik.values.categoryId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              sx={{ width: '150px' }}
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

            <InputLabel id="destinationId">Destination</InputLabel>
            <Select
              id="destinationId"
              name="destinationId"
              label="Destination"
              labelId="destination"
              value={formik.values.destinationId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              sx={{ width: '150px' }}
              required
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

            <TextField
              type="number"
              id="count"
              name="count"
              label="Count"
              placeholder="Number of items left"
              margin="normal"
              InputProps={{ inputProps: { min: -1 } }}
              value={formik.values.count === -1 ? '' : formik.values.count}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              sx={{ width: '100px' }}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
            />
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
          {formik.touched.destinationId && formik.errors.destinationId ? (
            <Alert severity="error">{formik.errors.count}</Alert>
          ) : null}
        </Box>
      </Paper>
    </Container>
  );
};

export default NewItemForm;
