import { defineConfig, loadEnv } from "vite";
import basicSsl from '@vitejs/plugin-basic-ssl';
import tailwindcss from '@tailwindcss/vite';

const env = loadEnv(process.env.NODE_ENV, process.cwd(), '');

export default defineConfig({
    build: {
        target: 'esnext'
    },
    server: {
        port: 5173,
        host: '0.0.0.0', // Allow access from outside the container
        strictPort: true,
        headers: {
            'Cross-Origin-Opener-Policy': 'same-origin',
            'Cross-Origin-Embedder-Policy': 'require-corp',
            'Content-Security-Policy': "default-src 'self'; script-src 'self' 'wasm-unsafe-eval' blob:; img-src 'self' data:; style-src 'self' 'unsafe-inline';",
            'X-Frame-Options': 'DENY',
            'X-Content-Type-Options': 'nosniff',
            'Referrer-Policy': 'strict-origin-when-cross-origin',
        },
        hmr: {
            host: 'localhost',
            protocol: 'wss'
        },
    },
    optimizeDeps: {
        exclude: ['@sqlite.org/sqlite-wasm']
    },
    plugins: [
        env.VITE_USE_SSL === 'true' && basicSsl(),
        tailwindcss()
    ]
})
