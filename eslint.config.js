import globals from 'globals';

export default {
  ignores: [
    '**/node_modules/**',
    '**/dist/**',
    '**/build/**',
    '**/__tests__/**',
    '**/*.test.js',
    '**/*.spec.js',
    '**.min.js',
    '**/vendor/**',

    'eslint.config.js',

    '/project/code/coverage/**',
    
    'coverage/**'
  ],
  languageOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    globals: {
      ...globals.browser,
      ...globals.node
    }
  },
  rules: {
    '@stylistic/semi': 'off',
    '@stylistic/indent': 'off',
    '@stylistic/no-trailing-spaces': 'off',
    '@stylistic/operator-linebreak': 'off',
    '@stylistic/brace-style': 'off',
    '@stylistic/comma-dangle': 'off',
    '@stylistic/arrow-parens': 'off',
    '@stylistic/max-statements-per-line': 'off',
    '@stylistic/no-multiple-empty-lines': 'off',
    
    '@stylistic/eol-last': 'off'
  }
};