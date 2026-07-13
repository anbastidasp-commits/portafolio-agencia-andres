import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { about } from '../data/content'
import TextAppear from './TextAppear'
import { useReveal } from '../hooks/useReveal'
import photoMain from '../assets/about/andres-1.webp'
import photoHover from '../assets/about/andres-2.webp'

const ease = [0.16, 1, 0.3, 1] as const

export default function About() {
  const { ref, isInView } = useReveal()

  return (
    <section id="sobre-mi" className="relative overflow-hidden border-t border-steel-700 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Grid principal: foto izquierda, texto derecha */}
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-start">
          {/* Columna izquierda: foto + datos */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease }}
            className="relative"
          >
            {/* Foto — dos capas (segunda aparece al hover, parallax suave) */}
            <div className="group relative overflow-hidden rounded-3xl ring-1 ring-inset ring-cream/10">
              <img
                src={photoMain}
                alt="Andrés Bastidas"
                className="aspect-[4/3] w-full object-cover object-center transition-transform duration-[1.1s] ease-out-expo group-hover:scale-[1.04]"
              />
              <img
                src={photoHover}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full scale-105 object-cover object-center opacity-0 transition-all duration-700 ease-out-expo group-hover:scale-100 group-hover:opacity-100"
              />
              {/* Overlay con gradiente abajo */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-1/3 bg-gradient-to-t from-steel-950/60 to-transparent" />

              {/* Badge de disponibilidad encima de la foto */}
              <div className="absolute left-5 top-5 z-20 flex items-center gap-2 rounded-full border border-cream/15 bg-steel-950/70 px-3 py-2 backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-wine-400 shadow-[0_0_12px_2px_rgba(176,69,79,0.7)] motion-safe:animate-pulse-dot" />
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-cream/80">
                  {about.availability}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Columna derecha: bio + datos */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 32 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="flex flex-col justify-center gap-8"
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-steel-300">
              <span className="h-px w-8 bg-wine-400" />
              {about.eyebrow}
            </div>

            {/* Bio principal */}
            <div className="flex flex-col gap-5">
              <p className="font-display text-[clamp(24px,3vw,40px)] font-semibold leading-[1.15] tracking-tight text-steel-100">
                <TextAppear text={about.headline} />
                <br />
                <span className="serif-accent italic text-wine-300">
                  <TextAppear text={about.headlineAccent} delay={0.15} />
                </span>
              </p>
              <p className="text-xl leading-relaxed text-steel-300">
                <TextAppear text={about.bioPrimary} mode="fade" delay={0.1} stagger={0.012} />
              </p>
              <p className="text-lg leading-relaxed text-steel-500">{about.bioSecondary}</p>
            </div>

            {/* Stack de herramientas */}
            <div className="flex flex-col gap-3">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-steel-500">
                Herramientas
              </span>
              <div className="flex flex-wrap gap-2">
                {about.tools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full border border-steel-700 px-3 py-1.5 font-mono text-xs text-steel-300"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA de contacto inline */}
            <a
              href="#contacto"
              data-cursor
              className="group inline-flex w-fit items-center gap-2 rounded-full border border-cream/20 px-6 py-3 font-mono text-xs uppercase tracking-[0.15em] text-cream transition-colors hover:border-wine-400/60 hover:bg-wine-500/10"
            >
              {about.ctaLabel}
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>
        </div>

      </div>
    </section>
  )
}
