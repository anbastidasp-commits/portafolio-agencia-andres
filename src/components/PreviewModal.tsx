import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, X } from 'lucide-react'
import type { Project } from '../data/content'

const ease = [0.16, 1, 0.3, 1] as const

/** Previsualización emergente de una landing: screenshot + abrir en nueva pestaña. */
export default function PreviewModal({
  project,
  image,
  onClose,
}: {
  project: Project | null
  image: string | null
  onClose: () => void
}) {
  // Bloqueo de scroll + Escape mientras está abierto.
  useEffect(() => {
    if (!project) return
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[90] grid place-items-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-steel-950/85 backdrop-blur-md"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.97 }}
            transition={{ duration: 0.5, ease }}
            className="relative z-10 grid w-full max-w-5xl overflow-hidden rounded-3xl border border-cream/12 bg-steel-900/70 shadow-[0_50px_140px_-40px_rgba(0,0,0,0.9)] ring-1 ring-inset ring-cream/10 backdrop-blur-2xl lg:grid-cols-[1.5fr_1fr]"
          >
            {/* Screenshot */}
            <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto">
              <div className="absolute inset-0" style={{ background: project.art }} />
              {image && (
                <img
                  src={image}
                  alt={project.title}
                  className="absolute inset-0 h-full w-full object-cover object-top"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-steel-950/50 to-transparent lg:bg-gradient-to-r" />
            </div>

            {/* Info */}
            <div className="flex flex-col justify-between gap-8 p-7 sm:p-9">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-wine-300">
                  {project.badge?.type ?? 'Caso'} · {project.badge?.date}
                </p>
                <h3 className="mt-3 font-display text-4xl font-bold tracking-tightest text-steel-100">
                  {project.title}
                </h3>
                <p className="mt-4 text-xl leading-relaxed text-steel-300">{project.blurb}.</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full pill px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-wide text-steel-100"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <a
                  href={project.localUrl}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-wine px-6 py-4 text-sm font-semibold text-cream transition-colors duration-300 hover:bg-wine-500"
                >
                  Abrir para interactuar
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <p className="mt-3 font-mono text-[0.7rem] leading-relaxed text-steel-500">
                  Local: {project.pathHint}
                </p>
              </div>
            </div>

            {/* Cerrar */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar"
              data-cursor
              className="absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full border border-cream/15 bg-steel-950/60 text-steel-100 backdrop-blur transition-colors duration-300 hover:border-wine-400/60 hover:bg-wine-500/20 hover:text-cream"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
