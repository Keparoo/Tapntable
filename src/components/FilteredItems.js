import React from 'react';

import {
  Container,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography
} from '@mui/material';

/*  Render a list of the passed in items in a scrolling container
 *  Passed in message renders as a title above the list
 *  When an item in the list is clicked, passed in click function fires
 *   
*/

const FilteredItems = ({ items, click, message }) => {
  console.debug('ItemList', message);

  if (items.length === 0)
    return (
      <Container>
        <Paper elevation={3}>
          <Typography align="center" ml={2} mt={2} variant="h4" component="h1">
            No matching items
          </Typography>
        </Paper>
      </Container>
    );

  return (
    <Container>
      <Paper elevation={3} sx={{ height: '45vh', overflow: 'auto' }}>
        <Typography
          align="center"
          ml={2}
          mt={2}
          pt={2}
          variant="h4"
          component="h1"
        >
          {message}
        </Typography>
        <List>
          {items.map((i) => (
            <ListItem
              key={i.id}
              onClick={() => click(i)}
              sx={{ cursor: 'pointer' }}
            >
              <ListItemText
                primary={
                  <React.Fragment>
                    <strong>{i.name}</strong>,{' '}
                    <span style={{ color: 'gray' }}>Id: {i.id}</span>
                  </React.Fragment>
                }
                secondary={
                  <React.Fragment>
                    <strong>${i.price}</strong>, Category:{' '}
                    <strong>{i.category}</strong>, Destination:{' '}
                    <strong>{i.destination}</strong> Count:{' '}
                    <strong>{i.count || 'None'}</strong> isActive:{' '}
                    <strong>{i.isActive ? 'true' : 'false'}</strong> <br />
                    {i.description}
                  </React.Fragment>
                }
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default FilteredItems;
