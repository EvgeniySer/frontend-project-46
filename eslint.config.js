// eslint.config.js
import js from '@eslint/js';
import globals from 'globals';

export default [
  {
    ignores: ['**/eslint.config.js', '**/node_modules/**', '**/__tests__/**'],
  },
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          modules: true,
        },
      },
      // Указываем глобальные переменные для сред browser и node
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      'no-console': 'off',
      'no-underscore-dangle': ['error', { allow: ['__filename', '__dirname'] }],
      'semi': 'off',
      'arrow-parens': 'off',
      'max-statements-per-line': 'off',
    },
  },
];
