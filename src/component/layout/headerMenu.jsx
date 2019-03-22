import React from 'react';
import { Menu, Dropdown, Icon } from 'antd';

const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">退出登录</a>
    </Menu.Item>
  </Menu>
);

class HeaderMenu extends React.Component{
	render(){
		return (
			<Dropdown overlay={menu}>
				<a className="ant-dropdown-link" href="#">
				<Icon type="user" /> 欢迎， admin <Icon type="down" />
				</a>
			</Dropdown>
		)
	}
}

export default HeaderMenu;