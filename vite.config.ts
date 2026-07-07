import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// base relativo + singlefile => un único index.html que se abre con doble clic (file://)
export default defineConfig({
  base: './',
  plugins: [react(), viteSingleFile()],
  build: {
    // Incrusta TODOS los assets (jpg de proceso) como data-URI dentro del
    // index.html único => las imágenes se ven al abrir con doble clic (file://).
    assetsInlineLimit: 100_000_000,
  },
})
