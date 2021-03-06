module.exports = {
  env: { browser: true, es6: true, node: true },
  extends: [
    'eslint:recommended', // Uses the recommended rules from @eslint-plugin-react
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },
  plugins: ['react'],
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser', // Specifies the ESLint parser
      extends: [
        'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
        'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
        'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
        'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
      ],
      parserOptions: {
        ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
        project: './tsconfig.json',
      },
      settings: { react: { version: 'detect' } },
      ecmaFeatures: { destructuring: true },
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
        'react/prop-types': 'warn',
        'react/display-name': 'warn',
        'no-unused-vars': ['error', { vars: 'all', varsIgnorePattern: '^_' }],
      },
    },
  ],
};
