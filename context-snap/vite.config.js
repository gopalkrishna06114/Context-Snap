import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        popup: resolve(__dirname, 'index.html'),
        claude: resolve(__dirname, 'src/content/claude.js'),
        chatgpt: resolve(__dirname, 'src/content/chatgpt.js'),
        perplexity: resolve(__dirname, 'src/content/perplexity.js'),
        gemini: resolve(__dirname, 'src/content/gemini.js'),
        background: resolve(__dirname, 'src/background/service-worker.js'),
      },
      output: {
        entryFileNames: (chunk) => {
          if (['claude', 'chatgpt', 'gemini', 'perplexity', 'background'].includes(chunk.name)) {
            return `assets/${chunk.name}.js`
          }
          return 'assets/[name]-[hash].js'
        }
      }
    }
  }
})