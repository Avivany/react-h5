import {LoaderFunctionArgs} from 'react-router-dom'
import {RouteObject} from './routerType.d'

export * from './lazy-load'

// 路由白名单
export const whiteList = new Set(['/','/login','/home','404']) 

//基于modules下的文件动态生成路由
export const getRoutesFromModules = ():RouteObject[] => {
  const routes:RouteObject[] = []
  const modules = import.meta.glob('@/router/modules/**/*.tsx',{eager:true}) as Record<string,Record<'default',RouteObject[]>>

  console.log('动态路由modules:',modules)
  Object.keys(modules).forEach((key) => {
    const module = modules[key].default || {}
    const moduleRoutes =  Array.isArray(module) ? [...module] : [module]
    routes.push(...moduleRoutes)
  })
  return routes
}

  //获取当前路由配置
 export const routesModules = getRoutesFromModules()

/**
 * 查询当前路由信息
 * @param path 当前访问的路径
 * @param routes 路由列表
 * @returns RouteObject
 */
export const getRouteByPath = (path:string,routes:RouteObject[]=[]):RouteObject => {
   let res:RouteObject={}
   routes.forEach((item) => {
     if (item.path === path) res = item 
     if (item.children) {
      const reschild = getRouteByPath(path,item.children)
      if (Object.keys(reschild).length) res = reschild
     }
   })
   return res 
}

//使用loader函数获取路由

export const loader = async ({request}:LoaderFunctionArgs) => {
  const url = new URL(request.url)
  console.log('路由加载loader:',request)
  // 从给定的URL中获取路径名
  const pathname = url.pathname || window.location.pathname
  //获取当前路由配置
  const route = getRouteByPath(pathname,routesModules)

  //设置标题
  document.title = route.meta?.title ?? import.meta.env.VITE_APP_TITLE
  
  // 权限校验
  if (route.meta?.auth && !localStorage.getItem('token')&& !whiteList.has(pathname)) {
    window.location.replace(`/login?callback=${encodeURIComponent(window.location.href)}`)
    return false
  }

  return true
}