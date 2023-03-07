module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:tailwindcss/recommended',
    'standard-with-typescript',
    'prettier',
  ],
  overrides: [],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    project: ['./tsconfig.json'],
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks', 'simple-import-sort', 'vitest'],
  rules: {
    'simple-import-sort/imports': [
      'warn',
      {
        groups: [
          // React
          ['^react', '^@reduxjs'],
          // Absolute imports anything and then css
          ['^@?\\w', '.', '^.+\\.?(css)$'],
        ],
      },
    ],
    'simple-import-sort/exports': 'warn',
    'import/no-duplicates': 'warn',
    'import/newline-after-import': 'warn',
    'import/first': 'warn',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-dynamic-delete': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'tailwindcss/no-custom-classname': 'off',
  },
  ignorePatterns: ['vite.config.ts', 'vite-env.d.ts'],
  settings: {
    react: {
      version: 'detect',
    },
  },
};
