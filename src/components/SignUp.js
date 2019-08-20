import React, { Component } from 'react';

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
  };

  render() {
    return (
      <div>
        <div>
          <form onSubmit={this.handleSubmit}>
            <h5>Sign Up</h5>
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
            <div className="input-field">
              <label htmlFor="firstName">First Name</label>
              <input type="text" id="firstName" onChange={this.handleChange} />
            </div>
            <div className="input-field">
              <label htmlFor="lastName">Last Name</label>
              <input type="text" id="lastName" onChange={this.handleChange} />
            </div>
            <div className="input-field">
              <button className="btn pink lighten-1 z-depth-0">Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
