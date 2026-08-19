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
            'Content-Security-Policy': "default-src 'self'; script-src 'self' 'wasm-unsafe-eval' blob:; script-src-elem 'self' blob:; img-src 'self' data:; style-src 'self' 'unsafe-inline'; connect-src 'self' ws: wss:;",
            'Cross-Origin-Embedder-Policy': 'require-corp', // for SQLite WASM (OPFS)
            'Cross-Origin-Opener-Policy': 'same-origin', // for SQLite WASM (OPFS)
            'Referrer-Policy': 'strict-origin-when-cross-origin',
            'Strict-Transport-Security': 'max-age=86400; includeSubDomains;', // Enforces secure (HTTP over SSL/TLS) connections to the server
            'X-Content-Type-Options': 'nosniff', // Prevents the browser from interpreting files as a different MIME type than what is specified in the Content-Type HTTP header
            'X-Frame-Options': 'DENY', // Stops clickjacking attacks by preventing the page from being displayed in an iframe
            'X-XSS-Protection': '1; mode=block' // Enables the Cross-Site Scripting (XSS) filter built into most browsers
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
