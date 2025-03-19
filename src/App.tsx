import { RouterProvider } from 'react-router-dom'
import {useLoadingStore} from '@/store'
import router from './router'
import Loading  from '@/components/loading'

function App() {
   const {loading}=useLoadingStore()
  return (
    <>
      <RouterProvider router={router} />
       {loading &&  <Loading />}
    </>
  )
}

export default App
