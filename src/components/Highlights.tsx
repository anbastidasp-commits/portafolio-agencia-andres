import { ArrowUpRight } from 'lucide-react'
import { highlights, highlightsIntro } from '../data/content'
import Reveal from './Reveal'
import SectionLabel from './SectionLabel'
import why1 from '../assets/highlights/why-1.webp'
import why2 from '../assets/highlights/why-2.webp'
import why3 from '../assets/highlights/why-3.webp'
import why4 from '../assets/highlights/why-4.webp'

// Imagen de alto impacto por motivo (mismo orden que `highlights`).
const images = [why1, why2, why3, why4]

/**
 * "Por qué yo" — intro a (casi) pantalla completa + filas imagen/texto
 * ALTERNADAS (estilo "Experiences designed for living"): eyebrow + título
 * serif + descripción + CTA, con la imagen cambiando de lado en cada fila.
 * El reveal al entrar en viewport lo aporta <Reveal/>.
 */
export default function Highlights() {
  return (
    <section id="por-que-yo" className="relative border-t border-steel-700">
      {/* Línea decorativa tenue de fondo (firma del layout de referencia) */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.12]"
        preserveAspectRatio="none"
        viewBox="0 0 1200 1600"
        fill="none"
      >
        <path d="M-50 380 C 300 260, 360 560, 620 520 S 980 300, 1260 460" stroke="#8FA9BE" strokeWidth="1.2" />
        <path d="M-40 900 C 280 760, 420 1080, 680 1000 S 1020 760, 1260 960" stroke="#8FA9BE" strokeWidth="1.2" />
      </svg>

      {/* ── Intro a (casi) pantalla completa ── */}
      <div className="relative mx-auto flex min-h-[70vh] max-w-7xl flex-col justify-center px-5 py-24 sm:px-8">
        <Reveal>
          <SectionLabel>Por qué yo</SectionLabel>
        </Reveal>
        <Reveal delay={0.05}>
          <h2
            className="mt-8 font-display font-bold leading-[0.9] tracking-tightest text-steel-100"
            style={{ fontSize: 'clamp(72px, 13vw, 220px)' }}
          >
            {highlightsIntro.title}{' '}
            <span className="serif-accent font-bold text-wine-300">{highlightsIntro.titleItalic}</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-8 max-w-2xl text-xl leading-relaxed text-steel-300 sm:text-2xl">
            {highlightsIntro.description}
          </p>
        </Reveal>
      </div>

      {/* ── Filas imagen/texto alternadas ── */}
      <div className="relative mx-auto max-w-7xl px-5 pb-24 sm:px-8 sm:pb-32">
        <div className="flex flex-col gap-20 sm:gap-28 lg:gap-36">
          {highlights.map((h, i) => {
            const imgRight = i % 2 === 0
            return (
              <Reveal key={h.title}>
                <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
                  {/* Imagen */}
                  <figure
                    className={`group relative overflow-hidden rounded-3xl ring-1 ring-inset ring-cream/10 ${
                      imgRight ? 'lg:order-2' : 'lg:order-1'
                    }`}
                  >
                    <div className="aspect-[4/5] sm:aspect-[3/2] lg:aspect-[4/5]">
                      <img
                        src={images[i]}
                        alt={h.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
                      />
                    </div>
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-steel-950/40 to-transparent" />
                  </figure>

                  {/* Texto */}
                  <div className={imgRight ? 'lg:order-1' : 'lg:order-2'}>
                    <span className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-wine-300">
                      <span>({String(i + 1).padStart(2, '0')})</span>
                      {h.eyebrow}
                    </span>
                    <h3
                      className="serif-accent mt-5 leading-[0.95] text-steel-100"
                      style={{ fontSize: 'clamp(40px, 5.5vw, 80px)' }}
                    >
                      {h.title}
                    </h3>
                    <p className="mt-6 max-w-md text-xl leading-relaxed text-steel-300 sm:text-2xl">
                      {h.description}
                    </p>
                    <a
                      href="#contacto"
                      data-cursor
                      className="group/cta mt-9 inline-flex items-center gap-2 rounded-full bg-wine px-6 py-3 font-mono text-xs font-semibold uppercase tracking-[0.15em] text-cream transition-colors duration-300 hover:bg-wine-500"
                    >
                      Hablemos
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
                    </a>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
