import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import {
  clearCurrentCheck,
  removeItemFromCheck
} from '../actions/currentCheck';
import sendOrder from '../utils/sendOrder';
import TapntableApi from '../api/api';

import ItemNoteForm from './ItemNoteForm';

import { v4 as uuid } from 'uuid';
import moment from 'moment';

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
  IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { fetchItemsFromAPI } from '../actions/items';
// import MoreVertIcon from '@mui/icons-material/MoreVert';

const CurrentCheck = ({ showOrderCats, reload, showPayment }) => {
  console.debug('CurrentCheck');

  const dispatch = useDispatch();
  const history = useHistory();
  const [ showItemNoteForm, setShowItemNoteForm ] = useState(false);
  const [ currItem, setCurrItem ] = useState({});

  // Get current user and check
  const user = useSelector((st) => st.user, shallowEqual);
  const check = useSelector((st) => st.currentCheck, shallowEqual);
  console.debug('CurrentCheck', check);

  const sendAndClear = () => {
    sendOrder(check, user, reload, showOrderCats);
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
    console.debug('saveNote', i, note);
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
  const removeItem = (arr, idx) => {
    console.debug('removeItem', arr, idx);
    dispatch(removeItemFromCheck({ arr, idx }));
    // Refetch items to update count on buttons
    dispatch(fetchItemsFromAPI());
  };

  const renderCurrentCheck = () => {
    return (
      <Container sx={{ padding: '8px', width: 400, marginRight: 0 }}>
        <Box
          px={1}
          py={2}
          sx={{
            height: '80vh',
            width: '100%',
            maxWidth: 350,
            minWidth: 300,
            marginRight: 0,
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

            <Typography>
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

          <List className="CurrentCheck-SentItems" dense={true}>
            {check.items.map((i) => (
              <ListItem key={uuid()}>
                <ListItemText
                  primary={
                    <React.Fragment key={uuid()}>
                      <strong>{i.name}</strong>{' '}
                      <span style={{ float: 'right' }}>${i.price}</span>
                    </React.Fragment>
                  }
                  secondary={
                    <React.Fragment key={uuid()}>
                      {i.mods.length !== 0 && (
                        <List component="span">
                          {i.mods.map((m) => (
                            <ListItem
                              sx={{
                                display: 'inline',
                                marginLeft: '1.3em'
                              }}
                              variant="body2"
                              color="text.secondary"
                              key={uuid()}
                              component="span"
                            >
                              {m.modName}
                              {m.modPrice && (
                                <span style={{ float: 'right' }}>
                                  ${m.modPrice}
                                </span>
                              )}
                              <br />
                            </ListItem>
                          ))}
                          {i.itemNote && (
                            <ListItem
                              sx={{
                                display: 'inline',
                                marginLeft: '1.3em'
                              }}
                              variant="body2"
                              color="text.secondary"
                              key={uuid()}
                              component="span"
                            >
                              <strong>****{i.itemNote}</strong>
                            </ListItem>
                          )}
                        </List>
                      )}
                    </React.Fragment>
                  }
                />
              </ListItem>
            ))}
          </List>
          {check.newItems.length !== 0 && <Divider>New Items</Divider>}

          <List className="CurrentCheck-NewItems" dense={true}>
            {check.newItems.map((i, idx, arr) => (
              <React.Fragment key={uuid()}>
                <ListItem key={uuid()} alignItems="flex-start">
                  <IconButton key={uuid()} onClick={() => removeItem(arr, idx)}>
                    <DeleteIcon />
                  </IconButton>
                  <ListItemText
                    onClick={() => addNote(arr, idx)}
                    primary={
                      <React.Fragment>
                        <strong>{i.name}</strong>{' '}
                        <span style={{ float: 'right' }}>${i.price}</span>
                      </React.Fragment>
                    }
                    secondary={
                      <React.Fragment key={uuid()}>
                        {(i.mods.length !== 0 || i.itemNote) && (
                          <List component="span">
                            {i.mods.map((m) => (
                              <ListItem
                                sx={{
                                  display: 'inline',
                                  marginLeft: '1.3em'
                                }}
                                variant="body2"
                                color="text.secondary"
                                key={uuid()}
                                component="span"
                              >
                                {m.modName}
                                {m.modPrice && (
                                  <span style={{ float: 'right' }}>
                                    ${m.modPrice}
                                  </span>
                                )}
                                <br />
                              </ListItem>
                            ))}
                            {i.itemNote && (
                              <ListItem
                                sx={{
                                  display: 'inline',
                                  marginLeft: '1.3em'
                                }}
                                variant="body2"
                                color="text.secondary"
                                key={uuid()}
                              >
                                <strong>****{i.itemNote}</strong>
                              </ListItem>
                            )}
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
              <Button onClick={sendAndClear} variant="contained">
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
