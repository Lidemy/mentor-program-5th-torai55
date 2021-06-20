module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true
  },
  extends: '@lidemy/eslint-config-lidemy',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    requireConfigFile: false,
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018
  },
  rules: {
    'no-console': 'off'
  },
  parser: '@babel/eslint-parser'
}
