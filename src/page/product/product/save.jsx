import React from 'react';
import PageHeader from 'component/commonCom/pageHeader.jsx';
import MUtil from 'util/mm.jsx';
import Product from 'service/product_service.jsx';
import { Form, Button } from 'antd';
import InputCom from 'component/commonCom/inputCom.jsx';
import InputNumCom from 'component/commonCom/inputNumCom.jsx';
import CategoryCascader from 'component/commonCom/categoryCascader.jsx';
import UploadImg from 'component/commonCom/uploadImg.jsx';
import RichEditor from 'component/commonCom/rich-editor.jsx';

const _mm = new MUtil(),
	  _product = new Product();

class SaveProduct extends React.Component{
	constructor(props){
		super(props);
		this.state={
			product:{
				categoryId 		: null,
				parentCategoryId: null,
				name 			: '',
				subtitle 		: '',
				subImages 		: '',
				detail 			: '',
				price 			: null,
				stock 			: null,
				status 			: 1
			}
		}
	}

	 handleSubmit(e){
		e.preventDefault();
		if(this.checkInfo()){
			console.log('验证通过');
			let url = '/manage/product/save.do';
			_product.getList(this.state.product,url).then((res)=>{
				console.log(res);
			},(err)=>{
				_mm.errorTips(err);
			})
		}
	}

	checkInfo(){
		if( typeof this.state.product.name !== 'string' || this.state.product.name.length === 0 ){
			_mm.errorTips('请输入商品名称');
			return false;
		}
		if( typeof this.state.product.subtitle !== 'string' || this.state.product.subtitle.length === 0 ){
			_mm.errorTips('请输入商品描述');
			return false;
		}
		if( typeof this.state.product.categoryId !== 'number' || this.state.product.categoryId.toString().length === 0 ){
			_mm.errorTips('请选择所属分类');
			return false;
		}
		if( typeof this.state.product.price !== 'number' || this.state.product.price <= 0 ){
			_mm.errorTips('请输入正确的价格');
			return false;
		}
		if( typeof this.state.product.stock !== 'number' || this.state.product.stock < 0 ){
			_mm.errorTips('请输入正确的库存');
			return false;
		}
		if( typeof this.state.product.subImages !== 'string' || this.state.product.subImages.length === 0 ){
			_mm.errorTips('请上传产品图片');
			return false;
		}
		if( typeof this.state.product.detail !== 'string' || this.state.product.detail.length === 0 ){
			_mm.errorTips('请输入商品描述');
			return false;
		}

		return true;
	}

	getDetailValue(e){
		this.state.product.detail = e;
		this.setState({});
	}

	getAttrValue(name,e){
		this.state.product[name] = e;
		this.setState({})
	}

	getCategory(e){
		this.state.product.categoryId = e[1]||0
		this.state.product.parentCategoryId = e[0];
		this.setState({});
	}

	getUpImg(e){
		let tmp = '';
		e.map((item)=>{
			tmp += item.response.data.uri;
		});

		this.state.product.subImages = tmp;
		this.setState({});
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
						<InputCom title='商品名称' name='name' getAttrValue = { this.getAttrValue.bind(this,'name')}/>
						<InputCom title='商品描述' name='subtitle' getAttrValue = { this.getAttrValue.bind(this,'subtitle')}/>
						<CategoryCascader title='所属分类' getCategory = {this.getCategory.bind(this)}/>
						<InputNumCom title='商品价格' unit='元' getAttrValue = { this.getAttrValue.bind(this,'price')}/>
						<InputNumCom title='商品库存' unit='件' getAttrValue = { this.getAttrValue.bind(this,'stock')}/>
						<UploadImg title='商品图片' getUpImg = {this.getUpImg.bind(this)}/>
						<RichEditor title='商品详情' getDetailValue={this.getDetailValue.bind(this)}/>
						<Button style={{margin: 'auto', display: 'block'}} type="primary" htmlType="submit" >提交</Button>
					</Form>
				</div>
			</div>
		)
	}
}

export default SaveProduct;