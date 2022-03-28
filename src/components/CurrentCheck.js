import React, { useState } from 'react';

// Redux
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import {
  clearCurrentCheck,
  clearNewItems,
  fireCourse2InApi,
  fireCourse3InApi,
  printCheckToAPI,
  removeItemFromCheck
} from '../actions/currentCheck';
import { fetchItemsFromAPI } from '../actions/items';

// Utilities
import sendOrder from '../utils/sendOrder';

// External Packages
import { v4 as uuid } from 'uuid';
import moment from 'moment';

// Material UI
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

// React Components
import ItemNoteForm from './ItemNoteForm';
import ModalAlert from './ModalAlert';
import SentItems from './SentItems';

/**
 * This component renders the current check and handles related functions
 * 
 * Component called by Servers
 * 
 * Component calls ItemNoteForm, ModalAlert, SentItems
 *  
 * This component displays:
 *  items & mods already sent, separated by course,
 *  new items & mods as they are added
 *  Sent items may be fired by clicking on an item in the order
 *    ModalAlert will confirm the firing
 *  Items and mods are totaled, tax calculated and the result is displayed
 * 
 * A bank of buttons to Send Order, Cancel adding items, Print Check and Pay
 *   are displayed under the check
 * 
 * Servers passes 3 arguments:
 *  showOrderCats: boolean
 *  reload: function: reload(true) will reload the /servers page
 *  showPayment: boolean
 */

const CurrentCheck = ({ showOrderCats, reload, showPayment }) => {
  console.debug('CurrentCheck', showOrderCats, showPayment);

  const dispatch = useDispatch();
  const [ showItemNoteForm, setShowItemNoteForm ] = useState(false);
  const [ currItem, setCurrItem ] = useState({});
  const [ showFireCourse, setShowFireCourse ] = useState(false);
  const [ courseToFire, setCourseToFire ] = useState({});

  // Get current user and check
  const user = useSelector((st) => st.user, shallowEqual);
  const check = useSelector((st) => st.currentCheck);
  console.debug('CurrentCheck', check);

  // Send newItems to API, exit current check
  const sendAndClear = () => {
    sendOrder(check, user, reload, showOrderCats);
    // Clear new items to prevent check clear from increasing count
    dispatch(clearNewItems());
    // Clear current check
    dispatch(clearCurrentCheck());
    // Return to server page (show open checks)
    reload(true);
    showOrderCats(false);
  };

  // Exit current check and view current user's open checks
  const cancel = () => {
    dispatch(clearCurrentCheck());
    showOrderCats(false);
    showPayment(false);
  };

  // Display Payment Component
  const pay = () => {
    showOrderCats(false);
    showPayment(true);
  };

  // Calculate and Print Check
  const printCheck = () => {
    dispatch(
      printCheckToAPI(
        check.id,
        check.subtotal,
        check.localTax,
        check.stateTax,
        check.federalTax
      )
    );

    dispatch(clearCurrentCheck());
    reload(true);
    showOrderCats(false);
    // Insert logic to print at local printer when available
  };

  // Show form to add item note
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

  // Cancel adding item note: Hide form
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

  // Display modal asking to confirm firing course, set course & orderId to fire
  const fireCourse = (arr, idx) => {
    console.debug(
      `Fire Course order: ${arr[idx].orderId}, course: ${arr[idx].courseNum}`
    );
    setCourseToFire({ orderId: arr[idx].orderId, course: arr[idx].courseNum });
    // Render modal asking Fire Course
    setShowFireCourse(true);
  };

  // Send fire to API and redux store
  const confirmFire = () => {
    console.debug('confirmFire');

    if (courseToFire.course === 2) {
      dispatch(fireCourse2InApi(courseToFire.orderId, check));
      console.log('The course 2 items are', check.course2Items);
    }

    if (courseToFire.course === 3) {
      dispatch(fireCourse3InApi(courseToFire.orderId, check));
      console.log('The course 3 items are', check.course3Items);
    }

    setShowFireCourse(false);
  };

  // Cancel firing of course
  const cancelFire = () => {
    console.debug('cancelFire');
    setShowFireCourse(false);
    setCourseToFire({});
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

          {check.items.length !== 0 && <Divider>Sent Items, Course 1</Divider>}

          <SentItems items={check.course1Items} fireCourse={fireCourse} />

          {check.course2Items && (
            <React.Fragment>
              {check.course2Items.length !== 0 && (
                <Divider>Sent Items, Course 2</Divider>
              )}

              <SentItems items={check.course2Items} fireCourse={fireCourse} />
            </React.Fragment>
          )}

          {check.course3Items && (
            <React.Fragment>
              {check.course3Items.length !== 0 && (
                <Divider>Sent Items, Course 3</Divider>
              )}

              <SentItems items={check.course3Items} fireCourse={fireCourse} />
            </React.Fragment>
          )}

          {check.newItems.length !== 0 && <Divider>New Items</Divider>}

          <List
            className="CurrentCheck-NewItems"
            dense={true}
            disablePadding={true}
          >
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
                        <br />
                        <span>
                          Course: {i.courseNum}{' '}
                          {i.seatNum && <span>, Seat:{i.seatNum}</span>}
                        </span>
                      </React.Fragment>
                    }
                    secondary={
                      <React.Fragment key={uuid()}>
                        {(i.mods.length !== 0 || i.itemNote) && (
                          <List
                            component="span"
                            dense={true}
                            disablePadding={true}
                          >
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

        {showFireCourse && (
          <ModalAlert
            type="success"
            title={`Fire Course ${courseToFire.course}`}
            message="Are you sure?"
            agreeButton={`Fire Course ${courseToFire.course}`}
            disagreeButton="Cancel"
            agree={confirmFire}
            disagree={cancelFire}
          />
        )}
      </Container>
    );
  };

  return renderCurrentCheck();
};

export default CurrentCheck;
