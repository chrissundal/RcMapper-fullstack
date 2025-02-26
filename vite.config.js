import { fileURLToPath, URL } from 'node:url';
import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'C:/Users/chris/OneDrive/Documents/GitHub/RcMapper-fullstack/localhost-key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, 'C:/Users/chris/OneDrive/Documents/GitHub/RcMapper-fullstack/localhost.pem')),
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
});
