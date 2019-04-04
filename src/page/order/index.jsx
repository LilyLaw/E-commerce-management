import React from 'react';
import { Table } from 'antd';
import PageHeader from 'component/commonCom/pageHeader.jsx';
import MUtil from 'util/mm.jsx';
import Order from 'service/order_service.jsx';
import { Link } from 'react-router-dom';

const _mm = new MUtil(), _order = new Order();

class OrderList extends React.Component{
	constructor(props){
		super(props)
		this.state={

		}
		this.columns = [
		  	{
				title: '订单号',
				dataIndex: 'id'
			}, {
				title: '收件人',
				dataIndex: 'title'
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
				)
			},{
				title: '订单总价',
				dataIndex: 'price'
			},{
				title: '创建时间',
				dataIndex: 'createtime'
			},{
				title: '操作',
				render: (res) => (
					<div>
						<Link to={`/product/detail/${res.id}`}>
							<Button type="primary">详情</Button>
						</Link>
						<Link to={`/product/save/${res.id}`}>
							<Button type="danger" className="lll-marginleft">编辑</Button>
						</Link>
					</div>
				),
			}
		]
	}
 
	render(){
		return (
			<div className="page-wrapper">
				<PageHeader headtitle = {"订单列表"} />
				<div className="lll-pagebody">
					<div className="lll-list-search">
						
					</div>
					<Table className='lll-table lll-ist-table'
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

export default OrderList;