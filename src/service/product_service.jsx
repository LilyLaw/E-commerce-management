import MUtil from 'util/mm.jsx';

const _mm = new MUtil();

class Product {
	getProductList(info){
		return _mm.request({
			type:'post',
			url:'/manage/product/list.do',
			data:info
		});
	}

	getSearchProductList(info){
		return _mm.request({
			type:'post',
			url:'/manage/product/search.do',
			data:info
		});
	}
}

export default Product;