import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { faqs, brand } from '../data/content'
import Reveal from './Reveal'
import SectionLabel from './SectionLabel'
import { EASE, DUR } from '../lib/easings'
import faqImg from '../assets/work/faq.jpg'

export default function FAQ() {
  const [open, setOpen] = useState(0)

  return (
    <section className="relative border-t border-steel-700 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* ── Izquierda: label + título + subtítulo + imagen enmarcada ── */}
          <div className="lg:col-span-5">
            <Reveal>
              <SectionLabel>FAQ</SectionLabel>
            </Reveal>
            <Reveal delay={0.05}>
              <h2
                className="mt-6 font-display font-bold leading-[0.95] tracking-tightest text-steel-100"
                style={{ fontSize: 'clamp(40px, 5vw, 80px)' }}
              >
                ¿Tienes <span className="serif-accent text-wine-300">dudas?</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md text-xl leading-relaxed text-steel-300 sm:text-2xl">
                Esto es lo que suelen preguntarme antes de empezar. Si te queda cualquier otra
                duda, escríbeme directo y lo vemos.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <figure className="group relative mt-10 overflow-hidden rounded-2xl ring-1 ring-inset ring-cream/10">
                <img
                  src={faqImg}
                  alt="Espacio de trabajo"
                  loading="lazy"
                  className="aspect-[16/10] w-full object-cover grayscale transition-all duration-[1.2s] ease-out-expo group-hover:scale-[1.04] group-hover:grayscale-0"
                />
                {/* Tinte de paleta (marino + carmesí) para cohesión cromática */}
                <div className="absolute inset-0 bg-gradient-to-t from-steel-950 via-steel-950/30 to-steel-950/20" />
                <div className="absolute inset-0 bg-[#13202c] mix-blend-multiply opacity-40" />
                {/* Corchetes de encuadre */}
                <span className="absolute left-3 top-3 h-5 w-5 border-l border-t border-cream/70" />
                <span className="absolute right-3 top-3 h-5 w-5 border-r border-t border-cream/70" />
                <span className="absolute bottom-3 left-3 h-5 w-5 border-b border-l border-cream/70" />
                <span className="absolute bottom-3 right-3 h-5 w-5 border-b border-r border-cream/70" />
                <figcaption className="absolute inset-0 grid place-items-center font-mono text-xs uppercase tracking-[0.2em] text-cream/90">
                  © {brand.name}
                </figcaption>
              </figure>
            </Reveal>
          </div>

          {/* ── Derecha: acordeón en tarjetas-píldora separadas ── */}
          <div className="flex flex-col gap-3 lg:col-span-7">
            {faqs.map((f, i) => {
              const isOpen = open === i
              return (
                <Reveal key={i} delay={i * 0.05}>
                  <div
                    className={`overflow-hidden rounded-2xl border transition-colors duration-500 ${
                      isOpen ? 'border-wine-400/40 bg-steel-900/60' : 'border-cream/10 bg-steel-900/40'
                    } backdrop-blur-sm`}
                  >
                    <motion.button
                      type="button"
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      aria-expanded={isOpen}
                      data-cursor
                      whileHover={{ x: 2 }}
                      transition={{ duration: DUR.fast, ease: EASE.out }}
                      className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left sm:px-7"
                    >
                      <span
                        className={`font-display text-xl font-medium tracking-tight transition-colors duration-300 sm:text-2xl ${
                          isOpen ? 'text-wine-300' : 'text-steel-100'
                        }`}
                      >
                        {f.q}
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: DUR.base, ease: EASE.spring }}
                        className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-colors duration-500 ${
                          isOpen ? 'border-wine bg-wine text-cream' : 'border-cream/15 text-steel-100'
                        }`}
                      >
                        <Plus className="h-4 w-4" />
                      </motion.span>
                    </motion.button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: 'auto' }}
                          exit={{ height: 0 }}
                          transition={{ duration: DUR.base, ease: EASE.smooth }}
                          className="overflow-hidden"
                        >
                          <motion.p
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: DUR.fast, ease: EASE.out, delay: 0.12 }}
                            className="max-w-2xl px-6 pb-6 text-xl leading-relaxed text-steel-300 sm:px-7"
                          >
                            {f.a}
                          </motion.p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
