import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // host: true para abrirla desde el emulador (http://10.0.2.2:5173) o un
  // teléfono en la misma red.
  server: { port: 5173, strictPort: true, host: true },
})
