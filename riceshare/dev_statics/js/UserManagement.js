import React from 'react';
//import ReactDOM from 'react-dom';
import axios from 'axios';
import {
  Button
} from 'react-bootstrap';
import { FieldGroup } from './FieldGroup.js'


class LoginForm extends React.Component{
  
  constructor() {
    super();
    this.state = {
      username: '',
      password: ''
    };
    
    this.handleClick = this.handleClick.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    
  }
  
  
  handleClick(event) {
    axios.post('http://localhost:8000/api/v1/users/login', {
      username: this.state.username,
      password: this.state.password
    })
    .then(function (response) {
      console.log(response.data);
      console.log(response.status);
      console.log(response.statusText);
      console.log(response.headers);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  handleUsernameChange(event) {
    this.setState({ username: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }
  

  render() {
    return (
      <form>
        <FieldGroup 
          id="formControlsUsername"
          type="text"
          label="Username"
          placeholder="Please enter your username"
          value={this.state.username}
          onChange={this.handleUsernameChange}
        />
        <FieldGroup 
          id="formControlsPassword"
          label="Password"
          type="Password"
          placeholder="Please enter your password"
          value={this.state.password}
          onChange={this.handlePasswordChange}
        />
        <Button type="button" onClick={this.handleClick}>
          Submit
        </Button>
      </form>
    );
  }

  
};

/*
ReactDOM.render(
    <LoginForm />,
    document.getElementById('react-root')
  );
*/


module.exports = {
  LoginForm: LoginForm,
}
