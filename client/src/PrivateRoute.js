import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import Auth from './services/Auth';

const PrivateRoute = ({ component: Component, ...rest }) => (  
    <Route {...rest} render={props => (
      Auth.getToken() !== null 
        ? (<Component {...props} />)
        : (<Redirect to={{pathname: '/'}}/>)
    )} />
  );
  
  export default PrivateRoute;  