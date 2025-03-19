/**
 * 使用loader实现路由守卫
 */
import {FC,ReactNode ,useEffect } from 'react'
import {useLocation,useNavigate} from 'react-router-dom'


export const RouteGuard:FC<{children:ReactNode}> = (props) => {
  const {pathname}=useLocation()
  const navigate=useNavigate()
  const token=localStorage.getItem('token')|| ''
  
  useEffect(() => {
    if (!token) {
      //token不存在，跳转到登录页
      navigate('/login')
    }
    if (token) {
      //已登录
      if(location.pathname === '/'||location.pathname === '/login') {
        //已登录，跳转到首页
        navigate('/home')
      }else {
        //其他路由就跳转到对应的路由
        navigate(location.pathname)
      }

    }
    
  }, [token,pathname,navigate])
  return <>{props.children}</>
}