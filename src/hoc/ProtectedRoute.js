import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { authUsername } from '../app/store/authSlice';

const ProtectedRoute = ({ children, ...rest }) => {
  const { location } = { ...rest };
  // console.log('location: ', location);
  const isUserAdmin = useSelector(authUsername) === process.env.REACT_APP_ADMIN_USERNAME;
  console.log('useSelector(authUsername): ', useSelector(authUsername));
  console.log('isUserAdmin: ', isUserAdmin);

  return (
    <Route
      // {...rest}
      render={() => (isUserAdmin
        ? (children)
        : (
          <Redirect
            to={{
              pathName: '/',
              state: { from: location },
            }}
          />
        ))}
    />
  );
};

ProtectedRoute.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ProtectedRoute;
