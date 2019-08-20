import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Home from '../components/Home';
import divlab from '../components/reactGrid';
// import BasicLayout from '../components/test';
// import DivLab from '../src/components/DivLab';

export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route path="/divlab" component={divlab} />
        <Route component={Home} />
      </Switch>
    );
  }
}
