import MUtil from 'util/mm.jsx'

const _mm = new MUtil();
class User{
	login(loginInfo){
		// let ret = ''
  //       for (let it in loginInfo) {
  //         ret += encodeURIComponent(it) + '=' + encodeURIComponent(loginInfo[it]) + '&'
  //       }
  //       ret=ret.substring(0,ret.length-1);
		// return _mm.request({
		// 	url:"/manage/user/login.do",
		// 	type:"post",
		// 	data:ret
		// })

		return _mm.request({
			url:"/manage/user/login.do",
			type:"post",
			data:loginInfo
		})
	}
}

export default User;