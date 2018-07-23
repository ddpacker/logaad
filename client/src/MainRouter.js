import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import App404View from './components/App404View';
import LandingView from './components/LandingView';
import DashboardView from './components/DashboardView';

import PrivateRoute from './PrivateRoute';

const Routes = () => (
    <Router>
        <Switch>
            <Route exact path = '/' component = { LandingView }/>
            <Route path = '/dashboard' component = { DashboardView }/>
            <Route component = { App404View }/>
        </Switch>
    </Router>
)

export default Routes;