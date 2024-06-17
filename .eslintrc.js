module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ['standard', 'next', 'prettier'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    '@next/next/no-img-element': 0,
  },
}
