// eslint.config.js
import js from '@eslint/js';
import globals from 'globals';

export default [
  // ВАЖНО: секция ignores должна быть первой
  {
    ignores: [
      '**/eslint.config.js',
      '**/node_modules/**',
      '**/__tests__/**',
      '**/*.spec.js',
      '**/*.test.js',
      'coverage/**',           // Игнорируем папку coverage
      'dist/**',             // Игнорируем сборку
      'build/**',            // Игнорируем сборку
      '*.min.js',           // Игнорируем минифицированные файлы
      'vendor/**'            // Игнорируем сторонние библиотеки
    ],
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
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      'no-console': 'off',
      'no-underscore-dangle': ['error', { allow: ['__filename', '__dirname'] }],
      '@stylistic/semi': 'off',
      '@stylistic/arrow-parens': 'off',
      '@stylistic/max-statements-per-line': 'off',
      '@stylistic/indent': 'off',
      '@stylistic/no-trailing-spaces': 'off',
      '@stylistic/operator-linebreak': 'off',
      '@stylistic/brace-style': 'off',
      '@stylistic/comma-dangle': 'off',
      '@stylistic/indent-binary-ops': 'off',
      '@stylistic/no-multiple-empty-lines': 'off'
    },
  },
];