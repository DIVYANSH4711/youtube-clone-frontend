import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/main': {
        target: 'https://youtube-clone-by-divyansh-kashyap.onrender.com/api/v1',
        secure: true,
        changeOrigin: true
      }
    },
  },
})
