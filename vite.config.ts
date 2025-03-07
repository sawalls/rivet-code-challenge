import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import eslint from 'vite-plugin-eslint'

export default defineConfig({
  base: '/',
  plugins: [react(), eslint()],
})