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
import TapntableApi from '../api/api';
import { calculateCheck } from '../utils/helpers';
// import config from '../restaurantConfig.json';

import OpenChecks from '../components/OpenChecks';
import CheckForm from '../components/CheckForm';
import CurrentCheck from '../components/CurrentCheck';
import Spinner from '../components/Spinner';
import OrderCategories from '../components/OrderCategories';
import Payment from '../components/Payment';
import { Button, Stack, Grid } from '@mui/material';
import './Servers.css';
import { clearUserPin } from '../actions/user';
import CheckFunctions from '../components/CheckFunctions';

const Servers = () => {
  console.debug('Servers');

  const history = useHistory();
  const user = useSelector((st) => st.user, shallowEqual);
  const items = useSelector((st) => st.items, shallowEqual);
  // const mods = useSelector((st) => st.mods, shallowEqual);
  const dispatch = useDispatch();

  const [ isLoading, setIsLoading ] = useState(true);
  const [ showOrderCategories, setShowOrderCategories ] = useState(false);
  const [ showCheckForm, setShowCheckForm ] = useState(false);
  const [ showPayment, setShowPayment ] = useState(false);

  if (!user.pin) history.push('/');

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

  const saveNewCheck = (tableNum, numGuests) => {
    console.debug('AddCheckInfo', tableNum, numGuests);

    setShowCheckForm(false);
    dispatch(newCheck({ tableNum, numGuests }));
    setShowOrderCategories(true);
  };

  const cancel = () => {
    console.debug('Cancel NewCheck Form');
    setShowCheckForm(false);
    setShowOrderCategories(false);
  };

  const createNewCheck = () => {
    console.debug('createNewCheck');

    //Ask what table & how many customers
    setShowCheckForm(true);
    setShowOrderCategories(true);
  };

  const openCheck = async (check) => {
    console.debug('openCheck', check);

    //Get check items
    const items = await TapntableApi.getOrderedItems(check.id);

    //Get related mods for items
    for (const item of items) {
      const mods = await TapntableApi.getItemMods({ ordItemId: item.id });
      item.mods = mods;
    }

    const payments = await TapntableApi.getPayments(check.id);
    const checkTotals = calculateCheck(check, items, payments);
    //Update Redux with check info
    dispatch(getOpenCheck({ check, items, payments, checkTotals }));

    setShowOrderCategories(true);
  };

  const exit = () => {
    dispatch(clearUserPin());
    history.push('/');
  };

  if (isLoading) return <Spinner />;

  if (!isLoading && items.length === 0) {
    return <b>No items in database</b>;
  }

  if (showCheckForm) {
    return <CheckForm save={saveNewCheck} cancel={cancel} />;
  }

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
          />
        </Grid>
        <Grid item xs={1}>
          <CheckFunctions />
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
          <Button onClick={exit} variant="contained" color="secondary">
            Exit
          </Button>
        </Stack>
      </div>
    </div>
  );
};

export default Servers;
