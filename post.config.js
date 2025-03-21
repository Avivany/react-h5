// postcss.config.js
// 用 vite 创建项目，配置 postcss 需要使用 post.config.js，之前使用的 .postcssrc.js 已经被抛弃
// 具体配置可以去 postcss-pxtorem 仓库看看文档

import autoprefixer from 'autoprefixer';
import pxtorem from 'postcss-pxtorem';

export default {
  plugins: [
    autoprefixer(),
    pxtorem({
      rootValue: 37.5,
      propList: ['*'],
      selectorBlackList: ['.norem']
    })
  ]
};