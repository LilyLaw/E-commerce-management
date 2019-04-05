import MUtil from 'util/mm.jsx';

const _mm = new MUtil();

class OrderService {
	getList(info,url){
		return _mm.request({
			type:'post',
			data:info,
			url:url
		})
	}
}

export default OrderService;