import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signIn } from '../store/authReducer';

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
      [evt.target.id]: evt.target.value,
    });
  };

  handelSubmit = evt => {
    evt.preventDefault();
    this.setState({
      email: '',
      password: '',
    });
    this.props.signIn(this.state);
  };

  render() {
    const { authError } = this.props;

    return (
      <div>
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <h5>Sign In</h5>
            <div>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" onChange={this.handleChange} />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                onChange={this.handleChange}
              />
            </div>
            <div>
              <button type="submit">Sign In</button>
              <Link to="/signUp">
                <button>Sign Up</button>
              </Link>
            </div>
            <div className="errorMessage">
              {authError && <p>{authError}</p>}
            </div>
          </form>
        </div>
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
