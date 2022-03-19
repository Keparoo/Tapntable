import React, { useState, memo, useCallback } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Stack
} from '@mui/material';
import { v4 as uuid } from 'uuid';

const ModGroup = ({ group, name, add, close }) => {
  console.debug('ModGroup', group);

  const mods = useSelector((st) => st.mods.mods, shallowEqual);
  console.debug('Mod groups', mods);
  //get mods in mod group

  return (
    <Paper elevation={3} sx={{ padding: '24px', marginTop: '16px' }}>
      <Typography variant="h3" align="center" gutterBottom>
        {group[0].modGroupName}
      </Typography>
      <Grid
        container
        direction="row"
        spacing={4}
        justifyContent="space-evenly"
        alignItems="center"
      >
        {group.map((g) => (
          <Grid item key={uuid()}>
            <Button onClick={() => add(g)} variant="outlined">
              {g.modName}
            </Button>
          </Grid>
        ))}
      </Grid>
      <Stack sx={{ paddingTop: '36px' }}>
        <Button key={uuid()} onClick={close}>
          Close
        </Button>
      </Stack>
    </Paper>
  );
};

export default ModGroup;
