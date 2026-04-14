import { defineConfig } from "vite";
import basicSsl from '@vitejs/plugin-basic-ssl';
import { sfcPlugin } from '@vanillaspa/web-components/vite-plugin-sfc';

export default defineConfig({
    build: {
        target: 'esnext'
    },
    server: {
        port: 5173,
        host: '0.0.0.0', // Allow access from outside the container
        strictPort: true,
        headers: {
            'Cross-Origin-Opener-Policy': 'same-origin', // for sqlite OPFS
            'Cross-Origin-Embedder-Policy': 'require-corp', // for sqlite OPFS
            // 'Content-Security-Policy': "script-src 'wasm-unsafe-eval'",
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
        basicSsl(),
        sfcPlugin()
    ]
})