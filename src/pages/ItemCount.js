import React, { useState, memo, useCallback } from 'react';
import {
  Container,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography
} from '@mui/material';
import { useSelector } from 'react-redux';

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
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ marginTop: '24px' }}>
        <Typography variant="h3" align="center">
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
  );
};

export default ItemCount;
