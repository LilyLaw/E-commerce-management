import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Link, Route, Redirect} from 'react-router-dom';
import 'antd/dist/antd.css'
import Home from 'page/home/index.jsx';
// import LLLHome from 'component/layout/index.jsx';
import IndexMenu from 'component/layout/indexMenu.jsx';
import HeaderMenu from 'component/layout/headerMenu.jsx';

import { Layout } from 'antd';
import 'component/style.scss';

const {
  Header, Footer, Sider, Content,
} = Layout;

class App extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return (
			<Layout id="lllwrap">
		        <Sider collapsible={true}>
					<IndexMenu/>
		        </Sider>
				<Layout>
					<Header className="lllheader">
						<HeaderMenu />
					</Header>
			        <Content>
						<Router>
							<Switch>
								<Route exact path="/" component={Home}/>
								<Redirect from="*" to="/"/>
							</Switch>
						</Router>
			        </Content>
		      	</Layout>
			</Layout>
		)
	}
}

ReactDOM.render(<App />,document.getElementById("app"));