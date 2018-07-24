import React, { Component } from 'react';
import './App.css';
import { Redirect } from 'react-router-dom';

import NavBar from './components/NavBar';
import EventBus from './services/EventBus';
import DashboardView from './components/DashboardView';
import LandingView from './components/LandingView';

class App extends Component {

  constructor() {
    super();
    this.state = {
      token : ""
    }
   
  }
  componentWillMount() {
    EventBus.getEventEmitter().on('authenticated', function(payload) {
      this.setState({
        token : payload
      });
    }.bind(this));
  }

  render() {
    return (
      <div>
        <NavBar token={this.state.token}/>
        {this.state.token ? <DashboardView token={this.state.token}/> : <LandingView/>} 
      </div>
    );
  }
}

export default App;
