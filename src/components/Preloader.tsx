import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { brand } from '../data/content'

/** Intro de carga con contador, estilo editorial. */
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
    const duration = 1700
    let frame = 0
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration)
      setCount(Math.round(p * 100))
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
          className="fixed inset-0 z-[80] flex flex-col items-center justify-center bg-steel-950"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.9, ease: [0.83, 0, 0.17, 1] }}
        >
          <motion.span
            className="font-mono text-xs uppercase tracking-[0.4em] text-steel-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {brand.logo} — Portafolio
          </motion.span>
          <div className="mt-6 font-display text-[18vw] font-semibold leading-none text-steel-100 tabular-nums sm:text-[12vw]">
            {count}
            <span className="text-steel-500">%</span>
          </div>
          <div className="mt-6 h-px w-48 overflow-hidden bg-steel-300/15">
            <div
              className="h-full bg-steel-100 transition-[width] duration-150 ease-linear"
              style={{ width: `${count}%` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
