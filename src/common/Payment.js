import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOpenChecksFromAPI } from '../actions/checks';
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
// import { addPayment, getOpenCheck } from '../actions/currentCheck';
// import { getPaymentsFromAPI } from '../actions/payments';
// import { calculateCheck } from '../utils/helpers';

// Payment type enum values
const CASH = 'Cash';
const MASTER_CARD = 'MC';
const VISA = 'Visa';
const AMERICAN_EXPRESS = 'Amex';
const DISCOVER = 'Disc';
const GOOGLE_PAY = 'Google';
const APPLE_PAY = 'Apple';
const VENMO = 'Venmo';

const Payment = ({ showPayment }) => {
  console.debug('Payment');

  const check = useSelector((st) => st.currentCheck);
  const dispatch = useDispatch();

  const [ showPaymentAmountForm, setShowPaymentAmountForm ] = useState(false);
  const [ paymentType, setPaymentType ] = useState('');

  const savePayment = async ({ amount }) => {
    console.debug('savePayment', amount);

    if (amount > check.amountDue) amount = check.amountDue;
    if (amount <= 0) {
      setShowPaymentAmountForm(false);
      return;
    }

    const newPayment = await TapntableApi.postPayment(
      check.id,
      paymentType,
      +amount
    );
    console.log('New Credit Payment Made', newPayment);

    if (check.amountDue - amount === 0) {
      const closeCheck = await TapntableApi.closeCheck(check.id);
      console.log('Close check', closeCheck);
    }

    showPayment(false);
    await dispatch(getOpenChecksFromAPI(1));
  };

  const cancelPayment = () => {
    console.debug('cancelPayment');

    setShowPaymentAmountForm(false);
    showPayment(false);
  };

  const pay = (type) => {
    console.debug('pay', type);

    setPaymentType(type);
    setShowPaymentAmountForm(true);
  };

  const cash = async () => {
    console.log(cash);

    const newPayment = await TapntableApi.postPayment(
      check.id,
      CASH,
      check.amountDue
    );
    console.log('New Cash Payment Made', newPayment);
    const closeCheck = await TapntableApi.closeCheck(check.id);

    console.log('Close check', closeCheck);
    showPayment(false);
    // Update redux open checks
    await dispatch(getOpenChecksFromAPI(1));
  };

  return (
    <div>
      <Container>
        <Typography variant="h3" align="center">
          Payment
        </Typography>

        <Stack direction="row" spacing={2} justifyContent="center">
          <Button onClick={() => pay(MASTER_CARD)} variant="contained">
            Master Card
          </Button>
          <Button onClick={() => pay(VISA)} variant="contained">
            Visa
          </Button>
          <Button onClick={() => pay(AMERICAN_EXPRESS)} variant="contained">
            Amex
          </Button>
          <Button onClick={() => pay(DISCOVER)} variant="contained">
            Discover
          </Button>
        </Stack>
        <br />
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button
            onClick={() => pay(GOOGLE_PAY)}
            variant="contained"
            color="secondary"
          >
            Google Pay
          </Button>
          <Button
            onClick={() => pay(APPLE_PAY)}
            variant="contained"
            color="secondary"
          >
            Apple Pay
          </Button>
          <Button
            onClick={() => pay(VENMO)}
            variant="contained"
            color="secondary"
          >
            Venmo
          </Button>
        </Stack>
        <br />
        <Stack spacing={2} justifyContent="center">
          <Button onClick={cash} variant="contained" color="success">
            Cash
          </Button>
          <Button onClick={cancelPayment}>Cancel Payment</Button>
        </Stack>

        {showPaymentAmountForm && (
          <PayAmountForm
            amount={check.amountDue.toFixed(2)}
            save={savePayment}
            cancel={cancelPayment}
          />
        )}
      </Container>
    </div>
  );
};

export default Payment;
