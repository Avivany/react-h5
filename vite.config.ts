import { defineConfig,loadEnv ,ConfigEnv,UserConfig} from 'vite'
// import react from '@vitejs/plugin-react'
// SWC 是一种编译工具，能够比传统的 Babel 更快速地构建和编译 TypeScript 代码。
import react from '@vitejs/plugin-react-swc'
import PostCssPxToRem from 'postcss-pxtorem'
import Autoprefixer from 'autoprefixer'
import Tailwindcss from 'tailwindcss'
import {resolve} from 'path'

// https://vite.dev/config/
export default defineConfig(({mode}:ConfigEnv): UserConfig=>{
  // loadEnv中三个参数 (mode,dir,base) -> 返回一个包含环境变量的对象
  // mode: Vite的运行模式,通常是development 或 production
  // dir: 环境变量文件的查找目录,通常用 process.cwd() 获取当前工作目录
  // base:环境变量文件的基础名称,通常为空字符串,表示默认的 '.env' 文件
  const env = loadEnv(mode,process.cwd(),'')
  const isProd:boolean = env.VITE_APP_ENV==='production';
  const isDev:boolean = env.VITE_APP_ENV==='development';
  
  return {
    base:env.VITE_NODE_ENV==='production'?'./':'./',
    plugins: [react()],
    build:{
      outDir:env.VITE_APP_OUTDIR||'dist',
      chunkSizeWarningLimit:1024*3,//chunk超过1024*3会被提示
      assetsDir:'assets',//指定生成静态文件目录，。默认assets
      assetsInlineLimit:1024*10,//小于1024*10的图片会被内联为base64;
      cssCodeSplit:true,//是否将css单独打包,默认为true
      minify:'esbuild',//压缩方式，-- esbuild 打包更快，但是不能去除 console.log，去除 console 使用 terser 模式
      sourcemap:isDev,//是否生成sourceMap文件
      rollupOptions:{

        output:{
          chunkFileNames:'assets/js/[name]-[hash].js', // chunk包输出的文件名称
          entryFileNames:'assets/js/[name]-[hash].js', // 入口文件输出的文件名称
          assetFileNames:'assets/[ext]/[name]-[hash].[ext]',// 静态文件输出的文件夹名称 如：字体，图片等
          // 手动分包，将第三方库拆分到单独的chunk包中（注意这些包名必须存在，否则打包会报错）
          manualChunks:{
            'vendor-react':['react', 'react-dom', 'react-router-dom'],
            'vendor-utils':['axios','qs'],
            // 'vendor-ui':['antd']

          },
          //  manualChunks(id){
          //   //  if (id.includes('node_modules')){
          //   //   const list=id.toString().split('node_modules/')
          //   //     return list[list.length-1].split('/')[0].toString();
          //   //   }
          // }
        }
      } 
    },
    resolve:{
      alias:{
        //vite中使用eslint报错‘__dirname‘ is not defined 解决方法在eslint.config.js中添加env:{node:true}
        '@':resolve(__dirname,'./src') 
      },
      extensions:['.js','.jsx','.ts','.tsx','.json','.less','.css']
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
            rootValue: 37.5, // :表示根元素的字体大小，或者根据输入参数返回根元素的字体大小。
            unitPrecision: 5, //保留rem小数点几位
            propList: ['*'],//需要转换的属性：*表示全部
            selectorBlackList: ['ignore','ig','ig-'], //不需要转换的类名 如 ig-开头的clss 不进行转化
            replace: true, //是否直接更换属性值，而不添加备用属性
            mediaQuery:false, //允许在媒体查询中转换`px`
            minPixelValue: 1, //小于或等于`1px`不转换为`rem`
            exclude: /node_modules/i, //忽略node_modules文件夹下的文件
          }),
          Tailwindcss()

        ]
      }
    },
    server:{
      host: '0.0.0.0',// 服务器主机名，如果允许外部访问，可设置为"0.0.0.0"
      port: 5060,
      open: false,
      cors:true,
      strictPort:false,
      proxy:{
        '/api':{
          target:'https://moi100.usemock.com/',
          changeOrigin:true,
          rewrite:(path)=>{
            return path.replace(/^\/api/,'')
          }
        }
      }
    },
    optimizeDeps:{
      include:['react','react-dom','react-router-dom','axios','qs']
    }
  }
})
