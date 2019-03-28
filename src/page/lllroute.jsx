import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Home from 'page/home/index.jsx';
import User from 'page/user/index.jsx';
import ErrorPage from 'page/error/index.jsx';

class LllRoute extends React.Component{
	render(){
		return (
			<Switch>
				<Route exact path="/" component={Home}/>
				<Route path="/product/man" component={Home}/>
				<Route path="/product/type" component={Home}/>
				<Route path="/order/man" component={Home}/>
				<Route path="/user/man" component={User}/>
				<Route component={ErrorPage}/>
				<Redirect from="*" to="/"/>
			</Switch>
		)
	}
}

export default LllRoute;