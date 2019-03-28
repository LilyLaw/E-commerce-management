import axios from 'axios';
import qs from 'qs';

class MUtil{
	request(param){
		return new Promise((resolve,reject)=>{
			axios({
				method:param.type,
			    url:param.url,
			    headers:{'Content-type': 'application/x-www-form-urlencoded'},
			    data:param.data?qs.stringify(param.data):''
			})
			.then((res) => {
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
			.catch((err) => {
				typeof reject==='function' && reject(err.statusText);
			});
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
		console.log(msg);
		// alert(msg||'好像哪里不对了');
	}

	// localStorage 本地存储数据		思考过期时间的处理
	setStorage(key,value){
		let dataType = typeof value;

		// 对象
		if(dataType === "object"){
			window.localStorage.setItem(key,JSON.stringify(value));
		}
		// 基础类型
		else if(['number','string','boolean'].indexOf(dataType) >= 0){
			window.localStorage.setItem(key,value);
		}
		// function 或其他类型
		else{
			alert("该类型不能用于本地存储");
		}
	}

	// localStorage 本地存储取数据
	getStorage(key){
		let data = window.localStorage.getItem(key);
		if(data){
			return JSON.parse(data);
		}else{
			return '';
		}
	}

	// localStorage 删除本地存储
	removeStorage(key){
		window.localStorage.removeItem(key);
	}
}

export default MUtil;