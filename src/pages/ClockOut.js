import React from 'react';
import { Button, Stack } from '@mui/material';
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
    <Stack direction="row" spacing={2} mt={24} justifyContent="center">
      <Button onClick={clockOut} variant="contained">
        Clock Out
      </Button>
      <Button onClick={cancel} variant="contained">
        Cancel
      </Button>
    </Stack>
  );
};

export default LogoutPage;
