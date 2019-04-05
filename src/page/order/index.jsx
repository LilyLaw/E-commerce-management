import React from 'react';
import { Table, Button, InputNumber } from 'antd';
import PageHeader from 'component/commonCom/pageHeader.jsx';
import MUtil from 'util/mm.jsx';
import Order from 'service/order_service.jsx';
import { Link } from 'react-router-dom';

const _mm = new MUtil(), _order = new Order();

class OrderList extends React.Component{
	constructor(props){
		super(props)
		this.state={
			dataSource 	: [],
			pageSize 	: 15,
			pageNum 	: 1,
			totalPage 	: 1,
			orderNo 	: ''
		}
		this.columns = [
		  	{
				title: '订单号',
				dataIndex: 'orderNo'
			}, {
				title: '收件人',
				dataIndex: 'receiverName'
			},{
				title: '状态',
				dataIndex: 'status'
			},{
				title: '订单总价',
				dataIndex: 'payment'
			},{
				title: '创建时间',
				dataIndex: 'createTime'
			},{
				title: '操作',
				render: (res) => (<Link to={`/order/detail/${res.orderNo}`}><Button type="primary">详情</Button></Link>)
			}
		]
	}

	componentDidMount(){
		let info = {pageSize:this.state.pageSize,pageNum:this.state.pageNum}
		this.getList(info,'/manage/order/list.do');
	}

	getList(info,url){
		_order.getList(info,url).then((res)=>{
			this.state.dataSource = this.reconstrucList(res.data.list);
			this.state.totalPage = res.data.pages;
			this.state.pageNum = info.pageNum;
			this.setState({})
		},(err)=>{
			_mm.errorTips(err);
		})
	}

	reconstrucList(arr){
		let tmp = [];
		arr.map((item,i)=>{
			let rtmp = {
				orderNo 	:item.orderNo,
				receiverName:item.receiverName,
				status 		:item.status,
				payment 	:item.payment,
				createTime 	:item.createTime,
				key 		:i
			}
			tmp.push(rtmp);
		})
		return tmp;
	}

	onInputChange(e){
		this.state.orderNo = e;
		this.setState({})
	}

	render(){
		return (
			<div className="page-wrapper">
				<PageHeader headtitle = {"订单列表"} />
				<div className="lll-pagebody">
					<div className="lll-list-search">
						<InputNumber min={1} placeholder="请输入订单编号" onChange={this.onInputChange.bind(this)} />
						<Button type="primary" icon="search"
							onClick={()=>{
								let info = {
										pageNum:1,
										pageSize:15
									},url = '/manage/order/search.do';
								if(this.state.orderNo.toString().length>0){
									info.orderNo = this.state.orderNo;
								}
								this.getList(info,url);
							}}>搜索</Button>
					</div>
					<Table className='lll-table lll-ist-table'
						dataSource={this.state.dataSource}
						columns={this.columns}
						pagination={{
							current:this.state.pageNum,
							total:this.state.totalPage,
							pageSize:this.state.pageSize,
							onChange:(e)=>{
								let info = {
										pageNum:e,
										pageSize:this.state.pageSize
									},url;
								if(this.state.orderNo.toString().length>0){
									info.orderNo = this.state.orderNo;
									url = '/manage/order/search.do';
								}else{
									url = '/manage/order/list.do';
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