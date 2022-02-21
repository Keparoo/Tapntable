import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { fetchUserFromAPI } from '../actions/user';
import { Typography, Link, Button } from '@mui/material';
import UserPinForm from '../auth/UserPinForm';

const Homepage = () => {
  const user = useSelector((st) => st.user);
  const dispatch = useDispatch();

  // const [ showUserPinForm, setShowUserPinForm ] = useState(true);

  const login = ({ pin }) => {
    console.log('login', pin);

    dispatch(fetchUserFromAPI(pin));

    if (('trainee', 'employee', 'cook', 'host', 'chef').includes(user.role)) {
    }
    console.log('Punch in only');
    // punch in
    // clear user pin
  };

  if (
    ('server',
    'bartender',
    'head-server',
    'bar-manager',
    'manager',
    'owner').includes(user.role)
  ) {
    console.log('Punch in and go to orders');
    // punch in
    // open to orders
  }

  if (!user.id) {
    return (
      <div>
        <Typography variant="h3" align="center">
          Tapntable
        </Typography>
        <Typography variant="h3" align="center">
          Please Log in
        </Typography>
        <UserPinForm login={login} />
      </div>
    );
  }

  return (
    <div>
      <Typography variant="h3" align="center">
        Tapntable
      </Typography>

      <Typography variant="h4" align="center">
        <Button variant="contained" component={RouterLink} to="/server">
          Server Page
        </Button>
      </Typography>
    </div>
  );
};

export default Homepage;
