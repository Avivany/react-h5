
import type {AxiosRequestConfig} from 'axios'
import qs from 'qs'

/**
 * 定义：paddingMap类型
 */
interface PeddingMap {
  url:string,
  isCancel:AbortController
} 
/**
 * 定义：存放请求的map
 */
let  peddingMap=new Map<string,PeddingMap>()

/**
 * 通过请求参数生成map key
 */
export  const  getPaddingKey=(config:AxiosRequestConfig):string=>[config.url,config.method,qs.stringify(config.data),qs.stringify(config.params)].join('&')

/**
 * 添加请求,取消，取消全部和重置peddingMap
 */
class CancelRequest {
  //添加请求
  addPedding=(config:AxiosRequestConfig):void=>{
    const controller:AbortController=new AbortController()
    const key:string=getPaddingKey(config)
    if(peddingMap.has(key)){
      //如果存在，取消之前的请求
      peddingMap.get(key)?.isCancel.abort()
    }
    config.signal=controller.signal;
    //添加新的请求
    peddingMap.set(key,{url:config.url as string,isCancel:controller})
  }
  //移除重复请求
  removePedding=(config:AxiosRequestConfig):void=>{
    const key:string=getPaddingKey(config)
    if(peddingMap.has(key)){
      const val=peddingMap.get(key)
      val?.isCancel.abort()
      peddingMap.delete(key)
    }
  }
  //清楚当前未执行完毕的所有请求
  clearAllPedding=():void=>{
    peddingMap.forEach((val)=>{
      val.isCancel.abort()
    })
    peddingMap.clear()
  }
  //重置当前请求的列表peddingMap
  resetPedding=():void=>{
    peddingMap=new Map<string,PeddingMap>()
  }

}
export const cancelRequest=new CancelRequest()
