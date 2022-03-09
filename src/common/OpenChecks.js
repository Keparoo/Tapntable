import React from 'react';
import moment from 'moment';
import { useSelector, shallowEqual } from 'react-redux';
import {
  Typography,
  Container,
  Card,
  CardActionArea,
  CardContent
} from '@mui/material';
import './OpenChecks.css';

const OpenChecks = ({ open }) => {
  console.debug('CurrentChecks');

  const checks = useSelector((st) => st.checks);

  if (!checks.length) {
    return (
      <Container style={{ height: '20vh' }}>
        <Typography variant="h4" align="center">
          No open Checks
        </Typography>
      </Container>
    );
  }

  return (
    <div className="CurrentChecks">
      <Container style={{ height: '40vh' }}>
        <Typography variant="h4" align="center" gutterBottom>
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
                  Num Guests: {c.numGuests}{' '}
                  <span style={{ float: 'right' }}>Check Id: {c.id}</span>
                </Typography>
                <Typography variant="h5" component="div">
                  Table: {c.tableNum}
                  <span>{c.customer !== undefined && c.customer}</span>
                </Typography>

                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Check Created: {moment(c.createdAt).format('LT')}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Container>
    </div>
  );
};

export default OpenChecks;
