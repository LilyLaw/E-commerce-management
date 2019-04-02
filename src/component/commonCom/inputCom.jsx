import React from 'react';
import { Form, Input } from 'antd';

class InputCom extends React.Component{
	constructor(props){
		super(props)
	}

	render(){
		return (
			<Form.Item label={this.props.title}>
				<Input placeholder={`请输入${this.props.title}`}
					readOnly = {this.props.isDisable? 'readonly' :''}
					value = {this.props.prodata}
					onChange={(e)=>{this.props.getAttrValue(e.target.value)}}
				/>
			</Form.Item>
        )
	}
}

export default InputCom;