import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['@stripe/stripe-js'],
    }
  },
  optimizeDeps: {
    include: ['@stripe/stripe-js'],
  }
})
