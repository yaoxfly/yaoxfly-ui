module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  globals: {
    'tinymce': true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "indent": ["off", 2],
    "no-useless-escape": 0,
    "spaced-comment": 'off',
    'no-multiple-empty-lines ': 'off',
    'no-trailing-spaces': 'off',
    'eol-last': 'off',
    'comma-dangle': 'off',
    "no-multiple-empty-lines": 'off',
    "Strings must use singlequote": 'off',
    "Extra semicolon": "off",
    // "quotes":[0,"single"] //去掉单引号的限制
    "space-before-function-paren": 'off',
    "no-useless-return": 'off'
  }
}
