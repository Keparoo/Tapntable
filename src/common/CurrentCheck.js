import React from 'react';
import TapntableApi from '../api/api';
import formatTime from '../utils/helpers';
import { v4 as uuid } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Container, Button } from '@mui/material';

const CurrentCheck = ({ sent }) => {
  console.debug('CurrentCheck');

  const check = useSelector((st) => st.newCheck);
  // const dispatch = useDispatch();

  // console.log('Check items', check.items, check.createdAt);

  // Format time to 12 hour
  const time = formatTime(check.createdAt);

  const sendOrder = async () => {
    console.debug('sendOrder');

    // Create order in db: get order id
    // Hard code userId=1
    const order = await TapntableApi.createOrder(1);
    console.log('order', order, check.items);

    // Create Check in db, get Check Id,
    // hard code userId=1, ignore customer field
    const checkRes = await TapntableApi.createCheck(
      1,
      check.tableNum,
      check.numGuests
    );
    console.log('check', checkRes);

    // Create ordered_items objects for each item
    // Hard-code seat-num=1
    // Hard-code itemNote="Well Done"
    for (const item of check.items) {
      const ordItem = await TapntableApi.createOrdItem(
        item.id,
        order.id,
        checkRes.id,
        1,
        'Well Done'
      );
      console.log('ordItem', ordItem);
    }
    // Return to server page (show open checks)
    sent(false);
  };

  return (
    <Container>
      <div style={{ background: 'lightgray', height: '80vh' }}>
        <Typography variant="h5" align="center">
          Current Check
        </Typography>

        <Typography variant="p">
          {check.tableNum && (
            <span>
              Table Num: <strong>{check.tableNum}</strong>
            </span>
          )}
          {check.numGuests && (
            <span style={{ float: 'right' }}>
              Num Guests: <strong>{check.numGuests}</strong>
            </span>
          )}
        </Typography>
        <br />
        <br />

        {check.items.map((i) => (
          <p key={uuid()}>
            <strong>{i.name}</strong> ${i.price}
          </p>
        ))}
      </div>
      <div>
        <Typography variant="p">
          {check.subtotal && (
            <span>
              Subtotal: <strong>${check.subtotal.toFixed(2)}</strong>
            </span>
          )}
          {check.createdAt && (
            <span style={{ float: 'right' }}>
              Created At: <strong>{time}</strong>
            </span>
          )}
        </Typography>
        <br />

        <br />
        <Button onClick={sendOrder} variant="contained">
          Send Order
        </Button>
      </div>
    </Container>
  );
};

export default CurrentCheck;
