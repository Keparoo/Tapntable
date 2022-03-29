import React from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';
import { v4 as uuid } from 'uuid';

/**
 * 
 * Component renders a list of items that have been sent
 * 
 * Arguments:
 * items: list of the items to render
 * fireCourse: function to fire a course
 *  
 */

const SentItems = ({ items, fireCourse }) => {
  console.debug('SentItems', items);

  return (
    <List className="SentItems" dense={true} disablePadding={true}>
      {items.map((i, idx, arr) => (
        <ListItem key={uuid()}>
          <ListItemText
            onClick={() => fireCourse(arr, idx)}
            primary={
              <React.Fragment key={uuid()}>
                {(i.courseNum === 2 && !i.fireCourse2) ||
                (i.courseNum === 3 && !i.fireCourse3) ? (
                  <Typography color="primary" my={0}>
                    {i.name}
                    {i.seatNum && <span>, s{i.seatNum}</span>}
                  </Typography>
                ) : (
                  <span>
                    <strong>{i.name}</strong>
                    {i.seatNum && <span>, s{i.seatNum}</span>}
                  </span>
                )}{' '}
                <span style={{ float: 'right' }}>${i.price}</span>
              </React.Fragment>
            }
            secondary={
              <React.Fragment key={uuid()}>
                {(i.mods.length !== 0 || i.itemNote) && (
                  <List component="span" dense={true} disablePadding={true}>
                    {i.mods.map((m) => (
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
                          <span style={{ float: 'right' }}>${m.modPrice}</span>
                        )}
                        <br />
                      </ListItem>
                    ))}
                    {i.itemNote && (
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
                        <strong>****{i.itemNote}</strong>
                      </ListItem>
                    )}
                  </List>
                )}
              </React.Fragment>
            }
          />
        </ListItem>
      ))}
    </List>
  );
};

export default SentItems;
