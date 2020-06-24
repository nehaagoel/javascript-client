import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import localStorage from 'local-storage';
import { PrivateLayout } from '../layouts';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(matchProps) => {
      if (localStorage.get('token')) {
        return (
          <PrivateLayout>
            <Component {...matchProps} />
          </PrivateLayout>
        );
      }
      return <Redirect to="/login" />;
    }}
  />
);
PrivateRoute.propTypes = {
  component: PropTypes.object.isRequired,
};
export default PrivateRoute;
