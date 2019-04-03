import React from 'react';
import { Form, Input } from 'antd';

class InputCom extends React.Component{
	constructor(props){
		super(props)
		this.state={
			status:this.props.isDisable
		}
	}
	render(){
		return (
			<Form.Item label={this.props.title}>
				{
					this.props.isDisable
					? `${this.props.prodata}`
					: <Input placeholder={`请输入${this.props.title}`} 
							value={this.props.prodata} 
							onChange={(e)=>{this.props.getAttrValue(e.target.value)}}/>
				}
			</Form.Item>
        )
	}
}

export default InputCom;