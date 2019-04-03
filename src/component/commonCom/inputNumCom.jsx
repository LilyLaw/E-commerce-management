import React from 'react';
import { Form, Input } from 'antd';

class InputNumCom extends React.Component{
	constructor(props){
		super(props)
	}

	render(){
		return (
			<Form.Item label={this.props.title}>
				{
					this.props.isDisable
					? `${this.props.prodata} ${this.props.unit}`
					: <Input type='number' value={this.props.prodata} addonAfter={this.props.unit} onChange={(e)=>{this.props.getAttrValue(parseFloat(e.target.value))}}/>
				}
			</Form.Item>
        )
	}
}

export default InputNumCom;