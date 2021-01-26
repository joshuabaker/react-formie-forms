import alias from "@rollup/plugin-alias";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
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
      alias({
        entries: {
          components: "./src/components",
          types: "./src",
          utils: "./src/utils",
        },
      }),
      babel({
        babelHelpers: "bundled",
        exclude: "node_modules/**",
      }),
      resolve({
        extensions: [".jsx", ".js"],
      }),
      commonjs(),
    ],
  },
];

// export default {
//   input: pkg.source,
//   output: [
//     {
//       file: pkg.main,
//       format: "cjs",
//       sourcemap: true,
//     },
//     {
//       file: pkg.module,
//       format: "es",
//       sourcemap: true,
//     },
//   ],
//   plugins: [
//     babel({
//       babelHelpers: "bundled",
//       exclude: "node_modules/**",
//     }),
//     resolve({
//       extensions: [".jsx", ".js"],
//     }),
//     commonjs(),
//   ],
//   external: ["react"],
// };
