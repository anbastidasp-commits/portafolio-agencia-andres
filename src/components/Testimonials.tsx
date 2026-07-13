import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { Star } from 'lucide-react'
import { testimonials, type Testimonial } from '../data/content'
import Reveal from './Reveal'
import SectionLabel from './SectionLabel'
import TextAppear from './TextAppear'
import av11 from '../assets/people/av11.jpg'
import av5 from '../assets/people/av5.jpg'
import av14 from '../assets/people/av14.jpg'
import av32 from '../assets/people/av32.jpg'
import av47 from '../assets/people/av47.jpg'
import av60 from '../assets/people/av60.jpg'

// Avatar por índice de testimonio (src/assets/people, incrustados en el build).
const avatars = [av11, av5, av14, av32, av47, av60]

type Card = Testimonial & { avatar: string }
const cards: Card[] = testimonials.map((t, i) => ({ ...t, avatar: avatars[i % avatars.length] }))

/** Reseñas en marquesina deslizable infinita (dos filas en sentidos opuestos).
 *  Las animaciones se pausan cuando la sección no está en pantalla. */
export default function Testimonials() {
  // La segunda fila usa el orden invertido para que no se vea idéntica a la primera.
  const rowA = cards
  const rowB = [...cards].reverse()
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { margin: '80px 0px' })

  return (
    <section ref={ref} className="relative overflow-hidden border-t border-steel-700 py-24 sm:py-32">
      <div className="mx-auto mb-14 max-w-7xl px-5 text-center sm:px-8">
        <Reveal className="flex justify-center">
          <SectionLabel>Testimonios</SectionLabel>
        </Reveal>
        <h2
          className="mx-auto mt-6 max-w-3xl font-display font-bold leading-[0.98] tracking-tightest text-steel-100"
          style={{ fontSize: 'clamp(36px, 4.8vw, 76px)' }}
        >
          <TextAppear text="Lo que dicen" delay={0.05} />{' '}
          <TextAppear text="mis clientes" delay={0.2} className="serif-accent text-wine-300" />
        </h2>
      </div>

      {/* Filas en marquesina con difuminado en los bordes */}
      <div className="flex flex-col gap-5 [mask-image:linear-gradient(to_right,transparent,black_7%,black_93%,transparent)]">
        <MarqueeRow items={[...rowA, ...rowA]} duration={56} running={inView} />
        <MarqueeRow items={[...rowB, ...rowB]} duration={68} reverse running={inView} />
      </div>
    </section>
  )
}

function MarqueeRow({
  items,
  duration,
  reverse = false,
  running = true,
}: {
  items: Card[]
  duration: number
  reverse?: boolean
  running?: boolean
}) {
  return (
    <div
      className="flex w-max animate-marquee hover:[animation-play-state:paused]"
      style={{
        animationDuration: `${duration}s`,
        animationDirection: reverse ? 'reverse' : 'normal',
        animationPlayState: running ? undefined : 'paused',
      }}
    >
      {items.map((t, i) => (
        <ReviewCard key={i} card={t} />
      ))}
    </div>
  )
}

function ReviewCard({ card }: { card: Card }) {
  // Slot vacío (aún sin clientes): misma tarjeta, con esqueletos en lugar de info.
  const empty = !card.quote && !card.name

  if (empty) return <PlaceholderCard />

  return (
    <figure className="mx-2.5 flex w-[320px] shrink-0 flex-col gap-5 rounded-3xl border border-steel-950/5 bg-steel-100 p-7 shadow-[0_24px_60px_-32px_rgba(0,0,0,0.6)] sm:w-[400px]">
      <img
        src={card.avatar}
        alt={card.name}
        loading="lazy"
        className="h-14 w-14 rounded-full object-cover ring-1 ring-steel-950/10"
      />
      <div className="flex gap-1" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-wine text-wine" />
        ))}
      </div>
      <p className="text-lg leading-relaxed text-steel-950/80 sm:text-xl">
        {card.quote}
      </p>
      <figcaption className="mt-auto">
        <p className="font-display text-base font-bold tracking-tight text-steel-950">{card.name}</p>
        <p className="mt-0.5 font-mono text-xs uppercase tracking-wide text-steel-950/45">
          {card.company}
        </p>
      </figcaption>
    </figure>
  )
}

/**
 * Tarjeta placeholder — misma estructura y dimensiones que una reseña real
 * (avatar · estrellas · cita · autor) pero sin datos: barras/formas neutras.
 * Se muestra mientras no haya testimonios reales en content.ts.
 */
function PlaceholderCard() {
  return (
    <figure
      aria-hidden="true"
      className="mx-2.5 flex w-[320px] shrink-0 flex-col gap-5 rounded-3xl border border-steel-950/5 bg-steel-100 p-7 shadow-[0_24px_60px_-32px_rgba(0,0,0,0.6)] sm:w-[400px]"
    >
      {/* Avatar vacío */}
      <div className="h-14 w-14 rounded-full bg-steel-950/[0.07] ring-1 ring-steel-950/10" />
      {/* Estrellas apagadas (estructura conservada) */}
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-4 w-4 text-steel-950/15" />
        ))}
      </div>
      {/* Cita — barras de esqueleto */}
      <div className="flex flex-col gap-2.5">
        <span className="h-3.5 w-full rounded-full bg-steel-950/[0.07]" />
        <span className="h-3.5 w-[92%] rounded-full bg-steel-950/[0.07]" />
        <span className="h-3.5 w-[70%] rounded-full bg-steel-950/[0.07]" />
      </div>
      {/* Autor — nombre + empresa */}
      <div className="mt-auto flex flex-col gap-2">
        <span className="h-3.5 w-32 rounded-full bg-steel-950/10" />
        <span className="h-2.5 w-20 rounded-full bg-steel-950/[0.07]" />
      </div>
    </figure>
  )
}
