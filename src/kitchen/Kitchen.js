import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import TapntableApi from '../api/api';
import {
  Typography,
  Container,
  Card,
  CardActionArea,
  CardContent
} from '@mui/material';
import { clearCurrentCheck } from '../actions/currentCheck';
import { TICKET_REFRESH_RATE } from '../constants';

const Kitchen = () => {
  console.debug('Kitchen');

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [ isLoading, setIsLoading ] = useState(true);
  const [ orders, setOrders ] = useState([]);
  const [ intervalId, setIntervalId ] = useState('');

  useEffect(
    () => {
      console.debug('Kitchen useEffect on Mount');

      async function fetchItem() {
        dispatch(clearCurrentCheck());

        let ordersRes = await TapntableApi.getOpenOrders();
        // filter out completed orders
        if (ordersRes !== [])
          ordersRes = ordersRes.filter((o) => !o.completedAt);
        // Get list of ordered items for order
        for (let order of ordersRes) {
          let orderItems = await TapntableApi.getOrderedItemsByOrder(order.id);
          // Filter out items with destination other than kitchen-hot
          orderItems = orderItems.filter((i) => i.destinationId === 1);
          order.items = orderItems;
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
    [ dispatch, isLoading ]
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
    <div className="Kitchen">
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
                  OrderId: {o.id}
                  <span style={{ float: 'right' }}>Check ID: </span>
                </Typography>
                <Typography variant="h5" component="div">
                  {o.displayName}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Add Table number here
                </Typography>
                {o.items.map((i) => (
                  <div key={i.id}>
                    <Typography variant="p">
                      <strong>{i.name}</strong> Seat: {i.seatNum}
                    </Typography>
                    <br />
                    <Typography variant="p">
                      {i.itemNote && <strong>****{i.itemNote}</strong>}
                    </Typography>

                    <p>Dest:{i.destinationId}</p>
                    <p>{i.count}</p>
                    <p>{i.isVoid}</p>
                  </div>
                ))}
                <Typography variant="body2">
                  Sent: {o.sentAt && moment(o.sentAt).format('LT')}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Container>
    </div>
  );
};

export default Kitchen;
