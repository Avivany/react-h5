import {lazy} from 'react'
import { Outlet } from 'react-router-dom'
import { RouteObject } from "../utils/routerType";
import {LazyLoad} from '../utils/lazy-load'

export default [
  {
    path: '/test',
    element: <Outlet />,
    children: [
      {
        path: '/test/test1',
        element: LazyLoad(lazy(() => import('@/views/test/test1'))),
        meta:{
          title:'测试页面',
        }
      },
      {
        path: '/test/count',
        element: LazyLoad(lazy(() => import('@/views/test/count'))),
        meta: {
          title: '计数标题',
        }
      }
    ]
  }
] as RouteObject[]