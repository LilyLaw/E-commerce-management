import MUtil from 'util/mm.jsx';

const _mm = new MUtil();

class Product {
	getList(info,url){
		return _mm.request({
			type:'post',
			url:url,
			data:info
		});
	}

	changeStatus(info){
		return _mm.request({
			type:'post',
			url:'/manage/product/set_sale_status.do',
			data:info
		});
	}
}

export default Product;