import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5175,
    allowedHosts: [
      'tracker.sharpbubbles.ru',
      'localhost:5175',
      '10.66.66.3',
      '109.196.102.221',
    ],
  },
});
