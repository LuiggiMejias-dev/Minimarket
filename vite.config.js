import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    strictPort: true,
    // Permite que Vite se conecte a la red local de manera más estable
    host: true, 
    watch: {
      // El modo polling es más lento pero necesario para carpetas con sincronización (OneDrive/Dropbox)
      usePolling: true,
      // Intervalos ajustados para no saturar el procesador pero mantener buena respuesta
      interval: 500,
      binaryInterval: 1000,
      // Importante: ignorar node_modules evita que Vite vigile miles de archivos innecesarios
      ignored: [
        '**/node_modules/**', 
        '**/dist/**', 
        '**/build/**'
      ]
    },
  },
})