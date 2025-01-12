import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc';
import electron from 'vite-plugin-electron';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    electron({
      entry: 'electron/main.js',
      vite: {
        build: {
          rollupOptions: {
            external: ['electron'],
          },
        },
      },
    }),
  ],
  css: {
    postcss: {
      plugins: [tailwindcss(), autoprefixer()],
    },
  },
})
