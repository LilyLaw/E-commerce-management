import React from 'react';
import PageHeader from 'component/commonCom/pageHeader.jsx';
import { Form, Table, Input } from 'antd';
import MUtil from 'util/mm.jsx';
import Order from 'service/order_service.jsx';

const _mm = new MUtil(),
	  _order = new Order();

class OrderDetail extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			id : this.props.match.params.id,
			order:''
		}
		this.columns = [
		  	{
				title: '商品图片',
				dataIndex: 'productImage',
				render:(productImage)=>{
					return <div style={{width:"10em"}}><img style={{width:"100%",height:'auto'}} src={`${this.state.order.imageHost}${productImage}`} alt=""/></div>
				}
			}, {
				title: '商品信息',
				dataIndex: 'productName'
			}, {
				title: '单价',
				dataIndex: 'currentUnitPrice'
			},{
				title: '数量',
				dataIndex: 'quantity'
			}, {
				title: '合计',
				dataIndex: 'totalPrice'
			},
		]
	}

	componentDidMount(){
		let url = '/manage/order/detail.do';
		let info = {orderNo:this.state.id};
		_order.getList(info,url).then((res)=>{
			this.state.order = res.data;
			this.state.dataSource = this.reconstrucTable(res.data.orderItemVoList);
			this.setState({})
		},(err)=>{
			_mm.errorTips(err);
		})
	}

	reconstrucTable(arr){
		let tmp = [];
		arr.map((item,i)=>{
			let rtmp = {
				productImage:item.productImage,
				productName:item.productName,
				currentUnitPrice:item.currentUnitPrice,
				quantity:item.quantity,
				totalPrice:item.totalPrice,
				key:i
			}
			tmp.push(rtmp);
		});
		return tmp;
	}

	render(){
		let formItemLayout = {labelCol: {xs: { span: 24 },sm: { span: 4 }},
				wrapperCol: {xs: { span: 24 },sm: { span: 16 }}};
		return (
			<div className="page-wrapper">
				<PageHeader headtitle = {"订单列表"} />
				<div className="lll-pagebody">
					<Form {...formItemLayout}>
						<Form.Item label='订单号：'>
							<Input value={this.state.order.orderNo}/>
						</Form.Item>
						<Form.Item label='创建时间：'>
							<Input value={this.state.order.createTime}/>
						</Form.Item>
						<Form.Item label='收件人：'>
							<Input value={this.state.order.receiverName}/>
						</Form.Item>
						<Form.Item label='订单状态：'>
							<Input value={this.state.order.statusDesc}/>
						</Form.Item>
						<Form.Item label='支付方式：'>
							<Input value={this.state.order.paymentTypeDesc}/>
						</Form.Item>
						<Form.Item label='订单金额：'>
							<Input value={this.state.order.payment}/>
						</Form.Item>
					</Form>
					<Table className='lll-table lll-list-table'
						dataSource={this.state.dataSource}
						columns={this.columns}
					/>
				</div>
			</div>
		)
	}
}

export default OrderDetail;