import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { brand } from '../data/content'

const EXIT_EASE = [0.83, 0, 0.17, 1] as const

/**
 * Intro de carga "tinta": el wordmark aparece contorneado en crema y se va
 * llenando de carmesí de abajo hacia arriba (clip-path, barato de animar).
 * Al llegar a 100 sale con doble cortina: panel carmesí barre primero y el
 * telón negro sube después revelando el sitio.
 */
export default function Preloader() {
  const [count, setCount] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setCount(100)
      setDone(true)
      return
    }
    const start = performance.now()
    const duration = 1050
    let frame = 0
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration)
      // easing suave para que el llenado no sea lineal (arranca rápido, asienta)
      const eased = 1 - Math.pow(1 - p, 2.2)
      setCount(Math.round(eased * 100))
      if (p < 1) {
        frame = requestAnimationFrame(tick)
      } else {
        setTimeout(() => setDone(true), 250)
      }
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[80] overflow-hidden bg-steel-950"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.85, delay: 0.25, ease: EXIT_EASE }}
        >
          {/* Panel carmesí que barre hacia arriba justo antes del telón negro */}
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 bg-wine"
            initial={{ y: '100%' }}
            exit={{ y: '0%' }}
            transition={{ duration: 0.55, ease: EXIT_EASE }}
          />

          <div className="relative flex h-full flex-col items-center justify-center px-6">
            {/* Wordmark: contorno crema + relleno que sube como tinta */}
            <div className="relative select-none font-serif italic leading-none [font-size:clamp(64px,16vw,220px)]">
              <span aria-hidden="true" className="preloader-outline block">
                {brand.logo}
              </span>
              <span
                className="preloader-fill absolute inset-0 block"
                style={{ clipPath: `inset(${100 - count}% 0 0 0)` }}
              >
                {brand.logo}
              </span>
            </div>

            {/* Línea inferior: etiqueta + contador pequeño */}
            <motion.div
              className="absolute inset-x-6 bottom-7 flex items-end justify-between sm:inset-x-10 sm:bottom-9"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.6 }}
            >
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.35em] text-steel-300 sm:text-xs">
                Portafolio — {brand.year}
              </span>
              <span className="font-mono text-sm tabular-nums text-cream sm:text-base">
                {String(count).padStart(3, '0')}
                <span className="text-wine-300">%</span>
              </span>
            </motion.div>

            {/* Progreso: hairline crema que se llena de carmesí */}
            <div className="absolute inset-x-0 bottom-0 h-[2px] bg-cream/10">
              <div
                className="h-full origin-left bg-wine transition-transform duration-150 ease-linear"
                style={{ transform: `scaleX(${count / 100})` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
