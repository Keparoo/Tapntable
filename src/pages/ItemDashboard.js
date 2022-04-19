import { Container, Grid, Paper, Typography } from '@mui/material';
import React, { useState } from 'react';
// import { useSelector } from 'react-redux';

import EditItemForm from '../components/EditItemForm';
import NewItemForm from '../components/NewItemForm';
import ItemSearchForm from '../components/ItemSearchForm';
import DashboardFunctions from '../components/DashboardFunctions';

/**
 * 
 * A page with components for mainting items and mods in db
 * Components:
 *  Item Search Form
 *  New Item
 *  Edit Item
 *  New Item Category
 *  Edit Item Category
 * 
 *  Mod Search Form
 *  New Mod
 *  Edit Mod
 *  New Mod Category
 *  Edit Mod Category
 *  New Mod Group
 *  Edit Mod Group
 *  
 */

const ItemDashboard = () => {
  console.debug('ItemDashboard');

  const [ currentItem, setCurrentItem ] = useState({});
  const [ showEditForm, setShowEditForm ] = useState(false);
  const [ showNewItemForm, setShowNewItemForm ] = useState(false);

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
    <React.Fragment>
      <Typography variant="h4" align="center">
        Item Dashboard
      </Typography>
      <Grid container>
        <Grid item xs={5}>
          {showNewItemForm && <NewItemForm />}
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
        <Grid item xs={5}>
          <Container maxWidth="md">
            <Paper sx={{ marginTop: '24px', padding: '24px' }}>
              <ItemSearchForm
                updateItem={editItem}
                message="Tap an item to edit"
              />
            </Paper>
          </Container>
        </Grid>
        <Grid item xs={2}>
          <DashboardFunctions showNewItem={setShowNewItemForm} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default ItemDashboard;
