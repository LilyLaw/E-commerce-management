import React from 'react';
import PageHeader from 'component/commonCom/pageHeader.jsx';
import MUtil from 'util/mm.jsx';
import Product from 'service/product_service.jsx';
import { Form, Button } from 'antd';
import InputCom from 'component/commonCom/inputCom.jsx';
import InputNumCom from 'component/commonCom/inputNumCom.jsx';
import CategoryCascader from 'component/commonCom/categoryCascader.jsx';
import UploadImg from 'component/commonCom/uploadImg.jsx';

const _mm = new MUtil(),
	  _product = new Product();

	  // categoryId=1
	  // name=三星洗衣机
	  // subtitle=三星大促销
	  // subImages=test.jpg,11.jpg,2.jpg,3.jpg
	  // detail=detailtext
	  // price=1000
	  // stock=100
	  // status=1


class SaveProduct extends React.Component{
	constructor(props){
		super(props)
		this.state={
			product:{
				categoryId : null,
				name : '',
				subtitle : '',
				subImages : [],
				detail : '',
				price : 0,
				stock : 0,
				status : 1
			}
		}
	}

	 handleSubmit(e){
	 	console.log(e)
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
			console.log('Received values of form: ', values);
			}
		});
	}




	render(){
		const formItemLayout = {
			labelCol: {
				xs: { span: 24 },
				sm: { span: 4 },
			},
			wrapperCol: {
				xs: { span: 24 },
				sm: { span: 16 },
			},
		};

		return (
			<div className="page-wrapper">
				<PageHeader headtitle = {"商品列表--添加商品"} />
				<div className="lll-pagebody">
					<Form {...formItemLayout} onSubmit={this.handleSubmit.bind(this)}>
						<InputCom title='商品名称' />
						<InputCom title='商品描述' />
						<CategoryCascader title='所属分类'/>
						<InputNumCom title='商品价格' unit='元'/>
						<InputNumCom title='商品库存' unit='件'/>
						<UploadImg title='商品图片' />

						<Button>sdfsd</Button>
					</Form>
				</div>
			</div>
		)
	}
}

export default SaveProduct;