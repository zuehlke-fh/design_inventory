import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { markdownServer } from './src/vite-plugins/markdown';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/design_inventory/',
  plugins: [vue(), markdownServer()]
});