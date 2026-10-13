import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  base: command === 'serve' ? '/' : (process.env.VITE_BASE || '/family-website-public/'),
  plugins: [react()],
  server: {
    port: 3000,
    open: false,
    host: true
  }
}));
