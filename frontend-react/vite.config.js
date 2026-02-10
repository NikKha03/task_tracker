import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		host: true,
		port: 5175,
		allowedHosts: ['localhost:6175', '10.66.66.3:6175'],
		proxy: {
			'/api': {
				target: 'http://localhost:9080',
				changeOrigin: true,
				secure: false,
			},
		},
	},
});
