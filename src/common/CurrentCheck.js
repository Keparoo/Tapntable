import React from 'react';
import moment from 'moment';
import TapntableApi from '../api/api';
import { clearCurrentCheck } from '../actions/currentCheck';
import { v4 as uuid } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Container, Button, Stack } from '@mui/material';
import { KITCHEN_HOT, KITCHEN_COLD, BAR, NO_SEND } from '../constants';

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

    //Separate newItems into destinations
    const kitchenHotOrder = check.newItems.filter(
      (i) => i.destination === KITCHEN_HOT
    );
    const kitchenColdOrder = check.newItems.filter(
      (i) => i.destination === KITCHEN_COLD
    );
    const barOrder = check.newItems.filter((i) => i.destination === BAR);
    const noSendOrder = check.newItems.filter((i) => i.destination === NO_SEND);

    // Item missing destination or has invalid destinationId
    if (
      kitchenHotOrder.length +
        kitchenColdOrder.length +
        barOrder.length +
        noSendOrder.length <
      check.newItems.length
    )
      console.error('****Warning, not being sent to order****');

    console.debug(
      'Kitchen/Bar Order: ',
      check.newItems,
      kitchenHotOrder,
      kitchenColdOrder,
      barOrder,
      noSendOrder
    );

    // Create order in db: get order id
    let kitchenHotOrderRes;
    let kitchenColdOrderRes;
    let barOrderRes;
    let noSendOrderRes;

    // Combine these into one call
    if (kitchenHotOrder.length) {
      kitchenHotOrderRes = await TapntableApi.createOrder(user.id);
      console.debug('order', kitchenHotOrderRes, kitchenHotOrder);
    }
    if (kitchenColdOrder.length) {
      kitchenColdOrderRes = await TapntableApi.createOrder(user.id);
      console.debug('order', kitchenColdOrderRes, kitchenColdOrder);
    }
    if (barOrder.length) {
      barOrderRes = await TapntableApi.createOrder(user.id);
      console.debug('order', barOrderRes, barOrder);
    }
    if (noSendOrder.length) {
      noSendOrderRes = await TapntableApi.createOrder(user.id);
      console.debug('order', noSendOrderRes, noSendOrder);
    }

    // Create ordered_items in database for each item in itemList
    const createOrderedItems = async (
      itemList,
      orderId,
      checkId,
      seatNum,
      itemNote
    ) => {
      for (const item of itemList) {
        const ordItem = await TapntableApi.createOrdItem(
          item.id,
          orderId,
          checkId,
          seatNum,
          itemNote
        );
        console.debug('ordItem', ordItem);
      }
    };

    if (check.id) {
      // Create ordered items for Kitchen-Hot
      if (kitchenHotOrder.length) {
        createOrderedItems(
          kitchenHotOrder,
          kitchenHotOrderRes.id,
          check.id,
          1,
          'Well Done'
        );
      }
      // Create ordered items for Kitchen-Cold
      if (kitchenColdOrder.length) {
        createOrderedItems(
          kitchenColdOrder,
          kitchenColdOrderRes.id,
          check.id,
          1,
          'No Onions'
        );
      }
      // Create ordered items for Bar
      if (barOrder.length) {
        createOrderedItems(
          barOrder,
          barOrderRes.id,
          check.id,
          1,
          'Extra Olives'
        );
      }
      // Create ordered items for no-send (eg, fountain drinks)
      if (noSendOrder.length) {
        createOrderedItems(
          noSendOrder,
          noSendOrderRes.id,
          check.id,
          1,
          'No Ice'
        );
      }
    } else {
      // Create Check in db, get Check Id,
      // ignore customer field
      const checkRes = await TapntableApi.createCheck(
        user.id,
        check.tableNum,
        check.numGuests
      );
      console.debug('check', checkRes);

      // Create ordered items for Kitchen-Hot
      if (kitchenHotOrder.length) {
        createOrderedItems(
          kitchenHotOrder,
          kitchenHotOrderRes.id,
          checkRes.id,
          1,
          'Well Done'
        );
      }
      // Create ordered items for Kitchen-Cold
      if (kitchenColdOrder.length) {
        createOrderedItems(
          kitchenColdOrder,
          kitchenColdOrderRes.id,
          checkRes.id,
          1,
          'No Onions'
        );
      }
      // Create ordered items for Bar
      if (barOrder.length) {
        createOrderedItems(
          barOrder,
          barOrderRes.id,
          checkRes.id,
          1,
          'Extra Olives'
        );
      }
      // Create ordered items for no-send (eg, fountain drinks)
      if (noSendOrder.length) {
        createOrderedItems(
          noSendOrder,
          noSendOrderRes.id,
          checkRes.id,
          1,
          'No Ice'
        );
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
    dispatch(clearCurrentCheck());
    reload(true);
    showOrderCats(false);
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
