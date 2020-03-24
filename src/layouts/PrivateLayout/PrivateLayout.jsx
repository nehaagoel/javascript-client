import React from 'react';
import PropTypes from 'prop-types';
import { NavBar } from '../components/index';

const PrivateLayout = ({ children, ...rest }) => (
  <div>
    <NavBar />
    <div>{children}</div>
  </div>
);
PrivateLayout.propTypes = {
  children: PropTypes.object.isRequired,
};
export default PrivateLayout;
