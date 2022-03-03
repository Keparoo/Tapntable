import {
  Paper,
  Container,
  TextField,
  Button,
  Stack,
  Alert,
  Box
} from '@mui/material';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
// import Alert from '../common/Alert';
// import TapntableApi from '../api/api';

/* Render UserLogin form

    Call the parent (POST) or cancel click
*/

const UserLoginForm = ({ login }) => {
  console.debug('UserLoginForm');

  const [ form, setForm ] = useState({});
  const [ usernameFormError, setUsernameFormError ] = useState(false);
  const [ passwordFormError, setPasswordFormError ] = useState(false);
  const [ formErrors, setFormErrors ] = useState([]);
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
      setFormErrors(result.errors);
      setForm({ username: '', password: '' });
    }
  };

  const cancel = () => {
    history.push('/pin');
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: '12em' }}>
      <Paper
        sx={{ padding: 8 }}
        component="form"
        noValidate
        align="center"
        autoComplete="on"
        onSubmit={handleSubmit}
        elevation={3}
      >
        <Box>
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
            sx={{ marginRight: '4px' }}
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
        </Box>
        <Stack direction="row" sx={{ margin: 2 }} justifyContent="center">
          <Button onClick={handleSubmit} variant="contained">
            Login
          </Button>
          <Button onClick={cancel}>Cancel</Button>
        </Stack>

        <Stack sx={{ width: '100%' }} spacing={2}>
          {formErrors.length !== 0 &&
            formErrors.map((error) => <Alert severity="error">{error}</Alert>)}
        </Stack>
      </Paper>
    </Container>
  );
};

export default UserLoginForm;
