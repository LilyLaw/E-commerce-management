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

	logout(){
		return _mm.request({
			url:"/user/logout.do",
			type:"post"
		})
	}

	getList(pageInfo){
		return _mm.request({
			type:'post',
			url:'/manage/user/list.do',
			data:{
				pageSize:pageInfo.pageSize,
				pageNum:pageInfo.page
			}
		})
	}
}

export default User;