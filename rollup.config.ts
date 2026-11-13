import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import url from '@rollup/plugin-url';
import json from '@rollup/plugin-json';
import postcss from 'rollup-plugin-postcss';
import { createRequire } from 'node:module';

import pkg from './package.json' with { type: 'json' };

const requireModule = createRequire(import.meta.url);
const { default: DtsCreator } = requireModule('typed-css-modules');

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
    typescript({
      tsconfig: 'tsconfig.rollup.json',
    }),
    commonjs({
      include: 'node_modules/**',
    }),
    postcss({
      modules: {
        async getJSON(filepath: string) {
          const creator = new DtsCreator();
          const content = await creator.create(filepath);
          await content.writeFile();
        },
      },
    }),
  ],
};
