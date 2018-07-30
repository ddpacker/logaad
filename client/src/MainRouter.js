import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import EventBus from './services/EventBus';

import App404View from './components/App404View';
import LandingView from './components/LandingView';
import DashboardView from './components/DashboardView';
import TestView from './components/TestView';

import PrivateRoute from './PrivateRoute';

const Routes = () => (
    <Router>
        <Switch>
            <Route exact path = '/' component = { LandingView }/>
            <Route exact path = '/test' component = { TestView }/>
            <Route component = { App404View }/>
        </Switch>
    </Router>
)

export default Routes;