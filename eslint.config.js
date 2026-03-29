import globals from 'globals';

export default [
  {
    files: ['src/**/*.js', 'gendiff.js', '__tests__/**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module'
    },
    rules: {}
  },
  {
    files: ['__tests__/**/*.js', '**/*.test.js'],
    languageOptions: {
      globals: {
        ...globals.jest
      }
    }
  }
];
