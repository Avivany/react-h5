import axios, { AxiosInstance ,InternalAxiosRequestConfig,AxiosResponse,AxiosError} from 'axios'
import {cancelRequest} from './requestCancel'
import ErrorCodeHandler from './requestCode'

/** 不需要处理异常白名单 */
const whiteList: string[] = [];

type R<T> = Res.ResponseRes<T>;

//创建实例

const instance:AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,//请求的默认前缀，只要发请求都会默认带上整个前缀
    timeout: 1000*20,//请求超时时间
    headers: { //默认请求头
        'Content-Type': 'application/json;charset=UTF-8'
    }
})

//请求拦截
instance.interceptors.request.use((config:InternalAxiosRequestConfig )=> {
  //  在请求里面添加token认证信息
  // const token = localStorage.getItem('token')
  // if(token){
  //     config.headers.Authorization = token
  // }
  
  // 设置loading

  //添加当前请求至请求队列
  cancelRequest.addPedding(config)
    return config
}, error => {
  //如果请求失败，直接返回错误
    return Promise.reject(error)
})

//响应拦截异常处理
instance.interceptors.response.use((response:AxiosResponse) => {
  const url=response.config.url as string
  //移除重复请求
  cancelRequest.removePedding(response.config)

  //处理错误响应
  if(whiteList.some(n=>n.match(url))){
    console.log('白名单,直接方向')
  }else{  
   ErrorCodeHandler(response)
  }
  if(response.data.code===200){
    return response.data
  }else{
    console.log('错误异常')
    return Promise.reject(response)
  }
}, (error:AxiosError) => {
    return Promise.reject(error)
})

export default instance