import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { services, servicesIntro } from '../data/content'
import procCode from '../assets/process/proc-code.jpg'
import procStudio from '../assets/process/proc-studio.jpg'
import procArch from '../assets/process/proc-arch.jpg'
import procDark from '../assets/process/proc-dark.jpg'
import Reveal from './Reveal'
import TextAppear from './TextAppear'
import { useReveal } from '../hooks/useReveal'
import { containerVariants, cardVariants } from '../lib/variants'
import { EASE } from '../lib/easings'

// Miniaturas (importadas => incrustadas en el build single-file)
const thumbs = [procCode, procStudio, procArch, procDark]

const ease = EASE.out

// Variantes de hover para la fila (línea de acento + shift del índice).
const accentVariants = {
  idle: { scaleX: 0 },
  hovered: { scaleX: 1 },
}
const indexVariants = {
  idle: { x: 0 },
  hovered: { x: 4 },
}

export default function Services() {
  // Acordeón de una fila abierta a la vez (primera abierta por defecto).
  const [open, setOpen] = useState(0)
  const { ref, isInView } = useReveal({ margin: '-60px' })

  return (
    <section id="servicios" className="relative border-t border-steel-700 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Encabezado: eyebrow + título gigante "Servicios.(4)" */}
        <div className="flex flex-col gap-8">
          <Reveal>
            <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-steel-300">
              <Plus className="h-4 w-4 text-wine" />
              Lo que hago
            </span>
          </Reveal>
          <h2
            className="font-display font-semibold leading-[0.9] tracking-tightest text-steel-100"
            style={{ fontSize: 'clamp(64px, 12vw, 200px)' }}
          >
            <TextAppear text="Servicios" delay={0.05} />
            <span className="text-wine">.</span>
            <sup className="ml-2 align-super font-display text-[0.22em] font-medium text-steel-500">
              ({services.length})
            </sup>
          </h2>
          <p className="max-w-2xl text-xl leading-relaxed text-steel-300 sm:text-2xl">
            <TextAppear text={servicesIntro} mode="fade" delay={0.1} stagger={0.015} />
          </p>
        </div>

        {/* Lista acordeón — stagger orquestado al entrar al viewport */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mt-14 border-t border-steel-700"
        >
          {services.map((s, i) => {
            const isOpen = open === i
            return (
              <motion.div key={s.index} variants={cardVariants} className="border-b border-steel-700">
                <motion.button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  data-cursor
                  initial="idle"
                  whileHover="hovered"
                  className="group relative grid w-full grid-cols-[auto_1fr_auto] items-center gap-4 overflow-hidden py-7 text-left sm:gap-8 sm:py-9"
                >
                  {/* Línea de acento que crece desde la izquierda en hover */}
                  <motion.span
                    aria-hidden="true"
                    variants={accentVariants}
                    transition={{ duration: 0.35, ease: EASE.out }}
                    style={{ originX: 0 }}
                    className="pointer-events-none absolute bottom-0 left-0 h-px w-full bg-wine-400"
                  />
                  <motion.span
                    variants={indexVariants}
                    transition={{ duration: 0.3, ease: EASE.out }}
                    className="font-mono text-xs text-steel-500 sm:text-sm"
                  >
                    ({s.index})
                  </motion.span>
                  <span
                    className={`font-display font-semibold tracking-tight transition-colors duration-300 ${
                      isOpen ? 'text-wine-300' : 'text-steel-100 group-hover:text-wine-300'
                    }`}
                    style={{ fontSize: 'clamp(24px, 3.4vw, 48px)' }}
                  >
                    {s.title}
                  </span>
                  <span
                    className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-all duration-500 ease-out-expo sm:h-12 sm:w-12 ${
                      isOpen
                        ? 'rotate-45 border-wine bg-wine text-cream'
                        : 'border-steel-700 text-steel-100 group-hover:border-wine-400'
                    }`}
                  >
                    <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
                  </span>
                </motion.button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-1 gap-8 pb-9 sm:grid-cols-[auto_1fr] lg:grid-cols-[auto_1fr_auto] lg:items-start">
                        {/* Miniaturas */}
                        <div className="flex gap-3">
                          {[thumbs[i], thumbs[(i + 1) % thumbs.length]].map((src, k) => (
                            <div
                              key={k}
                              className="h-16 w-16 overflow-hidden rounded-2xl ring-1 ring-inset ring-cream/10"
                            >
                              <img
                                src={src}
                                alt=""
                                loading="lazy"
                                className="h-full w-full object-cover"
                              />
                            </div>
                          ))}
                        </div>

                        {/* Descripción */}
                        <p className="max-w-xl text-lg leading-relaxed text-steel-300 sm:text-xl">
                          {s.description}
                        </p>

                        {/* Categorías / tags */}
                        <div className="lg:min-w-[16rem]">
                          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-steel-500">
                            Categorías
                          </p>
                          <div className="flex max-w-xs flex-wrap gap-2">
                            {s.tags.map((t) => (
                              <span
                                key={t}
                                className="rounded-full pill px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-wide text-steel-100"
                              >
                                {t}
                              </span>
                            ))}
                            <span className="grid place-items-center rounded-full bg-wine px-3 py-1.5 font-mono text-[0.65rem] font-semibold text-cream">
                              6+
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
