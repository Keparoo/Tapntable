import React, { useState, memo, useCallback } from 'react';
import {
  Button,
  Container,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography
} from '@mui/material';
import { useSelector } from 'react-redux';
import ItemSearchForm from '../components/ItemSearchForm';
import UpdateItemCount from '../components/UpdateItemCount';
import TapntableApi from '../api/api';

const ItemCount = () => {
  console.debug('ItemCount');

  const items = useSelector((st) => st.items.filter((i) => i.count));
  const [ showUpdateItemCount, setShowUpdateItemCount ] = useState(false);
  const [ currentItem, setCurrentItem ] = useState({});

  const clearCount = (item) => {
    console.debug('clearCount', item);
    setShowUpdateItemCount(false);

    const returnedCount = TapntableApi.setCount(item.id, null);
    console.debug('New Item Count', returnedCount);
  };

  const updateCount = (item) => {
    console.debug('updateCount', item);
    setCurrentItem(item);
    setShowUpdateItemCount(true);
  };

  const cancel = () => {
    setShowUpdateItemCount(false);
    setCurrentItem({});
  };

  const updateItemCount = async (item, count) => {
    console.debug('updateItemCount', item, count);

    const returnedCount = TapntableApi.setCount(item.id, count);
    console.debug('New Item Count', returnedCount);

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
          <Typography variant="h4" align="center">
            Item Count
          </Typography>
          <Typography variant="body1" align="center">
            Tap item to adjust or clear
          </Typography>
          <List>
            {items.map((i) => (
              <ListItem
                key={i.id}
                onClick={() => updateCount(i)}
                sx={{ cursor: 'pointer' }}
              >
                <ListItemText
                  primary={
                    <React.Fragment>
                      {i.name}
                      {i.count && (
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
