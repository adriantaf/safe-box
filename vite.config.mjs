import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import electron from 'vite-plugin-electron';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    electron({
      entry: 'electron/main.js',
      vite: {
        build: {
          rollupOptions: {
            external: ['electron'],
            input: {
              index: './index.html',
              info: './info.html',
            },
          },
        },
      },
    }),
    tailwindcss()
  ],
});
