import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchItemsFromAPI } from '../actions/items';
import { getOpenChecksFromAPI } from '../actions/checks';
import { newCheck, getOpenCheck } from '../actions/newCheck';
import TapntableApi from '../api/api';

import OpenChecks from '../common/OpenChecks';
import CheckForm from '../common/CheckForm';
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
  const [ showCheckForm, setShowCheckForm ] = useState(false);
  const [ showCurrentCheck, setShowCurrentCheck ] = useState(false);

  useEffect(
    () => {
      console.debug('ItemList useEffect on Mount');
      async function fetchItem() {
        await dispatch(fetchItemsFromAPI());
        // Hardcode userId=1
        await dispatch(getOpenChecksFromAPI(1));
        setIsLoading(false);
      }
      if (isLoading) {
        fetchItem();
      }
    },
    [ dispatch, isLoading ]
  );

  const openNewCheck = (tableNum, numGuests) => {
    console.debug('AddCheckInfo');

    setShowCheckForm(false);
    dispatch(newCheck({ tableNum, numGuests }));
    setIsAddingItems(true);
  };

  const cancel = () => {
    console.debug('Cancel NewCheck Form');
    setShowCheckForm(false);
  };

  const createNewCheck = () => {
    console.debug('createNewCheck');

    //Ask what table & how many customers
    setShowCheckForm(true);
    setShowCurrentCheck(true);
    setIsAddingItems(true);
  };

  const openCheck = async (check) => {
    console.debug('openCheck', check);

    //Get ord items for check
    const items = await TapntableApi.getOrderedItems(check.id);
    //Send to current check
    const test = { check: { ...check, items } };
    console.log(`TEST  ${test}`);
    dispatch(getOpenCheck({ check: { ...check, items } }));
    setShowCurrentCheck(true);
    setIsAddingItems(true);
  };

  if (isLoading) return <Spinner />;

  if (!isLoading && items.length === 0) {
    return <b>No items in database</b>;
  }

  if (showCheckForm) {
    return <CheckForm save={openNewCheck} cancel={cancel} />;
  }

  if (isAddingItems)
    return (
      <Grid container>
        <Grid item xs={9}>
          <OrderCategories />
        </Grid>
        <Grid item xs={3}>
          <CurrentCheck sent={setIsAddingItems} />
        </Grid>
      </Grid>
    );

  return (
    <div className="Servers">
      <Grid container>
        <Grid item xs={12}>
          <OpenChecks open={openCheck} />
        </Grid>
      </Grid>
      <div className="Servers-ActionArea">
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button onClick={createNewCheck} variant="contained">
            New Check
          </Button>
          <Button variant="contained">Cash Out</Button>
          <Button variant="contained">Clock Out</Button>
        </Stack>
      </div>
    </div>
  );
};

export default Servers;
