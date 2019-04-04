import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Home from 'page/home/index.jsx';
import User from 'page/user/index.jsx';
import ErrorPage from 'page/error/index.jsx';
import ProductList from 'page/product/product/index.jsx';
import SaveProduct from 'page/product/product/save.jsx';
import OrderList from 'page/order/index.jsx';

class LllRoute extends React.Component{
	render(){
		return (
			<Switch>
				<Route exact path="/" component={Home}/>
				<Route path="/product/man" component={ProductList}/>
				<Route path="/product/save/:id" component={SaveProduct}/>
				<Route path="/product/detail/:id" component={SaveProduct}/>
				<Route path="/product/type" component={Home}/>
				<Route path="/order/man" component={OrderList}/>
				<Route path="/user/man" component={User}/>
				<Route component={ErrorPage}/>
				<Redirect from="*" to="/"/>
			</Switch>
		)
	}
}

export default LllRoute;