import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy für API-Routen (wenn Backend auf separatem Server läuft)
      '/api': {
        target: 'http://localhost:3000', // Backend-Server URL
        changeOrigin: true,
        // Für lokale Entwicklung: Mock-Response wird in Komponente verwendet
        // Später: Backend-Server mit Express.js oder Next.js API Routes
      }
    }
  }
})
