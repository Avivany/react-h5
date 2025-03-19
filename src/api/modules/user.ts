import $http from '../index'

//模块下的所有api接口，统一管理；
const userApi={
  login:'/api/user/login',  // 用户登录接口
  register:'/api/user/register',  // 用户注册接口
  userInfo:'/api/user/userinfo'   // 用户信息
}

/**
 * 用户登录接口
 * @param data {username,password} 登录参数
 * @return {token} 返回请求登录接口的结果token
 */
export const login = (data:Record<string,any>) => {
  return $http.post<IResponse<{token:string,useInfo:User}>>(userApi.login,data)
}
