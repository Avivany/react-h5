import {AxiosRequestConfig} from 'axios'
import instance from './instance'

/** GET请求 */
export const get = <T=any,P=Record<string,any>>(url: string, params?: P,config?: AxiosRequestConfig):Promise<IResponse<T>> => {
return instance<IResponse<T>>({
method: 'GET',
url,
params,
...config
}).then(res=>res?.data)
.catch(err=>Promise.reject(err))
} 

/** POST请求 */
export const post = <T=any,P=Record<string,any>>(url: string, data?: P,config?: AxiosRequestConfig):Promise<IResponse<T>> => {
  return instance<IResponse<T>>({
  method: 'POST',
  url,
  data,
  ...config
}).then(res=>res?.data)
  .catch(err=>Promise.reject(err))
  } 

/** PUT请求 */
export const put = <T=any,P=Record<string,any>>(url: string, data?: P,config?: AxiosRequestConfig):Promise<IResponse<T>> => {return instance<IResponse<T>>({
  method: 'PUT',
  url,
  data,
  ...config
}).then(res=>res?.data)
  .catch(err=>Promise.reject(err))
  } 

/** DELETE请求 */
export const del = <T=any,P=Record<string,any>>(url: string, params?: P,config?: AxiosRequestConfig):Promise<IResponse<T>> => {return instance<IResponse<T>>({
  method: 'DELETE',
  url,
  params,
  ...config
}).then(res=>res?.data)
  .catch(err=>Promise.reject(err))
  } 

  const $http = {
    get,
    post,
    put,
    del
  }
  export default $http