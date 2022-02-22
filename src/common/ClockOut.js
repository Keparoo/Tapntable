import React from 'react';
import { Typography, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { clockOutUser, clearUserPin } from '../actions/user';

const LogoutPage = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const clockOut = () => {
    console.debug('clockOut');

    dispatch(clockOutUser(user.id));
    dispatch(clearUserPin());
    history.push('/');
  };

  const cancel = () => {
    console.debug('Cancel Clock Out');
    history.push('/');
  };

  return (
    <div>
      <Typography variant="h3" align="center">
        Tapntable
      </Typography>
      <Button onClick={clockOut} variant="contained" align="center">
        Clock Out
      </Button>
      <Button onClick={cancel} variant="contained" align="center">
        Cancel
      </Button>
    </div>
  );
};

export default LogoutPage;
