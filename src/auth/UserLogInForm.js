import { Paper, Container, TextField, Button } from '@mui/material';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
// import TapntableApi from '../api/api';

/* Render UserLogin form

    Call the parent (POST) or cancel click
*/

const UserLoginForm = ({ login }) => {
  console.debug('UserLoginForm');

  const [ form, setForm ] = useState({});
  const [ usernameFormError, setUsernameFormError ] = useState(false);
  const [ passwordFormError, setPasswordFormError ] = useState(false);
  const history = useHistory();

  // Handle changes in the form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  // Handle submit: call parent function login
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.debug('Form data: ', form);

    let result = await login(form);
    console.debug(result);

    if (result.success) {
      console.debug(result);
      setUsernameFormError(false);
      setPasswordFormError(false);
      setForm({ username: '', password: '' });
      history.push('/');
    } else {
      console.log('Here is the error:', result.error);
      setUsernameFormError(true);
      setPasswordFormError(true);
      setForm({ username: '', password: '' });
    }
  };

  const cancel = () => {
    history.push('/pin');
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: '12em' }}>
      <Paper
        sx={{
          '& > :not(style)': { m: 2, width: '25ch', mt: 4 }
        }}
        component="form"
        noValidate
        align="center"
        autoComplete="on"
        onSubmit={handleSubmit}
      >
        <TextField
          type="text"
          id="username"
          name="username"
          label="Username"
          variant="outlined"
          autoFocus={true}
          required={true}
          helperText="Please enter a valid username"
          value={form.username}
          onChange={handleChange}
          error={usernameFormError}
        />
        <TextField
          type="password"
          id="password"
          name="password"
          label="Password"
          variant="outlined"
          required={true}
          helperText="Please enter a valid password"
          value={form.password}
          onChange={handleChange}
          error={passwordFormError}
          onSubmit={handleSubmit}
        />
        <Button onClick={handleSubmit} variant="contained">
          Login
        </Button>
        <Button onClick={cancel}>Cancel</Button>
      </Paper>
    </Container>
  );
};

export default UserLoginForm;
