import React, { memo, useCallback } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Stack,
  Divider
} from '@mui/material';
import { v4 as uuid } from 'uuid';

const ModCategories = ({ display }) => {
  console.debug('ModCategories');

  const categories = useSelector((st) => st.mods.categories, shallowEqual);
  const groups = useSelector((st) => st.mods.groups, shallowEqual);
  console.debug('Mod categories', categories);

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
        {groups.map((g) => (
          <Grid item key={uuid()}>
            <Button onClick={() => display(g.id)} variant="outlined">
              {g.name}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default ModCategories;

// <Stack sx={{ paddingTop: '36px' }}>
// <Button>Close</Button>
// </Stack>
