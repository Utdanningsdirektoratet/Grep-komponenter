import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import resolve from 'rollup-plugin-node-resolve';
import url from 'rollup-plugin-url';
import json from '@rollup/plugin-json';
// import { eslint } from "rollup-plugin-eslint";

import yalc from './rollup-plugin-yalc';

import pkg from './package.json';

export default {
    input: 'src/index.ts',
    output: [
        {
            file: pkg.main,
            format: 'es',
            exports: 'named',
            sourcemap: true
        }
    ],
    external: ['styled-components'],
    globals: { 'styled-components': 'styled' },
    plugins: [
        external(),
        url(),
        json({
            exclude: ['node_modules/**']
        }),
        resolve(),
        typescript({
            check: false,
            typescript: require("typescript"),
            tsconfig: 'tsconfig.rollup.json',
            objectHashIgnoreUnknownHack: true,
            rollupCommonJSResolveHack: true,
        }),
        commonjs({
            sourceMap: false,
            include: 'node_modules/**',
            namedExports: {
                'node_modules/react/react.js': [
                    'Children',
                    'Component',
                    'PropTypes',
                    'createElement'
                ],
                'node_modules/react-dom/index.js': ['render'],
                'node_modules/react-is/index.js': ['ForwardRef']
            }
        }),
        yalc(process.env.yalc)
    ]
};
