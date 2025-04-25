import { defineConfig } from 'vite';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export default defineConfig({
  // Define environment variables that should be available in the client
  envPrefix: 'VITE_',  // This ensures only VITE_ prefixed env vars are exposed
  define: {
    // Expose GROQ_API_KEY as VITE_GROQ_API_KEY
    'process.env.GROQ_API_KEY': JSON.stringify(process.env.GROQ_API_KEY),
    'import.meta.env.VITE_GROQ_API_KEY': JSON.stringify(process.env.GROQ_API_KEY),
    'import.meta.env.VITE_API_SECRET_KEY': JSON.stringify(process.env.VITE_API_SECRET_KEY)
  },
  server: {
    // Configure development server
    port: 5173,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  },
  build: {
    // Configure build options
    outDir: 'dist',
    minify: true,
    sourcemap: false
  }
});