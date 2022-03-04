import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { getDayTotalsFromAPI } from '../actions/totals';
import TapntableApi from '../api/api';
import moment from 'moment';
import { CLOSE_DAY, OPEN_DAY } from '../constants';
import {
  Button,
  Container,
  Stack,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper
} from '@mui/material';

const CloseDay = () => {
  console.debug('CloseDay');

  const [ isLoading, setIsLoading ] = useState(true);
  const totals = useSelector((st) => st.totals, shallowEqual);
  const user = useSelector((st) => st.user, shallowEqual);
  const dispatch = useDispatch();

  useEffect(
    () => {
      console.debug('ItemList useEffect on Mount');

      async function fetchTotals() {
        await dispatch(getDayTotalsFromAPI());

        setIsLoading(false);
      }
      if (isLoading) {
        fetchTotals();
      }
    },
    [ dispatch, isLoading ]
  );

  // Check for open checks
  // Check for open payments
  // Get all payments from day
  // Calculate totals
  // Display totals
  console.log('Day Open: ', totals.dayOpen);

  const closeDay = async () => {
    await TapntableApi.logEvent(user.id, CLOSE_DAY);
  };

  const openDay = async () => {
    await TapntableApi.logEvent(user.id, OPEN_DAY);
  };

  // closeDay();
  // openDay();

  console.log(totals);

  return (
    <Container>
      <div>
        <Typography variant="h3" align="center">
          Close Day!
        </Typography>
        <p>
          Day Opened:{' '}
          {totals.dayOpen && (
            <span>{moment(totals.dayOpen).format('MM-DD-YYYY, h:mm a')}</span>
          )}
        </p>
        <Typography variant="h4">Checks</Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 640 }} aria-label="Checks Table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Server</TableCell>
                <TableCell align="right">Guests</TableCell>
                <TableCell align="right">Created</TableCell>
                <TableCell align="right">Closed</TableCell>
                <TableCell align="right">Subtotal</TableCell>
                <TableCell align="right">Tax</TableCell>
                <TableCell align="right">Total</TableCell>
                <TableCell align="right">Void</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {totals.checks &&
                totals.checks.map((c) => (
                  <TableRow
                    key={c.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>{c.id}</TableCell>
                    <TableCell>{c.employee}</TableCell>
                    <TableCell align="right">{c.numGuests}</TableCell>
                    <TableCell align="right">
                      {moment(c.createdAt).format('h:mm a')}
                    </TableCell>
                    <TableCell align="right">
                      {moment(c.closedAt).format('h:mm a')}
                    </TableCell>
                    <TableCell align="right">${c.subtotal}</TableCell>
                    <TableCell align="right">${c.stateTax}</TableCell>
                    <TableCell align="right">
                      ${+c.subtotal + +c.stateTax}
                    </TableCell>
                    <TableCell align="right">
                      {c.isVoid ? 'true' : 'false'}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant="h4">Payments</Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 640 }} aria-label="Checks Table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell align="right">Check Id</TableCell>
                <TableCell align="right">Type</TableCell>
                <TableCell align="right">Subtotal</TableCell>
                <TableCell align="right">Tip</TableCell>
                <TableCell align="right">Void</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {totals.payments &&
                totals.payments.map((p) => (
                  <TableRow
                    key={p.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>{p.id}</TableCell>
                    <TableCell align="right">{p.checkId}</TableCell>
                    <TableCell align="right">{p.type}</TableCell>
                    <TableCell align="right">${p.subtotal}</TableCell>
                    <TableCell align="right">${p.tipAmt}</TableCell>
                    <TableCell align="right">
                      {p.isVoid ? 'true' : 'false'}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant="h4">Ordered Items</Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 640 }} aria-label="Checks Table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell align="right">Item</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Check Id</TableCell>
                <TableCell align="right">Created</TableCell>
                <TableCell align="right">Note</TableCell>
                <TableCell align="right">Void</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {totals.items &&
                totals.items.map((i) => (
                  <TableRow
                    key={i.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>{i.id}</TableCell>
                    <TableCell align="right">{i.name}</TableCell>
                    <TableCell align="right">${i.price}</TableCell>
                    <TableCell align="right">{i.checkId}</TableCell>
                    <TableCell align="right">
                      {moment(i.sentAt).format('h:mm a')}
                    </TableCell>
                    <TableCell align="right">
                      {i.isVoid ? 'true' : 'false'}
                    </TableCell>
                    <TableCell align="right">
                      {i.isVoid ? 'true' : 'false'}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant="h4">User Logs</Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 640 }} aria-label="Checks Table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell align="right">Display</TableCell>
                <TableCell align="right">First</TableCell>
                <TableCell align="right">Last</TableCell>
                <TableCell align="right">Role</TableCell>
                <TableCell align="right">Event</TableCell>
                <TableCell align="right">Created</TableCell>
                <TableCell align="right">Tips</TableCell>
                <TableCell align="right">Entity Id</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {totals.userData &&
                totals.userData.map((u) => (
                  <TableRow
                    key={u.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>{u.id}</TableCell>
                    <TableCell align="right">{u.displayName}</TableCell>
                    <TableCell align="right">{u.firstName}</TableCell>
                    <TableCell align="right">{u.lastName}</TableCell>
                    <TableCell align="right">{u.role}</TableCell>
                    <TableCell align="right">{u.event}</TableCell>
                    <TableCell align="right">
                      {moment(u.createdAt).format('h:mm a')}
                    </TableCell>
                    <TableCell align="right">${u.declaredTips}</TableCell>
                    <TableCell align="right">{u.entityId}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Stack direction="row" justifyContent="center">
        <Button onClick={closeDay}>Close Day</Button>
        <Button onClick={openDay}>Open Day</Button>
      </Stack>
    </Container>
  );
};

export default CloseDay;
