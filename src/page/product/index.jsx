import React from 'react';
import { Table, Tag, Button, Input, InputNumber  } from 'antd';
import PageHeader from 'component/commonCom/pageHeader.jsx';
import MUtil from 'util/mm.jsx';
import Product from 'service/product_service.jsx';

const _mm = new MUtil(),
	  _product = new Product(),
	  columns = [
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
				render: status => (
					<div>
						{status ===1 ?'在售中':'已下架'}
						{status ===1 ?<Tag color="#f50" className="lll-marginleft">下架</Tag>:<Tag color="#2db7f5" className="lll-marginleft">上架</Tag>}
					</div>
				),
			},{
				title: '操作',
				dataIndex: 'createTime',
				render: () => (
					<div>
						<Button type="primary">编辑</Button>
						<Button type="danger" className="lll-marginleft">删除</Button>
					</div>
				),
			}
		];
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
	}

	componentDidMount(){
		let info = {
			pageNum:this.state.page,
			pageSize:this.state.pageSize
		}
		this.changePage(info);
	}

	changePage(info){
		_product.getProductList(info).then((res)=>{
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

	serachProduct(info){
		_product.getSearchProductList(info).then((res)=>{
			let resarr = this.reconstrucDataSource(res.data.list);
			this.state.dataSource= resarr,
			this.state.totalPage=res.data.pages,
			this.state.page=info.pageNum
			this.setState({});
		},(err)=>{
			_mm.errorTips(err);
		})
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
				<PageHeader headtitle = {"商品列表"} />
				<div className="lll-pagebody">
					<div className="lll-productlist-search">
						<InputNumber min={1} placeholder="请输入产品id" onChange={this.onInputChange.bind(this,'productId')} />
						<Input placeholder="请输入产品名称" onChange={this.onInputChange.bind(this,'productName')}/>
						<Button type="primary" icon="search"
								onClick={()=>{
									let info = {
										pageNum:1,
										pageSize:15,
										productId:this.state.productId,
										productName:this.state.productName
									}
									this.serachProduct(info);
								}}>搜索</Button>
					</div>
					<Table className='lll-table lll-productlist-table'
						dataSource={this.state.dataSource}
						columns={columns}
						pagination={{
							defaultCurrent:this.state.page,
							total:this.state.totalPage,
							pageSize:this.state.pageSize,
							onChange:(e)=>{
								let info = {
									pageNum:e,
									pageSize:this.state.pageSize
								}
								if(this.state.productId.toString().length>0||this.state.productName.length>0){
									if(this.state.productId.toString().length>0){
										info.productId = this.state.productId;
									}
									if(this.state.productName.length>0){
										info.productName = this.state.productName;
									}

									this.serachProduct(info);
								}else{
									this.changePage(info)
								}

							}
						}}
					/>
				</div>
			</div>
		)
	}
}

export default ProductList;