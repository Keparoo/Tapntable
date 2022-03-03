import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  getDayChecksFromAPI,
  getDayItemsFromAPI,
  getDayOpenFromAPI,
  getDayPaymentsFromAPI,
  getDayUserDataFromAPI,
  getDayTotalsFromAPI
} from '../actions/totals';
import TapntableApi from '../api/api';
import moment from 'moment';
import { CLOSE_DAY, OPEN_DAY } from '../constants';

const CloseDay = () => {
  console.debug('CloseDay');

  const [ isLoading, setIsLoading ] = useState(true);
  const totals = useSelector((st) => st.totals, shallowEqual);
  const user = useSelector((st) => st.user, shallowEqual);
  const dispatch = useDispatch();

  useEffect(
    () => {
      console.debug('ItemList useEffect on Mount');

      async function fetchTotals() {
        await dispatch(getDayTotalsFromAPI());

        setIsLoading(false);
      }
      if (isLoading) {
        fetchTotals();
      }
    },
    [ dispatch, isLoading ]
  );
  // console.log(checks, payments);

  // Check for open checks
  // Check for open payments
  // Get all payments from day
  // Calculate totals
  // Display totals
  console.log('Day Open: ', totals.dayOpen);

  const closeDay = async () => {
    await TapntableApi.logEvent(user.id, CLOSE_DAY);
  };

  const openDay = async () => {
    await TapntableApi.logEvent(user.id, OPEN_DAY);
  };

  // closeDay();
  // openDay();

  console.log(totals);

  return (
    <div>
      <h1>Close Day!</h1>
      <p>
        DayOpen:{' '}
        {totals.dayOpen && (
          <span>
            {moment(totals.dayOpen).format('dddd, MMMM Do YYYY, h:mm:ss a')}
          </span>
        )}
      </p>
      <br />
      <h6>Checks</h6>
      {totals.checks &&
        totals.checks.map((c) => (
          <p>
            Check Id: {c.id} {c.employee} Num Guests: {c.numGuests} Created at:{' '}
            {moment(c.createdAt).format('dddd, MMMM Do YYYY, h:mm:ss a')} Closed
            at: {moment(c.closedAt).format(
              'dddd, MMMM Do YYYY, h:mm:ss a'
            )}{' '}
            Subtotal: {c.subtotal} Tax: {c.stateTax} isVoid:{' '}
            {c.isVoid ? 'true' : 'false'}
          </p>
        ))}
      <h6>Payments</h6>
      {totals.payments &&
        totals.payments.map((p) => (
          <p>
            Payment Id: {p.id} Check Id: {p.checkId} Type: {p.type} Subtotal:{' '}
            {p.subtotal} Tip: {p.tipAmt} isVoid: {p.isVoid ? 'true' : 'false'}
          </p>
        ))}
      <h6>Ordered Items</h6>
      {totals.items &&
        totals.items.map((i) => (
          <p>
            Id: {i.id} Name: {i.name} Price: {i.price} Check Id: {i.checkId}{' '}
            Created: {moment(i.sentAt).format(
              'dddd, MMMM Do YYYY, h:mm:ss a'
            )}{' '}
            Note: {i.itemNote} isVoid: {i.isVoid ? 'true' : 'false'}
          </p>
        ))}
      <h6>User Logs</h6>
      {totals.userData &&
        totals.userData.map((u) => (
          <p>
            Id: {u.id} Name: {u.displayName} {u.firstName} {u.lastName} {u.role}{' '}
            {u.event}{' '}
            {moment(u.createdAt).format('dddd, MMMM Do YYYY, h:mm:ss a')} Tips:
            ${u.declaredTips} Entity Id: {u.entityId}{' '}
          </p>
        ))}
    </div>
  );
};

export default CloseDay;
