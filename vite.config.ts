import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://dev.back.plus82.co',
        changeOrigin: true,
      },
      '/cdn': {
        target: `https://d1zl1w0yhwh5x4.cloudfront.net`,
        changeOrigin: true,
        rewrite: path => path.replace(/^\/cdn/, ''),
      },
    },
    port: 3000,
  },
})
