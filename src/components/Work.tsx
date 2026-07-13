import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, Award } from 'lucide-react'
import { projects, type Project } from '../data/content'
import Reveal from './Reveal'
import SectionLabel from './SectionLabel'
import TextAppear from './TextAppear'
import MagneticButton from './MagneticButton'
import ProjectCard3D from './ProjectCard3D'
import PreviewModal from './PreviewModal'
import { projectCardVariants } from '../lib/variants'
import donMain from '../assets/projects/don-pietro-1.webp'
import donHover from '../assets/projects/don-pietro-2.webp'
import coquiMain from '../assets/projects/coqui-1.webp'
import coquiHover from '../assets/projects/coqui-2.webp'
import fontanaMain from '../assets/projects/fontana-1.webp'
import fontanaHover from '../assets/projects/fontana-2.webp'
import colonialMain from '../assets/projects/cafe-colonial-1.webp'
import colonialHover from '../assets/projects/cafe-colonial-2.webp'

/** Imagen principal + imagen revelada al hover (parallax cross-fade) por slug. */
const images: Record<string, { main: string; hover: string }> = {
  'don-pietro': { main: donMain, hover: donHover },
  'coqui-cafe': { main: coquiMain, hover: coquiHover },
  'fontana-lounge': { main: fontanaMain, hover: fontanaHover },
  'cafe-colonial': { main: colonialMain, hover: colonialHover },
}

export default function Work() {
  const [selected, setSelected] = useState<Project | null>(null)

  return (
    <section id="proyectos" className="relative border-t border-steel-700 py-28 sm:py-40">
      <div className="mx-auto max-w-[92rem] px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <SectionLabel>Proyectos</SectionLabel>
            </Reveal>
            <h2
              className="mt-6 font-display font-bold leading-[0.95] tracking-tightest text-steel-100"
              style={{ fontSize: 'clamp(44px, 5.6vw, 92px)' }}
            >
              <TextAppear text="Trabajo" delay={0.05} />{' '}
              <TextAppear text="seleccionado" delay={0.15} className="serif-accent text-cream" />
            </h2>
          </div>
          <Reveal delay={0.1} className="lg:col-span-5">
            <p className="text-xl leading-relaxed text-steel-300 sm:text-2xl">
              Landings reales construidas de principio a fin. Pasa el cursor y haz clic para{' '}
              <span className="text-steel-100">previsualizar e interactuar</span>.
            </p>
          </Reveal>
        </div>

        {/* Cards apiladas (sticky stack) */}
        <div className="mt-24 sm:mt-28">
          {projects.map((p, i) => (
            <WorkCard key={p.slug} project={p} index={i} onOpen={() => setSelected(p)} />
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <MagneticButton href="#contacto" variant="ghost">
            Hablemos de tu proyecto
          </MagneticButton>
        </div>
      </div>

      <PreviewModal
        project={selected}
        image={selected ? images[selected.slug].main : null}
        onClose={() => setSelected(null)}
      />
    </section>
  )
}

function WorkCard({
  project,
  index,
  onOpen,
}: {
  project: Project
  index: number
  onOpen: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.4])
  const [hover, setHover] = useState(false)
  const img = images[project.slug]

  return (
    <div ref={ref} className="sticky" style={{ top: `${5.5 + index * 1.75}rem` }}>
      <motion.div
        variants={projectCardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        <motion.article
          style={{ scale, opacity }}
          className="glass-card relative mb-16 overflow-hidden rounded-[2rem] border border-cream/12 bg-steel-900/45 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.85)] ring-1 ring-inset ring-cream/10 backdrop-blur-lg sm:mb-24"
        >
          {/* Brillo de cristal (glassmorphism pro) */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-cream/40 to-transparent"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -left-24 -top-24 z-0 h-64 w-64 rounded-full bg-wine/20 blur-3xl"
          />
          <div className="relative grid grid-cols-1 gap-6 p-7 sm:p-10 lg:grid-cols-12">
            {/* Tags */}
            <div className="flex flex-row flex-wrap gap-2 lg:col-span-2 lg:flex-col">
              {project.tags.map((t) => (
                <span
                  key={t}
                  className="w-fit rounded-full pill px-3 py-1 font-mono text-[0.65rem] uppercase tracking-wide text-steel-300"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Screenshot — tilt 3D + cursor flecha + clic abre preview */}
            <div className="lg:col-span-7">
              <ProjectCard3D
                glow
                cursorZone="arrow"
                onClick={onOpen}
                onEnter={() => setHover(true)}
                onLeave={() => setHover(false)}
                className="aspect-[16/10] w-full cursor-none rounded-2xl ring-1 ring-inset ring-steel-300/10"
              >
                <div className="absolute inset-0" style={{ background: project.art }} />
                {/* Imagen principal */}
                <img
                  src={img.main}
                  alt={project.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-[1.1s] ease-out-expo group-hover:scale-[1.06]"
                />
                {/* Segunda imagen — cross-fade + parallax al hover */}
                <img
                  src={img.hover}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  className="absolute inset-0 h-full w-full scale-110 object-cover object-center opacity-0 transition-all duration-700 ease-out-expo group-hover:scale-105 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-steel-950/55 via-transparent to-transparent" />
                {/* Overlay con CTA "Ver proyecto" que aparece al hover */}
                <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="flex items-center gap-2 rounded-full bg-wine px-5 py-3 shadow-[0_12px_40px_-10px_rgba(192,57,43,0.8)]">
                    <span className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-cream">
                      Ver proyecto
                    </span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-cream" />
                  </div>
                </div>
                {/* Línea carmesí que barre al hover */}
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute inset-x-0 bottom-0 z-20 h-1 origin-left bg-wine transition-transform duration-500 ease-out-expo ${
                    hover ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </ProjectCard3D>
            </div>

            {/* Badge de reconocimiento */}
            <div className="flex items-start lg:col-span-3 lg:justify-end">
              {project.badge && (
                <div className="flex items-center gap-3 rounded-2xl pill px-4 py-3">
                  <Award className="h-5 w-5 text-wine-300" />
                  <div className="text-xs">
                    <p className="font-medium text-steel-100">{project.badge.label}</p>
                    <p className="text-steel-500">
                      {project.badge.type} · {project.badge.date}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Pie: eyebrow + título + botón preview */}
          <div className="relative flex flex-col gap-4 border-t border-cream/10 p-7 sm:flex-row sm:items-end sm:justify-between sm:p-10">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-steel-500">
                {project.blurb}
              </p>
              <h3 className="mt-2 font-display text-4xl font-semibold tracking-tight text-steel-100 sm:text-5xl">
                {project.title}
              </h3>
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                data-cursor
                className="group/demo mt-3 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.15em] text-wine-300 transition-colors hover:text-cream"
              >
                {project.demoUrl.replace('https://', '')}
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 ease-out-expo group-hover/demo:translate-x-0.5 group-hover/demo:-translate-y-0.5" />
              </a>
            </div>
            <button
              type="button"
              onClick={onOpen}
              data-cursor
              className="group inline-flex w-fit items-center gap-1.5 rounded-full pill px-5 py-3 text-sm text-steel-100 transition-colors hover:bg-wine hover:text-cream"
            >
              Previsualizar{' '}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </motion.article>
      </motion.div>
    </div>
  )
}
