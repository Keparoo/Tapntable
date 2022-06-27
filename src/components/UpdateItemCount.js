import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Tooltip
} from '@mui/material';
import { Box } from '@mui/system';

/* Modal form for updating  or clearing the item count

Color of Title:
type=error: red
type=success: green
type=default: primary

Clicking both off modal and on disagree button closes modal and fires disagree callback
Clicking on agree button closes modal and fires agree callback

Called by OrderCats, Current Check
*/

const UpdateItemCount = ({
  type = 'default',
  title = 'Update Item Count',
  message,
  item,
  clearCount,
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

  const [ open ] = useState(true);
  const [ count, setCount ] = useState(item.count);

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
          <strong>{item.count}</strong>, {'  '}
          <strong>{item.count || 'None'}</strong>, isActive:{' '}
          <strong>{item.isActive ? 'true' : 'false'}</strong>
          <br />
          {item.description && item.description}
        </DialogContentText>
      </DialogContent>
      <Box sx={{ width: '400px', marginLeft: '24px' }}>
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
        {item.count !== null && (
          <Tooltip title="Clear the item count. (meaning there is currently enough of the item for the current shift)">
            <Button
              onClick={() => clearCount(item)}
              variant="contained"
              color="secondary"
              sx={{ float: 'right', marginTop: '8px' }}
            >
              Clear Count
            </Button>
          </Tooltip>
        )}
      </Box>
      <DialogActions>
        {disagreeButton && (
          <Button variant="outlined" onClick={handleDisagree}>
            {disagreeButton}
          </Button>
        )}
        <Tooltip title="Update item count with 0 for sold or a number for a specific count. Clicking update with the box empty will clear the item count (meaning there is currently enough of the item for the current shift)">
          <Button variant="contained" onClick={handleAgree} autoFocus>
            {agreeButton}
          </Button>
        </Tooltip>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateItemCount;
