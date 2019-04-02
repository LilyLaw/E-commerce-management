import React from 'react';
import { Form, Input } from 'antd';

class InputNumCom extends React.Component{
	constructor(props){
		super(props)
	}

	render(){
		return (
			<Form.Item label={this.props.title}>
				<Input type='number' addonAfter={this.props.unit}
					readOnly = {this.props.isDisable? 'readonly' :''}
					value = {this.props.prodata}
					onChange={(e)=>{this.props.getAttrValue(parseFloat(e.target.value))}}
				/>
			</Form.Item>
        )
	}
}

export default InputNumCom;