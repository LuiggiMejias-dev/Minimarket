import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    strictPort: true,
    // Forzamos a Vite a escuchar en la IP local pura en lugar de 'localhost'
    host: '127.0.0.1', 
    watch: {
      usePolling: true,
      interval: 100,
      binaryInterval: 300
    },
  },
})