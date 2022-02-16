import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchItemsFromAPI } from '../actions/items';
import { newCheck } from '../actions/newCheck';
import OpenChecks from '../common/OpenChecks';
import CurrentCheck from '../common/CurrentCheck';
import Spinner from '../common/Spinner';
import OrderCategories from '../common/OrderCategories';
import { Button, Stack, Container, Typography, Grid } from '@mui/material';
import './Servers.css';

const Servers = () => {
  console.debug('Servers');
  const items = useSelector((st) => st.items);
  const dispatch = useDispatch();
  const [ isLoading, setIsLoading ] = useState(true);
  const [ isAddingItems, setIsAddingItems ] = useState(false);

  useEffect(
    () => {
      console.debug('ItemList useEffect on Mount');
      async function fetchItem() {
        await dispatch(fetchItemsFromAPI());
        setIsLoading(false);
      }
      if (isLoading) {
        fetchItem();
      }
    },
    [ dispatch, isLoading ]
  );

  const createNewCheck = () => {
    //Ask what table & how many customers
    dispatch(newCheck());
    setIsAddingItems(true);
  };

  if (isLoading) return <Spinner />;

  if (!isLoading && items.length === 0) {
    return <b>No items in database</b>;
  }

  if (isAddingItems)
    return (
      <Grid container>
        <Grid item xs={9}>
          <OrderCategories />
        </Grid>
        <Grid item xs={3}>
          <CurrentCheck />
        </Grid>
      </Grid>
    );

  return (
    <div className="Servers">
      <Grid container>
        <Grid item xs={9}>
          <OpenChecks />
        </Grid>
        <Grid item xs={3}>
          <CurrentCheck />
        </Grid>
      </Grid>
      <div className="Servers-ActionArea">
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button onClick={createNewCheck} variant="contained">
            New Check
          </Button>
          <Button variant="contained">Cash Out</Button>
          <Button variant="contained">New Check</Button>
        </Stack>
      </div>
    </div>
  );
};

// <Stack direction="row" spacing={2} sx={{ mx: 'auto', width: 600 }}></Stack>

export default Servers;
