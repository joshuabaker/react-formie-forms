import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import del from "rollup-plugin-delete";
import resolve from "@rollup/plugin-node-resolve";

import pkg from "./package.json";

export default [
  {
    input: "src/index.js",
    output: [
      {
        dir: "dist/esm",
        format: "esm",
      },
      {
        dir: "dist/cjs",
        format: "cjs",
      },
    ],
    external: [
      ...Object.keys(pkg.dependencies),
      ...Object.keys(pkg.peerDependencies),
    ],
    plugins: [
      del({
        targets: "dist/*",
      }),
      babel({
        babelHelpers: "runtime",
        exclude: "node_modules/**",
      }),
      resolve({
        extensions: [".jsx", ".js"],
      }),
      commonjs(),
    ],
  },
];
