import React from 'react';
import {Button } from 'antd';
import PageHeader from 'component/commonCom/pageHeader.jsx';
import IndexStatistic from 'component/commonCom/indexStatistic.jsx';
import MUtil from 'util/mm.jsx';
import Statistic from 'service/statistic-service.jsx';

const _statistic = new Statistic();
const _mm = new MUtil();
let boxArr = {
	'user':{
		name:'用户总数',
		count:'-',
		icon:'user',
		backgroundcolor:'#f0ad4e',
		url:'/user/man'
	},
	'product':{
		name:'商品总数',
		count:'-',
		icon:'ordered-list',
		backgroundcolor:'#5cb85c',
		url:'/product/man'
	},
	'order':{
		name:'订单总数',
		count:'-',
		icon:'check',
		backgroundcolor:'#4cb1cf',
		url:'/order/man'
	}
};

class Home extends React.Component{
	constructor(props){
		super(props);
		this.state={}
	}

	componentDidMount(){
		this.loadCount();
	}

	loadCount(){
		_statistic.getHomeCount().then((res)=>{
			let allstatistic = {};
			Object.keys(boxArr).map((item,i)=>{
				for(let k in res.data){
					if(k.indexOf(item)!==-1){
						let tmp = boxArr[item];
						tmp.count = res.data[k];
						allstatistic[item] = tmp;
					}
				}
			});
			boxArr = allstatistic;
			this.setState(res.data)
		},(err)=>{
			_mm.errorTips(err);
		})
	}

	render(){
		return(
			<div id="page-wrapper">
				<PageHeader headtitle = {"首页"} />
				<div className="lll-pagebody">
					<div className="indexCon">
						{Object.keys(boxArr).map((item,i)=>{
							return <IndexStatistic data = {boxArr[item]} key={i}/>
						})}
					</div>
				</div>
			</div>
		)
	}
}

export default Home;