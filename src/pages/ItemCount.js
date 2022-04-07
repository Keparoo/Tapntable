import React, { useState, memo, useCallback } from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchItemsFromAPI } from '../actions/items';

// Material UI
import {
  Container,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography
} from '@mui/material';

// Utilities
import TapntableApi from '../api/api';

// React Components
import ItemSearchForm from '../components/ItemSearchForm';
import UpdateItemCount from '../components/UpdateItemCount';

const ItemCount = () => {
  console.debug('ItemCount');

  const items = useSelector((st) => st.items);
  const [ showUpdateItemCount, setShowUpdateItemCount ] = useState(false);
  const [ currentItem, setCurrentItem ] = useState({});
  const dispatch = useDispatch();

  const clearCount = async (item) => {
    console.debug('clearCount', item);

    setShowUpdateItemCount(false);

    const returnedCount = await TapntableApi.setCount(item.id, null);
    console.debug('New Item Count', returnedCount);
    dispatch(fetchItemsFromAPI());
  };

  const updateCount = (item) => {
    console.debug('updateCount', item);

    dispatch(fetchItemsFromAPI());
    setCurrentItem(item);
    setShowUpdateItemCount(true);
  };

  const cancel = () => {
    setShowUpdateItemCount(false);
    setCurrentItem({});
  };

  const updateItemCount = async (item, count) => {
    console.debug('updateItemCount', item, count);

    const returnedCount = await TapntableApi.setCount(item.id, count);
    console.debug('New Item Count', returnedCount);
    dispatch(fetchItemsFromAPI());
    setShowUpdateItemCount(false);
  };

  // Display all items with count
  // Input for item to search for
  // checkbox for isActive
  // Display matches
  // Option to make item active/inactive
  // Input for count
  return (
    <React.Fragment>
      <Container maxWidth="xs">
        <Paper elevation={3} sx={{ marginTop: '24px' }}>
          <Typography pt={2} variant="h4" align="center">
            Item Count
          </Typography>
          <Typography variant="body1" align="center">
            Tap item to adjust or clear
          </Typography>
          <List>
            {items.filter((i) => i.count !== null).map((i) => (
              <ListItem
                key={i.id}
                onClick={() => updateCount(i)}
                sx={{ cursor: 'pointer' }}
              >
                <ListItemText
                  primary={
                    <React.Fragment>
                      {i.name}
                      {i.count !== null && (
                        <span>
                          &#8212;<strong>{i.count}</strong>
                        </span>
                      )}
                    </React.Fragment>
                  }
                />
              </ListItem>
            ))}
            <ListItem />
          </List>
        </Paper>
      </Container>
      <Container maxWidth="md">
        <Paper sx={{ marginTop: '24px', padding: '24px' }}>
          <ItemSearchForm updateCount={updateCount} />
        </Paper>
      </Container>
      {showUpdateItemCount && (
        <UpdateItemCount
          item={currentItem}
          disagree={cancel}
          agree={updateItemCount}
          clearCount={clearCount}
        />
      )}
    </React.Fragment>
  );
};

export default ItemCount;
