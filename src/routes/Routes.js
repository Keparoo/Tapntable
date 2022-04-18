import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

// React Components
import Homepage from '../pages/Homepage';
import UserLoginForm from '../auth/UserLogInForm';
import UserLogoutForm from '../auth/UserLogoutForm';
import Servers from '../pages/Servers';
import ItemsList from '../pages/ItemsList';
import Payments from '../pages/Payments';
import CashOut from '../pages/CashOut';
import ClockOut from '../pages/ClockOut';
import Welcome from '../pages/Welcome';
import ManagerRoute from '../auth/ManagerRoute';
import CloseDay from '../pages/CloseDay';
import OrderTickets from '../components/OrderTickets';
import SplitCheck from '../pages/SplitCheck';
import ItemCount from '../pages/ItemCount';
import NewItemForm from '../components/NewItemForm';
import EditItemForm from '../components/EditItemForm';
import ItemDashboard from '../pages/ItemDashboard';

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

      <Route exact path="/splitcheck">
        <SplitCheck />
      </Route>

      <Route exact path="/itemcount">
        <ItemCount />
      </Route>

      <Route exact path="/newitem">
        <NewItemForm />
      </Route>

      <Route exact path="/itemdashboard">
        <ItemDashboard />
      </Route>

      <ManagerRoute exact path="/closeday">
        <CloseDay />
      </ManagerRoute>

      <Route render={() => <Redirect to="/servers" />} />
    </Switch>
  );
};

export default Routes;
