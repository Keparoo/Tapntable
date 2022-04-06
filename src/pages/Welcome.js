import {
  Typography,
  Button,
  Container,
  Stack,
  Paper,
  List,
  ListItem
} from '@mui/material';
import React from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { clearUserPin } from '../actions/user';
import { isClockInOnly } from '../utils/helpers';
import restaurantConfig from '../restaurantConfig.json';
import { Box } from '@mui/system';

const Welcome = () => {
  const user = useSelector((state) => state.user, shallowEqual);
  const items = useSelector((state) => state.items, shallowEqual);
  const dispatch = useDispatch();
  const history = useHistory();

  const items86 = items.filter((i) => i.count === 0);
  const itemsWithCount = items.filter((i) => i.count > 0);
  console.log('86 List', items86, itemsWithCount);

  const handleClick = () => {
    if (isClockInOnly(user.role)) {
      console.log('Welcome - Log in only');
      dispatch(clearUserPin());
      history.push('/');
    } else {
      history.push('/servers');
    }
  };

  return (
    <div>
      <Container maxWidth="md">
        <Paper sx={{ padding: '24px', marginTop: '30vh' }}>
          <Typography variant="h6" align="center">
            Welcome {user.displayName} to {restaurantConfig.restaurant.name}.<br />
            Have a great shift!
          </Typography>
          <br />
          {itemsWithCount.length !== 0 && (
            <Typography variant="h4" align="center">
              86 List
            </Typography>
          )}
          {items86.length !== 0 &&
            items86.map((i) => (
              <Box
                sx={{
                  width: '300px',
                  marginLeft: '300px'
                }}
              >
                <List>
                  <ListItem key={i.id}>{i.name}</ListItem>
                </List>
              </Box>
            ))}
          {itemsWithCount.length !== 0 && (
            <Typography variant="h4" align="center">
              Items with Count
            </Typography>
          )}
          {itemsWithCount.length !== 0 &&
            itemsWithCount.map((i) => (
              <Box
                sx={{
                  width: '300px',
                  marginLeft: '300px'
                }}
              >
                <List>
                  <ListItem key={i.id}>
                    {i.name}&#8212;<strong>{i.count}</strong>
                  </ListItem>
                </List>
              </Box>
            ))}
          <br />
          <Stack>
            <Button variant="contained" onClick={handleClick}>
              Ok
            </Button>
          </Stack>
        </Paper>
      </Container>
    </div>
  );
};

export default Welcome;
