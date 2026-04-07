import { defineConfig } from 'vite'

export default defineConfig({
  // Root is the project directory (default)
  // index.html should be at project root
  
  // Static assets folder
  publicDir: 'public',
  
  build: {
    outDir: 'dist',
    emptyOutDir: true
  },
  
  server: {
    port: 5173,
    open: true
  }
})
