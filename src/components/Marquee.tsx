import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { marqueeWords } from '../data/content'

/** Marquesina infinita (kinetic typography, sello Awwwards).
 *  La animación CSS se pausa cuando la banda no está en pantalla —
 *  antes seguía corriendo durante todo el scroll de la página. */
export default function Marquee() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { margin: '80px 0px' })
  const items = [...marqueeWords, ...marqueeWords]

  return (
    <motion.section
      ref={ref}
      aria-hidden="true"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden border-y border-wine-700/30 bg-cream py-9 text-steel-950 sm:py-14"
    >
      <div
        className="flex w-max animate-marquee whitespace-nowrap"
        style={{ animationPlayState: inView ? 'running' : 'paused' }}
      >
        {items.map((word, i) => (
          <span key={i} className="flex items-center">
            <span className="font-display text-4xl font-medium tracking-tightest sm:text-7xl">
              {word}
            </span>
            {/* Punto separador alterna vino/steel sobre la banda crema */}
            <span
              className={`mx-6 inline-block h-2 w-2 shrink-0 rounded-full sm:mx-10 ${
                i % 2 === 0 ? 'bg-wine' : 'bg-steel-700'
              }`}
            />
          </span>
        ))}
      </div>
    </motion.section>
  )
}
