// eslint.config.js
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";

import tseslint from 'typescript-eslint';
import eslintReact from '@eslint-react/eslint-plugin'
import testingLibrary from 'eslint-plugin-testing-library';
import jestDom from 'eslint-plugin-jest-dom';
import storybook from 'eslint-plugin-storybook';


export default defineConfig(
    tseslint.configs.recommended,
    [
        globalIgnores(["dist/**", ".rollup.cache/**"]),
        {
            extends: [eslintReact.configs["recommended-typescript"]],
            files: ["**/*.js", "**/*.ts", "**/*.tsx"],
            languageOptions: {
                globals: {
                    ...globals.browser
                },
                parser: tseslint.parser,
                parserOptions: {
                    ecmaFeatures: {
                        impliedStrict: true,
                        jsx: true
                    },
                }
            },
            plugins: {
                '@typescript-eslint': tseslint.plugin,
                react: eslintReact,
                'testing-library': testingLibrary,
                'jest-dom': jestDom,
                storybook
            },
            rules: {
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
                'storybook/no-uninstalled-addons': ['error', { packageJsonLocation: './package.json' }],
                '@eslint-react/dom/no-unknown-property': 'error'
            },
            settings: {
                react: {
                    version: 'detect'
                }
            }
        },
    ]
);
