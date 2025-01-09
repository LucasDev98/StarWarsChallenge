import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        short_name: 'StarWars',
        name: 'StarWars Heroes App',
        icons: [
          {
            src: '/images/star-wars-logo.png',
            type: 'image/png',
            sizes: 'any',
          },
        
        ],
        start_url: '.',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        lang: 'es',
      },
    }),
  ],
});

