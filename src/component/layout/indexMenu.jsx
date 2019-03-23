import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import menu from './menudata.jsx';

const SubMenu = Menu.SubMenu;

class IndexMenu extends React.Component{
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
		return <div>
			<h1 className="lll-indexmenu">LLL Man</h1>
			<Menu
				defaultSelectedKeys={['/']}
				// defaultOpenKeys={['sub1']}
				mode="inline"
				theme="dark"
	        >
	        	{menu.map((item,i)=>{ return this.renderMenu(item,i);})}
			</Menu>
		</div>
	}
}

export default IndexMenu;