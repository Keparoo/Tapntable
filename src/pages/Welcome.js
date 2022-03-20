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
          <Typography variant="h4" align="center">
            86 List
          </Typography>
          {items86.length &&
            items86.map((i) => (
              <Box
                sx={{
                  width: '300px',
                  marginLeft: '300px'
                }}
              >
                <List>
                  <ListItem>{i.name}</ListItem>
                </List>
              </Box>
            ))}
          <Typography variant="h4" align="center">
            Items with Count
          </Typography>
          {itemsWithCount.length &&
            itemsWithCount.map((i) => (
              <Box
                sx={{
                  width: '300px',
                  marginLeft: '300px'
                }}
              >
                <List>
                  <ListItem>
                    {i.name} {i.count}
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
