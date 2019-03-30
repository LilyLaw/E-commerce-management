import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import IndexMenu from 'component/layout/indexMenu.jsx';
import HeaderMenu from 'component/layout/headerMenu.jsx';
import LllRoute from './lllroute.jsx';
import NormalLoginForm from 'page/login/index.jsx';
import { Layout } from 'antd';
import 'antd/dist/antd.css'
import './style.scss';

const {
  Header, Footer, Sider, Content,
} = Layout;

class App extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return (
			<Router>
				<Switch>
					<Route path="/login" component={NormalLoginForm}/>
					<Route path="/" render={(props)=>{
						return <Layout id="lllwrap">
					        <Sider collapsible={true}>
								<IndexMenu/>
					        </Sider>
							<Layout>
								<Header className="lllheader">
									<HeaderMenu />
								</Header>
						        <Content>
									<LllRoute />
						        </Content>
					      	</Layout>
						</Layout>
					}}/>
				</Switch>
			</Router>
		)
	}
}

ReactDOM.render(<App />,document.getElementById("app"));