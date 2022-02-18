import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
import { addPayment } from '../actions/currentCheck';

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
  const [ totalPayment, setTotalPayment ] = useState(0);
  const [ paymentType, setPaymentType ] = useState('');
  const [ checkTotal, setCheckTotal ] = useState(0);

  const calculateCheck = () => {
    let total = check.subtotal;
    if (check.localTax) total += check.localTax;
    if (check.stateTax) total += check.stateTax;
    if (check.federalTax) total += check.FederalTax;
    if (check.discountTotal) total -= check.discountTotal;
    setCheckTotal(total);
  };

  const savePayment = async ({ amount, tip }) => {
    console.debug('savePayment');
    console.log(amount, tip);
    const newPayment = await TapntableApi.postPayment(
      check.id,
      paymentType,
      +tip,
      +amount
    );
    console.log(newPayment);
    dispatch(addPayment(newPayment));
    setShowPaymentAmountForm(false);
    if (totalPayment >= check.subtotal) showPayment(false);
    //close check
    const closedCheck = await TapntableApi.closeCheck(check.id);
    console.log(closedCheck);
  };
  const cancelPayment = () => {
    console.debug('cancelPayment');
    setShowPaymentAmountForm(false);
    showPayment(false);
  };

  const credit = async (type) => {
    console.debug('credit', type);

    setPaymentType(type);

    // get check total
    calculateCheck();
    console.log('Check Subtotal', check.subtotal);
    console.log('Check total', checkTotal);

    // get existing payments
    const payments = await TapntableApi.getPayments(check.id);
    setTotalPayment(payments.reduce((a, b) => +a + (+b.subtotal || 0), 0));
    console.log('payments', payments, totalPayment);

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
        <Stack spacing={2} justifyContent="center">
          <Button variant="contained" color="success">
            Cash
          </Button>
          <Button onClick={cancelPayment}>Cancel Payment</Button>
        </Stack>

        {showPaymentAmountForm && (
          <PayAmountForm
            amount={(checkTotal - totalPayment).toFixed(2)}
            save={savePayment}
            cancel={cancelPayment}
          />
        )}
      </Container>
    </div>
  );
};

export default Payment;
