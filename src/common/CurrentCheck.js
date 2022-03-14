import React, { useState } from 'react';
import moment from 'moment';
import TapntableApi from '../api/api';
import {
  clearCurrentCheck,
  removeItemFromCheck
} from '../actions/currentCheck';
import ItemNoteForm from './ItemNoteForm';
import { v4 as uuid } from 'uuid';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Typography,
  Container,
  Button,
  Box,
  Stack,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemIcon,
  Avatar,
  ListItemAvatar,
  IconButton
} from '@mui/material';
import StarBorder from '@mui/icons-material/StarBorder';
import FolderIcon from '@mui/icons-material/Folder';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import { KITCHEN_HOT, KITCHEN_COLD, BAR, NO_SEND } from '../constants';

const CurrentCheck = ({ showOrderCats, reload, showPayment }) => {
  console.debug('CurrentCheck');

  const dispatch = useDispatch();
  const [ showItemNoteForm, setShowItemNoteForm ] = useState(false);
  const [ currItem, setCurrItem ] = useState({});
  const history = useHistory();
  // const [seatNum, setSeatNum] = useState(1)

  // Get current user and check
  const user = useSelector((st) => st.user, shallowEqual);
  const check = useSelector((st) => st.currentCheck, shallowEqual);
  console.debug('CurrentCheck', check);

  const sendOrder = async () => {
    console.debug('sendOrder');

    if (check.newItems.length === 0) return;

    //Separate newItems into destinations
    const kitchenHotOrder = check.newItems.filter(
      (i) => i.destination === KITCHEN_HOT
    );
    const kitchenColdOrder = check.newItems.filter(
      (i) => i.destination === KITCHEN_COLD
    );
    const barOrder = check.newItems.filter((i) => i.destination === BAR);

    // No send orders are filled by servers: eg: fountain drinks, coffee, tea, etc
    // These items do not display/print in kitchen or bar
    const noSendOrder = check.newItems.filter((i) => i.destination === NO_SEND);

    // Item missing destination or has invalid destinationId. Check item in database
    if (
      kitchenHotOrder.length +
        kitchenColdOrder.length +
        barOrder.length +
        noSendOrder.length <
      check.newItems.length
    )
      console.error(
        '****Warning, not being sent to order! Check item details****'
      );

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

    // Combine these into one call ?
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
    const createOrderedItems = async (itemList, orderId, checkId, seatNum) => {
      for (const item of itemList) {
        const ordItem = await TapntableApi.createOrdItem(
          item.id,
          orderId,
          checkId,
          seatNum,
          item.itemNote
        );
        console.debug('ordItem', ordItem);
      }
    };

    if (check.id) {
      // Create ordered items for Kitchen-Hot
      if (kitchenHotOrder.length) {
        createOrderedItems(kitchenHotOrder, kitchenHotOrderRes.id, check.id, 1);
      }
      // Create ordered items for Kitchen-Cold
      if (kitchenColdOrder.length) {
        createOrderedItems(
          kitchenColdOrder,
          kitchenColdOrderRes.id,
          check.id,
          1
        );
      }
      // Create ordered items for Bar
      if (barOrder.length) {
        createOrderedItems(barOrder, barOrderRes.id, check.id, 1);
      }
      // Create ordered items for no-send (eg, fountain drinks)
      if (noSendOrder.length) {
        createOrderedItems(noSendOrder, noSendOrderRes.id, check.id, 1);
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
          1
        );
      }
      // Create ordered items for Kitchen-Cold
      if (kitchenColdOrder.length) {
        createOrderedItems(
          kitchenColdOrder,
          kitchenColdOrderRes.id,
          checkRes.id,
          1
        );
      }
      // Create ordered items for Bar
      if (barOrder.length) {
        createOrderedItems(barOrder, barOrderRes.id, checkRes.id, 1);
      }
      // Create ordered items for no-send (eg, fountain drinks)
      if (noSendOrder.length) {
        createOrderedItems(noSendOrder, noSendOrderRes.id, checkRes.id, 1);
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
    showPayment(false);
    history.push('/');
  };

  // Show Pay Screen
  const pay = () => {
    showOrderCats(false);
    showPayment(true);
  };

  // Calculate and Print Check
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

  // Add an item note: Show form
  const addNote = (arr, idx) => {
    console.debug('addNote', idx, arr);
    setShowItemNoteForm(true);
    setCurrItem(idx);
  };

  // Save item note: Hide form
  const saveNote = (i, note) => {
    console.debug('*****saveNote', i, note);
    // item.item.itemNote = item.note;
    i.itemNote = note.note;
    console.debug('Item Note: ', note.note);
    setShowItemNoteForm(false);
  };

  // Cancel item note: Hide form
  const cancelNote = () => {
    console.debug('cancelNote');
    setShowItemNoteForm(false);
  };

  // Delete item from newItems
  const removeItem = (idx) => {
    console.debug('removeItem', idx);
    dispatch(removeItemFromCheck(idx));
  };

  const renderCurrentCheck = () => {
    return (
      <Container sx={{ padding: '8px', width: 400 }}>
        <Box
          px={1}
          py={2}
          sx={{
            height: '80vh',
            width: '100%',
            maxWidth: 400,
            bgcolor: 'lightgray'
          }}
          style={{ overflow: 'auto' }}
        >
          <header className="CurrentCheck-Header">
            <Typography variant="h6" align="center">
              {check.tableNum && (
                <span>
                  Table: <strong>{check.tableNum}</strong>
                </span>
              )}
            </Typography>

            <Typography variant="p">
              {check.createdAt && (
                <span>
                  Created At:{' '}
                  <strong>{moment(check.createdAt).format('LT')}</strong>
                </span>
              )}
              {check.numGuests && (
                <span style={{ float: 'right' }}>
                  Num Guests: <strong>{check.numGuests}</strong>
                </span>
              )}
            </Typography>
          </header>

          {check.items.length !== 0 && <Divider>Sent Items</Divider>}

          <List className="CurrentCheck-Items" dense={true}>
            {check.items.map((i) => (
              <ListItem key={uuid()}>
                <ListItemText>
                  <strong>{i.name}</strong>{' '}
                  <span style={{ float: 'right' }}>${i.price}</span>
                  {i.itemNote && (
                    <span>
                      <br />
                      {i.itemNote}
                    </span>
                  )}
                </ListItemText>
              </ListItem>
            ))}
          </List>
          {check.newItems.length !== 0 && <Divider>New Items</Divider>}

          <List dense={true}>
            {check.newItems.map((i, idx, arr) => (
              <React.Fragment>
                <ListItem
                  key={idx}
                  alignItems="flex-start"
                  secondaryAction={'$' + i.price}
                >
                  <IconButton onClick={() => removeItem(idx)}>
                    <DeleteIcon />
                  </IconButton>
                  <ListItemText
                    onClick={() => addNote(arr, idx)}
                    primary={i.name}
                    secondary={
                      <React.Fragment>
                        {i.mods.length !== 0 && (
                          <List>
                            {i.mods.map((m) => (
                              <ListItem
                                sx={{
                                  display: 'inline',
                                  marginLeft: '1.3em'
                                }}
                                variant="body2"
                                color="text.secondary"
                                key={m.modId}
                              >
                                {m.modName}
                                <br />
                              </ListItem>
                            ))}
                          </List>
                        )}
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <ListItem>
                  {showItemNoteForm &&
                  currItem === idx && (
                    <ItemNoteForm
                      i={i}
                      idx={idx}
                      save={saveNote}
                      cancel={cancelNote}
                    />
                  )}
                </ListItem>
              </React.Fragment>
            ))}
          </List>
        </Box>

        <footer style={{ marginTop: 'auto' }}>
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

          <div className="CurrentCheck-Totals">
            <Typography variant="p" sx={{ padding: '6px' }}>
              {(check.subtotal || check.subtotal === 0) && (
                <span style={{ float: 'right', paddingRight: '16px' }}>
                  Subtotal: <strong>${check.subtotal.toFixed(2)}</strong>
                </span>
              )}
            </Typography>

            <br />
            <Typography variant="p" sx={{ padding: '6px' }}>
              {(check.amountDue || check.amountDue === 0) && (
                <span style={{ float: 'right', paddingRight: '16px' }}>
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
        </footer>

        <div className="CurrentCheck-Buttons">
          <Stack direction="row" spacing={2} justifyContent="center">
            {check.newItems.length === 0 ? (
              <Button onClick={sendOrder} variant="contained" disabled>
                Send Order
              </Button>
            ) : (
              <Button onClick={sendOrder} variant="contained">
                Send Order
              </Button>
            )}
            <Button onClick={cancel} color="secondary" variant="contained">
              Cancel
            </Button>
            {check.id ? (
              <Button onClick={printCheck} variant="contained">
                Print Check
              </Button>
            ) : (
              <Button onClick={printCheck} variant="contained" disabled>
                Print Check
              </Button>
            )}
            {check.id ? (
              <Button onClick={pay} variant="contained">
                Pay
              </Button>
            ) : (
              <Button onClick={pay} variant="contained" disabled>
                Pay
              </Button>
            )}
          </Stack>
        </div>
      </Container>
    );
  };

  return renderCurrentCheck();
};

export default CurrentCheck;
