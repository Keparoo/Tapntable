import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField
} from '@mui/material';
import { Box } from '@mui/system';

/* Alert Component for showing updating item count

Color of Title:
type=error: red
type=success: green
type=default: primary

Clicking both off modal and on disagree button closes modal and fires disagree callback
Clicking on agree button closes modal and fires agree callback

Called by OrderCats, Current Check
*/

const UpdateItemCount = ({
  type = 'Success',
  title = 'Update Item Count',
  message,
  item,
  agreeButton = 'Update',
  disagreeButton = 'Cancel',
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
  const [ count, setCount ] = useState('');

  // Send back disagree=false
  const handleAgree = () => {
    // setOpen(false);
    agree(item, count);
  };

  // Send back disagree=true
  const handleDisagree = () => {
    // setOpen(false);
    disagree();
  };

  const handleChange = (e) => {
    setCount(e.target.value);
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
          <strong>{item.name}</strong> <em>(Id:{item.id})</em>
          {'  '}
          <span>&#8212;</span>
          <strong>${item.price}</strong>
          <br /> Category: <strong>{item.category}</strong>, Destination:{' '}
          <strong>{item.destination}</strong>, Count:{' '}
          <strong>{item.count}</strong>
          <strong>{item.count || 'None'}</strong>, isActive:{' '}
          <strong>{item.isActive ? 'true' : 'false'}</strong>
          <br />
          {item.description && item.description}
        </DialogContentText>
      </DialogContent>
      <Box sx={{ width: '400px', margin: 'auto' }}>
        <TextField
          type="number"
          id="count"
          name="count"
          label="Item Count"
          variant="outlined"
          value={count}
          onChange={handleChange}
          autoFocus={true}
          size="medium"
        />
      </Box>
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

export default UpdateItemCount;
