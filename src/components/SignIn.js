import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signIn } from '../store/authReducer';
import { Button, Form } from 'semantic-ui-react';

class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };

    this.handleChange = this.handelChange.bind(this);
    this.handleSubmit = this.handelSubmit.bind(this);
  }

  handelChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  };

  handelSubmit = evt => {
    evt.preventDefault();
    this.props.signIn(this.state);
    this.setState({
      email: '',
      password: '',
    });
  };

  render() {
    const { authError } = this.props;

    return (
      <div>
        <div id="signInForm">
          <Form onSubmit={this.handleSubmit}>
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
            <div className="errorMessage">
              {authError && <span>{authError}</span>}
            </div>
            <Button type="submit">Sign In</Button>
          </Form>
        </div>
        <br />
        <Link to="/signUp">Sign Up</Link>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signIn: credentials => dispatch(signIn(credentials)),
  };
};

const mapStateToProps = state => {
  return {
    authError: state.auth.authError,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
