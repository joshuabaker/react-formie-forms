import alias from "@rollup/plugin-alias";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import del from "rollup-plugin-delete";
import resolve from "@rollup/plugin-node-resolve";

import pkg from "./package.json";

export default [
  {
    input: {
      index: "src/index.js",
      components: "src/components/index.js",
      types: "src/types.js",
      utils: "src/utils/index.js",
    },
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
      alias({
        entries: {
          components: "./src/components",
          types: "./src",
          utils: "./src/utils",
        },
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
