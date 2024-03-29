import multiInput from 'rollup-plugin-multi-input';
import esbuild from 'rollup-plugin-esbuild';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';

export default {
  // use glob in the input
  input: ['src/**/*.ts'],
  output: {
    format: 'cjs',
    dir: 'dist',
  },
  external: ['graphile-worker', '@prisma/client', 'pg-pubsub'],
  plugins: [
    multiInput(),
    nodeResolve({
      preferBuiltins: true,
    }),
    commonjs(),
    json(),
    esbuild({
      // All options are optional
      include: /\.[jt]sx?$/, // default, inferred from `loaders` option
      exclude: /node_modules/, // default
      sourceMap: false, // by default inferred from rollup's `output.sourcemap` option
      minify: process.env.NODE_ENV === 'production',
      target: 'esnext', // default, or 'es20XX', 'esnext'
      // Like @rollup/plugin-replace
      define: {
        __VERSION__: '"x.y.z"',
      },
      tsconfig: 'tsconfig.json', // default
      // Add extra loaders
      loaders: {
        // Add .json files support
        // require @rollup/plugin-commonjs
        '.json': 'json',
        // Enable JSX in .js files too
        '.js': 'jsx',
      },
    }),
  ],
};
