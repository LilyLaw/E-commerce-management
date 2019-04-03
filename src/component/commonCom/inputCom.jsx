import React from 'react';
import { Form, Input } from 'antd';

class InputCom extends React.Component{
	constructor(props){
		super(props)
	}

	render(){
		return (
			<Form.Item label={this.props.title}>
				{
					this.props.isDisable
					? `${this.props.prodata}`
					: <Input placeholder={`请输入${this.props.title}`} onChange={(e)=>{this.props.getAttrValue(e.target.value)}}/>
				}
			</Form.Item>
        )
	}
}

export default InputCom;