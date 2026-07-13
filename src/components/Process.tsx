import { process } from '../data/content'
import Reveal from './Reveal'
import SectionLabel from './SectionLabel'
import TextAppear from './TextAppear'
import procStudio from '../assets/process/proc-studio.jpg'
import procDark from '../assets/process/proc-dark.jpg'
import procArch from '../assets/process/proc-arch.jpg'
import procCode from '../assets/process/proc-code.jpg'
import procPortrait from '../assets/process/proc-portrait.jpg'

const VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_080021_d598092b-c4c2-4e53-8e46-94cf9064cd50.mp4'

// Frames del proceso (importados => el bundler los incrusta en el build single-file)
const stepImages = [procStudio, procDark, procArch, procCode]

export default function Process() {
  return (
    <section
      id="proceso"
      data-cursor-zone="arrow"
      className="relative overflow-hidden border-t border-steel-700 py-24 sm:py-32"
    >
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* Encabezado */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Reveal>
              <SectionLabel>Proceso</SectionLabel>
            </Reveal>
            <h2
              className="mt-6 font-display font-bold leading-[0.95] tracking-tightest text-steel-100"
              style={{ fontSize: 'clamp(40px, 5.2vw, 84px)' }}
            >
              <TextAppear text="De la idea al lanzamiento," delay={0.05} />{' '}
              <TextAppear text="sin caos" delay={0.28} className="serif-accent text-wine-300" />
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="text-xl leading-relaxed text-steel-300 sm:text-2xl">
              <TextAppear text={process.intro} mode="fade" delay={0.1} stagger={0.015} />
            </p>
          </div>
        </div>

        {/* ── Bento editorial ─────────────────────────────────────────── */}
        <div className="mt-14 grid grid-cols-1 gap-4 lg:grid-cols-12">
          {/* IZQUIERDA — imagen alta con overlay */}
          <Reveal className="lg:col-span-5 lg:row-span-2">
            <figure className="group relative h-full min-h-[440px] overflow-hidden rounded-3xl ring-1 ring-inset ring-cream/10 lg:min-h-[660px]">
              <img
                src={procPortrait}
                alt="Sesión de descubrimiento con un cliente"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.04]"
              />
              {/* Grade cálido para legibilidad */}
              <div className="absolute inset-0 bg-gradient-to-t from-steel-950 via-steel-950/30 to-steel-950/10" />
              <div className="absolute inset-0 bg-[#2a121a] mix-blend-multiply opacity-25" />
              <div className="relative z-10 flex h-full flex-col justify-between p-7 sm:p-9">
                <div className="flex items-center justify-between font-mono text-[0.68rem] uppercase tracking-[0.2em] text-cream/85">
                  <span>INDX —— // Proceso</span>
                  <span>Rev 4.0</span>
                </div>
                <div>
                  <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-wine-300">
                    Cómo trabajo
                  </p>
                  <h3
                    className="font-display font-semibold leading-[0.92] tracking-tightest text-cream"
                    style={{ fontSize: 'clamp(34px, 4vw, 60px)' }}
                  >
                    Del concepto
                    <br />
                    al lanzamiento
                  </h3>
                </div>
              </div>
            </figure>
          </Reveal>

          {/* ARRIBA-DERECHA — panel claro (crema) tipo editorial */}
          <Reveal delay={0.08} className="lg:col-span-7">
            <div className="flex h-full flex-col justify-between gap-10 rounded-3xl bg-cream p-8 text-steel-950 sm:p-10">
              <h3
                className="font-display font-semibold leading-[0.9] tracking-tightest"
                style={{ fontSize: 'clamp(40px, 5.2vw, 88px)' }}
              >
                Proceso claro,
                <br />
                <span className="serif-accent font-normal text-wine">sin ruido</span>
              </h3>
              <div className="grid grid-cols-1 gap-8 border-t border-steel-950/15 pt-7 sm:grid-cols-2">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-wine">Mod — 1.07</p>
                  <p className="mt-3 text-base leading-relaxed text-steel-950/75">
                    Trabajo directo y ágil: tratas conmigo, no con una cadena de gestores. Cada
                    decisión tiene un porqué y un responsable.
                  </p>
                </div>
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-wine">Mod — 1.08</p>
                  <p className="mt-3 text-base leading-relaxed text-steel-950/75">
                    Entregas frecuentes y visibles. Ves avances reales en cada etapa, sin sorpresas
                    al final ni cajas negras.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* ABAJO-DERECHA — bloque de vídeo oscuro */}
          <Reveal delay={0.12} className="lg:col-span-7">
            <figure className="relative min-h-[260px] overflow-hidden rounded-3xl bg-steel-950 ring-1 ring-inset ring-cream/10 sm:min-h-[300px]">
              <video
                className="absolute inset-0 h-full w-full object-cover opacity-90"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              >
                <source src={VIDEO_SRC} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-r from-steel-950 via-steel-950/55 to-transparent" />
              <div className="absolute inset-0 bg-[#2a121a] mix-blend-multiply opacity-25" />
              <figcaption className="relative z-10 flex h-full flex-col justify-between p-7 sm:p-9">
                <span className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-cream/80">
                  Output —— // Entrega
                </span>
                <p
                  className="max-w-md font-display font-semibold leading-[1.02] tracking-tightest text-cream"
                  style={{ fontSize: 'clamp(24px, 3vw, 40px)' }}
                >
                  Webs que la gente quiere{' '}
                  <span className="serif-accent text-wine-300">usar</span>, no solo ver.
                </p>
              </figcaption>
            </figure>
          </Reveal>
        </div>

        {/* ── Frames de etapas (se completan progresivamente al scrollear) ── */}
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {process.steps.map((step, i) => (
            <Reveal key={step.index} delay={i * 0.08}>
              <article className="group relative h-full min-h-[300px] overflow-hidden rounded-3xl ring-1 ring-inset ring-cream/10">
                <img
                  src={stepImages[i]}
                  alt={step.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover opacity-70 grayscale transition-all duration-[1.1s] ease-out-expo group-hover:scale-105 group-hover:opacity-90 group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-steel-950 via-steel-950/55 to-steel-950/15" />
                <div className="absolute inset-0 bg-[#2a121a] mix-blend-multiply opacity-30 transition-opacity duration-500 group-hover:opacity-15" />
                <div className="relative z-10 flex h-full flex-col justify-between p-6">
                  <span className="font-mono text-xs text-wine-300">/{step.index}</span>
                  <div>
                    <h3 className="font-display text-xl font-medium tracking-tight text-cream">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-base leading-relaxed text-cream/80 sm:text-lg">{step.description}</p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
