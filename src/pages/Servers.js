import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchItemsFromAPI } from '../actions/items';
import { fetchModsFromAPI } from '../actions/mods';
import { getOpenChecksFromAPI } from '../actions/checks';
import {
  newCheck,
  getOpenCheck,
  clearCurrentCheck
} from '../actions/currentCheck';
import { clearUserPin } from '../actions/user';

import TapntableApi from '../api/api';
import { calculateCheck } from '../utils/helpers';

import OpenChecks from '../components/OpenChecks';
import NewCheckForm from '../components/NewCheckForm';
import CurrentCheck from '../components/CurrentCheck';
import OrderCategories from '../components/OrderCategories';
import Payment from '../components/Payment';
import Spinner from '../components/Spinner';

import { Button, Stack, Grid } from '@mui/material';
import './Servers.css';

import CheckFunctions from '../components/CheckFunctions';

/**
 * The main page for creating and managing orders
 * 
 * Called by Routes and routed to /servers
 * 
 * Components Called: OpenChecks, CheckForm, CurrentCheck, CheckFunctions, OrderCategories, Payment, Spinner
 */

const Servers = () => {
  console.debug('Servers');

  const history = useHistory();
  const user = useSelector((st) => st.user, shallowEqual);
  const items = useSelector((st) => st.items, shallowEqual);
  const dispatch = useDispatch();

  const [ isLoading, setIsLoading ] = useState(true);
  const [ showOrderCategories, setShowOrderCategories ] = useState(false);
  const [ showNewCheckForm, setShowNewCheckForm ] = useState(false);
  const [ showPayment, setShowPayment ] = useState(false);

  if (!user.pin) history.push('/');

  // Load from API: items, mods, current user's open checks into redux store
  // Clear the current check in redux store
  useEffect(
    () => {
      console.debug('ItemList useEffect on Mount');

      async function fetchItem() {
        await dispatch(fetchItemsFromAPI());
        await dispatch(fetchModsFromAPI());
        await dispatch(getOpenChecksFromAPI(user.id));
        dispatch(clearCurrentCheck());
        setIsLoading(false);
      }
      if (isLoading) {
        fetchItem();
      }
    },
    [ dispatch, isLoading, user.id ]
  );

  // Create a new empty check in redux store with current timestamp, tableNum and numGuests
  const saveNewCheck = (tableNum, numGuests) => {
    console.debug('AddCheckInfo', tableNum, numGuests);

    setShowNewCheckForm(false);
    dispatch(newCheck({ tableNum, numGuests }));
    setShowOrderCategories(true);
  };

  // Cancel creation of new empty check in redux store
  const cancel = () => {
    console.debug('Cancel NewCheck Form');
    setShowNewCheckForm(false);
    setShowOrderCategories(false);
  };

  // Show CheckForm to create new empty check
  const createNewCheck = () => {
    console.debug('createNewCheck');

    //Ask what table & how many customers
    setShowNewCheckForm(true);
    setShowOrderCategories(true);
  };

  // Open existing check: retrieve items, mods, and payments from API
  // Calculate the check
  // Update the redux store: currentCheck with info
  const openCheck = async (check) => {
    console.debug('openCheck', check);

    //Get check items
    const items = await TapntableApi.getOrderedItems(check.id);
    console.log('The item now are:', items);

    //Get related mods for items
    for (const item of items) {
      const mods = await TapntableApi.getItemMods({ ordItemId: item.id });
      item.mods = mods;
    }

    const payments = await TapntableApi.getPayments(check.id);
    const checkTotals = calculateCheck(check, items, payments);
    // Update Redux currentCheck with check info
    dispatch(getOpenCheck({ check, items, payments, checkTotals }));

    setShowOrderCategories(true);
  };

  // Log user out of terminal by clearing current user pin
  const exit = () => {
    dispatch(clearUserPin());
    history.push('/');
  };

  if (isLoading) return <Spinner />;

  if (!isLoading && items.length === 0) {
    return <b>No items in database</b>;
  }

  // Render form to create new check
  if (showNewCheckForm) {
    return <NewCheckForm save={saveNewCheck} cancel={cancel} />;
  }

  // View for adding items to a check
  // Render Payment, OrderCategories, CurrentCheck, and CheckFunctions Components
  if (showPayment || showOrderCategories)
    return (
      <Grid container>
        <Grid item xs={8}>
          {showPayment && <Payment showPayment={setShowPayment} />}
          {showOrderCategories && <OrderCategories />}
        </Grid>
        <Grid item xs={3}>
          <CurrentCheck
            showOrderCats={setShowOrderCategories}
            reload={setIsLoading}
            showPayment={setShowPayment}
            reloadCheck={openCheck}
          />
        </Grid>
        <Grid item xs={1}>
          <CheckFunctions />
        </Grid>
      </Grid>
    );

  // View for seeing user's current open checks and buttons to create a new check
  // Render OpenChecks Component and Create/Cancel New Check Buttons
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
          <Button onClick={exit} variant="contained" color="secondary">
            Exit
          </Button>
        </Stack>
      </div>
    </div>
  );
};

export default Servers;
