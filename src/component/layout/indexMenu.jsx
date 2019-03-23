import React from 'react';
import { Menu, Icon } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import menu from './menudata.jsx';

const SubMenu = Menu.SubMenu;

class IndexMenu extends React.Component{
	constructor(props){
		super(props);
		console.log(this.props)
	}
	renderMenu(item,i){
		if(item.children){
			return (
				<SubMenu key={item.url} title={<Link to={item.url}><span><Icon type="mail" /><span>{item.name}</span></span></Link>}>
					{item.children.map((itemc,j)=>{return this.renderMenu(itemc,j);})}
				</SubMenu>
			)
		}else{
			return (
				<Menu.Item key={item.url}>
					<Link to={item.url}>
						<Icon type="pie-chart" />
						<span>{item.name}</span>
					</Link>
				</Menu.Item>
			)
		}
	}
	render(){
		let location = this.props.location.pathname;
		return <div>
			<h1 className="lll-indexmenu">LLL Man</h1>
			<Menu
				selectedKeys = {[location]}
				mode="inline"
				theme="dark"
	        >
	        	{menu.map((item,i)=>{ return this.renderMenu(item,i);})}
			</Menu>
		</div>
	}
}

export default withRouter((props)=>{
	let {location} = props;
	return <IndexMenu location={location}></IndexMenu>
});