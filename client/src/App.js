import React, { Component } from 'react';
import './App.css';

import NavBar from './components/NavBar';
import Routes from './MainRouter';

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
