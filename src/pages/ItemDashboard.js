import { Container, Paper, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

import EditItemForm from '../components/EditItemForm';
import ItemSearchForm from '../components/ItemSearchForm';

const ItemDashboard = () => {
  console.debug('ItemDashboard');

  const items = useSelector((st) => st.items);

  const editItem = () => {
    console.debug('editItem');
  };

  return (
    <React.Fragment>
      <Typography variant="h3" align="center">
        Item Dashboard
      </Typography>
      <EditItemForm item={items[1]} />
      <Container maxWidth="md">
        <Paper sx={{ marginTop: '24px', padding: '24px' }}>
          <ItemSearchForm updateCount={editItem} />
        </Paper>
      </Container>
    </React.Fragment>
  );
};

export default ItemDashboard;
