import React from 'react';
import { Form } from 'antd';
import Simditor from 'simditor';
import 'simditor/styles/simditor.scss'

class RichEditor extends React.Component{
	constructor(props){
		super(props)
		this.state={
			prodetail:this.props.prodetail
		}
	}

	componentDidMount(){
		if(!this.props.isDisable){
			this.initEditor();
		}
	}

	componentWillReceiveProps(nextprops){
		if((!this.props.isDisable)&&(nextprops.prodetail !== this.props.prodetail)){
			this.richEditor.setValue(nextprops.prodetail);
		}
	}

	initEditor(){
		let editor = this.refs['richEditor'];
		this.richEditor = new Simditor({
			textarea: $(editor),
			placeholder: '请输入',
			toolbar: ['title',  'bold',  'italic',  'underline',  'strikethrough',  'fontScale',  'color',  'ol',  'ul',  'blockquote',  'code',  'table',  'link',  'image',  'hr',  'indent',  'outdent',  'alignment']
		});
		this.bindValueChange();
	}

	bindValueChange(){
		this.richEditor.on('valuechanged', (e)=>{
			let value = this.richEditor.getValue();
			this.props.getDetailValue(value);
		})
	}

	render(){
		return (
			<Form.Item label={this.props.title}>
			{this.props.isDisable
				? <div dangerouslySetInnerHTML = {{__html:this.props.prodetail}}></div>
				: <textarea ref='richEditor' ></textarea>
			}
			</Form.Item>
        )
	}
}

export default RichEditor;