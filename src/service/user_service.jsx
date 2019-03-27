import MUtil from 'util/mm.jsx'

const _mm = new MUtil();

class User{
	login(loginInfo){
		return _mm.request({
			url:"/manage/user/login.do",
			type:"post",
			data:loginInfo
		})
	}
}

export default User;