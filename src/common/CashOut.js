import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { clockOutUser, clearUserPin } from '../actions/user';
import { getOpenChecksFromAPI } from '../actions/checks';
import { getOpenPaymentsFromAPI } from '../actions/payments';
import { clearCurrentCheck } from '../actions/currentCheck';

import TapntableApi from '../api/api';
import { DECLARE_CASH_TIPS } from '../constants';
import { calculateShift } from '../utils/helpers';

import { Typography, Button, Stack, Container, Paper } from '@mui/material';

import Payments from './Payments';
import Spinner from './Spinner';
import DeclaredTipsForm from './DeclareTipsForm';

const CashOut = () => {
  const [ isLoading, setIsLoading ] = useState(true);
  const [ showDeclaredTipsForm, setShowDeclaredTipsForm ] = useState(true);
  const [ showClockOut, setShowClockOut ] = useState(false);

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
        // const userId = user.id;
        await dispatch(getOpenPaymentsFromAPI(loginTime, user.id));
        console.debug('Cashout: Payments', payments);
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

  const saveDeclaredTips = async ({ declaredTips }) => {
    const saveTipsRes = await TapntableApi.logEvent(
      user.id,
      DECLARE_CASH_TIPS,
      declaredTips
    );
    console.debug('saveDeclaredTips', declaredTips, saveTipsRes);
    setShowDeclaredTipsForm(false);
    setShowClockOut(true);
  };

  if (isLoading) return <Spinner />;

  // Still open checks: show Servers page
  if (openChecks.length !== 0) {
    console.debug('Still Open checks', openChecks);
    history.push('/servers');
  }

  // Still open payments: show Payments page
  if (payments.filter((p) => !p.tipAmt).length !== 0) {
    console.debug('Still open payments', payments.filter((p) => !p.tipAmt));
    history.push('/payments');
  }

  const shiftResults = calculateShift(payments);

  return (
    <Container maxWidth="xs">
      <Typography variant="h3" align="center">
        Cash Out
      </Typography>
      <Paper elevation="6" sx={{ marginTop: 4, marginBottom: 4 }}>
        <Typography variant="body1" mx={10} pt={4}>
          MC Sales ${shiftResults.masterCardSales.toFixed(2)} <br />
          Amex Sales ${shiftResults.amexSales.toFixed(2)} <br />
          Visa Sales ${shiftResults.visaSales.toFixed(2)} <br />
          Amex Sales ${shiftResults.amexSales.toFixed(2)} <br />
          Discover Sales ${shiftResults.discSales.toFixed(2)} <br />
          Google Pay Sales ${shiftResults.googleSales.toFixed(2)} <br />
          Apple Pay Sales ${shiftResults.appleSales.toFixed(2)} <br />
          Venmo Sales ${shiftResults.venmoSales.toFixed(2)}
        </Typography>
        <br />

        <Typography variant="h6" mx={10}>
          Credit Sales ${shiftResults.creditSales.toFixed(2)} <br />
          Cash Sales ${shiftResults.cashSales.toFixed(2)} <br />
          Total Sales ${shiftResults.totalSales.toFixed(2)}
        </Typography>
        <br />
        <Typography variant="h6" mx={10} pb={4}>
          Total Credit Tips ${shiftResults.totalCreditTip.toFixed(2)} <br />
          Server Cash Due ${shiftResults.serverCashDue.toFixed(2)}
        </Typography>
      </Paper>
      <br />

      {showDeclaredTipsForm && (
        <Stack direction="row" spacing={2} align="center">
          <DeclaredTipsForm save={saveDeclaredTips} justifyContent="center" />
        </Stack>
      )}
      {showClockOut && (
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button
            onClick={clockOut}
            variant="contained"
            justifyContent="center"
          >
            Clock Out
          </Button>
        </Stack>
      )}
    </Container>
  );
};

export default CashOut;
