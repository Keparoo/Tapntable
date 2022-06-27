import React, { useState } from 'react';

// Redux
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { getOpenChecksFromAPI } from '../actions/checks';

// Constants
import {
  CASH,
  MASTER_CARD,
  VISA,
  AMERICAN_EXPRESS,
  DISCOVER,
  GOOGLE_PAY,
  APPLE_PAY,
  VENMO
} from '../constants';

// Utilities
import TapntableApi from '../api/api';

import {
  Typography,
  Stack,
  Button,
  Container,
  Paper,
  Tooltip
} from '@mui/material';

// React Components
import PayAmountForm from './PayAmountForm';
import { addPaymentToAPI } from '../actions/currentCheck';
import { floatToMoney } from '../utils/helpers';

/**
 * 
 * Component handles creating payments for a check
 * Buttons are displayed to choose the payment type (MC, Visa, Cash, etc.)
 * 
 * Called by Servers
 * 
 * Calls PayAmountForm: for entering the payment amount
 * 
 * User Note: cash payments should be done after all credit/electronic as a cash payment
 *  will automatically pay the balance of the check and close the check.
 * 
 * Arguments:
 *  showPayment: function: showPayment(false) turns off display of this component
 *  
 */

const Payment = ({ showPayment }) => {
  console.debug('Payment');

  const user = useSelector((st) => st.user, shallowEqual);
  const check = useSelector((st) => st.currentCheck, shallowEqual);
  const dispatch = useDispatch();

  const [ showPaymentAmountForm, setShowPaymentAmountForm ] = useState(false);
  const [ paymentType, setPaymentType ] = useState('');

  // Close check in API
  const closeCheck = async (
    checkId,
    subtotal,
    localTax,
    stateTax,
    federalTax
  ) => {
    const closeCheckRes = await TapntableApi.closeCheck(
      checkId,
      subtotal,
      localTax,
      stateTax,
      federalTax
    );
    console.debug('Close check', closeCheckRes);
    return closeCheckRes;
  };

  // Post new payment to db
  const savePayment = async ({ amount }) => {
    console.debug('savePayment - Credit Payment', amount);

    if (amount > check.amountDue) amount = check.amountDue;
    if (amount <= 0) {
      setShowPaymentAmountForm(false);
      return;
    }

    dispatch(addPaymentToAPI(check.id, paymentType, amount));

    if (floatToMoney(check.amountDue) - amount === 0) {
      const closeCheckRes = await closeCheck(
        check.id,
        check.subtotal,
        check.localTax,
        check.federalTax
      );
      console.log('Close Check', closeCheckRes);
    }

    showPayment(false);
    // Update redux open checks
    dispatch(getOpenChecksFromAPI(user.id));
  };

  // Close PayAmount form
  const cancelPayment = () => {
    console.debug('cancelPayment');

    setShowPaymentAmountForm(false);
    showPayment(false);
  };

  // Pay by credit
  const credit = (type) => {
    console.debug('pay', type);

    setPaymentType(type);
    setShowPaymentAmountForm(true);
  };

  // Pay by cash: Should be done after all credit payments-- Check is closed
  const cash = async () => {
    console.debug('Make Cash Payment');

    dispatch(addPaymentToAPI(check.id, CASH, check.amountDue));

    const closeCheckRes = await closeCheck(
      check.id,
      check.subtotal,
      check.localTax,
      check.federalTax
    );
    console.log('Close Check', closeCheckRes);

    showPayment(false);
    // Update redux open checks
    dispatch(getOpenChecksFromAPI(user.id));
  };

  return (
    <div>
      <Container maxWidth="md">
        <Paper sx={{ marginTop: '15vh' }} elevation={3}>
          <Typography variant="h3" align="center" gutterBottom>
            Payment
          </Typography>

          <Tooltip title="Select credit type and enter amount to charge when prompted. Multiple credit card payments can be done and must be done before cash">
            <Stack direction="row" spacing={2} justifyContent="center">
              <Button onClick={() => credit(MASTER_CARD)} variant="contained">
                Master Card
              </Button>
              <Button onClick={() => credit(VISA)} variant="contained">
                Visa
              </Button>
              <Button
                onClick={() => credit(AMERICAN_EXPRESS)}
                variant="contained"
              >
                Amex
              </Button>
              <Button onClick={() => credit(DISCOVER)} variant="contained">
                Discover
              </Button>
            </Stack>
          </Tooltip>
          <br />
          <Tooltip title="Select smart phone payment and enter amount to charge when prompted. Multiple smart phone payments can be done and must be done before cash">
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
          </Tooltip>
          <br />
          <Stack spacing={2} justifyContent="center">
            <Tooltip title="Process all credit cards first. Selecting cash will pay the remainder of the check in cash and close the payment">
              <Button onClick={cash} variant="contained">
                Cash
              </Button>
            </Tooltip>
            <Button onClick={cancelPayment}>Cancel Payment</Button>
          </Stack>

          {showPaymentAmountForm && (
            <PayAmountForm
              amount={check.amountDue.toFixed(2)}
              save={savePayment}
              cancel={cancelPayment}
            />
          )}
        </Paper>
      </Container>
    </div>
  );
};

export default Payment;
