import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useSelector } from 'react-redux';
import { Typography, Container } from '@mui/material';

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
  const time = check.createdAt ? check.createdAt.toString() : 'none';
  // const hour =
  //   check.createdAt.getHours() > 12
  //     ? check.createdAt.getHours() - 12
  //     : check.createdAt.getHours();

  return (
    <Container>
      <div style={{ background: 'lightgray', height: '80vh' }}>
        <Typography variant="h5" align="center">
          Current Check
        </Typography>

        <Typography variant="p">
          Subtotal: <strong>${check.subtotal}</strong> ----- Created At:
          {hours && (
            <span>
              {hours}:{minutes}
            </span>
          )}
        </Typography>

        {check.items.map((i) => (
          <p key={uuid()}>
            <strong>{i.name}</strong> ${i.price}
          </p>
        ))}
      </div>
    </Container>
  );
};

export default CurrentCheck;
