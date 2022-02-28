import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

/* Replaces <Route> component in Routes
    This component checks the current user and
    only routes if the user_role is manager or owner otherwise it 
    redirects to the server page form
*/

const ManagerRoute = ({ exact, path, children }) => {
  // const { currentUser } = useContext(UserContext);
  const user = useSelector((st) => st.user);
  console.debug(user);

  console.debug(
    'LoggedInRoute',
    'exact=',
    exact,
    'path=',
    path,
    'currentUser=',
    user.displayName,
    'userRole=',
    user.role
  );

  if (user.role !== 'manager' && user.role !== 'owner') {
    return <Redirect to="/" />;
  }

  return (
    <Route exact={exact} path={path}>
      {children}
    </Route>
  );
};

export default ManagerRoute;
