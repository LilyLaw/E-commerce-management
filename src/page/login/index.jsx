import React from 'react';
import { Form, Icon, Input, Button, Checkbox, Card } from 'antd';

class NormalLoginForm extends React.Component{
	constructor(props){
		super(props);
		this.state={
			username:"",
			password:""
		}
	}
	handleSubmit(e){
		e.preventDefault();
	    this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
			}
	    });
	}
	onInputChange(e){
		let inputName = e.target.name,
			inputValue = e.target.value;
		this.setState({
			[inputName]:inputValue
		})
	}
	render(){
		const { getFieldDecorator } = this.props.form;
		return (
			<div id="lll-login">
				<Card title="欢迎登陆 LilyLaw's man" className="lll-login-form">
					<Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
						<Form.Item>
							{
								getFieldDecorator('userName', {
								rules: [{ required: true, message: 'Please input your username!' }],
								})(<Input name="username" onChange={this.onInputChange.bind(this)} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />)
							}
						</Form.Item>
						<Form.Item>
							{
								getFieldDecorator('password', {
								rules: [{ required: true, message: 'Please input your Password!' }],
								})(<Input name="password" onChange={this.onInputChange.bind(this)} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />)
							}
						</Form.Item>
						<Form.Item>
							<Button type="primary" htmlType="submit" className="login-form-button">Log in</Button>
						</Form.Item>
					</Form>
				</Card>
			</div>
		)
	}
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default WrappedNormalLoginForm;