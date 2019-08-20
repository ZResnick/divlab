import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { signUp } from '../store/authReducer';
import { connect } from 'react-redux';

export default class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
    };

    this.handleChange = this.handelChange.bind(this);
    this.handleSubmit = this.handelSubmit.bind(this);
  }

  handelChange = evt => {
    this.setState({
      [evt.target.id]: evt.target.value,
    });
  };

  handelSubmit = evt => {
    evt.preventDefault();
    this.props.signUp(this.state);
    this.setState({
      email: '',
      password: '',
    });
  };

  render() {
    return (
      <div>
        <div id="signInForm">
          <Form onSubmit={this.handleSubmit}>
            <Form.Input
              label="First Name"
              type="text"
              name="firstName"
              value={this.state.firstName}
              placeholder="First Name"
              onChange={this.handleChange}
            />
            <Form.Input
              label="Last Name"
              type="text"
              name="lastName"
              value={this.state.lastName}
              placeholder="Last Name"
              onChange={this.handleChange}
            />
            <Form.Input
              label="Email"
              type="email"
              name="email"
              value={this.state.email}
              placeholder="Email"
              onChange={this.handleChange}
            />
            <Form.Input
              label="Password"
              type="text"
              name="password"
              value={this.state.password}
              placeholder="Password"
              onChange={this.handleChange}
            />
            {/* <div className="errorMessage">
              {authError && <span>{authError}</span>}
            </div> */}
            <Button type="submit">Sign Up</Button>
          </Form>
        </div>
      </div>
    );
  }
}
