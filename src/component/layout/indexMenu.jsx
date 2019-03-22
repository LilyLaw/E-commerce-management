import React from 'react';
import { Menu, Icon } from 'antd';

const SubMenu = Menu.SubMenu;


class IndexMenu extends React.Component{
	render(){
		return <div>
			<h1 className="lll-indexmenu">LLL Man</h1>
			<Menu
				defaultSelectedKeys={['1']}
				defaultOpenKeys={['sub1']}
				mode="inline"
				theme="dark"
	        >
				<Menu.Item key="1">
					<Icon type="pie-chart" />
					<span>首页</span>
				</Menu.Item>
				<SubMenu key="sub1" title={<span><Icon type="mail" /><span>商品</span></span>}>
					<Menu.Item key="5">商品管理</Menu.Item>
					<Menu.Item key="6">品类管理</Menu.Item>
				</SubMenu>
				<SubMenu key="sub2" title={<span><Icon type="appstore" /><span>订单</span></span>}>
					<Menu.Item key="9">订单管理</Menu.Item>
				</SubMenu>
				<SubMenu key="sub3" title={<span><Icon type="appstore" /><span>用户</span></span>}>
					<Menu.Item key="7">用户列表</Menu.Item>
				</SubMenu>
			</Menu>
		</div>
	}
}

export default IndexMenu;