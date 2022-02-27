import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Homepage from '../homepage/Homepage';
import LoginForm from '../auth/UserPinForm';
import Servers from '../servers/Servers';
import Kitchen from '../kitchen/Kitchen';
import KitchenCold from '../kitchen/KitchenCold';
import ServiceBar from '../bar/ServiceBar';
import ItemsList from '../items/ItemsList';
import Payments from '../common/Payments';
import CashOut from '../common/CashOut';
import UserPinForm from '../auth/UserPinForm';
import ClockOut from '../common/ClockOut';
import Welcome from '../common/Welcome';
import ManagerRoute from '../auth/ManagerRoute';
import CloseDay from '../auth/CloseDay';

const Routes = () => {
  console.debug('AppRoutes');

  return (
    <Switch>
      <Route exact path="/">
        <Homepage />
      </Route>

      <Route exact path="/pin">
        <UserPinForm />
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
        <LoginForm />
      </Route>

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
        <ServiceBar />
      </Route>

      <Route exact path="/kitchen">
        <Kitchen />
      </Route>

      <Route exact path="/kitchencold">
        <KitchenCold />
      </Route>

      <ManagerRoute exact path="/closeday">
        <CloseDay />
      </ManagerRoute>

      <Route render={() => <Redirect to="/servers" />} />
    </Switch>
  );
};

export default Routes;
