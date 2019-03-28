import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import './errorpage.scss';

class ErrorPage extends React.Component{
	render(){
		return (
			<div className="lll-errorpage">
				<section className="error-container">
					<span className="four"><span className="screen-reader-text">4</span></span>
					<span className="zero"><span className="screen-reader-text">0</span></span>
					<span className="four"><span className="screen-reader-text">4</span></span>
				</section>
				<p style={{fontSize: '1.5em'}}>地址错误，找不到页面</p>
				<p>
					<Link to='/'>
					    <Button type="primary">回到首页</Button>
					</Link>
				</p>
			</div>
		)
	}
}

export default ErrorPage;