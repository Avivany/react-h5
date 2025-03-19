import toast from 'react-hot-toast';

/***
 * 检查状态码 
 * {number} status 状态码；
 * {string} msesage 错误信息；
 */
export const checkStatus = (status:number, msg?:string|Array<string>) => {
  let errMsg=''
  switch (status){
    case 400:
      toast('请求错误!请你稍后登录',{
        duration:3000,
        position: 'top-center',
      })
      break
    case 401:
       toast('登录失败!请你重新登录',{
        duration:3000,
        position: 'top-center',
      })
      break
    case 403:
      if (msg) errMsg =typeof msg === 'string' ? msg : msg[0] 
      toast('当前账户无权限访问该页面！',{
        duration:3000,
        position: 'top-center',
      })
      break
    case 404:
      toast('你要访问的页面不存在！',{
        duration:3000,
        position: 'top-center',
      })
      break
    case 405:
       toast('请求方法错误！!请你稍后登录',{
        duration:3000,
        position: 'top-center',
      })
      break
    case 408:
      toast('请求超时!请你稍后重试',{
        duration:3000,
        position: 'top-center',
      })
      break
    case 500:
      toast('服务器异常，请你稍后重试',{
        duration:3000,
        position: 'top-center',
      })
      break
    case 502:
      toast('网络错误！',{
        duration:3000,
        position: 'top-center',
      })
      break
    case 503:
      toast('网络不可用！服务器暂时过载或不可用',{
        duration:3000,
        position: 'top-center',
      })
      break
    case 504:
      toast('网络超时！',{
        duration:3000,
        position: 'top-center',
      })
      break
    default:
     // if(msg) errMsg =typeof msg === 'string' ? msg : msg[0] 
      toast(errMsg||'请求失败！',{
        duration:3000,
        position: 'top-center',
      })
  }
  
}