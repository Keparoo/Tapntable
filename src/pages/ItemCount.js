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

const ItemCount = () => {
  console.debug('ItemCount');

  const items = useSelector((st) => st.items.filter((i) => i.count));

  const updateCount = (item) => {
    console.debug('updateCount', item);
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
          <List>
            {items.map((i) => (
              <ListItem key={i.id} sx={{ cursor: 'pointer' }}>
                <ListItemText
                  onClick={() => updateCount(i)}
                  primary={
                    <React.Fragment>
                      {i.name}
                      {i.count && (
                        <span>
                          :<strong> {i.count}</strong>
                          <Button variant="outlined" sx={{ float: 'right' }}>
                            Clear Count
                          </Button>
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
          <ItemSearchForm />
        </Paper>
      </Container>
    </React.Fragment>
  );
};

export default ItemCount;
