import React from 'react';
import { Table, Tag, Button, Input, InputNumber,Popconfirm, message, Icon } from 'antd';
import PageHeader from 'component/commonCom/pageHeader.jsx';
import MUtil from 'util/mm.jsx';
import Product from 'service/product_service.jsx';
import { Link } from 'react-router-dom';

const _mm = new MUtil(),
	  _product = new Product();

class ProductList extends React.Component{
	constructor(props){
		super(props);
		this.state={
			page:1,
			pageSize:15,
			dataSource:[],
			totalPage:1,
			productName:'',
			productId:''
		}
		this.columns = [
		  	{
				title: 'ID',
				dataIndex: 'id'
			}, {
				title: '信息',
				dataIndex: 'title'
			}, {
				title: '价格',
				dataIndex: 'price'
			},{
				title: '状态',
				dataIndex: 'status',
				render: (status,id) => (
					<div>
						{id.status === 1 ?'在售中':'已下架'}
						<Popconfirm title="Are you sure delete this task?" onConfirm={this.confirm.bind(this,{status:id.status,proid:id.id})} okText="Yes" cancelText="No">
							<Tag color={id.status === 1?"#f50":"#2db7f5"} className="lll-marginleft">{id.status === 1?'下架':'上架'} </Tag>
						</Popconfirm>
					</div>
				),
			},{
				title: '操作',
				render: (res) => (
					<div>
						<Link to={`/product/detail/${res.id}`}><Button type="primary">详情</Button></Link>
						<Link to={`/product/save/${res.id}`}><Button type="danger" className="lll-marginleft">编辑</Button></Link>
					</div>
				),
			}
		]
	}

	confirm(etag) {
		let info={
			status : parseInt(etag.status) === 1 ? 2 : 1,
			productId : parseInt(etag.proid)
		}
		_product.changeStatus(info).then((res)=>{
			message.success('修改成功');
			let info = {
					pageNum:this.state.page,
					pageSize:this.state.pageSize
				},
				url = '/manage/product/list.do';
			this.getList(info,url);
		},(err)=>{
			_mm.errorTips(err);
		})
	}

	componentDidMount(){
		let info = {
				pageNum:this.state.page,
				pageSize:this.state.pageSize
			},
			url = '/manage/product/list.do';
		this.getList(info,url);
	}

	getList(info,url){
		_product.getList(info,url).then((res)=>{
			let resarr = this.reconstrucDataSource(res.data.list);
			this.state.dataSource= resarr,
			this.state.totalPage=res.data.pages,
			this.state.page=info.pageNum
			this.setState({});
		},(err)=>{
			_mm.errorTips(err);
		})
	}

	onInputChange(name,e,){
		this.setState({	[name]:e.target?e.target.value:e });
	}
	reconstrucDataSource(arr){
		let tmp = [];
		arr.map((item,i)=>{
			let tmpItem = {
				id:item.id,
				title:`${item.name}  ${item.subtitle}`,
				price:item.price,
				key:item.id,
				status:item.status
			}
			tmp.push(tmpItem);
		});

		return tmp;
	}

	render(){
		return (
			<div className="page-wrapper">
				<PageHeader headtitle = {"商品列表"} >
					<Link to='/product/save'>
						<Button type="primary"> <Icon type="plus" /> 添加商品</Button>
 					</Link>
				</PageHeader>
				<div className="lll-pagebody">
					<div className="lll-productlist-search">
						<InputNumber min={1} placeholder="请输入产品id" onChange={this.onInputChange.bind(this,'productId')} />
						<Input placeholder="请输入产品名称" onChange={this.onInputChange.bind(this,'productName')}/>
						<Button type="primary" icon="search"
							onClick={()=>{
								let info = {
										pageNum:1,
										pageSize:15
									},
									url = '/manage/product/search.do';

								if(this.state.productId.toString().length>0){
									info.productId = this.state.productId;
								}
								if(this.state.productName.length>0){
									info.productName = this.state.productName;
								}
								this.getList(info,url);
							}}>搜索</Button>
					</div>
					<Table className='lll-table lll-productlist-table'
						dataSource={this.state.dataSource}
						columns={this.columns}

						pagination={{
							current:this.state.page,
							total:this.state.totalPage,
							pageSize:this.state.pageSize,
							onChange:(e)=>{
								let info = {
										pageNum:e,
										pageSize:this.state.pageSize
									},
									url;
								if(this.state.productId.toString().length>0||this.state.productName.length>0){
									if(this.state.productId.toString().length>0){
										info.productId = this.state.productId;
									}
									if(this.state.productName.length>0){
										info.productName = this.state.productName;
									}
									url = '/manage/product/search.do';
								}else{
									url = '/manage/product/list.do';
								}
								this.getList(info,url)
							}
						}}
					/>
				</div>
			</div>
		)
	}
}

export default ProductList;