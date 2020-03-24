import React from 'react';
// import Trainee from './pages/Trainee/Trainee';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Login from './pages/Login/Login';
import {
  TextFieldDemo, InputDemo, ChildrenDemo, Trainee, NotFound,
} from './pages/index';
import { AuthRoute, PrivateRoute } from './routes/index';

function App() {
  return (
    <Router>
      <Switch>
        <AuthRoute exact path="/login" component={Login} />
        <PrivateRoute exact path="/input-demo" component={InputDemo} />
        <PrivateRoute exact path="/textfield-demo" component={TextFieldDemo} />
        <PrivateRoute exact path="/children-demo" component={ChildrenDemo} />
        <PrivateRoute exact path="/" component={Trainee} />
        <PrivateRoute component={NotFound} />
      </Switch>
    </Router>
  );
}
export default App;
