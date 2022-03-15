import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid, Paper, Stack } from '@mui/material';
import { v4 as uuid } from 'uuid';

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

export default function RequiredModGroup() {
  const [ open, setOpen ] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const add = () => {
    //nothing
  };

  const close = () => {
    //nothing
  };

  return (
    <div>
      <Modal
        aria-labelledby="required-mod-group"
        aria-describedby="item modifications that are required"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <Paper elevation={3} sx={style}>
            <Typography variant="h3" align="center" gutterBottom>
              Required Group
            </Typography>
            <Grid
              container
              direction="row"
              spacing={4}
              justifyContent="space-evenly"
              alignItems="center"
            >
              {[
                { modName: 'one' },
                { modName: 'two' },
                { modName: 'three' }
              ].map((g) => (
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
        </Fade>
      </Modal>
    </div>
  );
}

// <Box sx={style}>
// <Typography id="transition-modal-title" variant="h6" component="h2">
//   Text in a modal
// </Typography>
// <Typography id="transition-modal-description" sx={{ mt: 2 }}>
//   Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
// </Typography>
// </Box>
