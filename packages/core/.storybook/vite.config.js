import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    target: 'esnext',
    minify: false,
    sourcemap: true,
  },
  server: {
    port: 6006,
    strictPort: true,
  },
  optimizeDeps: {
    include: ['@storybook/html-vite'],
  },
  assetsInclude: ['**/*.md'],
});
