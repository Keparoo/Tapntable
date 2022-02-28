import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getDayChecksFromAPI,
  getDayOpenFromAPI,
  getDayPaymentsFromAPI,
  getDayUserDataFromAPI
} from '../actions/totals';

const CloseDay = () => {
  console.debug('CloseDay');

  const [ isLoading, setIsLoading ] = useState(true);
  const checks = useSelector((st) => st.checks);
  const payments = useSelector((st) => st.payments);
  const dispatch = useDispatch();

  useEffect(
    () => {
      console.debug('ItemList useEffect on Mount');

      async function fetchTotals() {
        // await dispatch(fetchItemsFromAPI());
        await dispatch(getDayOpenFromAPI());
        await dispatch(getDayChecksFromAPI());
        await dispatch(getDayPaymentsFromAPI());
        await dispatch(getDayUserDataFromAPI());
        setIsLoading(false);
      }
      if (isLoading) {
        fetchTotals();
      }
    },
    [ isLoading ]
  );

  // Check for open checks
  // Check for open payments
  // Get all payments from day
  // Calculate totals
  // Display totals

  return (
    <div>
      <h1>Close Day!</h1>
    </div>
  );
};

export default CloseDay;
