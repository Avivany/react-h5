import js from '@eslint/js'
import globals, { browser } from 'globals'
import react  from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import prettier from 'eslint-plugin-prettier'
import eslintConfigPrettier from 'eslint-config-prettier'

export default [
  { ignores: ['dist','**/node_modules','**/.vscode/','**/.husky/','eslint.config.js'] },
  {
    env:{browser: true, es6: true, node: true},
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'prettier': prettier,//启用prettier插件
    },
    rules: {
      //添加默认的推荐规则
      ...js.configs.recommended.rules,
      //React 相关的推荐规则
      ...react.configs.recommended.rules,
      // React JSX 运行时相关的规则
      ...react.configs['jsx-runtime'].rules,
      // React Hooks 运行时相关的规则
      ...reactHooks.configs.recommended.rules,
     
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      // React Refresh 只允许导出组件
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      //禁止不必要的赋值；
      'no-useless-assignment': 'error',

      // Prettier 格式化规则，强制执行 Prettier 风格
      'prettier/prettier': 'error' // 这里启用 Prettier 的代码风格检查
    },
    // 通过直接添加 eslint-config-prettier 来禁用可能的冲突规则
    eslintConfigPrettier // 禁用与 Prettier 冲突的 ESLint 规则
  },
]
