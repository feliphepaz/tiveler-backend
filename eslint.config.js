const globals = require('globals')
const typescriptEslint = require('@typescript-eslint/eslint-plugin')

module.exports = [
  {
    files: ['src/**'],
    parserOptions: {
      ecmaVersion: 'latest',
      project: ['./tsconfig.json']
    },
    globals: {
      ...globals.es2021,
      ...globals.node,
      ...globals.jest
    },
    reportUnusedDisableDirectives: true,
    plugins: {
      '@typescript-eslint': typescriptEslint
    },
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'warn'
    }
  }
]
