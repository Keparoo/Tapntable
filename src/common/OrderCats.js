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

  // const Item = styled(ButtonBase)(({ theme }) => ({
  //   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fafafa',
  //   ...theme.typography.button,
  //   variant: 'outlined',
  //   padding: theme.spacing(3),
  //   textAlign: 'center',
  //   color: theme.palette.text.secondary
  // }));

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
      <Paper elevation={3} sx={{ padding: '24px' }}>
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
        <Stack sx={{ paddingTop: '36px' }}>
          <Button onClick={close}>Close</Button>
        </Stack>
      </Paper>
    );
  };

  return (
    <Container maxWidth="md">
      <Paper
        elevation={3}
        sx={{
          marginBottom: '16px',
          marginTop: '16px',
          padding: '24px'
        }}
      >
        <Typography variant="h2" align="center" gutterBottom>
          Order Categories
        </Typography>
        <Grid
          container
          direction="row"
          spacing={4}
          justifyContent="space-evenly"
          alignItems="center"
        >
          <Grid item xs={12} sm={6} md={4}>
            <Button
              variant="outlined"
              onClick={() => displayCategory('Appetizer')}
            >
              Appetizers
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button variant="outlined" onClick={() => displayCategory('Soup')}>
              Soup
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button variant="outlined" onClick={() => displayCategory('Salad')}>
              Salad
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button
              variant="outlined"
              onClick={() => displayCategory('Sandwich')}
            >
              Sandwiches
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button
              variant="outlined"
              onClick={() => displayCategory('Entree')}
            >
              Entrees
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button
              variant="outlined"
              onClick={() => displayCategory('Favorites')}
            >
              Favorites
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button
              variant="outlined"
              onClick={() => displayCategory('Addition')}
            >
              Menu Additions
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button
              variant="outlined"
              onClick={() => displayCategory('Dessert')}
            >
              Desserts
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button
              variant="outlined"
              onClick={() => displayCategory('Beverage')}
            >
              Beverages
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button variant="outlined" onClick={() => displayCategory('Beer')}>
              Beer
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button variant="outlined" onClick={() => displayCategory('Wine')}>
              Wine
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button
              variant="outlined"
              onClick={() => displayCategory('Liquor')}
            >
              Liquor
            </Button>
          </Grid>
        </Grid>
      </Paper>
      {showCat && <Category cat={currentCat} />}
    </Container>
  );
};

export default OrderCats;
