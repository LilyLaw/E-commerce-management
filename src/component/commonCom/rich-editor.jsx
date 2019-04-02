import React from 'react';
import { Form } from 'antd';
import Simditor from 'simditor';
import 'simditor/styles/simditor.scss'

class RichEditor extends React.Component{
	constructor(props){
		super(props)
	}

	componentDidMount(){
		this.initEditor();
	}

	initEditor(){
		let editor = this.refs['richEditor'];

		this.richEditor = new Simditor({
			textarea: $(editor),
			placeholder: '请输入',
			toolbar: ['title',  'bold',  'italic',  'underline',  'strikethrough',  'fontScale',  'color',  'ol',  'ul',  'blockquote',  'code',  'table',  'link',  'image',  'hr',  'indent',  'outdent',  'alignment'],
			
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
				<textarea ref='richEditor' ></textarea>
			</Form.Item>
        )
	}
}

export default RichEditor;