import React from 'react';
import MUtil from 'util/mm.jsx';
import ProductService from 'service/product_service.jsx';
import { Form, Cascader } from 'antd';

const _mm = new MUtil(),
	  _product = new ProductService();

class CategoryCascader extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			category:[],
			selectedCategory:null,
		}
	}

	componentDidMount(){
		this.getCategoryList(0);
	}

	getCategoryList(id){
		_product.getList({categoryId:id},'/manage/category/get_category.do')
			.then((res)=>{
				if(res.data.length>0){
					if(id===0){
						this.state.category = this.buildCategory(res.data);
					}else{
						this.state.category[id].children = this.buildCategory(res.data);
					}
					this.setState({});
				}
			},(err)=>{
				_mm.errorTips(err);
			});
	}

	buildCategory(arr){
		var tmp = [];
		arr.map((item,i)=>{
			let tmp2 = {
				value : item.id,
				label: item.name,
				key:i
			}
			tmp[item.id]=tmp2;
		});

		return tmp;
	}

	onChange(e){
		this.state.selectedCategory = e;
		this.props.getCategory(e);
		this.getCategoryList(e[e.length-1]);
	}
	render(){
		return (
			<Form.Item label={this.props.title}>
				<Cascader options={this.state.category} onChange={this.onChange.bind(this)} />
			</Form.Item>
        )
	}
}

export default CategoryCascader;