import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Home from 'page/home/index.jsx';
import User from 'page/user/index.jsx';

class LllRoute extends React.Component{
	render(){
		return (
			<Switch>
				<Route exact path="/" component={Home}/>
				<Route exact path="/product/man" component={Home}/>
				<Route exact path="/product/type" component={Home}/>
				<Route exact path="/order/man" component={Home}/>
				<Route exact path="/user/man" component={User}/>
				<Redirect from="*" to="/"/>
			</Switch>
		)
	}
}

export default LllRoute;