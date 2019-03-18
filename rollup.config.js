import typescript from "rollup-plugin-typescript2";
import commonjs from "rollup-plugin-commonjs";
import external from "rollup-plugin-peer-deps-external";
import resolve from "rollup-plugin-node-resolve";
import url from "rollup-plugin-url";
import json from "rollup-plugin-json";

import pkg from "./package.json";

export default {
  input: "src/index.ts",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      exports: "named",
      sourcemap: true
    },
    {
      file: pkg.module,
      format: "es",
      exports: "named",
      sourcemap: true
    }
  ],
  external: ["styled-components"],
  globals: { "styled-components": "styled" },
  plugins: [
    external(),
    url(),
    json({
      exclude: ["node_modules/**"]
    }),
    resolve(),
    typescript({
      rollupCommonJSResolveHack: true,
      tsconfig: "tsconfig.rollup.json"
    }),
    commonjs()
  ]
};
