import React from 'react';
import { Form, Upload, Icon, Modal, message } from 'antd';
import MUtil from 'util/mm.jsx';
import Product from 'service/product_service.jsx';

const _mm = new MUtil(),_product = new Product();

class UploadImg extends React.Component{
	constructor(props){
		super(props)
		this.state={
			fileList: []
		}
	}

	handlePreview(e){
		console.log(e)
	}

	handleChange(e){
			console.log(e)
		let {fileList} = e;
	    if (e.file.status === 'done') {
	        message.success(`${e.file.name} file uploaded successfully.`);
	        this.props.getUpImg(fileList);
	    } else if (e.file.status === 'error') {
	        message.error(`${e.file.name} file upload failed.`);
	    }

	    //重新设置state
	    this.setState( {fileList});
	}

	render(){
		const { fileList } = this.state;
	    const uploadButton = (
	      <div>
	        <Icon type="plus" />
	        <div className="ant-upload-text">Upload</div>
	      </div>
	    );
		return (
			<Form.Item label='商品图片'>
				<Upload
					name="upload_file"
					action="/manage/product/upload.do"
					listType="picture-card"
					fileList={fileList}
					onPreview={this.handlePreview.bind(this)}
					onChange={this.handleChange.bind(this)}
				>
					{fileList.length >= 5 ? null : uploadButton}
				</Upload>
			</Form.Item>
        )
	}
}

export default UploadImg;