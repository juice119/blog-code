import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['src/**/*.spec.ts', 'test/unit/**/*.spec.ts', 'test/integration/**/*.spec.ts'],
    exclude: ['node_modules', 'dist'],
    root: '.',
    globals: true,
    environment: 'node',
    testTimeout: 10000,
    hookTimeout: 10000,
  },
  plugins: [swc.vite()],
});
