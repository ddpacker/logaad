import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import Auth from './services/Auth';
import EventBus from './services/EventBus';

var isAuth = false;

EventBus.getEventEmitter().on('authenticated', function() {
  isAuth = true;
});

const PrivateRoute = ({ component: Component, ...rest }) => (  
    <Route {...rest} render={(props) => (
      isAuth
        ? <Component {...props} />
        : <Redirect to='/'/>
    )} />
  );
  
  export default PrivateRoute;  