import { Typography, Button, Container, Stack, Paper } from '@mui/material';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { clearUserPin } from '../actions/user';
import { isClockInOnly } from '../utils/helpers';
import restaurantConfig from '../restaurantConfig.json';

const Welcome = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

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
