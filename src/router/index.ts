import {RouteObject,createBrowserRouter} from 'react-router-dom'
import routes from './routes'

export default  createBrowserRouter(routes)

export function generateRouters(routes: RouteObject[]) {
  return createBrowserRouter(routes)
}