
import { ComponentType,lazy} from 'react'
import {Navigate, RouteObject} from 'react-router-dom'
import { LazyLoad, routesModules,loader } from './utils'
import ErrorBoundary from '@/components/error-boundary'

// type Module = {
//   [keys: string]:()=>Promise<{default:ComponentType<any>}>
// }

/**所有views文件夹下的页面 */
// const pagesModules =  import.meta.glob('@/views/**/*.tsx')as unknown as Module

// export const moduls: Module={
//   ...pagesModules
// }
export function getPath(name: string) {
  return `/src/pages/${name}/index.tsx`;
}

const routes:RouteObject[] = [
  {
    id:'root',
    loader:loader,
    path: '/',
    //loader:RootLoader,
    Component:lazy(()=>import('@/layout')),
    errorElement: <ErrorBoundary/>,
    children:[
      {
        index: true,
        element: <Navigate to='/home'/>,//重定向
      },
      {
        path: '/home',
        element: LazyLoad(lazy(() => import('@/views/home/index'))),
      },
      {
        path: '/works',
        element: LazyLoad(lazy(() => import('@/views/works/index'))),
      },
      {
        path: '/404',
        element: LazyLoad(lazy(() => import('@/views/not-fount/index'))),
      },
      ...routesModules
    ]
  },
  {
    path: '/login',
    Component:lazy(()=>import('@/views/login/index')),
  },
  {
    path: '/:pathMatch(.*)*',
    element: <Navigate to="/404" />, // 找不到页面
  },
]

export default routes