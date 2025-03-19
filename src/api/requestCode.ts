import type {AxiosResponse} from 'axios'
import {useNavigate} from 'react-router-dom'


const navigator=  useNavigate()
/**
 * 不需要token的接口列表
 */
const noTokenUrl:string[] = ["/login"]

/**
 * 判断是否需要token
 * @param url 
 */
export const isNeedToken = (url: string): boolean => {
    return !noTokenUrl.includes(url)  //如果url在不需要token的列表中，返回false，否则返回true 
}

/**
 * 统一处理报错
 */
export default (res: AxiosResponse):void=> {
  const code:number = res.data.code,url:string = res.config.url as string
  if (code ===401 && !isNeedToken(url)) {
    // 401 未登录，跳转到登录页
    //登录失败
    localStorage.removeItem('token');
    navigator('/login', { replace: true })
  }else if(code === 404){
    // 404 没有权限
    navigator('/404',{replace:true})
  }else{
    // 其他错误
    console.log('other error',res.data.msg)
  }
}