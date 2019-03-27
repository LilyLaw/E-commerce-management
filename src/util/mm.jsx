import axios from 'axios';
import qs from 'qs';

class MUtil{
	request(param){
		return new Promise((resolve,reject)=>{
			// $.ajax({
   //              type        : param.type        || 'get',
   //              url         : param.url         || '',
   //              dataType    : param.dataType    || 'json',
   //              data        : param.data        || null,
   //              success     : res => {
   //                  // 数据请求成功
   //                  if(0 === res.status){
   //                      typeof resolve === 'function' && resolve(res.data, res.msg);
   //                  }
   //                  // 没有登录状态，强制登录
   //                  else if(10 === res.status){
   //                      this.doLogin();
   //                  }
   //                  else{
   //                      typeof reject === 'function' && reject(res.msg || res.data);
   //                  }
   //              },
   //              error       : err => {
   //                  typeof reject === 'function' && reject(err.statusText);
   //              }
   //          });
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
						console.log(111,res);
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
			}
		});
	}

	// 跳转登陆
	doLogin(){
		window.location.href = `/login?redirect=${encodeURIComponent(window.location.pathname)}`;
	}
}

export default MUtil;