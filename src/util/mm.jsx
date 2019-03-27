import axios from 'axios';
import qs from 'qs';

class MUtil{
	request(param){
		return new Promise((resolve,reject)=>{
			if(param.type==="get"){
				axios.get(param.url)
					.then(function (res) {
						// 请求成功，返回用户数据
						if(0===res.status){
							typeof resolve==='function' && resolve(res.data,res.msg);
						}
						// 没有登录，强制登录
						else if(10===res.status){
							this.doLogin();
						}else{
							typeof reject==='function' && reject(res.msg || res.data);
						}
					})
					.catch(function (err) {
						typeof reject==='function' && reject(err.statusText);
					});
			}else if(param.type==="post"){
				axios({
						method:"post",
					    url:param.url,
					    headers:{
					        'Content-type': 'application/x-www-form-urlencoded'
					    },
					    data:qs.stringify(param.data)
					})
					.then(function (res) {
						// 请求成功，返回用户数据
						if(0 === res.data.status){
							typeof resolve==='function' && resolve(res.data,res.msg);
						}
						// 没有登录，强制登录
						else if(10===res.data.status){
							this.doLogin();
						}else{
							typeof reject==='function' && reject(res.msg || res.data);
						}
					})
					.catch(function (err) {
						typeof reject==='function' && reject(err.statusText);
					});
			}
		});
	}

	// 跳转登陆
	doLogin(){
		window.location.href = `/login?redirect=${encodeURIComponent(window.location.pathname)}`;
	}

	// 获取url参数
	getUrlParam(name){
		// redirect=/product&name=lily
		let queryString = window.location.search.split("?")[1]||'';

		// 正则表达式方式
		let	reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
			result = queryString.match(reg);
		return result?decodeURIComponent(result[2]):null

		// 使用qs方式
		// let resArr = qs.parse(queryString);
		// return resArr?resArr['redirect']:'';
	}

	// 错误提示
	errorTips(msg){
		console.log(msg||'好像哪里不对了')
	}
}

export default MUtil;