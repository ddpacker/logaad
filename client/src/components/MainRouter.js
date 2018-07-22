import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import App404 from './App404';
import Landing from './landing/Landing';

const Routes = () => (
    <Router>
        <Switch>
            <Route exact path = '/' component = { Landing }/>
            <Route component = { App404 }/>
        </Switch>
    </Router>
)

export default Routes;