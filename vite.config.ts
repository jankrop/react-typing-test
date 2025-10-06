import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    plugins: [
        react(),
        tailwindcss()
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    server: {
        port: 2137,  // papież
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/setupTests.ts',
    },
    base: '/react-typing-test/',
});
