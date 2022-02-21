import React, { useState, useEffect } from 'react';
import TapntableApi from '../api/api';
import { calculateShift } from '../utils/helpers';
import { Typography } from '@mui/material';
import Payments from './Payments';
import Spinner from './Spinner';

const CashOut = () => {
  const [ isLoading, setIsLoading ] = useState(true);
  const [ payments, setPayments ] = useState([]);

  useEffect(
    () => {
      console.debug('ItemList useEffect on Mount');

      async function fetchPayments() {
        // Hardcode loginTime and userId
        const loginTime = '2022-02-20';
        const userId = 1;
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
    [ isLoading ]
  );

  const shiftResults = calculateShift(payments);
  console.log('Shift Results', payments, shiftResults);

  if (isLoading) return <Spinner />;

  if (payments.filter((p) => !p.tipAmt).length !== 0) {
    console.log('Still open payments', payments.filter((p) => !p.tipAmt));
    return <Payments />;
  }

  return (
    <div>
      <Typography variant="h3" align="center">
        Cash Out
      </Typography>

      <Typography variant="h6" align="center">
        Total Sales ${shiftResults.totalSales.toFixed(2)}
      </Typography>
      <br />
      <Typography variant="h6" align="center">
        Cash Sales ${shiftResults.cashSales.toFixed(2)}
      </Typography>
      <Typography variant="h6" align="center">
        Credit Sales ${shiftResults.creditSales.toFixed(2)}
      </Typography>
      <Typography variant="h6" align="center">
        Total Credit Tips ${shiftResults.totalCreditTip.toFixed(2)}
      </Typography>
      <Typography variant="h6" align="center">
        Server Cash Due ${shiftResults.serverCashDue.toFixed(2)}
      </Typography>
      <br />
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
    </div>
  );
};

export default CashOut;
