import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItemToCheck } from '../actions/newCheck';
import { Typography, Button, Stack } from '@mui/material';

const OrderCategories = () => {
  console.debug('OrderCategories');

  const items = useSelector((st) => st.items);
  const dispatch = useDispatch();

  const apps = items.filter((i) => i.category === 'Appetizer');
  const soups = items.filter((i) => i.category === 'Soup');
  const salads = items.filter((i) => i.category === 'Salad');
  const sandwiches = items.filter((i) => i.category === 'Sandwich');
  const entrees = items.filter((i) => i.category === 'Entree');
  // const additions = items.filter((i) => i.category === 'Addition');
  // const desserts = items.filter((i) => i.category === 'Dessert');
  // const favorites = items.filter((i) => i.category === 'Favorites');

  const beverages = items.filter((i) => i.category === 'Beverage');
  const beer = items.filter((i) => i.category === 'Beer');
  const wine = items.filter((i) => i.category === 'Wine');
  const liquor = items.filter((i) => i.category === 'Liquor');

  const addItem = (item) => {
    // console.log(item);
    dispatch(addItemToCheck(item));
  };

  return (
    <div>
      <Typography variant="h2" align="center">
        Order Categories
      </Typography>

      <Typography variant="h4" align="center">
        Apps
      </Typography>
      <Stack direction="row" spacing={2} justifyContent="center">
        {apps.map((i) => (
          <Button key={i.id} onClick={() => addItem(i)} variant="contained">
            {i.name}
          </Button>
        ))}
      </Stack>

      <Typography variant="h4" align="center">
        Soup & Salad
      </Typography>
      <Stack direction="row" spacing={2} justifyContent="center">
        {soups.map((i) => (
          <Button key={i.id} onClick={() => addItem(i)} variant="contained">
            {i.name}
          </Button>
        ))}
        {salads.map((i) => (
          <Button key={i.id} onClick={() => addItem(i)} variant="contained">
            {i.name}
          </Button>
        ))}
      </Stack>

      <Typography variant="h4" align="center">
        Sandwiches
      </Typography>
      <Stack direction="row" spacing={2} justifyContent="center">
        {sandwiches.map((i) => (
          <Button key={i.id} onClick={() => addItem(i)} variant="contained">
            {i.name}
          </Button>
        ))}
      </Stack>

      <Typography variant="h4" align="center">
        Entrees
      </Typography>
      <Stack direction="row" spacing={2} justifyContent="center">
        {entrees.map((i) => (
          <Button key={i.id} onClick={() => addItem(i)} variant="contained">
            {i.name}
          </Button>
        ))}
      </Stack>

      <Typography variant="h4" align="center">
        Beverages
      </Typography>
      <Stack direction="row" spacing={2} justifyContent="center">
        {beverages.map((i) => (
          <Button key={i.id} onClick={() => addItem(i)} variant="contained">
            {i.name}
          </Button>
        ))}
      </Stack>

      <Typography variant="h4" align="center">
        Beer
      </Typography>
      <Stack direction="row" spacing={2} justifyContent="center">
        {beer.map((i) => (
          <Button key={i.id} onClick={() => addItem(i)} variant="contained">
            {i.name}
          </Button>
        ))}
      </Stack>

      <Typography variant="h4" align="center">
        Wine
      </Typography>
      <Stack direction="row" spacing={2} justifyContent="center">
        {wine.map((i) => (
          <Button key={i.id} onClick={() => addItem(i)} variant="contained">
            {i.name}
          </Button>
        ))}
      </Stack>

      <Typography variant="h4" align="center">
        Liquor
      </Typography>
      <Stack direction="row" spacing={2} justifyContent="center">
        {liquor.map((i) => (
          <Button key={i.id} onClick={() => addItem(i)} variant="contained">
            {i.name}
          </Button>
        ))}
      </Stack>
    </div>
  );
};

export default OrderCategories;
