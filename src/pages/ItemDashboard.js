import { Container, Grid, Paper, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import EditItemForm from '../components/EditItemForm';
import ItemSearchForm from '../components/ItemSearchForm';
import DashboardFunctions from '../components/DashboardFunctions';

const ItemDashboard = () => {
  console.debug('ItemDashboard');

  const items = useSelector((st) => st.items);
  const [ currentItem, setCurrentItem ] = useState({});
  const [ showEditForm, setShowEditForm ] = useState(false);

  const editItem = (item) => {
    console.debug('editItem', item);
    setCurrentItem(item);
    setShowEditForm(true);
  };

  // const updateCount = (item) => {
  //   console.debug('updateCount', item);

  //   dispatch(fetchItemsFromAPI());
  //   setCurrentItem(item);
  //   setShowUpdateItemCount(true);
  // };

  return (
    <Grid container>
      <Grid item xs={11}>
        <Typography variant="h3" align="center">
          Item Dashboard
        </Typography>
        {showEditForm && <EditItemForm item={currentItem} />}
        <Container maxWidth="md">
          <Paper sx={{ marginTop: '24px', padding: '24px' }}>
            <ItemSearchForm
              updateItem={editItem}
              message="Tap an item to edit"
            />
          </Paper>
        </Container>
      </Grid>
      <Grid item xs={1}>
        <DashboardFunctions />
      </Grid>
    </Grid>
  );
};

export default ItemDashboard;
