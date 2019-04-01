import React from 'react';
import { Form, Input } from 'antd';

class InputNumCom extends React.Component{
	constructor(props){
		super(props)
	}
	onChange(e){
		console.log(e)
	}
	render(){
		return (
			<Form.Item label={this.props.title}>
				<Input type='number' addonAfter={this.props.unit} defaultValue="mysite" />
			</Form.Item>
        )
	}
}

export default InputNumCom;