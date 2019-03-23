import React from 'react';
import {Button } from 'antd';
import PageHeader from '../../component/commonCom/pageHeader.jsx';
class Home extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<div id="page-wrapper">
				<PageHeader headtitle = {"用户"} />
				<div id="lll-pagebody">
					
				</div>
			</div>
		)
	}
}

export default Home;