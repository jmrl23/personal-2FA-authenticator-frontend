import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { join } from 'node:path';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    host: true,
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': join(__dirname, './src'),
    },
  },
});