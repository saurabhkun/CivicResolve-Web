import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    port: 3000,
    open: '/motion-dashboard.html'
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'motion-dashboard.html'),
        preview: resolve(import.meta.dirname, 'preview.html')
      }
    }
  }
});
