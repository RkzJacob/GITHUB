import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from './authContext';

//verifica que el usuario este logueado para poder acceder a cualquier componente del sistema

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
