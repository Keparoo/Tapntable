import React from 'react';
import { useSelector } from 'react-redux';
import { Typography, Container } from '@mui/material';

const CurrentCheck = () => {
  const items = useSelector((st) => st.currentCheck);
  console.log('Check items', items.items);

  return (
    <Container>
      <div style={{ background: 'lightgray', height: '80vh' }}>
        <Typography variant="h5" align="center">
          Current Check
        </Typography>
        {items.items.map((i) => (
          <p key={i.id}>
            {i.name} {i.price}
          </p>
        ))}
      </div>
    </Container>
  );
};

export default CurrentCheck;
