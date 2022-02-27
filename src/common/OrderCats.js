import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItemToCheck } from '../actions/currentCheck';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  ButtonBase,
  Stack
} from '@mui/material';
import { styled } from '@mui/material/styles';

const OrderCats = () => {
  console.debug('OrderCats');

  const items = useSelector((st) => st.items);
  const dispatch = useDispatch();
  const [ showCat, setShowCat ] = useState(false);
  const [ currentCat, setCurrentCat ] = useState('');

  const Item = styled(ButtonBase)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fafafa',
    ...theme.typography.button,
    variant: 'outlined',
    padding: theme.spacing(3),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }));

  const displayCategory = (cat) => {
    console.debug('displayCategory', cat);
    setShowCat(true);
    setCurrentCat(cat);
  };

  const close = () => {
    console.debug('close');
    setShowCat(false);
  };

  const addItem = (item) => {
    console.debug('addItem', item);
    dispatch(addItemToCheck(item));
  };

  const Category = ({ cat }) => {
    console.debug('Category', cat);

    const catItems = items.filter((i) => i.category === cat);
    console.debug('catItems', catItems);

    return (
      <Paper sx={{ padding: '24px', backgroundColor: '#fafafa' }}>
        <Grid
          container
          direction="row"
          spacing={4}
          justifyContent="space-evenly"
          alignItems="center"
        >
          {catItems.map((i) => (
            <Grid item key={i.id}>
              <Button onClick={() => addItem(i)} variant="contained">
                {i.name}
              </Button>
            </Grid>
          ))}
        </Grid>
        <Stack sx={{ padding: '24px' }}>
          <Button onClick={close}>Close</Button>
        </Stack>
      </Paper>
    );
  };

  return (
    <Container maxWidth="md">
      <Paper
        sx={{
          flexGrow: 1,
          marginBottom: '16px',
          marginTop: '16px',
          backgroundColor: '#fafafa'
        }}
      >
        <Typography variant="h2" align="center">
          Order Categories
        </Typography>
        <Grid
          container
          direction="row"
          spacing={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item xs={6} md={4}>
            <Item onClick={() => displayCategory('Appetizer')}>Appetizers</Item>
          </Grid>
          <Grid item xs={6} md={4}>
            <Item onClick={() => displayCategory('Soup')}>Soup</Item>
          </Grid>
          <Grid item xs={6} md={4}>
            <Item onClick={() => displayCategory('Salad')}>Salad</Item>
          </Grid>
          <Grid item xs={6} md={4}>
            <Item onClick={() => displayCategory('Sandwich')}>Sandwiches</Item>
          </Grid>
          <Grid item xs={6} md={4}>
            <Item onClick={() => displayCategory('Entree')}>Entrees</Item>
          </Grid>
          <Grid item xs={6} md={4}>
            <Item onClick={() => displayCategory('Favorites')}>Favorites</Item>
          </Grid>
          <Grid item xs={6} md={4}>
            <Item onClick={() => displayCategory('Addition')}>
              Menu Additions
            </Item>
          </Grid>
          <Grid item xs={6} md={4}>
            <Item onClick={() => displayCategory('Dessert')}>Desserts</Item>
          </Grid>
          <Grid item xs={6} md={4}>
            <Item onClick={() => displayCategory('Beverage')}>Beverages</Item>
          </Grid>
          <Grid item xs={6} md={4}>
            <Item onClick={() => displayCategory('Beer')}>Beer</Item>
          </Grid>
          <Grid item xs={6} md={4}>
            <Item onClick={() => displayCategory('Wine')}>Wine</Item>
          </Grid>
          <Grid item xs={6} md={4}>
            <Item onClick={() => displayCategory('Liquor')}>Liquor</Item>
          </Grid>
        </Grid>
      </Paper>
      {showCat && <Category cat={currentCat} />}
    </Container>
  );
};

export default OrderCats;
