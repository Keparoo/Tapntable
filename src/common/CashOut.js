import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { clockOutUser, clearUserPin } from '../actions/user';
import TapntableApi from '../api/api';
import { calculateShift } from '../utils/helpers';
import { Typography, Button, Stack } from '@mui/material';
import Payments from './Payments';
import Spinner from './Spinner';

const CashOut = () => {
  const [ isLoading, setIsLoading ] = useState(true);
  const [ payments, setPayments ] = useState([]);
  const shiftResults = calculateShift(payments);

  const user = useSelector((st) => st.user);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(
    () => {
      console.debug('ItemList useEffect on Mount');

      async function fetchPayments() {
        // Hardcode loginTime
        const loginTime = '2022-02-20';
        const userId = user.id;
        const payments = await TapntableApi.getUserShiftPayments(
          loginTime,
          userId
        );
        setPayments(payments);
        setIsLoading(false);
      }
      if (isLoading) {
        fetchPayments();
      }
    },
    [ isLoading, user.id ]
  );

  const clockOut = () => {
    dispatch(clockOutUser(user.id));
    dispatch(clearUserPin());
    history.push('/');
  };

  if (isLoading) return <Spinner />;

  // Still open payments: show Payments page
  if (payments.filter((p) => !p.tipAmt).length !== 0) {
    return <Payments />;
  }

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
