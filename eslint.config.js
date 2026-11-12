const js = require('@eslint/js');
const globals = require('globals');

module.exports = [
  {
    ignores: ['node_modules/**'],
  },
  js.configs.recommended,
  {
    files: ['eslint.config.js'],
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    files: ['app.js'],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      'no-console': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
    },
  },
];
