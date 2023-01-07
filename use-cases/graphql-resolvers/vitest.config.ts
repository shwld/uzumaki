import dotenv from 'dotenv';
import { defineConfig } from 'vitest/config';

dotenv.config();

export default defineConfig({
  test: {
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
    threads: false,
    globals: true, // Don't forget!
    environment: 'vprisma',
    setupFiles: ['vitest-environment-vprisma/setup'],
  },
  define: {
    'process.env': JSON.stringify(process.env),
  },
});
