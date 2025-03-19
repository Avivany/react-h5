import { defineConfig,loadEnv  } from 'vite'
// import react from '@vitejs/plugin-react'
// SWC 是一种编译工具，能够比传统的 Babel 更快速地构建和编译 TypeScript 代码。
import react from '@vitejs/plugin-react-swc'
import PostCssPxToRem from 'postcss-pxtorem'
import Autoprefixer from 'autoprefixer'
import Tailwindcss from 'tailwindcss'
import {resolve} from 'path'

// https://vite.dev/config/
export default defineConfig(({mode})=>{
  // loadEnv中三个参数 (mode,dir,base) -> 返回一个包含环境变量的对象
  // mode: Vite的运行模式,通常是development 或 production
  // dir: 环境变量文件的查找目录,通常用 process.cwd() 获取当前工作目录
  // base:环境变量文件的基础名称,通常为空字符串,表示默认的 '.env' 文件
  
  return {
    plugins: [react()],
    resolve:{
      alias:{
        //vite中使用eslint报错‘__dirname‘ is not defined 解决方法在eslint.config.js中添加env:{node:true}
        '@':resolve(__dirname,'./src') 
      }
    },
    css:{
      preprocessorOptions:{
        less:{
          // 一般只需要配置  javascriptEnabled就行，modifyVars也可以稍微配置
          javascriptEnabled: true,//支持内联javascript
          modifyVars: { }, //更换主题
          //additionalData: `@import "./src/assets/css/var.less";`
        }
        },
      postcss:{
        plugins: [
          Autoprefixer({
            overrideBrowserslist: [
               'Android 4.1',
                'iOS 7.1',
                'Chrome > 31',
                'ff > 31',
                'ie >= 8',
                '> 1%',
            ],
             grid: true,
          }),
          PostCssPxToRem({
            rootValue: 100, //UI设计稿的宽度/10   :表示根元素的字体大小，或者根据输入参数返回根元素的字体大小。
            withOfDesignLayout: true, //是否使用ui设计稿的宽度
            propList: ['*'],//需要转换的属性：*表示全部
            unitPrecision: 5, //保留rem小数点几位
            replace: true, //是否直接更换属性值，而不添加备用属性
            selectorBlackList: ['ignore','ig','ig-'], //不需要转换的类名 如 ig-开头的clss 不进行转化
            exclude: /node_modules/i, //忽略node_modules文件夹下的文件
            minPoxerValue: 1, //小于或等于`1px`不转换为`rem`
            mediaQuery:false, //允许在媒体查询中转换`px`
          }),
          Tailwindcss()

        ]
      }
    },
    server:{
      host: '0.0.0.0',
      port: 5566,
      open: false,
      strictPort:false,
      // proxy:{
      //   '/api':{
      //     target:'http://localhost:3000',
      //     changeOrigin:true,
      //     rewrite:(path)=>{
      //       return path.replace(/^\/api/,'')
      //     }
      //   }
      // }
    }
  }
})
