import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import { clearCurrentCheck } from '../actions/currentCheck';

const Kitchen = () => {
  console.debug('Kitchen');

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [ isLoading, setIsLoading ] = useState(true);

  useEffect(
    () => {
      console.debug('Kitchen useEffect on Mount');

      async function fetchItem() {
        dispatch(clearCurrentCheck());
        setIsLoading(false);
      }
      if (isLoading) {
        fetchItem();
      }
    },
    [ dispatch, isLoading, user.id ]
  );

  return (
    <Typography variant="h3" align="center">
      Kitchen
    </Typography>
  );
};

export default Kitchen;
