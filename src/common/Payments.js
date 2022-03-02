import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { clearCurrentCheck } from '../actions/currentCheck';
import TapntableApi from '../api/api';
import { CASH } from '../constants';

import AddTipForm from './AddTipForm';
import Spinner from './Spinner';

import {
  Typography,
  Card,
  CardActionArea,
  CardContent,
  Button,
  Stack,
  Container
} from '@mui/material';

const Payments = () => {
  const [ isLoading, setIsLoading ] = useState(true);
  const [ payments, setPayments ] = useState([]);
  const history = useHistory();

  const [ showAddTipForm, setShowAddTipForm ] = useState(false);
  const [ paymentId, setPaymentId ] = useState();

  const user = useSelector((st) => st.user, shallowEqual);
  const dispatch = useDispatch();

  if (!user.pin) history.push('/');

  useEffect(
    () => {
      console.debug('Payments useEffect on Mount');

      async function fetchPayments() {
        console.debug();

        dispatch(clearCurrentCheck());
        const loginTime = await TapntableApi.getUserClockInTime(user.id);
        const payments = await TapntableApi.getUserShiftPayments(
          loginTime,
          user.id
        );
        console.log('Payments before filter', payments);
        setPayments(payments.filter((p) => !p.tipAmt && p.type !== CASH));
        console.log('In Payments', payments);
        setIsLoading(false);
      }
      if (isLoading) {
        fetchPayments();
      }
    },
    [ isLoading, user.id, dispatch ]
  );

  // Add tip to payment in db
  const addTip = async ({ tip }) => {
    console.debug('addTip', tip);

    const addTipRes = await TapntableApi.updatePayment(paymentId, +tip);
    console.log(addTipRes);
    setShowAddTipForm(false);
    setIsLoading(true);
  };

  // Turn off add tip form
  const cancel = () => {
    setShowAddTipForm(false);
  };

  // Show add tip form
  const tip = (paymentId) => {
    console.debug('tip', paymentId);

    setShowAddTipForm(true);
    setPaymentId(paymentId);
  };

  if (isLoading) return <Spinner />;

  // No open payments
  if (payments.length === 0) {
    return (
      <Container maxWidth="md">
        <Typography
          variant="h4"
          align="center"
          sx={{ marginTop: '15vh' }}
          gutterBottom
        >
          No Open Payments
        </Typography>
        <Stack justifyContent="center">
          <Button onClick={() => history.push('/cashout')} variant="contained">
            Cash Out
          </Button>
        </Stack>
      </Container>
    );
  }

  // Display open payments
  return (
    <div>
      <Typography variant="h4" align="center">
        Open Payments
      </Typography>
      {payments.map((p) => (
        <Card
          key={p.id}
          onClick={() => tip(p.id)}
          sx={{
            width: 275,
            float: 'left',
            marginBottom: '2em',
            marginRight: '1em'
          }}
        >
          <CardActionArea>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Payment: {p.id}
              </Typography>
              <Typography variant="h5" component="div">
                Check ID: {p.checkId}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Type: {p.type}, Subtotal: {p.subtotal}, Tip: {p.tipAmt}, Void:{' '}
                {p.isVoid}
              </Typography>
              <Typography variant="body2">Check Id: {p.id}</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}

      {showAddTipForm && <AddTipForm save={addTip} cancel={cancel} />}
    </div>
  );
};

export default Payments;
