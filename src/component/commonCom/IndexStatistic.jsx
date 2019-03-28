import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';

class IndexStatistic extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return (
			<Link className="index-e-box" style={{background:this.props.data.backgroundcolor}} to={this.props.data.url}>
				<h1>{this.props.data.count}</h1>
				<p> <Icon type={this.props.data.icon} /> {this.props.data.name} </p>
			</Link>
		)
	}
}

export default IndexStatistic;