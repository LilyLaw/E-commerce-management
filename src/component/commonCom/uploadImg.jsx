import React from 'react';
import { Form, Upload, Icon, Modal, message } from 'antd';

class UploadImg extends React.Component{
	constructor(props){
		super(props)
		this.state={
			previewVisible: false,
			previewImage: '',
			fileList: [
				{
					uid: '-1',
					name: 'xxx.png',
					status: 'done',
					url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
				},
				{
					uid: '-2',
					name: 'xxx.png',
					status: 'done',
					url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
				}
			]
		}
	}

	handlePreview(e){
		console.log(e)
	}

	handleChange(e){
		console.log(e)
		let {fileList} = e;
		let status = e.file.status;
	    if (status !== 'uploading') {
	        console.log(e.file, e.fileList);
	    }
	    if (status === 'done') {
	        message.success(`${e.file.name} file uploaded successfully.`);
	    } else if (status === 'error') {
	        message.error(`${e.file.name} file upload failed.`);
	    }

	    //重新设置state
	    this.setState( {fileList});
	}

	uploadbyme(e){
		console.log(e);
	}

	render(){
		const { previewVisible, previewImage, fileList } = this.state;
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
					customRequest = {this.uploadbyme.bind(this)}
					// onPreview={this.handlePreview.bind(this)}
					// onChange={this.handleChange.bind(this)}
				>
					{fileList.length >= 5 ? null : uploadButton}
				</Upload>
			</Form.Item>
        )
	}
}

export default UploadImg;