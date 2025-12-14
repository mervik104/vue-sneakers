import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// https://vite.dev/config/
export default defineConfig(
{
  plugins: [vue(), tailwindcss(), vuetify({ autoImport: true })],
  server: {
    allowedHosts: [
      'j3ips0h58581.share.zrok.io',
    ],
  },
})

