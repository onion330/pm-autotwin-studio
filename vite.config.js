import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    server: {
        port: 621,
        open: true,
    },
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                privacy: resolve(__dirname, 'privacy.html'),
                terms: resolve(__dirname, 'terms.html'),
            },
        },
    },
});
