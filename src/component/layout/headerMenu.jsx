import React from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import MUtil from 'util/mm.jsx';
import User from 'service/user_service.jsx';

const _mm = new MUtil();
const _user = new User();

class HeaderMenu extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			username : _mm.getStorage('userInfo')['username']||''
		}
	}

	logOut(){
		_user.logout().then((res)=>{
			_mm.removeStorage('userInfo');
			window.location.href = '/login';
			// this.props.history.push('/login');
		},(err)=>{
			_mm.errTips(err);
		})
	}

	render(){
		const menu = (
		  <Menu>
		    <Menu.Item>
		      <a target="_blank" rel="noopener noreferrer" onClick = {()=>{this.logOut()}}>退出登录</a>
		    </Menu.Item>
		  </Menu>
		);

		return (
			<Dropdown overlay={menu}>
				<a className="ant-dropdown-link" href="#">
				<Icon type="user" />
					{
						this.state.username.length > 0
						? `欢迎，${this.state.username}`
						: `欢迎您，请登录`
					}
				<Icon type="down" />
				</a>
			</Dropdown>
		)
	}
}

export default HeaderMenu;