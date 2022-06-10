import dotenv from 'dotenv';
import { defineConfig } from 'vitest/config';

dotenv.config();

export default defineConfig({
  test: {
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
  },
  define: {
    'process.env': JSON.stringify(process.env),
  },
});
