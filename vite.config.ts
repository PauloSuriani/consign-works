import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
  VitePWA({
    injectRegister: 'auto', registerType: 'autoUpdate',
    workbox: {
      globPatterns: ['**/*.{js,css,html,ico,png,svg}']
    },
    manifest: {
      name: 'Consignados',
      short_name: 'Consig',
      description: 'Vendas e Consignações',
      theme_color: '#ffffff',
      icons: [
        {
          src: 'android-launchericon-512-512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable'
        }
      ]
    },
    devOptions: {
      enabled: true
    }
  })],
})
