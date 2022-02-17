import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import {
  Typography,
  Container,
  Button,
  Card,
  CardActions,
  CardActionArea,
  CardContent
} from '@mui/material';
import './OpenChecks.css';

const OpenChecks = ({ open }) => {
  console.debug('CurrentChecks');

  const checks = useSelector((st) => st.checks);

  return (
    <div className="CurrentChecks">
      <Container style={{ height: '40vh' }}>
        <Typography variant="h4" align="center">
          Open Checks
        </Typography>

        {checks.map((c) => (
          <Card
            key={c.id}
            onClick={() => open(c)}
            sx={{
              width: 275,
              float: 'left',
              marginBottom: '2em',
              marginRight: '1em'
            }}
          >
            <CardActionArea>
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Table: {c.tableNum}
                </Typography>
                <Typography variant="h5" component="div">
                  Num Guests: {c.numGuests}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Check Created: {moment(c.createdAt).format('LT')}
                </Typography>
                <Typography variant="body2">more text here!</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Container>
    </div>
  );
};

export default OpenChecks;
