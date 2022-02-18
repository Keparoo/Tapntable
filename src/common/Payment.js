import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import TapntableApi from '../api/api';
import {
  Typography,
  Stack,
  Button,
  TextField,
  Container,
  Box
} from '@mui/material';
import PayAmountForm from './PayAmountForm';

// Payment type enum values
const CASH = 'Cash';
const MASTER_CARD = 'MC';
const VISA = 'Visa';
const AMERICAN_EXPRESS = 'Amex';
const DISCOVER = 'Disc';
const GOOGLE_PAY = 'Google';
const APPLE_PAY = 'Apple';
const VENMO = 'Venmo';

const Payment = () => {
  console.debug('Payment');

  const [ showPaymentAmountForm, setShowPaymentAmountForm ] = useState(false);
  const check = useSelector((st) => st.currentCheck);

  const savePayment = ({ amount, tip }) => {
    console.debug('savePayment');
    console.log(amount, tip);
    setShowPaymentAmountForm(false);
  };
  const cancelPayment = () => {
    console.debug('cancelPayment');
    setShowPaymentAmountForm(false);
  };

  const credit = (type) => {
    console.debug('credit', type);

    // get check total
    console.log('Check Subtotal', check.subtotal);
    // get existing payments

    // display unpaid balance
    // input payment amount
    setShowPaymentAmountForm(true);
    // validate payment not more than check
    // create new payment
    // check if unpaid balance is zero
  };

  return (
    <div>
      <Container>
        <Typography variant="h3" align="center">
          Payment
        </Typography>

        <Stack direction="row" spacing={2} justifyContent="center">
          <Button onClick={() => credit(MASTER_CARD)} variant="contained">
            Master Card
          </Button>
          <Button onClick={() => credit(VISA)} variant="contained">
            Visa
          </Button>
          <Button onClick={() => credit(AMERICAN_EXPRESS)} variant="contained">
            Amex
          </Button>
          <Button onClick={() => credit(DISCOVER)} variant="contained">
            Discover
          </Button>
        </Stack>
        <br />
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button
            onClick={() => credit(GOOGLE_PAY)}
            variant="contained"
            color="secondary"
          >
            Google Pay
          </Button>
          <Button
            onClick={() => credit(APPLE_PAY)}
            variant="contained"
            color="secondary"
          >
            Apple Pay
          </Button>
          <Button
            onClick={() => credit(VENMO)}
            variant="contained"
            color="secondary"
          >
            Venmo
          </Button>
        </Stack>
        <br />
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button variant="contained" color="success">
            Cash
          </Button>
        </Stack>
        {showPaymentAmountForm && (
          <PayAmountForm
            amount={check.subtotal.toFixed(2)}
            save={savePayment}
            cancel={cancelPayment}
          />
        )}
      </Container>
    </div>
  );
};

export default Payment;
