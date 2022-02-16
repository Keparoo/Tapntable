import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useSelector } from 'react-redux';
import { Typography, Container, Button } from '@mui/material';

const CurrentCheck = () => {
  console.debug('CurrentCheck');

  const check = useSelector((st) => st.newCheck);
  console.log('Check items', check.items, check.createdAt);

  let hours;
  let minutes;
  if (check.createdAt) {
    hours =
      check.createdAt.getHours() > 12
        ? check.createdAt.getHours() - 12
        : check.createdAt.getHours();
    minutes = check.createdAt.getMinutes();
  }

  const sendOrder = () => {
    // Create ordered_items objects for each item
    // Write them to db
    // Go to server main screen
  };

  return (
    <Container>
      <div style={{ background: 'lightgray', height: '80vh' }}>
        <Typography variant="h5" align="center">
          Current Check
        </Typography>

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
              Subtotal: <strong>${check.subtotal.toFixed(2)}</strong> -----
              Created At:
            </span>
          )}
          {hours && (
            <span>
              {hours}:{minutes}
            </span>
          )}
        </Typography>
        <br />
        <Button onClick={sendOrder} variant="contained">
          Send Order
        </Button>
      </div>
    </Container>
  );
};

export default CurrentCheck;
