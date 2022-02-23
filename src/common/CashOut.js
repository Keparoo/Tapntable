import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { clockOutUser, clearUserPin } from '../actions/user';
import { getOpenChecksFromAPI } from '../actions/checks';
import { getOpenPaymentsFromAPI } from '../actions/payments';
import TapntableApi from '../api/api';
import { calculateShift } from '../utils/helpers';
import { Typography, Button, Stack } from '@mui/material';
import Payments from './Payments';
import Spinner from './Spinner';
import { clearCurrentCheck } from '../actions/currentCheck';

const CashOut = () => {
  const [ isLoading, setIsLoading ] = useState(true);
  // const [ payments, setPayments ] = useState([]);
  // const shiftResults = calculateShift(payments);

  const user = useSelector((st) => st.user);
  const openChecks = useSelector((st) => st.checks);
  const payments = useSelector((st) => st.payments);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(
    () => {
      console.debug('ItemList useEffect on Mount');

      async function fetchPayments() {
        dispatch(clearCurrentCheck());
        await dispatch(getOpenChecksFromAPI(user.id));
        const loginTime = await TapntableApi.getUserClockInTime(user.id);
        console.debug('loginTime', loginTime);
        const userId = user.id;
        console.log('This is the user id', userId);
        // const payments = await TapntableApi.getUserShiftPayments(
        //   loginTime,
        //   userId
        // );
        await dispatch(getOpenPaymentsFromAPI(loginTime, userId));
        console.log('Cashout: Payments', payments);
        // setPayments(payments);
        setIsLoading(false);
      }
      if (isLoading) {
        fetchPayments();
      }
    },
    [ isLoading, user.id, dispatch, payments ]
  );

  const clockOut = () => {
    dispatch(clockOutUser(user.id));
    dispatch(clearUserPin());
    history.push('/');
  };

  if (isLoading) return <Spinner />;

  // Still open checks: show Servers page
  if (openChecks.length !== 0) {
    console.debug('Still Open checks', openChecks);
    history.push('/servers');
    console.debug('After push');
  }

  // Still open payments: show Payments page
  if (payments.filter((p) => !p.tipAmt).length !== 0) {
    console.debug('Still open payments', payments.filter((p) => !p.tipAmt));
    history.push('/payments');
    // return <Payments />;
  }

  const shiftResults = calculateShift(payments);

  return (
    <div>
      <Typography variant="h3" align="center">
        Cash Out
      </Typography>
      <Typography variant="h6" align="center">
        MC Sales ${shiftResults.masterCardSales.toFixed(2)}
      </Typography>
      <Typography variant="h6" align="center">
        Visa Sales ${shiftResults.visaSales.toFixed(2)}
      </Typography>
      <Typography variant="h6" align="center">
        Amex Sales ${shiftResults.amexSales.toFixed(2)}
      </Typography>
      <Typography variant="h6" align="center">
        Discover Sales ${shiftResults.discSales.toFixed(2)}
      </Typography>
      <Typography variant="h6" align="center">
        Google Pay Sales ${shiftResults.googleSales.toFixed(2)}
      </Typography>
      <Typography variant="h6" align="center">
        Apple Pay Sales ${shiftResults.appleSales.toFixed(2)}
      </Typography>
      <Typography variant="h6" align="center">
        Venmo Sales ${shiftResults.venmoSales.toFixed(2)}
      </Typography>
      <br />

      <Typography variant="h6" align="center">
        Credit Sales ${shiftResults.creditSales.toFixed(2)}
      </Typography>
      <Typography variant="h6" align="center">
        Cash Sales ${shiftResults.cashSales.toFixed(2)}
      </Typography>
      <br />

      <Typography variant="h6" align="center">
        Total Sales ${shiftResults.totalSales.toFixed(2)}
      </Typography>
      <br />

      <Typography variant="h6" align="center">
        Total Credit Tips ${shiftResults.totalCreditTip.toFixed(2)}
      </Typography>
      <Typography variant="h6" align="center">
        Server Cash Due ${shiftResults.serverCashDue.toFixed(2)}
      </Typography>
      <br />
      <Stack direction="row" spacing={2} justifyContent="center">
        <Button onClick={clockOut} variant="contained">
          Clock Out
        </Button>
      </Stack>
    </div>
  );
};

export default CashOut;
