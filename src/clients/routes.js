import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Home from '../components/Home';
import divlab from '../components/reactGrid';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';

export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/signIn" component={SignIn} />
        <Route exact path="/signUp" component={SignUp} />
        <Route path="/divlab" component={divlab} />
        <Route component={Home} />
      </Switch>
    );
  }
}
