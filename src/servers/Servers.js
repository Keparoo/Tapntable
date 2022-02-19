import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchItemsFromAPI } from '../actions/items';
import { getOpenChecksFromAPI } from '../actions/checks';
import { newCheck, getOpenCheck } from '../actions/currentCheck';
import TapntableApi from '../api/api';
import { calculateCheck } from '../utils/helpers';
import config from '../restaurantConfig.json';

import OpenChecks from '../common/OpenChecks';
import CheckForm from '../common/CheckForm';
import CurrentCheck from '../common/CurrentCheck';
import Spinner from '../common/Spinner';
import OrderCategories from '../common/OrderCategories';
import Payment from '../common/Payment';
import { Button, Stack, Container, Typography, Grid } from '@mui/material';
import './Servers.css';

const Servers = () => {
  console.debug('Servers');

  const items = useSelector((st) => st.items);
  const dispatch = useDispatch();

  const [ isLoading, setIsLoading ] = useState(true);
  const [ isAddingItems, setIsAddingItems ] = useState(false);
  const [ showCheckForm, setShowCheckForm ] = useState(false);
  const [ isPaying, setIsPaying ] = useState(false);

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

  const saveNewCheck = (tableNum, numGuests) => {
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
    setIsAddingItems(true);
  };

  const openCheck = async (check) => {
    console.debug('openCheck', check);

    //Calculate Check
    const items = await TapntableApi.getOrderedItems(check.id);
    const payments = await TapntableApi.getPayments(check.id);
    const checkTotals = calculateCheck(check, items, payments);
    //Update Redux with check info
    dispatch(getOpenCheck({ check, items, payments, checkTotals }));

    setIsAddingItems(true);
  };

  if (isLoading) return <Spinner />;

  if (!isLoading && items.length === 0) {
    return <b>No items in database</b>;
  }

  if (showCheckForm) {
    return <CheckForm save={saveNewCheck} cancel={cancel} />;
  }

  if (isAddingItems)
    return (
      <Grid container>
        <Grid item xs={9}>
          <OrderCategories />
        </Grid>
        <Grid item xs={3}>
          <CurrentCheck
            orderCatsOn={setIsAddingItems}
            reload={setIsLoading}
            showPayment={setIsPaying}
          />
        </Grid>
      </Grid>
    );

  if (isPaying)
    return (
      <Grid container>
        <Grid item xs={9}>
          <Payment showPayment={setIsPaying} />
        </Grid>
        <Grid item xs={3}>
          <CurrentCheck
            orderCatsOn={setIsAddingItems}
            reload={setIsLoading}
            showPayment={setIsPaying}
          />
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
