import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/assets/css/index.css'
import './utils/rem'
import App from './App.tsx'

//针对不能将类型“HTMLElement | null”分配给类型“HTMLElement” 错误,可根据实际情况使用!进行处理或者使用as进行断言
// document.getElementById('root')! 或者 document.getElementById('root') as HTMLElement 解决
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
