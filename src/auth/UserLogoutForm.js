import React from 'react';
import { Button, Stack } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UserLogoutForm = ({ logout }) => {
  const user = useSelector((st) => st.user);
  const history = useHistory();

  if (!user.pin) history.push('/');

  const cancel = () => {
    console.debug('Cancel User Logout');
    history.push('/');
  };

  return (
    <Stack direction="row" spacing={2} mt={24} justifyContent="center">
      <Button onClick={logout} variant="contained">
        Logout User Are You Sure???
      </Button>
      <Button onClick={cancel} variant="contained">
        Cancel
      </Button>
    </Stack>
  );
};

export default UserLogoutForm;
