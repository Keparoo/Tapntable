import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import moment from 'moment';
import TapntableApi from '../api/api';
import {
  Typography,
  Container,
  Card,
  CardActionArea,
  CardContent,
  Button,
  Stack
} from '@mui/material';
import { clearCurrentCheck } from '../actions/currentCheck';
import { TICKET_REFRESH_RATE } from '../constants';
import { useHistory } from 'react-router-dom';

const OrderTickets = ({ destinationId }) => {
  console.debug('OrderTickets', destinationId);

  const user = useSelector((state) => state.user, shallowEqual);
  const dispatch = useDispatch();
  const history = useHistory();
  const [ isLoading, setIsLoading ] = useState(true);
  const [ orders, setOrders ] = useState([]);
  const [ intervalId, setIntervalId ] = useState('');

  if (!user.pin) history.push('/');

  useEffect(
    () => {
      console.debug('OrderTickets useEffect on Mount');

      async function fetchItem() {
        dispatch(clearCurrentCheck());

        let ordersRes = await TapntableApi.getOpenOrders();
        // filter out completed orders
        if (ordersRes !== [])
          ordersRes = ordersRes.filter((o) => !o.completedAt);
        // Get list of ordered items for order
        for (let order of ordersRes) {
          let orderItems = await TapntableApi.getOrderedItemsByOrder(order.id);
          // Filter out items with destination other than destinationId
          orderItems = orderItems.filter(
            (i) => i.destinationId === destinationId
          );
          order.items = orderItems;
          if (orderItems[0]) {
            console.log('++++++++++++++CheckId', orderItems[0].checkId);
            order.checkId = orderItems[0].checkId;
            order.tableNum = orderItems[0].tableNum;
            console.log(
              '+++++++++++++++TableNum, numGuests',
              orderItems[0].tableNum,
              orderItems[0].numGuests
            );
          }
          //Get related mods for item
          for (let item of order.items) {
            const mods = await TapntableApi.getItemMods({ ordItemId: item.id });
            item.mods = mods;
          }
        }

        const filteredOrders = ordersRes.filter((o) => o.items.length !== 0);

        console.log('Order & Items', filteredOrders);
        setOrders(filteredOrders);
        setIsLoading(false);
      }
      if (isLoading) {
        fetchItem();
      }
    },
    [ dispatch, isLoading, destinationId ]
  );

  // Refresh the tickets on screen
  const refreshTickets = () => {
    console.debug('refreshTickets');
    setIsLoading(true);
  };

  // Set the ticket refresh rate to 90 seconds
  if (!intervalId)
    setIntervalId(setInterval(refreshTickets, TICKET_REFRESH_RATE));

  const orderComplete = async (orderId) => {
    console.debug('orderComplete', orderId);
    const complete = await TapntableApi.completeOrder(orderId);
    console.log('Completed order: ', complete);
    setIsLoading(true);
  };

  return (
    <div className="OrderTickets">
      <Container style={{ height: '40vh' }}>
        <Typography variant="h4" align="center">
          Open Orders
        </Typography>

        {orders.map((o) => (
          <Card
            key={o.id}
            onClick={() => orderComplete(o.id)}
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
                  Order Id: {o.id}
                  <span style={{ float: 'right' }}>Check ID: {o.checkId}</span>
                </Typography>
                <Typography variant="h5" component="div" mb={2}>
                  {o.displayName}
                </Typography>

                {o.items.map((i) => (
                  <div key={i.id}>
                    <Typography variant="p">
                      <strong>
                        {i.courseNum}: {i.name}
                      </strong>{' '}
                      <span style={{ float: 'right' }}>Seat: {i.seatNum}</span>
                    </Typography>
                    <br />
                    {i.mods.map((m) => (
                      <Typography key={m.modId}>{m.modName}</Typography>
                    ))}
                    <Typography variant="p">
                      {i.itemNote && <strong>****{i.itemNote}</strong>}
                    </Typography>

                    <p>{i.count}</p>
                    <p>{i.isVoid}</p>
                  </div>
                ))}
                <Typography variant="body2">
                  Sent: {o.sentAt && moment(o.sentAt).format('LT')}
                  <span style={{ float: 'right' }}>Table {o.tableNum}</span>
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Container>
      <Stack justifyContent="center">
        <Button onClick={refreshTickets}>Refresh</Button>
      </Stack>
    </div>
  );
};

export default OrderTickets;
