import React, { useState } from 'react';
import moment from 'moment';
import TapntableApi from '../api/api';
import { clearCurrentCheck } from '../actions/currentCheck';
import { v4 as uuid } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Container, Button, Stack } from '@mui/material';

const CurrentCheck = ({ showOrderCats, reload, showPayment }) => {
  console.debug('CurrentCheck');

  const dispatch = useDispatch();

  // Get current check
  const user = useSelector((st) => st.user);
  const check = useSelector((st) => st.currentCheck);
  console.log('CurrentCheck', check);

  // console.log('Check items', check.items, check.createdAt);

  const sendOrder = async () => {
    console.debug('sendOrder');

    // Create order in db: get order id
    const order = await TapntableApi.createOrder(user.id);
    console.log('order', order, check.newItems);

    if (check.id) {
      // Create ordered_items objects for each item
      // Hard-code seat-num=1
      // Hard-code itemNote="Well Done"
      for (const item of check.newItems) {
        const ordItem = await TapntableApi.createOrdItem(
          item.id,
          order.id,
          check.id,
          1,
          'Well Done'
        );
        console.log('ordItem', ordItem);
      }
    } else {
      // Create Check in db, get Check Id,
      // ignore customer field
      const checkRes = await TapntableApi.createCheck(
        user.id,
        check.tableNum,
        check.numGuests
      );
      console.log('check', checkRes);

      // Create ordered_items objects for each item
      // Hard-code seat-num=1
      // Hard-code itemNote="Well Done"
      for (const item of check.newItems) {
        const ordItem = await TapntableApi.createOrdItem(
          item.id,
          order.id,
          checkRes.id,
          1,
          'Well Done'
        );
        console.log('ordItem', ordItem);
      }
    }

    // Clear current check
    dispatch(clearCurrentCheck());
    // Return to server page (show open checks)
    reload(true);
    showOrderCats(false);
  };

  // Go back to OpenCheck
  const cancel = () => {
    dispatch(clearCurrentCheck());
    showOrderCats(false);
  };

  const pay = () => {
    //Show Pay Screen
    showOrderCats(false);
    showPayment(true);
  };

  const printCheck = async () => {
    const printCheck = await TapntableApi.printCheck(
      check.id,
      check.subtotal,
      check.localTax,
      check.stateTax,
      check.federalTax
    );
    console.log('printCheck', printCheck);
    // Insert logic to print at local printer when available
  };

  const renderCurrentCheck = () => {
    return (
      <Container sx={{ padding: '8px' }}>
        <div
          style={{ background: 'lightgray', height: '80vh', padding: '8px' }}
        >
          <div className="CurrentCheck-Header">
            <Typography variant="h6" align="center" sx={{ padding: '6px' }}>
              {check.createdAt && (
                <span>
                  Created At:{' '}
                  <strong>{moment(check.createdAt).format('LT')}</strong>
                </span>
              )}
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
          </div>
          <br />

          <div className="CurrentCheck-Items">
            {check.items.map((i) => (
              <p key={uuid()}>
                <strong>{i.name}</strong>{' '}
                <span style={{ float: 'right' }}>${i.price}</span>
              </p>
            ))}
            {check.newItems.map((i) => (
              <p key={uuid()}>
                <strong>{i.name}</strong>{' '}
                <span style={{ float: 'right' }}>${i.price}</span>
              </p>
            ))}
          </div>

          <div
            className="CurrentCheck-Payments"
            style={{ position: 'absolute', bottom: '13em' }}
          >
            {check.payments.map((p) => (
              <p key={uuid()} style={{ dispaly: 'inline' }}>
                Payment------{p.type}----{' '}
                <span style={{ float: 'right' }}>${p.subtotal}</span>
              </p>
            ))}
          </div>
        </div>

        <div className="CurrentCheck-Totals">
          <Typography variant="p" sx={{ padding: '6px' }}>
            {(check.subtotal || check.subtotal === 0) && (
              <span style={{ float: 'right', paddingRight: '6px' }}>
                Subtotal: <strong>${check.subtotal.toFixed(2)}</strong>
              </span>
            )}
          </Typography>

          <br />
          <Typography variant="p" sx={{ padding: '6px' }}>
            {(check.amountDue || check.amountDue === 0) && (
              <span style={{ float: 'right', paddingRight: '6px' }}>
                Amount Due: <strong>${check.amountDue.toFixed(2)}</strong>
              </span>
            )}
          </Typography>
          <Typography variant="p" sx={{ padding: '6px' }}>
            {(check.totalTax || check.totalTax === 0) && (
              <span style={{ float: 'left', paddingLeft: '6px' }}>
                Tax: <strong>${check.totalTax.toFixed(2)}</strong>
              </span>
            )}
          </Typography>
          <br />
        </div>

        <div className="CurrentCheck-Buttons">
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button onClick={sendOrder} variant="contained">
              Send Order
            </Button>
            <Button onClick={cancel} color="warning" variant="contained">
              Cancel
            </Button>
            <Button onClick={printCheck} variant="contained">
              Print Check
            </Button>
            <Button onClick={pay} variant="contained">
              Pay
            </Button>
          </Stack>
        </div>
      </Container>
    );
  };

  return renderCurrentCheck();
};

export default CurrentCheck;
