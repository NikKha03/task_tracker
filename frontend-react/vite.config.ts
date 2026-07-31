import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        host: true,
        port: 9175,
        allowedHosts: ['localhost:9175', '10.66.66.3:9175', '192.168.1.124:9175'],
        proxy: {
            '/api': {
                target: 'http://192.168.1.124:9090',
                changeOrigin: true,
                secure: false,
            },
        },
    },
});
