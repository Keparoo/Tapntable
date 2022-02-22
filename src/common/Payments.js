import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import TapntableApi from '../api/api';
import Spinner from './Spinner';
import AddTipForm from './AddTipForm';
import { Typography, Card, CardActionArea, CardContent } from '@mui/material';

const Payments = () => {
  const [ isLoading, setIsLoading ] = useState(true);
  const [ payments, setPayments ] = useState([]);

  const [ showAddTipForm, setShowAddTipForm ] = useState(false);
  const [ paymentId, setPaymentId ] = useState();

  const user = useSelector((st) => st.user);

  useEffect(
    () => {
      console.debug('ItemList useEffect on Mount');

      async function fetchPayments() {
        console.log('The user is: ', user);
        // Hardcode logintime='2022-02-19' (Today)
        const payments = await TapntableApi.getUserShiftPayments(
          '2022-02-20',
          user.id
        );
        console.log('Payments before filter', payments);
        setPayments(payments.filter((p) => !p.tipAmt));
        console.log('In Payments', payments);
        setIsLoading(false);
      }
      if (isLoading) {
        fetchPayments();
      }
    },
    [ isLoading, user.id ]
  );

  const addTip = async ({ tip }) => {
    console.debug('addTip', tip);

    const addTipRes = await TapntableApi.updatePayment(paymentId, +tip);
    console.log(addTipRes);
    setShowAddTipForm(false);
    setIsLoading(true);
  };

  const cancel = () => {
    setShowAddTipForm(false);
  };

  const tip = (paymentId) => {
    console.debug('tip', paymentId);

    setShowAddTipForm(true);
    setPaymentId(paymentId);
  };

  if (isLoading) return <Spinner />;

  return (
    <div>
      <Typography variant="h3" align="center">
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
