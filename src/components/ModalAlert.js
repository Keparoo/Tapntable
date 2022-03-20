import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';

/* Alert Component for showing modal style messages

Color of Title:
typye=error: red
typye=success: green
typye=default: primary

If disagreeButton is not null:
    show a button with disagree text and return disagree=true if clicked
If agreeButton is clicked disagree=false is returned

close function returns boolean disagree value

Called by OrderCats
*/

const ModalAlert = ({
  type = 'error',
  title,
  message,
  agreeButton,
  disagreeButton,
  close
}) => {
  console.debug(
    'Alert',
    'type=',
    type,
    'title=',
    title,
    'message=',
    message,
    'agree=',
    agreeButton,
    'disagree=',
    disagreeButton
  );

  const [ open, setOpen ] = useState(true);

  // Send back disagree=false
  const handleClose = () => {
    setOpen(false);
    close(false);
  };

  // Send back disagree=true
  const handleDisagree = () => {
    setOpen(false);
    close(true);
  };

  let textColor;
  switch (type) {
    case 'error':
      textColor = 'red';
      break;
    case 'success':
      textColor = 'green';
      break;
    default:
      textColor = 'primary';
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle sx={{ color: textColor }} id="alert-dialog-title">
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {disagreeButton && (
          <Button onClick={handleDisagree}>{disagreeButton}</Button>
        )}
        <Button onClick={handleClose} autoFocus>
          {agreeButton}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalAlert;
