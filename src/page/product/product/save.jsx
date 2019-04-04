import React from 'react';
import PageHeader from 'component/commonCom/pageHeader.jsx';
import MUtil from 'util/mm.jsx';
import Product from 'service/product_service.jsx';
import { Form, Button, Input } from 'antd';
import CategoryCascader from 'component/commonCom/categoryCascader.jsx';
import UploadImg from 'component/commonCom/uploadImg.jsx';
import RichEditor from 'component/commonCom/rich-editor.jsx';

const _mm = new MUtil(),
	  _product = new Product();

class SaveProduct extends React.Component{
	constructor(props){
		super(props);
		this.state={
			id:this.props.match.params.id,
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
			},
			curStatus: this.props.match.params.id?((this.props.match.path.indexOf('save')!==-1)?'edit':'detail'):'new'
		}
	}

	componentDidMount(){
		let id = this.state.id;
		this.getProdet(id);
	}

	getProdet(id){
		if(id){
			_product.getList({productId:id},'/manage/product/detail.do').then((res)=>{
				this.state.product = res.data;
				this.setState({});
			},(err)=>{
				_mm.errorTips(err);
			})
		}
	}

	handleSubmit(e){
		const {form} = this.props;
		e.preventDefault();
	    this.props.form.validateFields((err, values) => {
	    	if(!err && this.checkInfo()){
	    		let allInputValue = form.getFieldsValue();
				for(let key in allInputValue){
					this.state.product[key] = allInputValue[key];
				}
				let product = {
					name		: allInputValue.name,
					subtitle	: allInputValue.subtitle,
					categoryId	: parseInt(this.state.product.categoryId),
					price		: parseFloat(allInputValue.price),
					stock		: parseInt(allInputValue.stock),
					subImages	: this.state.product.subImages,
					status		: this.state.product.status,
					detail		: this.state.product.detail
				}

				if(this.state.curStatus==='edit'){
					product.id = parseInt(this.state.product.id);
				}

	    		let url = '/manage/product/save.do';
				_product.getList(product,url).then((res)=>{
					console.log(res)
					alert(res.data);
					// window.location.href='/product/man';
				},(err)=>{
					_mm.errorTips(err);
				})
	    	}
	    })
	}

	checkInfo(){
		if( typeof this.state.product.categoryId !== 'number' || this.state.product.categoryId.toString().length === 0 ){
			_mm.errorTips('请选择所属分类');
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
	getCategory(e){
		this.state.product.categoryId = e[1]||0
		this.state.product.parentCategoryId = e[0];
		this.setState({});
	}

	getUpImg(e){
		let tmp = '';
		e.map((item)=>{
			if(item.response){
				tmp += item.response.data.uri;
			}else{
				tmp += item.name;
			}
			tmp += ',';
		});

		tmp = tmp.substring(0,tmp.length-1);
		this.state.product.subImages = tmp;
		this.setState({});
	}

	render(){
		let curStatus = this.state.curStatus,
			product = this.state.product,
			{ getFieldDecorator } = this.props.form,
			formItemLayout = {labelCol: {xs: { span: 24 },sm: { span: 4 }},
				wrapperCol: {xs: { span: 24 },sm: { span: 16 }}};
		return (
			<div className="page-wrapper">
				<PageHeader headtitle = {"商品列表--添加商品"} />
				<div className="lll-pagebody">
					<Form {...formItemLayout} onSubmit={this.handleSubmit.bind(this)}>
						<Form.Item label='商品名称'>
							{curStatus==='detail'
								? 	`${product.name}`
								: 	getFieldDecorator('name' ,{
										initialValue:product.name,
										rules:[{required: true, message: '请输入商品名称!' }]
									})(<Input placeholder={`请输入商品名称`}/>)
							}
						</Form.Item>
						<Form.Item label='商品描述'>
							{curStatus==='detail'
								? 	`${product.subtitle}`
								: 	getFieldDecorator('subtitle' ,{
										initialValue:product.subtitle,
										rules:[{required: true, message: '请输入商品描述!' }]
									})(<Input placeholder={`请输入商品描述`}/>)
							}
						</Form.Item>
						<CategoryCascader
							isDisable={curStatus==='detail'}
							title='所属分类'
							categoryId={{parentC:product.parentCategoryId, selfC:product.categoryId}}
							getCategory={this.getCategory.bind(this)}
						/>
						<Form.Item label='商品价格'>
							{curStatus==='detail'
								? 	`${product.price}`
								: 	getFieldDecorator('price' ,{
										initialValue:product.price,
										rules:[{required: true, message: '请输入商品价格!' }]
									})(<Input addonAfter='元' placeholder={`请输入商品价格`}/>)
							}
						</Form.Item>
						<Form.Item label='商品库存'>
							{curStatus==='detail'
								? 	`${product.stock}`
								: 	getFieldDecorator('stock' ,{
										initialValue:product.stock,
										rules:[{required: true, message: '请输入商品库存!' }]
									})(<Input addonAfter='件' placeholder={`请输入商品库存`}/>)
							}
						</Form.Item>
						<UploadImg
							isDisable={curStatus==='detail'}
							imgHost={curStatus!=='new'?product.imageHost:''}
							imgdata={curStatus!=='new'?product.subImages:''}
							title='商品图片'
							getUpImg={this.getUpImg.bind(this)}/>
						<RichEditor
							isDisable={curStatus==='detail'}
							prodetail={curStatus!=='new'?product.detail:''}
							title='商品详情'
							getDetailValue={this.getDetailValue.bind(this)}/>
						<Button style={{margin: 'auto', display: 'block'}} type="primary" htmlType="submit" >提交</Button>
					</Form>
				</div>
			</div>
		)
	}
}

SaveProduct = Form.create({})(SaveProduct);
export default SaveProduct;