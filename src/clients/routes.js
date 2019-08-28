import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../components/Home';
import divlab from '../components/reactGrid';
import divlabTwo from '../components/divlab2';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import UserProjects from '../components/UserProjects';
import AboutUs from '../components/AboutUs';

export default class Routes extends Component {
	render() {
		return (
			<Switch>
				<Route exact path="/home" component={Home} />
				<Route exact path="/about" component={AboutUs} />
				<Route exact path="/signIn" component={SignIn} />
				<Route exact path="/signUp" component={SignUp} />
				<Route exact path="/projects" component={UserProjects} />
				<Route exact path="/divlab/:id" component={divlabTwo} />
				<Route path="/divlab" component={divlab} />
				<Route component={Home} />
			</Switch>
		);
	}
}
