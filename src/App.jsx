import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import Homepage from './business/pages/Homepage';
import BusinessDetails from './business/pages/BusinessDetails';
import NewOffer from './business/pages/NewOffer';
import Profile from './users/pages/Profile';
import UserDetails from './users/pages/UserDetails';
import Auth from './auth/pages/Auth';
import NewBusiness from './business/pages/NewBusiness';
import EditBusiness from './business/pages/EditBusiness';
import SuccessPage from './business/pages/SuccessPage';
import EditProfile from './users/pages/EditProfile';

import AuthContext from './shared/context/AuthContext';

import './App.css';

function App() {
  const { isLoggedIn } = useContext(AuthContext);
  return (
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
        <Route path="/success" exact>
          <SuccessPage />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
