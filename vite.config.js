import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            // eslint-disable-next-line no-undef
            '@': path.resolve(__dirname, './src'),
        },
    },
    server: {
        host: '0.0.0.0',
        port: 8080, // 指定启动端口号为8080
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@use "src/assets/style/variables.scss" as *;`, // 全局scss变量
            },
        },
    },
});
