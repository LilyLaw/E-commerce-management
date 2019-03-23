import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router } from 'react-router-dom';
import IndexMenu from 'component/layout/indexMenu.jsx';
import HeaderMenu from 'component/layout/headerMenu.jsx';
import LllRoute from 'page/lllroute.jsx'
import { Layout } from 'antd';
import 'antd/dist/antd.css'
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
			<Router>
				<Layout id="lllwrap">
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
			</Router>
		)
	}
}

ReactDOM.render(<App />,document.getElementById("app"));