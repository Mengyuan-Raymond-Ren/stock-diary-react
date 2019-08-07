import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './views/RegisterView'
// import PropTypes from 'prop-types';
import RegisterView from './views/RegisterView';

class App extends Component {
  constructor() {
    super();
    this.state = {
      js: [],
    }
  }

  componentDidMount() {
    
  }

  // propTypes = {
  //   classes: PropTypes.object.isRequired,
  // };

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to StockDiary</h2>
        </div>
        <div>
          <RegisterView></RegisterView>
        </div>
      </div>
    );   
  }
}

export default App;
