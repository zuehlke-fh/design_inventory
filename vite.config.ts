import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { markdownServer } from './src/vite-plugins/markdown';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), markdownServer()],
  base: process.env.NODE_ENV === 'production' ? '/your-repo-name/' : '/',
});