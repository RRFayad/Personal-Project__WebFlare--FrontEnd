import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import Homepage from './business/pages/Homepage';
import BusinessDetails from './business/pages/BusinessDetails';
import NewOffer from './business/pages/NewOffer';
import UsersBusiness from './users/pages/UsersBusiness';
import UserDetails from './users/pages/UserDetails';
import Auth from './auth/pages/Auth';
import NewBusiness from './business/pages/NewBusiness';
import SuccessPage from './business/pages/SuccessPage';

import './App.css';

function App() {
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
          <NewOffer />
        </Route>
        <Route path="/users/:uid" exact>
          <UserDetails />
        </Route>
        <Route path="/users/:uid/create-business" exact>
          <NewBusiness />
        </Route>
        <Route path="/users/:uid/my-business" exact>
          <UsersBusiness />
        </Route>
        <Route path="/auth" exact>
          <Auth />
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
