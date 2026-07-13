import { useRef } from 'react'
import type { ReactNode } from 'react'
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion'
import { LOW_POWER } from '../lib/device'

/**
 * "Cortina" de scroll — el borde inferior de cada bloque se curva/distorsiona
 * mientras entra en pantalla y se aplana (la sección "se completa") conforme
 * llega a su sitio. Arco elíptico + escala = sensación de pliegue progresivo.
 *
 * Nota: usa overflow-hidden, así que NO debe envolver secciones con
 * position:sticky interno (rompería el sticky) — p. ej. Work.
 */
type Props = {
  children: ReactNode
  className?: string
  /** Fondo opaco del bloque (la curva inferior lo revela). Acepta cualquier
   *  valor CSS — usado para teñir secciones en tonos vino/crema. */
  background?: string
}

export default function ScrollCurtain(props: Props) {
  // Móvil: sin efecto cortina — cada instancia añadía un listener de scroll
  // que escribía clip-path + scale en secciones enteras por frame.
  if (LOW_POWER) {
    return (
      <div style={{ background: props.background }} className={`relative ${props.className ?? ''}`}>
        {props.children}
      </div>
    )
  }
  return <AnimatedCurtain {...props} />
}

function AnimatedCurtain({ children, className = '', background = '#06141B' }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end end'],
  })

  // Mientras el bloque sube hacia su posición, el arco inferior es grande;
  // al asentarse se aplana a 0. clip-path en vez de border-radius+overflow:
  // el recorte se resuelve en composición (GPU) y no repinta la sección
  // completa en cada frame de scroll.
  const arc = useTransform(scrollYProgress, [0, 0.85], [64, 0])
  const scale = useTransform(scrollYProgress, [0, 0.85], [0.975, 1])
  const clip = useMotionTemplate`inset(0px 0px 0px 0px round 0px 0px ${arc}px ${arc}px)`

  return (
    <motion.div
      ref={ref}
      style={{ clipPath: clip, scale, background }}
      className={`relative will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  )
}
