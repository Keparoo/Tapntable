import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  getDayChecksFromAPI,
  getDayItemsFromAPI,
  getDayOpenFromAPI,
  getDayPaymentsFromAPI,
  getDayUserDataFromAPI,
  getDayTotalsFromAPI
} from '../actions/totals';
import TapntableApi from '../api/api';
import { CLOSE_DAY, OPEN_DAY } from '../constants';

const CloseDay = () => {
  console.debug('CloseDay');

  const [ isLoading, setIsLoading ] = useState(true);
  const totals = useSelector((st) => st.totals, shallowEqual);
  const user = useSelector((st) => st.user, shallowEqual);
  const dispatch = useDispatch();

  useEffect(
    () => {
      console.debug('ItemList useEffect on Mount');

      async function fetchTotals() {
        await dispatch(getDayTotalsFromAPI());

        setIsLoading(false);
      }
      if (isLoading) {
        fetchTotals();
      }
    },
    [ dispatch, isLoading ]
  );
  // console.log(checks, payments);

  // Check for open checks
  // Check for open payments
  // Get all payments from day
  // Calculate totals
  // Display totals

  const closeDay = async () => {
    await TapntableApi.logEvent(user.id, CLOSE_DAY);
  };

  const openDay = async () => {
    await TapntableApi.logEvent(user.id, OPEN_DAY);
  };

  // closeDay();
  // openDay();

  console.log(totals);

  return (
    <div>
      <h1>Close Day!</h1>
      <p>DayOpen:</p>
      <br />
      <h6>Checks</h6>
    </div>
  );
};

export default CloseDay;
