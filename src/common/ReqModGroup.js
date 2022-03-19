import React, { useState, useEffect } from 'react';
import TapntableApi from '../api/api';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Dialog, Grid, Paper, Stack } from '@mui/material';
import { v4 as uuid } from 'uuid';
import { fetchModsFromAPI } from '../actions/mods';
import { useSelector } from 'react-redux';
import Spinner from './Spinner';

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

const RequiredModGroup = ({ groups, add, cancel, close }) => {
  console.debug('RequiredModGroup', groups);

  const [ open, setOpen ] = useState(true);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ currentModGroup, setCurrentModGroup ] = useState([]);
  const [ modGroupIdx, setModGroupIdx ] = useState(0);

  useEffect(
    () => {
      console.debug('RequiredModGroup useEffect on Mount');

      async function fetchMods() {
        const mods = await TapntableApi.getModsInGroup(
          groups[modGroupIdx].modGroupId
        );
        setCurrentModGroup(mods);
        setIsLoading(false);
      }

      if (isLoading) {
        fetchMods();
      }
    },
    [ groups, isLoading, modGroupIdx ]
  );

  const addMod = (g) => {
    console.debug('Add Required Mod');
    add(g);
    if (modGroupIdx < groups.length - 1) {
      setModGroupIdx(modGroupIdx + 1);
      setIsLoading(true);
    } else {
      close();
      setModGroupIdx(0);
    }
  };

  const cancelAddItem = () => {
    console.log('cancelAddItem');
    cancel();
    setModGroupIdx(0);
    // setOpen(false);
  };

  if (isLoading) return Spinner;

  return (
    <div>
      <Modal
        aria-labelledby="required-mod-group"
        aria-describedby="item modifications that are required"
        open={open}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <Paper elevation={3} sx={style}>
            <Typography variant="h3" align="center" gutterBottom>
              {currentModGroup.length && currentModGroup[0].modGroupName}
            </Typography>
            <Grid
              container
              direction="row"
              spacing={4}
              justifyContent="space-evenly"
              alignItems="center"
            >
              {currentModGroup.map((g) => (
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
          </Paper>
        </Fade>
      </Modal>
    </div>
  );
};

export default RequiredModGroup;
