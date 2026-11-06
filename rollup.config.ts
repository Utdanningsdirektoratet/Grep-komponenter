import typescript from '@rollup/plugin-typescript';
import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import url from '@rollup/plugin-url';
import json from '@rollup/plugin-json';

import pkg from './package.json' assert { type: 'json' };

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'es',
      exports: 'named',
      sourcemap: true,
    },
  ],
  treeshake: { moduleSideEffects: 'no-external' },
  external: Object.keys(pkg.dependencies),
  plugins: [
    external({
      includeDependencies: true,
    }),
    url(),
    json({
      exclude: ['node_modules/**'],
    }),
    nodeResolve(),
    babel({
      babelHelpers: 'bundled',
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      include: 'src/**',
      parserOpts: {
        plugins: ['typescript', 'jsx'],
      },
      plugins: ['babel-plugin-react-compiler'],
    }),
    typescript({
      tsconfig: 'tsconfig.rollup.json',
    }),
    commonjs({
      include: 'node_modules/**',
    }),
  ],
};
