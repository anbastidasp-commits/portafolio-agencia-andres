import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// Build normal (Vercel): assets separados con hash => caché de CDN + code
// splitting (Spline se descarga sólo al llegar a Contacto).
// Build portable (file://): `npm run build:static` activa SINGLEFILE=1 y
// vuelve al index.html único con todo incrustado.
const singlefile = process.env.SINGLEFILE === '1'

export default defineConfig({
  base: './',
  plugins: [react(), ...(singlefile ? [viteSingleFile()] : [])],
  build: singlefile
    ? {
        assetsInlineLimit: 100_000_000,
      }
    : {
        assetsInlineLimit: 4096,
        rollupOptions: {
          output: {
            manualChunks: {
              react: ['react', 'react-dom'],
              motion: ['framer-motion'],
              gsap: ['gsap', 'lenis'],
            },
          },
        },
      },
})
