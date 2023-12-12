import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import url from '@rollup/plugin-url';
import json from '@rollup/plugin-json';

import yalc from './rollup-plugin-yalc.js';

import pkg from './package.json' assert { type: "json" };

export default {
  strictDeprecations: true,
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'es',
      exports: 'named',
      sourcemap: true,
    },
  ],
  external: Object.keys(pkg.dependencies),
  plugins: [
    external({
      includeDependencies: true,
    }),
    url(),
    json({
      exclude: ['node_modules/**'],
    }),
    resolve(),
    typescript({
      tsconfig: 'tsconfig.rollup.json',
    }),
    commonjs({
      sourceMap: false,
      include: 'node_modules/**',
    }),
    yalc(process.env.yalc),
  ],
};
