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
            // SDK-only build - single file bundle
            lib: {
                entry: resolve(__dirname, 'src/sdk/index.jsx'),
                name: 'VetChatbot',
                fileName: () => 'chatbot.js',
                formats: ['iife']
            },
            rollupOptions: {
                output: {
                    inlineDynamicImports: true,
                    manualChunks: undefined
                }
            },
            cssCodeSplit: false,
            outDir: 'dist/sdk'
        } : {
            // Regular build - includes homepage + SDK in public folder
            outDir: 'dist',
            rollupOptions: {
                input: {
                    main: resolve(__dirname, 'index.html')
                }
            }
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
