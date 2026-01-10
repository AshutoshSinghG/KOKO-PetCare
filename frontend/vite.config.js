import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig(({ mode }) => {
    const isSDK = mode === 'sdk';

    return {
        plugins: [react()],
        define: {
            'process.env.NODE_ENV': JSON.stringify(mode === 'development' ? 'development' : 'production')
        },
        build: isSDK ? {
            // SDK build configuration - single file bundle
            lib: {
                entry: resolve(__dirname, 'src/sdk/index.jsx'),
                name: 'VetChatbot',
                fileName: () => 'chatbot.js',
                formats: ['iife']
            },
            rollupOptions: {
                output: {
                    // Inline all assets
                    inlineDynamicImports: true,
                    manualChunks: undefined
                }
            },
            cssCodeSplit: false,
            outDir: 'dist/sdk'
        } : {
            // Regular build
            outDir: 'dist'
        },
        server: {
            port: 5173,
            proxy: {
                '/api': {
                    target: 'http://localhost:3001',
                    changeOrigin: true
                }
            }
        }
    };
});
