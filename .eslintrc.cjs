module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:@typescript-eslint/recommended', 'plugin:storybook/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['react', '@typescript-eslint', 'testing-library', "jest-dom"],
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    'react/prop-types': 'off',
    'react/display-name': 'warn',
    'no-undef': 'off',
    'testing-library/await-async-queries': 'error',
		'testing-library/no-await-sync-queries': 'error',
		'testing-library/no-debugging-utils': 'warn',
    "jest-dom/prefer-checked": "error",
    "jest-dom/prefer-enabled-disabled": "error",
    "jest-dom/prefer-required": "error",
    "jest-dom/prefer-to-have-attribute": "error",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-unused-expressions": ["off", {"allowShortCircuit": true}],
    '@typescript-eslint/no-unused-vars': ['error', {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_'
    }],
    'storybook/no-uninstalled-addons': ['error', { packageJsonLocation: '../package.json' }]
  },
  // overrides: [{
  //   files: ["./src/*.js", "./src/*.ts", "./src/*.tsx"],
  //   rules: {
  //     "no-unused-expressions": ["error", {
  //       "allowShortCircuit": true
  //     }]
  //   }
  // }]
};