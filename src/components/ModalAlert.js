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
type=error: red
type=success: green
type=default: primary

Clicking both off modal and on disagree button closes modal and fires disagree callback
Clicking on agree button closes modal and fires agree callback

Called by OrderCats, Current Check
*/

const ModalAlert = ({
  type = 'error',
  title,
  message,
  agreeButton,
  disagreeButton,
  agree,
  disagree
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
  const handleAgree = () => {
    setOpen(false);
    agree();
  };

  // Send back disagree=true
  const handleDisagree = () => {
    setOpen(false);
    disagree();
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
      onClose={handleDisagree}
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
        <Button onClick={handleAgree} autoFocus>
          {agreeButton}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalAlert;
