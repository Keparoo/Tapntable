import React, { useState, memo, useCallback } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Stack
} from '@mui/material';

const ModGroup = ({ group, close }) => {
  console.debug('ModGroup', group);

  const mods = useSelector((st) => st.mods.mods, shallowEqual);
  console.debug('Mod groups', mods);
  //get mods in mod group

  return (
    <Paper elevation={3} sx={{ padding: '24px', marginTop: '16px' }}>
      <Typography variant="h3" align="center" gutterBottom>
        Mod Groups
      </Typography>
      <Grid
        container
        direction="row"
        spacing={4}
        justifyContent="space-evenly"
        alignItems="center"
      >
        {group.map((g) => (
          <Grid item key={g.id}>
            <Button variant="outlined">{g.modName}</Button>
          </Grid>
        ))}
      </Grid>
      <Stack sx={{ paddingTop: '36px' }}>
        <Button onClick={close}>Close</Button>
      </Stack>
    </Paper>
  );
};

export default ModGroup;
