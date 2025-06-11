import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path'; // đảm bảo dùng * để tránh lỗi trong ESM

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // alias @ -> src
    },
  },

  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html'), // nên để index.html ở root, không phải trong public
    },
  },

  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:1323',
        changeOrigin: true,
      },
    },
  },
});
