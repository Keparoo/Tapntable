import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { fetchUserFromAPI } from '../actions/user';
import { Typography, Link, Button } from '@mui/material';
import UserPinForm from '../auth/UserPinForm';

const Homepage = () => {
  const user = useSelector((st) => st.user);
  const dispatch = useDispatch();

  const [ showUserPinForm, setShowUserPinForm ] = useState(true);

  const login = ({ pin }) => {
    console.log('login', pin);

    setShowUserPinForm(false);
    dispatch(fetchUserFromAPI(pin));
  };

  const cancel = () => {
    console.log('cancel');

    setShowUserPinForm(false);
  };

  if (!user.id) {
    return (
      <div>
        <Typography variant="h3" align="center">
          Tapntable
        </Typography>
        <Typography variant="h3" align="center">
          Please Log in
        </Typography>
        <UserPinForm login={login} cancel={cancel} />
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
