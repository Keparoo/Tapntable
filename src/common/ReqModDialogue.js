import React, { useState, useEffect } from 'react';
import TapntableApi from '../api/api';
import { v4 as uuid } from 'uuid';
import { useSelector } from 'react-redux';
import {
  Button,
  Dialog,
  DialogTitle,
  Grid,
  Stack,
  Typography
} from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '37.5%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  padding: 24,
  marginTop: '16px'
};

const RequiredModDialogue = ({ modGroups, open, onClose, add, cancel }) => {
  console.debug('RequiredModDialogue');

  const currentModGroup = [
    { modGroupName: 'Mod Group', modName: 'Well Done' }
  ];
  const [ modGroupIdx, setModGroupIdx ] = useState(0);

  const handleClose = () => {
    // onClose(selectedValue);
  };

  const addMod = (g) => {
    add(g);
    if (modGroupIdx < modGroups.length - 1) {
      setModGroupIdx(modGroupIdx + 1);
      console.log('***New ModGroups', modGroups[modGroupIdx]);
    } else {
      setModGroupIdx(0);
      open = false;
    }
  };

  const cancelAddItem = () => {
    console.debug('cancelAddItem');
    setModGroupIdx(0);
    cancel();
  };

  const handleClick = (value) => {
    onClose(value);
  };
  return (
    <Dialog
      onClose={handleClose}
      open={open}
      PaperProps={{ elevation: 3, sx: style }}
    >
      <DialogTitle>
        {modGroups.length && modGroups[modGroupIdx].title}
      </DialogTitle>
      <Grid
        container
        direction="row"
        spacing={4}
        justifyContent="space-evenly"
        alignItems="center"
      >
        {modGroups[modGroupIdx].mods.map((g) => (
          <Grid item key={uuid()}>
            <Button onClick={() => addMod(g)} variant="outlined">
              {g.modName}
            </Button>
          </Grid>
        ))}
      </Grid>
      <Stack sx={{ paddingTop: '36px' }}>
        <Button key={uuid()} onClick={cancelAddItem}>
          Cancel
        </Button>
      </Stack>
    </Dialog>
  );
};

export default RequiredModDialogue;
