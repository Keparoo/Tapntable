import React, { useState } from 'react';
import TapntableApi from '../api/api';
import { createOrderedItems } from '../actions/newCheck';
import { v4 as uuid } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Container, Button } from '@mui/material';

const CurrentCheck = () => {
  console.debug('CurrentCheck');

  const check = useSelector((st) => st.newCheck);
  const dispatch = useDispatch();

  // console.log('Check items', check.items, check.createdAt);

  let hours;
  let minutes;
  if (check.createdAt) {
    console.log('Time', check.createdAt);
    hours =
      check.createdAt.getHours() > 12
        ? check.createdAt.getHours() - 12
        : check.createdAt.getHours();
    hours = hours === 0 ? 12 : hours;
    minutes = check.createdAt.getMinutes();
    minutes = minutes < 10 ? '0' + minutes.toString() : minutes;
    console.log(`Hours-Minutes ${hours}:${minutes}`);
  }

  const sendOrder = async () => {
    const order = await TapntableApi.createOrder(1);
    console.log('order', order, check.items);

    // hard code userId=1, ignore customer field
    const checkRes = await TapntableApi.createCheck(
      1,
      check.tableNum,
      check.numGuests
    );
    console.log('check', checkRes);
    // Create Check, get Check Id, dispatch to newCheck

    // Create ordered_items objects for each item
    // Hard-code seat-num
    // Hard-code itemNote
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
    // await dispatch(createOrderedItems(check.items));
    // Write them to db
    // Go to server main screen
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
              Created At:{' '}
              <strong>
                {hours}:{minutes}
              </strong>
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
