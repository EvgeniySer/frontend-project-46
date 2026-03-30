import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import importPlugin from 'eslint-plugin-import';

const compat = new FlatCompat({
  baseDirectory: import.meta.url,
});

export default [
  {
    ignores: ['**/eslint.config.js', '**/node_modules/**'],
  },
  js.configs.recommended,
  ...compat.extends('airbnb-base'),
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
    },
    plugins: {
      import: importPlugin,
    },
    rules: {
      'no-console': 'off',
      'import/extensions': 'off',
      'no-underscore-dangle': ['error', { allow: ['__filename', '__dirname'] }],
      'semi': ['error', 'never'],
      'arrow-parens': ['error', 'as-needed'],
      'max-statements-per-line': ['error', { max: 2 }],
      'import/no-extraneous-dependencies': 'off',
    },
  },
];
