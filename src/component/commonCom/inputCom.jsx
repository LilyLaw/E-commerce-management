import React from 'react';
import { Form, Input } from 'antd';

class InputCom extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		return (
			<Form.Item label={this.props.title}>
				<Input placeholder={`请输入${this.props.title}`} />
			</Form.Item>
        )
	}
}

export default InputCom;