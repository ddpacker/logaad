import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import NavBar from './components/NavBar';
import Routes from './components/MainRouter';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar/>
        <Routes/>
      </div>
    );
  }
}

export default App;
