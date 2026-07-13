import type { ReactNode } from 'react'
import { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion'
import { ChevronDown, Instagram, Linkedin, Github, Dribbble, ArrowUpRight } from 'lucide-react'
import { hero, brand } from '../data/content'
import HeroBackground from './HeroBackground'
import CyclingWord from './CyclingWord'

const socials = [
  { Icon: Instagram, href: 'https://instagram.com/', label: 'Instagram' },
  { Icon: Linkedin, href: 'https://www.linkedin.com/', label: 'LinkedIn' },
  { Icon: Dribbble, href: 'https://dribbble.com/', label: 'Dribbble' },
  { Icon: Github, href: 'https://github.com/', label: 'GitHub' },
]

const ease = [0.16, 1, 0.3, 1] as const

/** Línea de título con reveal enmascarado (sube desde su propio recorte). */
function MaskLine({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span
        className="block will-change-transform"
        initial={{ y: '115%' }}
        animate={{ y: '0%' }}
        transition={{ duration: 1.1, delay, ease }}
      >
        {children}
      </motion.span>
    </span>
  )
}

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()

  // Vincula el scroll del hero (entra al salir de pantalla).
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  // El titular se comprime y sube; el fondo se mueve más lento (parallax de profundidad).
  // Sólo y + scale (transform GPU). Se quitó el blur() animado por scroll:
  // filtrar el titular gigante en cada frame provocaba repintados costosos = lag.
  const titleY = useTransform(scrollYProgress, [0, 1], ['0%', prefersReduced ? '0%' : '-22%'])
  const titleScale = useTransform(scrollYProgress, [0, 0.6], [1, prefersReduced ? 1 : 0.88])

  // El statement/CTA desaparece antes que el titular.
  const subtitleY = useTransform(scrollYProgress, [0, 0.4], ['0%', prefersReduced ? '0%' : '-40%'])
  const subtitleOp = useTransform(scrollYProgress, [0, 0.3], [1, prefersReduced ? 1 : 0])

  // Fondo aurora con parallax más lento que el contenido.
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', prefersReduced ? '0%' : '30%'])

  // El indicador de scroll se desvanece al primer empujón.
  const indicatorOp = useTransform(scrollYProgress, [0, 0.12], [1, prefersReduced ? 1 : 0])

  return (
    <section
      ref={ref}
      id="top"
      className="relative min-h-[100svh] overflow-hidden bg-steel-950"
    >
      {/* Capa 0 — vídeo de fondo + atmósfera de paleta (parallax con cleanup) */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 will-change-transform">
        <HeroBackground />
      </motion.div>

      {/* Capa 10 — contenido, columna a altura completa para repartir todo */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[110rem] flex-col px-5 pb-8 pt-28 sm:px-8 sm:pt-32">
        {/* ── FILA SUPERIOR: estado · ubicación · redes ─────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease }}
          className="flex items-center justify-between gap-4"
        >
          <div className="flex items-center gap-2.5">
            <span className="h-2 w-2 shrink-0 rounded-full bg-wine-400 shadow-[0_0_12px_2px_rgba(176,69,79,0.7)] motion-safe:animate-pulse-dot" />
            <span className="hero-shadow font-mono text-[0.68rem] uppercase tracking-[0.22em] text-cream/90 sm:text-xs">
              {brand.availability}
            </span>
          </div>

          <span className="hero-shadow hidden font-mono text-xs uppercase tracking-[0.22em] text-steel-300 md:block">
            {brand.location} — {brand.year}
          </span>

          <div className="flex gap-2">
            {socials.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                data-cursor
                className="grid h-9 w-9 place-items-center rounded-full pill text-steel-100 transition-colors duration-300 hover:border-wine-400/60 hover:bg-wine-500/20 hover:text-cream"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </motion.div>

        {/* ── CENTRO: titular gigante repartido por toda la pantalla ── */}
        <div className="flex flex-1 flex-col justify-center py-8 sm:py-12">
          <motion.h1
            className="hero-shadow font-display font-semibold leading-[0.86] tracking-tightest text-steel-100 text-[clamp(56px,11vw,160px)] will-change-transform"
            style={{
              y: titleY,
              scale: titleScale,
            }}
          >
            <MaskLine delay={0.1}>{hero.titleSans}</MaskLine>
            <MaskLine delay={0.24}>
              {/* "con intención": negrita + crema casi blanco con halo => máxima
                  presencia sobre el vídeo (antes el sheen translúcido se difuminaba). */}
              <span className="serif-accent font-bold text-white [text-shadow:0_2px_28px_rgba(0,0,0,0.55),0_1px_4px_rgba(0,0,0,0.6)] lg:pl-[14vw]">
                {hero.titleItalic}
              </span>
            </MaskLine>
          </motion.h1>

          {/* Statement + CTAs, abajo-derecha del titular para repartir el peso */}
          <motion.div
            style={{ y: subtitleY, opacity: subtitleOp }}
            className="mt-10 grid grid-cols-1 gap-8 will-change-transform sm:mt-14 lg:grid-cols-12"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.7, ease }}
              className="flex flex-col gap-7 lg:col-span-5 lg:col-start-8"
            >
              <p className="hero-shadow max-w-xl text-xl leading-relaxed text-cream/90 sm:text-2xl">
                {hero.statement}
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="#contacto"
                  data-cursor
                  className="group inline-flex items-center gap-2 rounded-full bg-cream px-6 py-3.5 text-sm font-semibold text-steel-950 transition-colors duration-300 hover:bg-white"
                >
                  {hero.contactLabel}
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <a
                  href="#proyectos"
                  data-cursor
                  className="inline-flex items-center gap-2 rounded-full border border-cream/25 px-6 py-3.5 text-sm font-medium text-cream backdrop-blur-sm transition-colors duration-300 hover:border-wine-400/70 hover:bg-wine-500/15"
                >
                  Ver proyectos
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* ── FILA INFERIOR: lo que hago · hago [palabra] · destacado ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.85, ease }}
          className="grid grid-cols-1 items-end gap-8 border-t border-cream/10 pt-7 sm:grid-cols-2 lg:grid-cols-12"
        >
          {/* Lo que hago */}
          <div className="lg:col-span-4">
            <p className="hero-shadow mb-3 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-steel-300">
              Lo que hago
            </p>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-base text-cream/90 sm:text-lg">
              {hero.doList.map((d) => (
                <li key={d} className="hero-shadow flex items-center gap-2">
                  <span className="h-1 w-1 shrink-0 rounded-full bg-wine-400" />
                  {d}
                </li>
              ))}
            </ul>
          </div>

          {/* Hago [palabra que cicla] */}
          <div className="lg:col-span-4 lg:text-center">
            <div className="hero-shadow font-display text-4xl tracking-tightest text-steel-100 sm:text-5xl">
              Hago <CyclingWord words={hero.cyclingWords} className="text-wine-300" />
            </div>
          </div>

          {/* Destacado */}
          <div className="flex items-center gap-4 sm:justify-end lg:col-span-4">
            <div className="text-right sm:text-left">
              <p className="hero-shadow font-mono text-[0.68rem] uppercase tracking-[0.22em] text-steel-300">
                {hero.featuredLabel} ({hero.featuredIndex})
              </p>
              <p className="hero-shadow mt-1 text-sm text-cream/90">Casos seleccionados abajo ↓</p>
            </div>
            <div className="h-16 w-12 shrink-0 overflow-hidden rounded-lg ring-1 ring-inset ring-cream/20">
              <div className="h-full w-full bg-gradient-to-br from-wine-500 to-steel-700" />
            </div>
          </div>
        </motion.div>

        {/* Indicador de scroll — se desvanece al empezar a bajar */}
        <motion.div style={{ opacity: indicatorOp }} className="mt-7 flex justify-center">
          <a
            href="#servicios"
            data-cursor
            className="flex flex-col items-center gap-2 text-steel-300 transition-colors hover:text-cream"
          >
            <span className="section-label pill text-cream">
              <span className="section-label__dot" />
              Servicios
            </span>
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ChevronDown className="h-5 w-5" />
            </motion.span>
          </a>
        </motion.div>
      </div>

      {/* Difuminado inferior: suaviza el corte hacia el marquee crema (paleta real #0B0908) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-32 bg-gradient-to-b from-transparent to-[#0B0908]"
      />
    </section>
  )
}
