import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

import { clockOutUser, clearUserPin } from '../actions/user';
import { getOpenChecksFromAPI } from '../actions/checks';
import { getOpenPaymentsFromAPI } from '../actions/payments';
import { clearCurrentCheck } from '../actions/currentCheck';

import TapntableApi from '../api/api';
import { DECLARE_CASH_TIPS } from '../constants';
import { calculateShift } from '../utils/helpers';

import {
  Typography,
  Button,
  Stack,
  Container,
  Paper,
  Tooltip
} from '@mui/material';

// import Payments from './Payments';
import Spinner from '../components/Spinner';
import DeclaredTipsForm from '../components/DeclareTipsForm';

const CashOut = () => {
  const [ isLoading, setIsLoading ] = useState(true);
  const [ showDeclaredTipsForm, setShowDeclaredTipsForm ] = useState(true);
  const [ showClockOut, setShowClockOut ] = useState(false);

  const user = useSelector((st) => st.user, shallowEqual);
  const openChecks = useSelector((st) => st.checks, shallowEqual);
  const payments = useSelector((st) => st.payments, shallowEqual);
  const dispatch = useDispatch();
  const history = useHistory();

  if (!user.pin) history.push('/');

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

    setShowClockOut(true);
  };

  const cancelCashOut = () => {
    setShowDeclaredTipsForm(false);
    history.push('/');
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
    <Container maxWidth="sm">
      <Typography variant="h3" align="center">
        Cash Out
      </Typography>
      <Tooltip title="If in demo mode, note that other demo user's sales may be reflected in this summary in addition to yours">
        <Paper elevation={6} sx={{ marginTop: 4, marginBottom: 4 }}>
          <Typography variant="body1" mx={10} pt={4}>
            MC Sales ${shiftResults.masterCardSales.toFixed(2)} <br />
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
            Credit Tips ${shiftResults.totalCreditTip.toFixed(2)} <br />
            Cash Sales ${shiftResults.cashSales.toFixed(2)} <br />
            Total Sales ${shiftResults.totalSales.toFixed(2)}
          </Typography>
          <br />
          <Typography variant="h6" mx={10} pb={4}>
            {shiftResults.serverCashDue > 0 ? (
              <span>
                Owed to Restaurant ${shiftResults.serverCashDue.toFixed(2)}
              </span>
            ) : (
              <span>
                Owed to Server ${(shiftResults.serverCashDue * -1).toFixed(2)}
              </span>
            )}
          </Typography>
        </Paper>
      </Tooltip>
      <br />

      {showDeclaredTipsForm && (
        <Stack direction="row" spacing={2} align="center">
          <DeclaredTipsForm
            save={saveDeclaredTips}
            cancel={cancelCashOut}
            justifyContent="center"
          />
        </Stack>
      )}
      {showClockOut && (
        <Stack direction="row" spacing={2} justifyContent="center">
          <Tooltip title="Close server's shift and clock out. Return to login screen">
            <Button onClick={clockOut} variant="contained">
              Clock Out
            </Button>
          </Tooltip>
        </Stack>
      )}
    </Container>
  );
};

export default CashOut;
