import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @use '/src/features/shared/_vars.scss' as *;
        @use '/src/features/shared/mixins.scss' as *;
        `
      }
    }
  }
})
