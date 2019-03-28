import React from 'react';
import { Table } from 'antd';
import PageHeader from 'component/commonCom/pageHeader.jsx';
import MUtil from 'util/mm.jsx';
import User from 'service/user_service.jsx';

const _mm = new MUtil();
const _user = new User();

let dataSource = [];
const columns = [{
  title: 'ID',
  dataIndex: 'id'
}, {
  title: '用户名',
  dataIndex: 'username'
}, {
  title: '邮箱',
  dataIndex: 'email'
},{
  title: '电话',
  dataIndex: 'phone'
},{
  title: '注册时间',
  dataIndex: 'createTime'
}];


class Home extends React.Component{
	constructor(props){
		super(props);
		this.state={
			page:1,
			pageSize:15
		}
	}

	componentWillMount(){
		this.changePage(1);
	}

	changePage(e){
		_user.getList({
			pageSize:this.state.pageSize,
			page:parseInt(e)
		}).then((res)=>{
			let tmp = []
			res.data.list.map((item,i)=>{
				let tmpItem = item;
				tmpItem.key = item.id;
				tmp.push(tmpItem);
			});
			dataSource = tmp;
			this.setState({
				page:e,
				totalPage:res.data.pages
			})
		},(err)=>{
			_mm.errorTips(err);
		})
	}

	render(){
		return(
			<div id="page-wrapper">
				<PageHeader headtitle = {"用户"} />
				<div className="lll-pagebody">
					<Table className='lll-table'
						dataSource={dataSource}
						columns={columns}
						pagination={{
							defaultCurrent:this.state.page,
							total:this.state.totalPage,
							pageSize:this.state.pageSize,
							onChange:(e)=>{this.changePage(e)}
						}}
					/>
				</div>
			</div>
		)
	}
}

export default Home;