// .eslintrc.cjs
module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: ['eslint:recommended'],
  ignorePatterns: ['dist/**', 'node_modules/**', 'webpack.config.js'],
  rules: {
    'no-unused-vars': 'off',
    'no-undef': 'off',
    'no-console': 'off',
  },
};
