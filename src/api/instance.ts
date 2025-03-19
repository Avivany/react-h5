import axios, { AxiosInstance ,InternalAxiosRequestConfig,AxiosResponse,AxiosError} from 'axios'
import {cancelRequest} from './requestCancel'
import {checkStatus} from './checkStatus'
import {Toast} from 'antd-mobile'
// import ErrorCodeHandler from './requestCode'

/** 不需要处理异常白名单 */
const whiteList: string[] = [];

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
  const token = localStorage.getItem('token')
  if(token){
      config.headers.Authorization = `Bearer ${token} `
  }
  
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
  console.log('响应拦截',response  )
  const url=response.config.url as string
  const { status, data} = response
  //移除重复请求
  cancelRequest.removePedding(response.config)

  //处理错误响应
  if(whiteList.some(n=>n.match(url))){
    console.log('白名单,直接方向')
  }else{  
  //  ErrorCodeHandler(response)
  }
  if(status===200){
    //接口网络请求成功，关闭等待提示
    if(data.code===0){
      return response.data
    }else{
      console.log('错误异常')
      checkStatus(data.code,data.message)
      return Promise.reject(data)
    }
    
  }
}, (error:AxiosError) => {
  const {response}=error
  //响应失败，关闭等待；
  if(JSON.stringify(error).includes('Network Error')){
    Toast.show({
      content: '网络异常，请检查网络连接',
      duration: 2000,
      icon: 'fail'
    })
  }
  //更具状态码判断不同错误
  checkStatus(response!.status)
    return Promise.reject(error)
})

export default instance