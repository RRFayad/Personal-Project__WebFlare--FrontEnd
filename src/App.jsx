import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import HomePage from './business/pages/Homepage';

import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/business/:bid" exact>
          <h1>Business Details Page</h1>
        </Route>
        <Route path="/business/:bid/create-offer" exact>
          <h1>Create Offer page</h1>
        </Route>
        <Route path="/users/:uid" exact>
          <h1>User Details page</h1>
        </Route>
        <Route path="/users/:uid/create-business" exact>
          <h1>Create Business page</h1>
        </Route>
        <Route path="/users/:uid/my-business" exact>
          <h1>My Businesses Page</h1>
        </Route>
        <Route path="/auth" exact>
          <h1>Authentication Page</h1>
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
