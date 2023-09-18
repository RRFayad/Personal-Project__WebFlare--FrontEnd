import React, { useContext, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import LoadingSpinner from './shared/ui-ux/LoadingSpinner';
import NewAuthContext from './shared/context/NewAuthContext';

import classes from './App.module.css';

const Homepage = React.lazy(() => import('./business/pages/Homepage'));
const BusinessDetails = React.lazy(() =>
  import('./business/pages/BusinessDetails')
);
const NewOffer = React.lazy(() => import('./business/pages/NewOffer'));
const Profile = React.lazy(() => import('./users/pages/Profile'));
const UserDetails = React.lazy(() => import('./users/pages/UserDetails'));
const Auth = React.lazy(() => import('./auth/pages/Auth'));
const NewBusiness = React.lazy(() => import('./business/pages/NewBusiness'));
const EditBusiness = React.lazy(() => import('./business/pages/EditBusiness'));
const SuccessPage = React.lazy(() => import('./business/pages/SuccessPage'));
const EditProfile = React.lazy(() => import('./users/pages/EditProfile'));
const Offers = React.lazy(() => import('./offers/pages/Offers'));

function App() {
  const { isLoggedIn } = useContext(NewAuthContext);
  return (
    <Suspense
      fallback={
        <div className={classes.fallback}>
          <LoadingSpinner overlay />
        </div>
      }
    >
      <Router>
        <Switch>
          <Route path="/" exact>
            <Homepage />
          </Route>
          <Route path="/business/:bid" exact>
            <BusinessDetails />
          </Route>
          <Route path="/business/:bid/create-offer" exact>
            {isLoggedIn && <NewOffer />}
            {!isLoggedIn && <Redirect to="/" />}
          </Route>
          <Route path="/users/:uid" exact>
            <UserDetails />
          </Route>
          <Route path="/users/:uid/create-business" exact>
            {isLoggedIn && <NewBusiness />}
            {!isLoggedIn && <Redirect to="/" />}
          </Route>
          <Route path="/users/:uid/edit-business/:bid" exact>
            {isLoggedIn && <EditBusiness />}
            {!isLoggedIn && <Redirect to="/" />}
          </Route>
          <Route path="/users/:uid/profile" exact>
            {isLoggedIn && <Profile />}
            {!isLoggedIn && <Redirect to="/" />}
          </Route>
          <Route path="/auth" exact>
            {isLoggedIn && <Redirect to="/" />}
            {!isLoggedIn && <Auth />}
          </Route>
          <Route path="/users/:uid/edit-profile" exact>
            {!isLoggedIn && <Redirect to="/" />}
            {isLoggedIn && <EditProfile />}
          </Route>
          <Route path="/users/:uid/offers" exact>
            {!isLoggedIn && <Redirect to="/" />}
            {isLoggedIn && <Offers />}
          </Route>
          <Route path="/success/:event" exact>
            {!isLoggedIn && <Redirect to="/" />}
            {isLoggedIn && <SuccessPage />}
          </Route>
          <Redirect to="/" />
        </Switch>
      </Router>
    </Suspense>
  );
}

export default App;
