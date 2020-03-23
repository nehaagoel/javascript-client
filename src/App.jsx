import React from 'react';
import {
  BrowserRouter as Router, Switch, Redirect, Route,
} from 'react-router-dom';
import Login from './pages/Login/Login';
import {
  TextFieldDemo, InputDemo, ChildrenDemo, Trainee, NotFound,
} from './pages/index';
import { AuthRoute, PrivateRoute } from './routes/index';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/trainee" />
        </Route>
        <AuthRoute exact path="/login" component={Login} />
        <PrivateRoute exact path="/input-demo" component={InputDemo} />
        <PrivateRoute exact path="/textfield-demo" component={TextFieldDemo} />
        <PrivateRoute exact path="/children-demo" component={ChildrenDemo} />
        <PrivateRoute path="/trainee" component={Trainee} />
        <PrivateRoute component={NotFound} />
      </Switch>
    </Router>
  );
}
export default App;
