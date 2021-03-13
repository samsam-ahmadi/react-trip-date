import commonjs from "@rollup/plugin-commonjs";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import resolve from "@rollup/plugin-node-resolve";
import svgr from "@svgr/rollup";
import typescript from "rollup-plugin-typescript2";
import url from "@rollup/plugin-url";

import pkg from "./package.json";

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  input: "src/index.ts",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      exports: "named",
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: "es",
      exports: "named",
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    postcss({
      modules: true,
    }),
    url(),
    resolve(),
    svgr(),
    typescript({
      rollupCommonJSResolveHack: true,
      clean: true,
    }),
    commonjs({
      include: "node_modules/**",
    }),
  ],
  external: ["styled-components"],
};
