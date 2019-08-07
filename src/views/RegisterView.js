import React, { Component } from 'react';
import './StockView.css';

import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

class RegisterView extends Component {
  constructor() {
    super();
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      username: '',
      password: '',
      message: '',
    }
  }

  handleUsernameChange(event) {
    this.setState({username: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    const axios = require('axios');
    
    axios({
        method: 'POST',
        url: 'http://127.0.0.1:5000/user/register/',
        data: {'Username': this.state.username, 'Password': this.state.password, },
        headers: {'Access-Control-Allow-Origin': '*'},
        dataType: 'json',
        xhrFields: { withCredentials: true },
        crossDomain: true,
        contentType: 'application/json'
      })
      .then(function (response) {
          //handle success
          console.log('Response: ' + response);
          this.setState({message: response});
      })
      .catch(function (response) {
          //handle error
          console.log('Error!\n' + response);
      });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Input id="username" placeholder="Username" name="username" type="text" 
               value={this.state.username} onChange={this.handleUsernameChange}/>
        <br></br>
        <Input id="password" placeholder="Password" name="password" type="password"
               value={this.state.password} onChange={this.handlePasswordChange}/>
        <br></br>
        <Button id="register" name="register" type="submit">Register</Button>
        <br></br>
        <label id="message" name="message" value={this.state.message} />
      </form>
    );
  }
}

export default RegisterView;
