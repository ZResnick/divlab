import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Home from '../components/Home';
import divlab from '../components/reactGrid';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import UserProjects from '../components/UserProjects';

export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/signIn" component={SignIn} />
        <Route exact path="/signUp" component={SignUp} />
        <Route exact path="/projects" component={UserProjects} />
        <Route exact path="/divlab/:id" component={divlab} />
        <Route path="/divlab" component={divlab} />
        <Route component={Home} />
      </Switch>
    );
  }
}
