import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchItemsFromAPI } from '../actions/items';
import { Link as RouterLink } from 'react-router-dom';

import Spinner from '../components/Spinner';
import { clearCurrentCheck } from '../actions/currentCheck';
import { useHistory } from 'react-router-dom';
import {
  Container,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  Link
} from '@mui/material';

/*  Render page with list of items in db where isActive=true
 *
 *   On mount, renders list of all items in API
 *
 *   Routed to /items
*/

const ItemList = ({ items }) => {
  console.debug('ItemList');

  // const items = useSelector((st) => st.items);
  // const user = useSelector((st) => st.user);
  // const dispatch = useDispatch();
  // const history = useHistory();
  // const [ isLoading, setIsLoading ] = useState(true);

  // if (!user.pin) history.push('/');

  // useEffect(
  //   () => {
  //     console.debug('ItemList useEffect on Mount');

  //     dispatch(clearCurrentCheck());
  //     async function fetchItem() {
  //       await dispatch(fetchItemsFromAPI());
  //       setIsLoading(false);
  //     }
  //     if (isLoading) {
  //       fetchItem();
  //     }
  //   },
  //   [ dispatch, isLoading ]
  // );

  // if (isLoading) return <Spinner />;

  // if (!isLoading && items.length === 0) {
  //   return <b>No items in database</b>;
  // }
  if (items.length === 0)
    return (
      <Container>
        <Paper elevation={3}>
          <Typography ml={2} mt={2} variant="h3" component="h1">
            No items match
          </Typography>
        </Paper>
      </Container>
    );

  return (
    <Container>
      <Paper elevation={3}>
        <Typography ml={2} mt={2} variant="h3" component="h1">
          Find item to set count
        </Typography>
        <List>
          {items.map((i) => (
            <Link
              key={i.id}
              to={`/items/${i.id}`}
              component={RouterLink}
              underline="none"
            >
              <ListItem>
                <ListItemText
                  primary={
                    <React.Fragment>
                      <strong>{i.name}</strong>, Id: {i.id}
                    </React.Fragment>
                  }
                  secondary={
                    <React.Fragment>
                      <strong>${i.price}</strong>, Category:{' '}
                      <strong>{i.category}</strong>, Destination:{' '}
                      <strong>{i.destination}</strong> Count:{' '}
                      <strong>{i.count || 'None'}</strong> isActive:{' '}
                      <strong>{i.isActive ? 'true' : 'false'}</strong> <br />
                      {i.description}
                    </React.Fragment>
                  }
                />
              </ListItem>
            </Link>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default ItemList;
