import js from '@eslint/js'
import globals from 'globals'
import react  from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import prettier from 'eslint-plugin-prettier';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import prettierConfig from 'eslint-config-prettier
import tseslint from 'typescript-eslint'
import typescriptParser from 'typescript-eslint-parser'
import path, { parse } from 'path';


export default [
  { ignores: ['dist','dist*','**/node_modules','**/.vscode/','**/.husky/','eslint.config.js'] },
  {
    settings: {
      react: {
        pragma: 'React',
        version: '18.0',
      },
    },
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.node,
        myCustomGlobal: "readonly"
      },
      parser: typescriptParser,
      parserOptions: {
        project:'./tsconfig.json',
        tsconfigRootDir: path.resolve(),
      },
    },
    plugins: ['react','reactHooks','reactRefresh','prettier'],

    rules: {
      // React Hooks 运行时相关的规则
      ...reactHooks.configs.recommended.rules,
      // React Refresh 只允许导出组件
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      //React 相关的推荐规则
      ...react.configs.recommended.rules,
      // React JSX 运行时相关的规则
      ...react.configs['jsx-runtime'].rules,
      //禁止未使用的变量的警告
      '@typescript-eslint/no-unused-vars': 'warn',
      //允许使用 any 类型
      '@typescript-eslint/no-explicit-any': 'off',
      //关闭对未使用的表达式的检查
      '@typescript-eslint/no-unused-expressions': 'off',

      // Prettier 格式化规则，强制执行 Prettier 风格
      'prettier/prettier': 'error' // 这里启用 Prettier 的代码风格检查
    },
    // 通过直接添加 eslint-config-prettier 来禁用可能的冲突规则
    
  },
  eslintPluginPrettierRecommended,
  prettierConfig  // 禁用与 Prettier 冲突的 ESLint 规则
]
