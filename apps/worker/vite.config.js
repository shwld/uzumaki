import { resolve } from 'path';
import { defineConfig } from 'vite';
import multiInput from 'rollup-plugin-multi-input';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'index',
      // the proper extensions will be added
      fileName: 'index',
    },
    rollupOptions: [
      {
        // make sure to externalize deps that shouldn't be bundled
        // into your library
        external: [],
        input: ['src/index.ts', 'src/tasks/*'],
        output: {
          // Provide global variables to use in the UMD build
          // for externalized deps
          globals: {},
        },
        plugins: [multiInput()],
      },
    ],
  },
  // plugins: [
  //   {
  //     ...multiInput(),
  //     enforce: 'post',
  //     apply: 'build',
  //   },
  // ],
});
