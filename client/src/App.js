import React, { Component } from 'react';
import './App.css';
import { Redirect } from 'react-router-dom';

import NavBar from './components/NavBar';
import Routes from './MainRouter';
import EventBus from './services/EventBus';

class App extends Component {

  constructor() {
    super();
    if(!this.state || !this.state.token){
       this.state = {
        token : ""
      }
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
    if (this.state.token !== "") {
      return <Redirect to = '/dashboard'/>
    }
    return (
      <div>
        <NavBar/>
        <Routes token={this.state.token}/>
      </div>
    );
  }
}

export default App;
