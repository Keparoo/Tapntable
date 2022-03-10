import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Homepage from '../homepage/Homepage';
import UserLoginForm from '../auth/UserLogInForm';
import UserLogoutForm from '../auth/UserLogoutForm';
import Servers from '../servers/Servers';
import Kitchen from '../kitchen/Kitchen';
import KitchenCold from '../kitchen/KitchenCold';
import ServiceBar from '../bar/ServiceBar';
import ItemsList from '../items/ItemsList';
import Payments from '../common/Payments';
import CashOut from '../common/CashOut';
import ClockOut from '../common/ClockOut';
import Welcome from '../common/Welcome';
import ManagerRoute from '../auth/ManagerRoute';
import CloseDay from '../auth/CloseDay';
import OrderTickets from '../common/orderTickets';

const Routes = ({ login, logout }) => {
  console.debug('AppRoutes');

  return (
    <Switch>
      <Route exact path="/">
        <Homepage />
      </Route>

      <Route exact path="/welcome">
        <Welcome />
      </Route>

      <Route exact path="/clockout">
        <ClockOut />
      </Route>

      <Route exact path="/items">
        <ItemsList />
      </Route>

      <Route exact path="/login">
        <UserLoginForm login={login} />
      </Route>

      <ManagerRoute exact path="/logout">
        <UserLogoutForm logout={logout} />
      </ManagerRoute>

      <Route exact path="/servers">
        <Servers />
      </Route>

      <Route exact path="/payments">
        <Payments />
      </Route>

      <Route exact path="/cashout">
        <CashOut />
      </Route>

      <Route exact path="/servicebar">
        <OrderTickets destinationId={3} />
      </Route>

      <Route exact path="/kitchen">
        <OrderTickets destinationId={1} />
      </Route>

      <Route exact path="/kitchencold">
        <OrderTickets destinationId={2} />
      </Route>

      <ManagerRoute exact path="/closeday">
        <CloseDay />
      </ManagerRoute>

      <Route render={() => <Redirect to="/servers" />} />
    </Switch>
  );
};

export default Routes;
