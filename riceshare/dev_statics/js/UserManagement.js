import React from 'react';
//import ReactDOM from 'react-dom';
import axios from 'axios';
import {
  Button,
  Form,
  Col,
  FormGroup,
  Checkbox
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
    event.preventDefault();
  }

  handleUsernameChange(event) {
    this.setState({ username: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }


  render() {
    return (
      
      <Form horizontal onSubmit={this.handleClick}>

        <FieldGroup
          id="formControlsLoginUsername"
          type="text"
          label="Username"
          placeholder="Please enter your username"
          value={this.state.username}
          onChange={this.handleUsernameChange}
          required="true"
        />

        <FieldGroup
          id="formControlsLoginPassword"
          label="Password"
          type="password"
          placeholder="Please enter your password"
          value={this.state.password}
          onChange={this.handlePasswordChange}
          required="true"
        />

        <FormGroup>
          <Col smOffset={4} sm={8}>
            <Checkbox>
              Remember me
            </Checkbox>
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={4} sm={8}>
            <Button type="submit">
              Sign in
            </Button>
          </Col>
        </FormGroup>

      </Form>
      
    );
  }


};

class SignupForm extends React.Component{

  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      email: ''
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
  }


  handleClick(event) {
    axios.post('http://localhost:8000/api/v1/users/', {
      username: this.state.username,
      password: this.state.password,
      email: email
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
    event.preventDefault();
  }

  handleUsernameChange(event) {
    this.setState({ username: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  render() {
    return (
      <Form horizontal onSubmit={this.handleClick}>

        <FieldGroup
          id="formControlsSignupUsername"
          type="text"
          label="Username"
          placeholder="Please enter your username"
          value={this.state.username}
          onChange={this.handleUsernameChange}
          required="true"
        />

        <FieldGroup
          id="formControlsSignupEmail"
          type="email"
          label="Email"
          placeholder="Please enter your email"
          value={this.state.email}
          onChange={this.handleEmailChange}
          required="true"
        />

        <FieldGroup
          id="formControlsSignupPassword"
          label="Password"
          type="password"
          placeholder="Please enter your password"
          value={this.state.password}
          onChange={this.handlePasswordChange}
          required="true"
        />

        <FieldGroup 
          id="formControlsSignupPasswordAgain"
          label="Password"
          type="password"
          placeholder="Please enter your password"
          value={this.state.password}
          onChange={this.handlePasswordChange}
          required="true"
        />

        <FormGroup>
          <Col smOffset={4} sm={8}>
            <Button type="submit">
              Sign up
            </Button>
          </Col>
        </FormGroup>

      </Form>
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
  SignupForm: SignupForm,
}
