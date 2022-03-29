import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { Stack, Typography } from '@mui/material';
import TapntableApi from '../api/api';
import { v4 as uuid } from 'uuid';

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

/**
 * 
 * Component splits the current check into 2 checks
 * 
 * Creates a new check with the items moved over and updates old check
 * 
 * 
 */

export default function SplitCheck() {
  console.debug('SplitCheck');

  const currentCheck = useSelector((st) => st.currentCheck);
  const history = useHistory();

  const [ checked, setChecked ] = useState([]);
  const [ left, setLeft ] = useState(currentCheck.items);
  const [ right, setRight ] = useState([]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [ ...checked ];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };

  const saveChecks = async () => {
    console.debug('saveChecks', left, right);

    // Create new Check, get CheckId
    const NUM_GUESTS = 1; // Move one guest to new check. To implement: ask numGuests moving to new check
    const newCheck = await TapntableApi.createCheck(
      currentCheck.userId,
      currentCheck.tableNum,
      NUM_GUESTS
    );
    console.debug('New Split Check', newCheck);

    // Loop through items and change checkId to new CheckId
    for (let item of right) {
      const updateCheckId = await TapntableApi.updateCheckId(
        item.id,
        newCheck.id
      );
      console.debug('Updated Ordered Item', updateCheckId);
    }

    // Subtract 1 from numGuests of original check
    // To implement: query user to # of guests moving to new check
    // To implement: split by seat number
    const NEW_NUM_GUESTS = currentCheck.numGuests - 1 || 1;
    const updateNumGuests = await TapntableApi.updateNumGuests(
      currentCheck.id,
      NEW_NUM_GUESTS
    );
    console.debug('updateNumGuests', updateNumGuests);

    setRight([]);
  };

  const cancelSplit = () => {
    console.debug('cancelSplit');
    history.push('/servers');
  };

  const customList = (items) => (
    <Paper
      elevation={3}
      sx={{ width: 400, height: '80vh', overflow: 'auto', marginTop: '4em' }}
    >
      <List dense component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-item-${value}-label`;

          return (
            <ListItem
              key={value.id}
              role="listitem"
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    'aria-labelledby': labelId
                  }}
                />
              </ListItemIcon>
              <ListItemText
                id={labelId}
                primary={`${value.name}`}
                secondary={
                  <React.Fragment key={uuid()}>
                    {(value.mods.length !== 0 || value.itemNote) && (
                      <List component="span" dense={true} disablePadding={true}>
                        {value.mods.map((m) => (
                          <ListItem
                            sx={{
                              display: 'inline',
                              marginLeft: '1.3em'
                            }}
                            variant="body2"
                            color="text.secondary"
                            key={uuid()}
                            component="span"
                          >
                            {m.modName}
                            {m.modPrice && (
                              <span style={{ float: 'right' }}>
                                ${m.modPrice}
                              </span>
                            )}
                            <br />
                          </ListItem>
                        ))}
                        {value.itemNote && (
                          <ListItem
                            sx={{
                              display: 'inline',
                              marginLeft: '1.3em'
                            }}
                            variant="body2"
                            color="text.secondary"
                            key={uuid()}
                          >
                            <strong>****{value.itemNote}</strong>
                          </ListItem>
                        )}
                      </List>
                    )}
                  </React.Fragment>
                }
              />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );

  return (
    <React.Fragment>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item>Original Check</Grid>
        <Grid item>{customList(left)}</Grid>
        <Grid item>
          <Grid container direction="column" alignItems="center">
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handleAllRight}
              disabled={left.length === 0}
              aria-label="move all right"
            >
              ≫
            </Button>
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handleCheckedRight}
              disabled={leftChecked.length === 0}
              aria-label="move selected right"
            >
              &gt;
            </Button>
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handleCheckedLeft}
              disabled={rightChecked.length === 0}
              aria-label="move selected left"
            >
              &lt;
            </Button>
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handleAllLeft}
              disabled={right.length === 0}
              aria-label="move all left"
            >
              ≪
            </Button>
          </Grid>
        </Grid>
        <Grid item>{customList(right)}</Grid>
        <Grid item>New Check</Grid>
      </Grid>

      <Stack direction="row" justifyContent="center" spacing={2} mt={4}>
        {right.length === 0 ? (
          <Button variant="contained" onClick={saveChecks} disabled>
            Split Check
          </Button>
        ) : (
          <Button variant="contained" onClick={saveChecks}>
            Split Check
          </Button>
        )}
        <Button variant="contained" color="secondary" onClick={cancelSplit}>
          Done
        </Button>
      </Stack>
    </React.Fragment>
  );
}
